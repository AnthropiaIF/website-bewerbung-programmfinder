// Antwort-Codes (a1, b3 …) wandern als Parameter `antworten` in die Bewerbungstools und in die Auswertung.
// Nach dem Go-live bestehende Codes nicht mehr umnummerieren, neue Optionen hinten anhängen.
// `merkmal` erscheint als Haken auf dem Ergebnis-Screen, wenn die Antwort für den Inkubator spricht.

export type FrageId = 'gegruendet' | 'umsatz' | 'team' | 'runway' | 'angebot';

export interface Option {
  readonly code: string;
  readonly label: string;
  readonly unterzeile?: string;
  readonly merkmal?: string;
}

export interface Frage {
  readonly id: FrageId;
  readonly text: string;
  readonly hinweis?: string;
  readonly optionen: readonly Option[];
}

export const FRAGEN: readonly Frage[] = [
  {
    id: 'gegruendet',
    text: 'Habt ihr schon gegründet?',
    optionen: [
      {
        code: 'a1',
        label: 'Ja, wir haben gegründet',
        unterzeile: 'z. B. GmbH, gGmbH, UG oder Einzelunternehmen',
        merkmal: 'Bereits gegründet',
      },
      { code: 'a2', label: 'Nein, noch nicht', merkmal: 'Noch nicht gegründet' },
    ],
  },
  {
    id: 'umsatz',
    text: 'Wie hoch ist euer Umsatz pro Jahr?',
    optionen: [
      { code: 'b1', label: 'Noch keine Umsätze', merkmal: 'Noch keine Umsätze' },
      { code: 'b2', label: 'Bis 10.000 €', merkmal: 'Umsatz bis 10.000 €' },
      { code: 'b3', label: '10.000 bis 50.000 €', merkmal: 'Umsatz 10.000 bis 50.000 €' },
      { code: 'b4', label: '50.000 bis 100.000 €', merkmal: 'Umsatz 50.000 bis 100.000 €' },
      { code: 'b5', label: 'Über 100.000 €', merkmal: 'Umsatz über 100.000 €' },
    ],
  },
  {
    id: 'team',
    text: 'Wie viele Personen arbeiten in eurem Team?',
    optionen: [
      { code: 'c1', label: 'Ich gründe allein', merkmal: 'Solo-Gründung' },
      { code: 'c2', label: 'Zu zweit', merkmal: 'Team zu zweit' },
      { code: 'c3', label: '3 bis 5 Personen', merkmal: 'Team mit 3 bis 5 Personen' },
      { code: 'c4', label: '6 oder mehr Personen', merkmal: 'Team ab 6 Personen' },
    ],
  },
  {
    id: 'runway',
    text: 'Wie lang ist euer Runway?',
    hinweis: 'Runway heißt: wie lange euer Geld noch reicht, bevor neue Einnahmen oder Finanzierung nötig werden.',
    optionen: [
      { code: 'd1', label: 'Weniger als 6 Monate', merkmal: 'Runway unter 6 Monaten' },
      { code: 'd2', label: '6 bis 12 Monate', merkmal: 'Runway 6 bis 12 Monate' },
      { code: 'd3', label: 'Mehr als 12 Monate', merkmal: 'Runway über 12 Monate' },
      {
        code: 'd4',
        label: 'Nicht relevant',
        unterzeile: 'Vor der Gründung oder noch keine laufenden Kosten',
        merkmal: 'Noch keine laufenden Kosten',
      },
    ],
  },
  {
    id: 'angebot',
    text: 'Was entwickelt ihr?',
    optionen: [
      {
        code: 'e1',
        label: 'Ein physisches Produkt für Endkund:innen',
        unterzeile: 'z. B. Lebensmittel, Kosmetik, Mode, Haushaltswaren',
      },
      {
        code: 'e2',
        label: 'Etwas anderes',
        unterzeile: 'z. B. Software, Dienstleistung, B2B-Lösung',
      },
    ],
  },
];

export function merkmalFuer(frageId: FrageId, code: string | undefined): string | undefined {
  return FRAGEN.find((f) => f.id === frageId)?.optionen.find((o) => o.code === code)?.merkmal;
}
