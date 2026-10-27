// Regelbasierte Empfehlung, keine KI. Die Empfehlung ist ein Vorschlag; auf dem Ergebnis-Screen
// bleibt jedes Programm wählbar.
// Accelerator: Schwellen wie in der Schnellbewerbung (lib/routing), alle drei Kriterien nötig.
// Goods: vorläufige Regel bis zur Abstimmung mit dem Goods-Team, Produkt plus erste Umsätze.

import { FRAGEN, type FrageId } from './fragen';
import type { ProgrammId } from './programme';

export type Antworten = Partial<Record<FrageId, string>>;

interface Kriterium {
  readonly frage: FrageId;
  readonly erfuelltBei: readonly string[];
  readonly text: string;
}

export const GOODS_KRITERIEN: readonly Kriterium[] = [
  { frage: 'angebot', erfuelltBei: ['d1'], text: 'Physisches Produkt für Endkund:innen' },
  { frage: 'umsatz', erfuelltBei: ['a2', 'a3', 'a4', 'a5'], text: 'Erste Umsätze' },
];

export const ACCELERATOR_KRITERIEN: readonly Kriterium[] = [
  { frage: 'umsatz', erfuelltBei: ['a3', 'a4', 'a5'], text: 'Umsatz ab 10.000 € im Jahr' },
  { frage: 'team', erfuelltBei: ['b3', 'b4'], text: 'Team ab 3 Personen' },
  { frage: 'runway', erfuelltBei: ['c2', 'c3'], text: 'Runway von mindestens 6 Monaten' },
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

function pruefe(kriterien: readonly Kriterium[], antworten: Antworten): KriteriumErgebnis[] {
  return kriterien.map((k) => ({
    text: k.text,
    erfuellt: k.erfuelltBei.includes(antworten[k.frage] ?? ''),
  }));
}

const alleErfuellt = (ergebnisse: readonly KriteriumErgebnis[]): boolean => ergebnisse.every((k) => k.erfuellt);

export function empfehle(antworten: Antworten): Empfehlung {
  const goods = pruefe(GOODS_KRITERIEN, antworten);
  if (alleErfuellt(goods)) {
    return {
      programm: 'goods',
      begruendung: 'Ihr verkauft schon ein physisches Produkt. Genau dafür ist Goods gedacht.',
      kriterien: goods,
    };
  }

  const accelerator = pruefe(ACCELERATOR_KRITERIEN, antworten);
  if (alleErfuellt(accelerator)) {
    return {
      programm: 'ifa',
      begruendung: 'Ihr erfüllt alle drei Kriterien, mit denen Startups in den Accelerator starten.',
      kriterien: accelerator,
    };
  }

  const produktOhneUmsatz = goods[0]!.erfuellt;
  return {
    programm: 'ifi',
    begruendung: produktOhneUmsatz
      ? 'Für den Accelerator sollten alle drei Kriterien erfüllt sein. Goods kommt infrage, sobald euer Produkt erste Umsätze macht. Bis dahin ist der Inkubator euer Weg.'
      : 'Für den Accelerator sollten alle drei Kriterien erfüllt sein. Der Inkubator bringt euch genau dorthin.',
    kriterien: accelerator,
  };
}

export function antwortCodes(antworten: Antworten): string {
  return FRAGEN.map((f) => antworten[f.id])
    .filter((code): code is string => code !== undefined)
    .join('-');
}
