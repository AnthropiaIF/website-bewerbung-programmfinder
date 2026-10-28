// Regelbasierte Empfehlung, keine KI. Die Empfehlung ist ein Vorschlag; auf dem Ergebnis-Screen
// bleibt jedes Programm wählbar.
// Accelerator: alle Kriterien nötig. Abweichend von der Schnellbewerbung zählt jeder Umsatz,
// nicht erst ab 10.000 € (Entscheidung 28.10.2026).
// Goods: vorläufige Regel bis zur Abstimmung mit dem Goods-Team.
// Gegründet ist Voraussetzung für beide Accelerator-Programme (Annahme, noch zu bestätigen).

import { FRAGEN, merkmalFuer, type FrageId } from './fragen';
import type { Inhalte } from './inhalte';
import type { ProgrammId } from './programme';
import type { TextSchluessel } from './texte';

export type Antworten = Partial<Record<FrageId, string>>;

interface Kriterium {
  readonly frage: FrageId;
  readonly erfuelltBei: readonly string[];
  readonly text: TextSchluessel;
}

const GEGRUENDET: Kriterium = { frage: 'gegruendet', erfuelltBei: ['a1'], text: 'kriteriumGegruendet' };
const UMSATZ: Kriterium = { frage: 'umsatz', erfuelltBei: ['b2', 'b3', 'b4', 'b5'], text: 'kriteriumUmsatz' };

export const GOODS_KRITERIEN: readonly Kriterium[] = [
  GEGRUENDET,
  { frage: 'angebot', erfuelltBei: ['e1'], text: 'kriteriumProdukt' },
  UMSATZ,
];

export const ACCELERATOR_KRITERIEN: readonly Kriterium[] = [
  GEGRUENDET,
  UMSATZ,
  { frage: 'team', erfuelltBei: ['c3', 'c4'], text: 'kriteriumTeam' },
  { frage: 'runway', erfuelltBei: ['d2', 'd3'], text: 'kriteriumRunway' },
];

export interface Empfehlung {
  readonly programm: ProgrammId;
  readonly intro: string;
  readonly gruende: readonly string[];
}

function erfuellt(kriterium: Kriterium, antworten: Antworten): boolean {
  return kriterium.erfuelltBei.includes(antworten[kriterium.frage] ?? '');
}

const alleErfuellt = (kriterien: readonly Kriterium[], antworten: Antworten): boolean =>
  kriterien.every((k) => erfuellt(k, antworten));

export function empfehle(antworten: Antworten, { fragen, texte }: Pick<Inhalte, 'fragen' | 'texte'>): Empfehlung {
  if (alleErfuellt(GOODS_KRITERIEN, antworten)) {
    return { programm: 'goods', intro: texte.introGoods, gruende: GOODS_KRITERIEN.map((k) => texte[k.text]) };
  }

  if (alleErfuellt(ACCELERATOR_KRITERIEN, antworten)) {
    return { programm: 'ifa', intro: texte.introIfa, gruende: ACCELERATOR_KRITERIEN.map((k) => texte[k.text]) };
  }

  return {
    programm: 'ifi',
    intro: texte.introIfi,
    gruende: ACCELERATOR_KRITERIEN.filter((k) => !erfuellt(k, antworten))
      .map((k) => merkmalFuer(fragen, k.frage, antworten[k.frage]))
      .filter((merkmal): merkmal is string => merkmal !== undefined),
  };
}

export function antwortCodes(antworten: Antworten): string {
  return FRAGEN.map((f) => antworten[f.id])
    .filter((code): code is string => code !== undefined)
    .join('-');
}
