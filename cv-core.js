/* ============================================================================
 * cv-core.js - Daten- und Geschaeftslogikschicht von CV-Studio
 * ----------------------------------------------------------------------------
 * Strikte Trennung der Verantwortlichkeiten:
 *   - Store    : reine Persistenzschicht (localStorage oder injizierbarer Speicher)
 *   - Models   : Datenmodelle und Normalisierung (leerer Lebenslauf, Form pruefen)
 *   - Library  : Geschaeftslogik fuer mehrere Lebenslaeufe
 *                (anlegen, duplizieren, umbenennen, loeschen, wechseln,
 *                 aktiven CV lesen/speichern, importieren, Altdaten migrieren)
 *
 * Diese Datei enthaelt KEINEN DOM-Code und KEINE fest codierten Lebenslaufdaten.
 * Dadurch ist sie generisch, wiederverwendbar und unabhaengig testbar (E2E).
 *
 * Die Datei funktioniert sowohl im Browser (globales Objekt CVCore) als auch
 * in einer Testumgebung (module.exports), in der ein Speicher-Mock injiziert wird.
 * ==========================================================================*/
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;     // Test-/Node-Umgebung
  } else {
    root.CVCore = api;        // Browser
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ==========================================================================
  // KONSTANTEN
  // ==========================================================================
  const INDEX_KEY  = 'cvstudio_index';    // Schluessel des Bibliotheksindex
  const CV_PREFIX  = 'cvstudio_cv_';      // Praefix je Lebenslauf: cvstudio_cv_<id>
  const LEGACY_KEY = 'cvstudio_data';     // alter Einzel-CV-Schluessel (Migration)

  // Liste der Listen-Sektionen eines Lebenslaufs (fuer ID-Vergabe und Normalisierung)
  const LIST_SECTIONS = ['skills', 'experience', 'education', 'projects', 'languages', 'interests'];

  // ==========================================================================
  // HILFSFUNKTIONEN
  // ==========================================================================
  function uid(prefix) {
    return (prefix || '') + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }
  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  function nowIso() {
    return new Date().toISOString();
  }

  // ==========================================================================
  // STORE - reine Persistenzschicht
  // Der Speicher ist injizierbar: im Browser localStorage, im Test ein Mock.
  // ==========================================================================
  function createStore(backend) {
    const store = backend || (typeof localStorage !== 'undefined' ? localStorage : null);
    if (!store) throw new Error('Kein Speicher verfuegbar (localStorage fehlt).');

    return {
      raw: store,
      getJson(key, fallback) {
        const v = store.getItem(key);
        if (v == null) return fallback;
        try { return JSON.parse(v); } catch (e) { return fallback; }
      },
      setJson(key, value) {
        store.setItem(key, JSON.stringify(value));
      },
      remove(key) {
        store.removeItem(key);
      },
      has(key) {
        return store.getItem(key) != null;
      }
    };
  }

  // ==========================================================================
  // MODELS - Datenmodelle und Normalisierung
  // ==========================================================================
  const Models = {
    // Erzeugt einen vollstaendig leeren Lebenslauf (keine fest codierten Inhalte)
    createEmptyCv() {
      return {
        personal: {
          name: '', jobtitle: '', address: '', email: '', phone: '',
          birthdate: '', birthplace: '', nationality: '', marital: '',
          linkedin: '', github: '', website: '',
          photo: null, photoShape: 'circle'
        },
        fontKey: 'inter',
        template: 'minimal',
        skills: [], experience: [], education: [], projects: [], languages: [], interests: []
      };
    },

    // Sorgt dafuer, dass ein (z. B. importierter oder migrierter) CV alle Felder
    // besitzt und jeder Listeneintrag eine eindeutige ID hat. Verhindert Fehler
    // durch unvollstaendige Datenstrukturen.
    normalizeCv(data) {
      const empty = Models.createEmptyCv();
      // Auf frische Ziele mergen, damit ALLE Standardfelder erhalten bleiben,
      // auch wenn data.personal nur einen Teil der Felder enthaelt.
      const cv = Object.assign({}, empty, data || {});
      cv.personal = Object.assign({}, empty.personal, (data && data.personal) || {});
      if (!cv.personal.github)  cv.personal.github = '';
      if (!cv.personal.website) cv.personal.website = '';
      if (!cv.personal.photoShape) cv.personal.photoShape = 'circle';
      LIST_SECTIONS.forEach(function (key) {
        if (!Array.isArray(cv[key])) cv[key] = [];
        cv[key].forEach(function (item) {
          if (item && !item.id) item.id = uid();
        });
      });
      if (!cv.fontKey)  cv.fontKey = 'inter';
      if (!cv.template) cv.template = 'minimal';
      return cv;
    }
  };

  // ==========================================================================
  // LIBRARY - Geschaeftslogik fuer mehrere Lebenslaeufe
  // Index-Struktur: { activeId: string|null, items: [{ id, name, updatedAt }] }
  // Jeder CV wird unter eigenem Schluessel gespeichert (unabhaengige Ablage).
  // ==========================================================================
  function createLibrary(options) {
    options = options || {};
    const store = createStore(options.backend);

    function readIndex() {
      const idx = store.getJson(INDEX_KEY, null);
      if (!idx || !Array.isArray(idx.items)) return { activeId: null, items: [] };
      return idx;
    }
    function writeIndex(idx) {
      store.setJson(INDEX_KEY, idx);
    }
    function cvKey(id) {
      return CV_PREFIX + id;
    }

    const Library = {
      // ---- Lesen ------------------------------------------------------------

      // Gibt die Metadaten aller Lebenslaeufe zurueck (ohne die schweren Daten),
      // sortiert nach letzter Aenderung (neueste zuerst).
      list() {
        const idx = readIndex();
        return idx.items.slice().sort(function (a, b) {
          return (b.updatedAt || '').localeCompare(a.updatedAt || '');
        });
      },
      count() {
        return readIndex().items.length;
      },
      getActiveId() {
        return readIndex().activeId;
      },
      exists(id) {
        return readIndex().items.some(function (it) { return it.id === id; });
      },
      getName(id) {
        const it = readIndex().items.find(function (x) { return x.id === id; });
        return it ? it.name : null;
      },

      // Laedt die vollstaendigen Daten eines Lebenslaufs (normalisiert).
      load(id) {
        if (!Library.exists(id)) return null;
        const data = store.getJson(cvKey(id), null);
        return data ? Models.normalizeCv(data) : Models.createEmptyCv();
      },

      // Laedt den aktiven Lebenslauf; faellt auf den ersten zurueck, falls noetig.
      loadActive() {
        const idx = readIndex();
        let id = idx.activeId;
        if (!id || !Library.exists(id)) {
          id = idx.items.length ? idx.items[0].id : null;
        }
        return id ? { id: id, data: Library.load(id) } : null;
      },

      // ---- Schreiben --------------------------------------------------------

      // Legt einen neuen Lebenslauf an und gibt seine ID zurueck.
      // data ist optional; ohne Angabe wird ein leerer CV erzeugt.
      create(name, data) {
        const id = uid('cv_');
        const cv = Models.normalizeCv(data || Models.createEmptyCv());
        const idx = readIndex();
        idx.items.push({ id: id, name: name || ('Lebenslauf ' + (idx.items.length + 1)), updatedAt: nowIso() });
        idx.activeId = id;
        store.setJson(cvKey(id), cv);
        writeIndex(idx);
        return id;
      },

      // Speichert die Daten eines vorhandenen Lebenslaufs und aktualisiert updatedAt.
      save(id, data) {
        if (!Library.exists(id)) return false;
        store.setJson(cvKey(id), Models.normalizeCv(data));
        const idx = readIndex();
        const it = idx.items.find(function (x) { return x.id === id; });
        if (it) it.updatedAt = nowIso();
        writeIndex(idx);
        return true;
      },

      // Benennt einen Lebenslauf um.
      rename(id, name) {
        const idx = readIndex();
        const it = idx.items.find(function (x) { return x.id === id; });
        if (!it) return false;
        it.name = name || it.name;
        it.updatedAt = nowIso();
        writeIndex(idx);
        return true;
      },

      // Dupliziert einen Lebenslauf (eigene Kopie aller Daten) und aktiviert die Kopie.
      duplicate(id) {
        if (!Library.exists(id)) return null;
        const data = Library.load(id);
        const name = (Library.getName(id) || 'Lebenslauf') + ' (Kopie)';
        return Library.create(name, deepClone(data));
      },

      // Loescht einen Lebenslauf samt Daten. Aktiviert bei Bedarf einen anderen.
      remove(id) {
        const idx = readIndex();
        const pos = idx.items.findIndex(function (x) { return x.id === id; });
        if (pos === -1) return false;
        idx.items.splice(pos, 1);
        store.remove(cvKey(id));
        if (idx.activeId === id) {
          idx.activeId = idx.items.length ? idx.items[0].id : null;
        }
        writeIndex(idx);
        return true;
      },

      // Setzt den aktiven Lebenslauf.
      setActive(id) {
        if (!Library.exists(id)) return false;
        const idx = readIndex();
        idx.activeId = id;
        writeIndex(idx);
        return true;
      },

      // ---- Import / Export --------------------------------------------------

      // Serialisiert einen Lebenslauf fuer den Export (mit Name fuer Reimport).
      exportData(id) {
        if (!Library.exists(id)) return null;
        return { schema: 'cvstudio.v1', name: Library.getName(id), cv: Library.load(id) };
      },

      // Importiert einen Lebenslauf als NEUEN Eintrag (nicht-destruktiv).
      // Akzeptiert sowohl das neue Wrapper-Format { name, cv } als auch
      // rohe CV-Daten aus aelteren Exporten.
      importData(parsed) {
        let name, data;
        if (parsed && parsed.cv && typeof parsed.cv === 'object') {
          name = parsed.name; data = parsed.cv;
        } else {
          data = parsed;
          name = (parsed && parsed.personal && parsed.personal.name) || 'Importierter Lebenslauf';
        }
        return Library.create(name, data);
      },

      // ---- Migration --------------------------------------------------------

      // Migriert einen evtl. vorhandenen alten Einzel-CV in die Bibliothek.
      // Wird nur ausgefuehrt, wenn die Bibliothek leer ist und Altdaten existieren.
      migrateLegacy() {
        const idx = readIndex();
        if (idx.items.length > 0) return null;
        if (!store.has(LEGACY_KEY)) return null;
        const old = store.getJson(LEGACY_KEY, null);
        if (!old) return null;
        const name = (old.personal && old.personal.name)
          ? (old.personal.name + ' - Lebenslauf')
          : 'Mein Lebenslauf';
        const id = Library.create(name, old);
        store.remove(LEGACY_KEY); // Altdaten nach erfolgreicher Migration entfernen
        return id;
      },

      // Stellt sicher, dass mindestens ein Lebenslauf existiert.
      // Reihenfolge: vorhandene Bibliothek -> Migration -> neuer leerer CV.
      ensureAtLeastOne(defaultName) {
        if (Library.count() > 0) return Library.getActiveId() || Library.list()[0].id;
        const migrated = Library.migrateLegacy();
        if (migrated) return migrated;
        return Library.create(defaultName || 'Mein Lebenslauf');
      }
    };

    return Library;
  }

  // ==========================================================================
  // OEFFENTLICHE API
  // ==========================================================================
  return {
    INDEX_KEY: INDEX_KEY,
    CV_PREFIX: CV_PREFIX,
    LEGACY_KEY: LEGACY_KEY,
    LIST_SECTIONS: LIST_SECTIONS,
    uid: uid,
    createStore: createStore,
    Models: Models,
    createLibrary: createLibrary
  };
});
