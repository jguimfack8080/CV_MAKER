# CV-Studio

Eine eigenstaendige Web-Anwendung zum Erstellen, Bearbeiten und Exportieren professioneller Lebenslaeufe direkt im Browser - ohne Server, ohne Abonnement, ohne externe Dienste. Die Oberflaeche und die Lebenslauf-Beschriftungen sind in drei Sprachen verfuegbar (Franzoesisch, Englisch, Deutsch), damit Bewerberinnen und Bewerber jeder Herkunft ihren Lebenslauf sauber erstellen koennen.

---

## Problem

Wer seinen Lebenslauf aktualisieren oder neu gestalten moechte, ist haeufig auf kostenpflichtige Online-Dienste angewiesen. Jede Aktualisierung, jede neue Version, jeder neue Gestaltungsversuch fuehrt zu wiederkehrenden Ausgaben - fuer eine Aufgabe, die sich technisch vollstaendig im Browser erledigen laesst.

## Motivation

Dieses Projekt entstand aus einer konkreten Erfahrung: Jedes Mal, wenn ich meinen Lebenslauf aktualisieren wollte, musste ich bezahlen. Das betraf sowohl das Erstellen neuer Versionen als auch das Anpassen bestehender Dokumente. Da es sich um eine vergleichsweise einfache Aufgabe handelt, wollte ich eine eigene Loesung entwickeln, die dauerhaft funktioniert und keine laufenden Kosten verursacht. Das Ergebnis ist CV-Studio: eine lokal lauffaehige Anwendung, mit der sich beliebig viele Lebenslaeufe erstellen und verwalten lassen - vollstaendig im Browser, ohne Server und ohne laufende Kosten.

---

## Funktionen

- **Dreisprachig (FR / EN / DE)**: vollstaendige Internationalisierung - nicht nur die Oberflaeche (Menues, Schaltflaechen, Editor), sondern auch alle auf dem Lebenslauf generierten Beschriftungen (Abschnittstitel, Datenfelder) wechseln die Sprache. Umschaltbar ueber die obere Leiste; die Startsprache richtet sich automatisch nach der Browsersprache (sonst Deutsch). Die Wahl wird gespeichert. Das gesamte Woerterbuch ist in `index.html` eingebettet (keine externe Abhaengigkeit)
- **Mehrere Lebenslaeufe**: beliebig viele eigenstaendige Lebenslaeufe anlegen, bearbeiten, umbenennen, duplizieren und loeschen - mit schnellem Wechsel ueber die obere Leiste
- **Unabhaengige Datenablage**: jeder Lebenslauf besitzt eine eindeutige ID, eigene Inhalte, ein eigenes Foto, eine eigene Vorlage und eigene Layout-Einstellungen
- **Generische Anwendung**: keine fest codierten Daten in der Logik - jeder selbst angelegte Lebenslauf startet leer
- **Demo beim ersten Start**: ist der Speicher komplett leer, laedt die App einen neutralen Beispiel-Lebenslauf (fiktive Daten), damit sie nie leer wirkt und sofort ausprobierbar ist
- **Live-Vorschau**: Aenderungen erscheinen sofort in der A4-Vorschau rechts, mit sichtbaren A4-Seitengrenzen
- **Schwarze Schrift (gut lesbar) als Standard**: frei waehlbare Textfarbe ueber die obere Leiste, jederzeit auf Schwarz zuruecksetzbar; Akzentfarben der Ueberschriften bleiben erhalten
- **Saubere Seitenumbrueche**: einzelne Zeilen, die auf einer A4-Grenze liegen wuerden, werden auf die naechste Seite geschoben - kein abgeschnittener Text, minimaler Leerraum, in allen Vorlagen
- **Hohe Bildqualitaet**: das Profilfoto bleibt im PDF scharf (es wird vor dem Export passgenau in hoher Qualitaet vorgerendert)
- **Kompakte PDF-Dateien**: die Seiten werden als hochwertiges JPEG eingebettet statt als verlustfreies PNG - dadurch faellt die Dateigroesse von zweistelligen MB auf wenige hundert KB, ohne sichtbaren Qualitaetsverlust
- **Integrierte Anleitung**: ausfuehrliche Hilfeseite (`wiki.html`), erreichbar ueber "Hilfe & Anleitung" in der oberen Leiste
- **11 Vorlagen**: Minimal, Sidebar-Akzent, Klassisch DACH, Kreativ Header, Kompakt Zeitachse, Executive, Zweispaltig, Seitenlinie, Profilkarte, Schlicht ATS, Profil Klassisch
- **11 Schriftarten**: Inter, Roboto, Open Sans, Montserrat, Lato, Arial, Helvetica Neue, Calibri, Georgia, Times New Roman, EB Garamond
- **Auto-Speicherung**: Alle Daten werden automatisch im LocalStorage des Browsers gesichert (je Lebenslauf ein eigener Schluessel)
- **Foto-Upload**: Profilfoto hochladen, runde oder eckige Darstellung waehlbar, mit Zoom und vertikaler Position einstellbar (Originaldatei bleibt unveraendert)
- **Skill-Bewertungen**: optionale Sternebewertung (1 bis 5) je Skill, angezeigt in der Vorlage "Profil Klassisch"
- **Drag and Drop**: Eintraege in allen Sektionen per Drag and Drop neu anordnen
- **JSON-Import / JSON-Export**: Lebenslauf als `.json`-Datei sichern; Import legt einen neuen Lebenslauf an (nicht-destruktiv)
- **PDF-Export**: Vollstaendiger A4-Export mit korrekter Seitentrennung und hoher Bildqualitaet (kompaktes JPEG)
- **Klickbare Links im PDF**: E-Mail, LinkedIn, GitHub und Portfolio-Links bleiben im exportierten PDF anklickbar
- **Portfolio-Hervorhebung**: ist ein Portfolio/Website hinterlegt, wird es als gut sichtbare Pille dargestellt (faellt sofort auf, statt als lange URL unterzugehen) - in allen Vorlagen
- **Kompakte Social-Icons**: LinkedIn und GitHub werden als platzsparendes Icon statt als lange URL angezeigt (im PDF weiterhin anklickbar)
- **Projekt-Links**: optionaler Link pro Projekt; wird als dezenter Button "Ansehen" neben dem Projekt angezeigt und ist im PDF anklickbar
- **Automatische Migration**: ein evtl. vorhandener alter Einzel-Lebenslauf wird beim ersten Start in die Bibliothek uebernommen

---

## Vorlagen

| Vorlage | Beschreibung |
|---|---|
| Minimal | Klares, modernes Layout mit Akzentfarbe Blau |
| Sidebar-Akzent | Dunkle Seitenleiste links, Inhalt rechts |
| Klassisch DACH | Tabellarischer Aufbau im deutschen Lebenslauf-Standard |
| Kreativ Header | Dunkler Vollbreiten-Kopfbereich, zweispaltig darunter |
| Kompakt Zeitachse | Zeitleistenformat, platzsparend und strukturiert |
| Executive | Zentrierter Aufbau, elegante Typografie, minimale Dekorationen |
| Zweispaltig | Zweispaltig: Skills/Bildung links, Erfahrung/Projekte rechts, Teal-Akzent |
| Seitenlinie | Einzelspaltig mit blauer vertikaler Linie pro Sektion, Datum als Badge |
| Profilkarte | Farbiger Profilkopf (Indigo), Foto integriert, klare Sektionen darunter |
| Schlicht ATS | Schwarz-weiss, maximum ATS-Kompatibilitaet, tabellarisches Format |
| Profil Klassisch | Helle Seitenleiste mit Foto und persoenlichen Daten, Werdegang rechts mit Datumsspalte und blauen Abschnitts-Markern |

---

## Architektur

Die Anwendung trennt die Verantwortlichkeiten strikt in drei Schichten und besteht aus drei Dateien (plus einer optionalen Testdatei). Es gibt keine Build-Schritte, keinen Server und keine externen Abhaengigkeiten ausser zwei CDN-Bibliotheken fuer den PDF-Export.

```
cv-core.js   - Daten- und Geschaeftslogikschicht (KEIN DOM, KEINE fest codierten Daten)
  - Store    : Persistenz (injizierbar; Standard: localStorage)
  - Models   : Datenmodelle und Normalisierung (leerer Lebenslauf, Formpruefung)
  - Library  : Geschaeftslogik fuer mehrere Lebenslaeufe
               (anlegen, duplizieren, umbenennen, loeschen, wechseln,
                aktiven CV lesen/speichern, importieren, Altdaten migrieren)

default-cv.js - Neutraler Demo-Lebenslauf (fiktive Beispieldaten, getrennte Datendatei)
                wird nur beim allerersten Start in leeren Speicher geladen

index.html   - Praesentationsschicht (UI, Einstiegsdatei)
wiki.html    - Ausfuehrliche deutsche Anleitung (Hilfeseite, A bis Z)
  - HTML-Struktur (obere Leiste mit CV-Verwaltung, Editor links, Vorschau rechts)
  - CSS (Editor-UI, 10 CV-Vorlagen)
  - JavaScript (nur UI-Logik, nutzt cv-core.js)
      - CV-Verwaltung (Auswahl, Neu, Duplizieren, Umbenennen, Loeschen)
      - Editor (Tabs, Formulare, Drag and Drop)
      - Vorlagen-Builder (10 Funktionen, je eine pro Vorlage)
      - A4-Seitenlayout und sichtbare Seitengrenzen in der Vorschau
      - PDF-Export (html2canvas + jsPDF, Multi-Page, exaktes A4-Verhaeltnis, klickbare Links)
      - Schriftartverwaltung, JSON-Import und -Export
```

### Speichermodell (mehrere Lebenslaeufe)

Jeder Lebenslauf wird unabhaengig unter einem eigenen Schluessel gespeichert. Ein Index verwaltet die Liste und den aktiven Lebenslauf.

```
cvstudio_index        -> { "activeId": "<id>", "items": [ { "id", "name", "updatedAt" } ] }
cvstudio_cv_<id>      -> vollstaendige Daten EINES Lebenslaufs (siehe unten)
```

Das entspricht der Idee getrennter Dateien `cv_1.json`, `cv_2.json`, ... - hier als unabhaengige LocalStorage-Eintraege.

### Datenschema eines Lebenslaufs

```json
{
  "personal": {
    "name": "", "jobtitle": "", "email": "", "phone": "",
    "address": "", "linkedin": "", "github": "", "website": "",
    "birthdate": "", "birthplace": "", "nationality": "", "marital": "",
    "photo": null, "photoShape": "circle"
  },
  "fontKey": "inter",
  "template": "minimal",
  "skills":     [{ "id": "", "category": "", "items": [] }],
  "experience": [{ "id": "", "title": "", "company": "", "location": "", "from": "", "to": "", "bullets": [] }],
  "education":  [{ "id": "", "degree": "", "institution": "", "location": "", "from": "", "to": "", "notes": "" }],
  "projects":   [{ "id": "", "title": "", "type": "", "link": "", "from": "", "to": "", "stack": [], "bullets": [] }],
  "languages":  [{ "id": "", "name": "", "level": "" }],
  "interests":  [{ "id": "", "text": "" }]
}
```

### Export-Format

Der Export verpackt einen Lebenslauf mit seinem Namen, damit er beim Import wiederhergestellt werden kann. Aeltere Exporte im Rohformat (nur die CV-Daten) werden beim Import weiterhin akzeptiert.

```json
{ "schema": "cvstudio.v1", "name": "Mein Lebenslauf", "cv": { /* Datenschema oben */ } }
```

---

## Verwendete Technologien

| Bereich | Technologie |
|---|---|
| Sprachen | HTML, CSS, Vanilla JavaScript |
| Framework | keines |
| PDF-Erzeugung | [jsPDF 2.5.1](https://github.com/parallax/jsPDF) + [html2canvas 1.4.1](https://html2canvas.hertzen.com/) |
| Schriftarten | Google Fonts (Roboto, Open Sans, Montserrat, Lato, EB Garamond) |
| Datenspeicherung | LocalStorage + JSON-Datei |
| Build | kein Build-Schritt erforderlich |

---

## Installation und Ausfuehren

Voraussetzungen: Ein moderner Browser (Chrome, Firefox, Edge, Safari).

```bash
# Repository klonen
git clone https://github.com/jguimfack8080/CV_MAKER.git

# In das Verzeichnis wechseln
cd CV_MAKER

# Datei im Browser oeffnen
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

Alternativ die Datei `index.html` direkt per Doppelklick im Datei-Explorer oeffnen.

Wichtig: Die Dateien `cv-core.js` und `default-cv.js` muessen im selben Ordner wie `index.html` liegen, da die Anwendung ihre Logik und den Demo-Lebenslauf daraus laedt.

Fuer den PDF-Export und das Laden von Google Fonts ist eine Internetverbindung erforderlich. Alle anderen Funktionen arbeiten vollstaendig offline.

### Hosting (z. B. Cloudflare Pages, GitHub Pages, Netlify)

Die Anwendung ist eine statische Seite ohne Build-Schritt. Die Einstiegsdatei heisst `index.html` und wird daher unter der Wurzel-URL `/` automatisch ausgeliefert. Empfohlene Einstellungen:

- Build-Befehl: keiner (leer lassen)
- Ausgabe-/Root-Verzeichnis: Projektwurzel (`/`)

`index.html`, `cv-core.js` und `default-cv.js` muessen im selben Verzeichnis liegen.

---

## Bedienung

1. **Sprache waehlen**: In der oberen Leiste ueber das Sprachfeld zwischen Franzoesisch, Englisch und Deutsch wechseln. Oberflaeche und Lebenslauf-Beschriftungen wechseln sofort; die Auswahl wird gespeichert. Beim ersten Aufruf wird automatisch die Browsersprache verwendet.
2. **Lebenslaeufe verwalten**: In der oberen Leiste den aktiven Lebenslauf ueber das Auswahlfeld wechseln. Mit "+ Neu" einen neuen (leeren) Lebenslauf anlegen, mit "Duplizieren" den aktuellen kopieren, mit "Umbenennen" den Namen aendern, mit "Loeschen" entfernen. Jeder Lebenslauf wird unabhaengig gespeichert.
3. **Inhalt bearbeiten**: Linker Bereich mit Tabs (Persoenlich, Skills, Erfahrung, Bildung, Projekte, Sprachen, Sonstiges). Aenderungen erscheinen sofort in der Vorschau.
4. **Vorlage und Schrift waehlen**: Dropdown-Felder in der oberen Leiste. Das Ergebnis wird sofort aktualisiert.
5. **Foto hochladen**: Im Tab "Persoenlich", Schaltflaeche "Foto waehlen". Das Bild wird als Base64 im Browser gespeichert.
6. **Eintraege sortieren**: Karten in den Sektionen per Drag and Drop verschieben.
7. **Daten sichern**: Schaltflaeche "JSON exportieren" speichert den aktuellen Lebenslauf als Datei. "JSON importieren" legt daraus einen neuen Lebenslauf an.
8. **PDF exportieren**: Schaltflaeche "PDF exportieren" erzeugt ein vollstaendiges, druckfertiges A4-Dokument mit klickbaren Links.

---

## Moegliche Erweiterungen

- Farbschema-Auswahl pro Vorlage (Akzentfarbe frei waehlbar)
- Benutzerdefinierte Sektionen (Zertifikate, Ehrenamt, Publikationen)
- Weitere Sprachen fuer die Oberflaeche (zusaetzlich zu FR/EN/DE)
- Druckansicht direkt aus dem Browser ohne PDF-Bibliothek
- Exportformat DOCX als Alternative zu PDF
- Reihenfolge der Lebenslaeufe per Drag and Drop in der Auswahlleiste

---

## Lizenz

Dieses Projekt ist fuer den persoenlichen Gebrauch gedacht und wird ohne Lizenzeinschraenkungen veroeffentlicht.
