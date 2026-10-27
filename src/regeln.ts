// Regelbasierte Empfehlung, keine KI. Schwellen wie in der Schnellbewerbung (lib/routing):
// Accelerator nur, wenn alle drei Reife-Kriterien erfüllt sind, sonst Inkubator.
// Die Empfehlung ist ein Vorschlag; auf dem Ergebnis-Screen bleibt jedes Programm wählbar.

import { FRAGEN, type Frage, type FrageId } from './fragen';
import type { ProgrammId } from './programme';

export type Antworten = Partial<Record<FrageId, string>>;

interface Kriterium {
  readonly frage: FrageId;
  readonly erfuelltBei: readonly string[];
  readonly text: string;
}

export const GOODS_ANTWORT = { frage: 'angebot', code: 'a1' } as const;

export const ACCELERATOR_KRITERIEN: readonly Kriterium[] = [
  { frage: 'umsatz', erfuelltBei: ['b3', 'b4', 'b5'], text: 'Umsatz ab 10.000 € im Jahr' },
  { frage: 'team', erfuelltBei: ['c3', 'c4'], text: 'Team ab 3 Personen' },
  { frage: 'runway', erfuelltBei: ['d2', 'd3'], text: 'Runway von mindestens 6 Monaten' },
];

export interface KriteriumErgebnis {
  readonly text: string;
  readonly erfuellt: boolean;
}

export interface Empfehlung {
  readonly programm: ProgrammId;
  readonly begruendung: string;
  readonly kriterien: readonly KriteriumErgebnis[];
}

export function istGoods(antworten: Antworten): boolean {
  return antworten[GOODS_ANTWORT.frage] === GOODS_ANTWORT.code;
}

export function fragenFuer(antworten: Antworten): readonly Frage[] {
  return istGoods(antworten) ? FRAGEN.filter((f) => f.id === GOODS_ANTWORT.frage) : FRAGEN;
}

export function istVollstaendig(antworten: Antworten): boolean {
  return fragenFuer(antworten).every((f) => antworten[f.id] !== undefined);
}

export function empfehle(antworten: Antworten): Empfehlung {
  if (istGoods(antworten)) {
    return {
      programm: 'goods',
      begruendung: 'Ihr entwickelt ein physisches Produkt für Endkund:innen. Genau dafür ist Goods gedacht.',
      kriterien: [],
    };
  }

  const kriterien = ACCELERATOR_KRITERIEN.map((k) => ({
    text: k.text,
    erfuellt: k.erfuelltBei.includes(antworten[k.frage] ?? ''),
  }));

  if (kriterien.every((k) => k.erfuellt)) {
    return {
      programm: 'ifa',
      begruendung: 'Ihr erfüllt alle drei Kriterien, mit denen Startups in den Accelerator starten.',
      kriterien,
    };
  }

  return {
    programm: 'ifi',
    begruendung:
      'Für den Accelerator sollten alle drei Kriterien erfüllt sein. Der Inkubator bringt euch genau dorthin.',
    kriterien,
  };
}

export function antwortCodes(antworten: Antworten): string {
  return fragenFuer(antworten)
    .map((f) => antworten[f.id])
    .filter((code): code is string => code !== undefined)
    .join('-');
}
