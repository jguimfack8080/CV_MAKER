# CV-Studio

Eine eigenstaendige Web-Anwendung zum Erstellen, Bearbeiten und Exportieren professioneller Lebenslaeufe direkt im Browser - ohne Server, ohne Abonnement, ohne externe Dienste.

---

## Problem

Wer seinen Lebenslauf aktualisieren oder neu gestalten moechte, ist haeufig auf kostenpflichtige Online-Dienste angewiesen. Jede Aktualisierung, jede neue Version, jeder neue Gestaltungsversuch fuehrt zu wiederkehrenden Ausgaben - fuer eine Aufgabe, die sich technisch vollstaendig im Browser erledigen laesst.

## Motivation

Dieses Projekt entstand aus einer konkreten Erfahrung: Jedes Mal, wenn ich meinen Lebenslauf aktualisieren wollte, musste ich bezahlen. Das betraf sowohl das Erstellen neuer Versionen als auch das Anpassen bestehender Dokumente. Da es sich um eine vergleichsweise einfache Aufgabe handelt, wollte ich eine eigene Loesung entwickeln, die dauerhaft funktioniert und keine laufenden Kosten verursacht. Das Ergebnis ist CV-Studio: eine lokal lauffaehige Anwendung, die alle notwendigen Funktionen in einer einzigen HTML-Datei vereint.

---

## Funktionen

- **Live-Vorschau**: Aenderungen erscheinen sofort in der A4-Vorschau rechts
- **6 Vorlagen**: Minimal, Sidebar-Akzent, Klassisch DACH, Kreativ Header, Kompakt Zeitachse, Executive
- **11 Schriftarten**: Inter, Roboto, Open Sans, Montserrat, Lato, Arial, Helvetica Neue, Calibri, Georgia, Times New Roman, EB Garamond
- **Auto-Speicherung**: Alle Daten werden automatisch im LocalStorage des Browsers gesichert
- **Foto-Upload**: Profilfoto hochladen, runde oder eckige Darstellung waehlbar
- **Drag and Drop**: Eintraege in allen Sektionen per Drag and Drop neu anordnen
- **JSON-Import / JSON-Export**: Vollstaendige Datensicherung als `.json`-Datei, portabel zwischen Browsern und Geraeten
- **PDF-Export**: Vollstaendiger A4-Export mit korrekter Seitentrennung und hoher Bildqualitaet (PNG lossless)
- **Klickbare Links im PDF**: E-Mail, LinkedIn, GitHub und Portfolio-Links bleiben im exportierten PDF anklickbar
- **Mehrsprachige Kontaktfelder**: Name, Adresse, Telefon, E-Mail, LinkedIn, GitHub, Portfolio/Website

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

---

## Architektur

Die gesamte Anwendung besteht aus einer einzigen HTML-Datei (`cv-studio.html`). Es gibt keine Build-Schritte, keinen Server und keine externen Abhaengigkeiten ausser zwei CDN-Bibliotheken fuer den PDF-Export.

```
cv-studio.html
  - HTML-Struktur (Editor links, Vorschau rechts)
  - CSS (Editor-UI, 6 CV-Vorlagen)
  - JavaScript
      - Datenverwaltung (JSON-Schema, LocalStorage)
      - Editor (Tabs, Formulare, Drag and Drop)
      - Vorlagen-Builder (6 Funktionen, je eine pro Vorlage)
      - PDF-Export (html2canvas + jsPDF, Multi-Page, klickbare Links)
      - Schriftartverwaltung
      - JSON-Import und -Export
```

### Datenschema (vereinfacht)

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
  "projects":   [{ "id": "", "title": "", "type": "", "from": "", "to": "", "stack": [], "bullets": [] }],
  "languages":  [{ "id": "", "name": "", "level": "" }],
  "interests":  [{ "id": "", "text": "" }]
}
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
start cv-studio.html

# macOS
open cv-studio.html

# Linux
xdg-open cv-studio.html
```

Alternativ die Datei `cv-studio.html` direkt per Doppelklick im Datei-Explorer oeffnen.

Fuer den PDF-Export und das Laden von Google Fonts ist eine Internetverbindung erforderlich. Alle anderen Funktionen arbeiten vollstaendig offline.

---

## Bedienung

1. **Inhalt bearbeiten**: Linker Bereich mit Tabs (Persoenlich, Skills, Erfahrung, Bildung, Projekte, Sprachen, Sonstiges). Aenderungen erscheinen sofort in der Vorschau.
2. **Vorlage und Schrift waehlen**: Dropdown-Felder in der oberen Leiste. Das Ergebnis wird sofort aktualisiert.
3. **Foto hochladen**: Im Tab "Persoenlich", Schaltflaeche "Foto waehlen". Das Bild wird als Base64 im Browser gespeichert.
4. **Eintraege sortieren**: Karten in den Sektionen per Drag and Drop verschieben.
5. **Daten sichern**: Schaltflaeche "JSON exportieren" speichert alle Daten als Datei. Mit "JSON importieren" lassen sie sich jederzeit wiederherstellen.
6. **PDF exportieren**: Schaltflaeche "PDF exportieren" erzeugt ein vollstaendiges, druckfertiges A4-Dokument mit klickbaren Links.

---

## Moegliche Erweiterungen

- Farbschema-Auswahl pro Vorlage (Akzentfarbe frei waehlbar)
- Benutzerdefinierte Sektionen (Zertifikate, Ehrenamt, Publikationen)
- Mehrsprachige Oberflaeche (Deutsch, Englisch, Franzoesisch)
- Druckansicht direkt aus dem Browser ohne PDF-Bibliothek
- Versionsverwaltung mehrerer Lebenslauf-Varianten innerhalb der Anwendung
- Exportformat DOCX als Alternative zu PDF

---

## Lizenz

Dieses Projekt ist fuer den persoenlichen Gebrauch gedacht und wird ohne Lizenzeinschraenkungen veroeffentlicht.
