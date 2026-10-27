// Antwort-Codes (a1, b3 …) wandern als Parameter `antworten` in die Bewerbungstools und in die Auswertung.
// Bestehende Codes nicht umnummerieren, neue Optionen hinten anhängen.

export type FrageId = 'angebot' | 'umsatz' | 'team' | 'runway';

export interface Option {
  readonly code: string;
  readonly label: string;
  readonly unterzeile?: string;
}

export interface Frage {
  readonly id: FrageId;
  readonly text: string;
  readonly hinweis?: string;
  readonly optionen: readonly Option[];
}

export const FRAGEN: readonly Frage[] = [
  {
    id: 'angebot',
    text: 'Was entwickelt ihr?',
    optionen: [
      {
        code: 'a1',
        label: 'Ein physisches Produkt für Endkund:innen',
        unterzeile: 'z. B. Lebensmittel, Kosmetik, Mode, Haushaltswaren',
      },
      {
        code: 'a2',
        label: 'Etwas anderes',
        unterzeile: 'z. B. Software, Dienstleistung, B2B-Lösung',
      },
    ],
  },
  {
    id: 'umsatz',
    text: 'Wie hoch ist euer Umsatz pro Jahr?',
    optionen: [
      { code: 'b1', label: 'Noch keine Umsätze' },
      { code: 'b2', label: 'Bis 10.000 €' },
      { code: 'b3', label: '10.000 bis 50.000 €' },
      { code: 'b4', label: '50.000 bis 100.000 €' },
      { code: 'b5', label: 'Über 100.000 €' },
    ],
  },
  {
    id: 'team',
    text: 'Wie viele Personen arbeiten in eurem Team?',
    optionen: [
      { code: 'c1', label: 'Ich gründe allein' },
      { code: 'c2', label: 'Zu zweit' },
      { code: 'c3', label: '3 bis 5 Personen' },
      { code: 'c4', label: '6 oder mehr Personen' },
    ],
  },
  {
    id: 'runway',
    text: 'Wie lang ist euer Runway?',
    hinweis: 'Runway heißt: wie lange euer Geld noch reicht, bevor neue Einnahmen oder Finanzierung nötig werden.',
    optionen: [
      { code: 'd1', label: 'Weniger als 6 Monate' },
      { code: 'd2', label: '6 bis 12 Monate' },
      { code: 'd3', label: 'Mehr als 12 Monate' },
      { code: 'd4', label: 'Nicht relevant', unterzeile: 'Vor der Gründung oder noch keine laufenden Kosten' },
    ],
  },
];
