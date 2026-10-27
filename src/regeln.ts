// Regelbasierte Empfehlung, keine KI. Die Empfehlung ist ein Vorschlag; auf dem Ergebnis-Screen
// bleibt jedes Programm wählbar.
// Accelerator: Schwellen wie in der Schnellbewerbung (lib/routing), alle Kriterien nötig.
// Goods: vorläufige Regel bis zur Abstimmung mit dem Goods-Team.
// Gegründet ist Voraussetzung für beide Accelerator-Programme (Annahme, noch zu bestätigen).

import { FRAGEN, merkmalFuer, type FrageId } from './fragen';
import type { ProgrammId } from './programme';

export type Antworten = Partial<Record<FrageId, string>>;

interface Kriterium {
  readonly frage: FrageId;
  readonly erfuelltBei: readonly string[];
  readonly text: string;
}

const GEGRUENDET: Kriterium = { frage: 'gegruendet', erfuelltBei: ['a1'], text: 'Bereits gegründet' };

export const GOODS_KRITERIEN: readonly Kriterium[] = [
  GEGRUENDET,
  { frage: 'angebot', erfuelltBei: ['e1'], text: 'Physisches Produkt für Endkund:innen' },
  { frage: 'umsatz', erfuelltBei: ['b2', 'b3', 'b4', 'b5'], text: 'Erste Umsätze' },
];

export const ACCELERATOR_KRITERIEN: readonly Kriterium[] = [
  GEGRUENDET,
  { frage: 'umsatz', erfuelltBei: ['b3', 'b4', 'b5'], text: 'Umsatz ab 10.000 € im Jahr' },
  { frage: 'team', erfuelltBei: ['c3', 'c4'], text: 'Team ab 3 Personen' },
  { frage: 'runway', erfuelltBei: ['d2', 'd3'], text: 'Runway von mindestens 6 Monaten' },
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

export function empfehle(antworten: Antworten): Empfehlung {
  if (alleErfuellt(GOODS_KRITERIEN, antworten)) {
    return {
      programm: 'goods',
      intro: 'Ihr verkauft bereits ein eigenes Produkt an Endkund:innen. Goods ist unser Accelerator für genau solche Teams.',
      gruende: GOODS_KRITERIEN.map((k) => k.text),
    };
  }

  if (alleErfuellt(ACCELERATOR_KRITERIEN, antworten)) {
    return {
      programm: 'ifa',
      intro:
        'Ihr seid bereits am Markt und möchtet nun skalieren. Nach euren Angaben erfüllt ihr die Kernkriterien des Accelerators.',
      gruende: ACCELERATOR_KRITERIEN.map((k) => k.text),
    };
  }

  return {
    programm: 'ifi',
    intro:
      'Laut euren Angaben steht ihr noch am Anfang eurer Reise. Wir unterstützen euch von der ersten Idee bis hin zum Markteintritt.',
    gruende: ACCELERATOR_KRITERIEN.filter((k) => !erfuellt(k, antworten))
      .map((k) => merkmalFuer(k.frage, antworten[k.frage]))
      .filter((merkmal): merkmal is string => merkmal !== undefined),
  };
}

export function antwortCodes(antworten: Antworten): string {
  return FRAGEN.map((f) => antworten[f.id])
    .filter((code): code is string => code !== undefined)
    .join('-');
}
