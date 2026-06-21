/* ============================================================================
 * default-cv.js - Neutraler Demo-Lebenslauf (Beispieldaten)
 * ----------------------------------------------------------------------------
 * Zweck: Beim allerersten Start (leerer Speicher, kein vorhandener Lebenslauf)
 * zeigt die Anwendung diesen ansprechenden Beispiel-Lebenslauf. So ist die App
 * nie leer, neue Nutzer verstehen sofort ihren Nutzen und koennen sie direkt
 * ausprobieren.
 *
 * Wichtig:
 *   - Dies sind FIKTIVE, neutrale Daten (keine echten Kontaktdaten).
 *   - Diese Datei ist reine Dateninhalt, getrennt von Logik (cv-core.js) und
 *     Oberflaeche (index.html). Wer die App ohne Demo nutzen moechte, entfernt
 *     einfach die Einbindung dieser Datei.
 *   - Die Demo wird NUR geladen, wenn noch kein eigener Lebenslauf existiert.
 *     Vorhandene Daten werden niemals ueberschrieben.
 * ==========================================================================*/
window.CV_DEMO = {
  name: 'Beispiel-Lebenslauf (Demo)',
  cv: {
    personal: {
      name: 'Maria Mustermann',
      jobtitle: 'Senior Data Engineer | Cloud & Analytics',
      address: 'Musterstrasse 12, 10115 Berlin',
      email: 'maria.mustermann@example.com',
      phone: '+49 30 1234567',
      birthdate: '01.01.1990',
      birthplace: 'Hamburg',
      nationality: 'Deutsch',
      marital: 'ledig',
      linkedin: 'linkedin.com/in/maria-mustermann-demo',
      github: 'github.com/maria-mustermann',
      website: 'maria-mustermann.example.com',
      photo: null,
      photoShape: 'circle'
    },
    fontKey: 'inter',
    template: 'minimal',
    skills: [
      { id: 'd-sk0', category: 'Kenntnisse', items: ['Lernbereitschaft', 'Zuverlaessigkeit', 'Teamfaehigkeit'], ratings: { 'Lernbereitschaft': 5, 'Zuverlaessigkeit': 5, 'Teamfaehigkeit': 5 } },
      { id: 'd-sk1', category: 'Programmierung', items: ['Python', 'SQL', 'Java', 'Bash'], ratings: { 'Python': 5, 'SQL': 5, 'Java': 4, 'Bash': 3 } },
      { id: 'd-sk2', category: 'Data Engineering', items: ['Apache Spark', 'Apache Airflow', 'Apache Kafka', 'dbt', 'ETL/ELT', 'Parquet'], ratings: { 'Apache Spark': 5, 'Apache Airflow': 5, 'Apache Kafka': 4, 'dbt': 4, 'ETL/ELT': 5, 'Parquet': 4 } },
      { id: 'd-sk3', category: 'Cloud & DevOps', items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Git', 'CI/CD'], ratings: { 'AWS': 4, 'Docker': 5, 'Kubernetes': 3, 'Terraform': 3, 'Git': 5, 'CI/CD': 4 } },
      { id: 'd-sk4', category: 'Datenbanken & BI', items: ['PostgreSQL', 'Snowflake', 'Power BI', 'Tableau'], ratings: { 'PostgreSQL': 5, 'Snowflake': 4, 'Power BI': 4, 'Tableau': 3 } }
    ],
    experience: [
      {
        id: 'd-ex1', title: 'Senior Data Engineer', company: 'Beispiel Analytics GmbH', location: 'Berlin',
        from: '01/2022', to: 'heute',
        bullets: [
          'Konzeption und Betrieb skalierbarer Datenpipelines (Batch und Streaming) fuer ein Team aus 8 Analysten',
          'Aufbau einer Cloud-Data-Plattform auf AWS mit Apache Airflow und dbt; Reduktion der Ladezeiten um 60 Prozent',
          'Mentoring von zwei Junior Engineers sowie Einfuehrung von Code-Reviews und automatisierten Datentests'
        ]
      },
      {
        id: 'd-ex2', title: 'Data Engineer', company: 'Datenfluss AG', location: 'Hamburg',
        from: '07/2018', to: '12/2021',
        bullets: [
          'Entwicklung von ETL-Strecken aus heterogenen Quellsystemen in ein zentrales Data Warehouse',
          'Automatisierung der Datenqualitaetspruefung und Aufbau eines Monitoring-Dashboards'
        ]
      }
    ],
    education: [
      { id: 'd-edu1', degree: 'M.Sc. Informatik', institution: 'Technische Universitaet Berlin', location: 'Berlin', from: '10/2016', to: '06/2018', notes: 'Schwerpunkt: Verteilte Systeme und Datenbanken' },
      { id: 'd-edu2', degree: 'B.Sc. Wirtschaftsinformatik', institution: 'Universitaet Hamburg', location: 'Hamburg', from: '10/2013', to: '09/2016', notes: '' }
    ],
    projects: [
      {
        id: 'd-pr1', title: 'Echtzeit-Analyseplattform', type: 'Berufliches Projekt', link: 'github.com/maria-mustermann', from: '2023', to: 'heute',
        stack: ['Python', 'Apache Kafka', 'Apache Spark', 'AWS', 'Docker'],
        bullets: [
          'Aufbau einer Streaming-Plattform zur Echtzeitauswertung von Ereignisdaten',
          'Verarbeitung von ueber einer Million Ereignissen pro Stunde bei stabiler Latenz unter einer Sekunde'
        ]
      },
      {
        id: 'd-pr2', title: 'Self-Service-BI-Initiative', type: 'Internes Projekt', from: '2021', to: '2022',
        stack: ['dbt', 'Snowflake', 'Power BI'],
        bullets: [
          'Modellierung wiederverwendbarer Datenmodelle mit dbt fuer Fachabteilungen',
          'Befaehigung der Fachbereiche zu eigenstaendigen Auswertungen ohne IT-Engpaesse'
        ]
      }
    ],
    languages: [
      { id: 'd-la1', name: 'Deutsch', level: 'Muttersprache' },
      { id: 'd-la2', name: 'Englisch', level: 'C1' },
      { id: 'd-la3', name: 'Franzoesisch', level: 'B1' }
    ],
    interests: [
      { id: 'd-in1', text: 'Open-Source-Beitraege' },
      { id: 'd-in2', text: 'Lauftraining' },
      { id: 'd-in3', text: 'Fotografie' }
    ]
  }
};
