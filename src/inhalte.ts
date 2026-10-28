// Inhalte aus dem Webflow-Embed (<script type="application/json" id="if-finder-inhalte">) über die
// Standardwerte legen. Das JSON pflegen Menschen von Hand: jeder Wert wird geprüft, Ungültiges und
// Unbekanntes wird mit Warnung in der Konsole ignoriert, damit ein Tippfehler den Finder nicht lahmlegt.

import { FRAGEN, type Frage } from './fragen';
import { PROGRAMME, type Programm } from './programme';
import { TEXTE, type Texte } from './texte';

export interface Inhalte {
  readonly programme: readonly Programm[];
  readonly fragen: readonly Frage[];
  readonly texte: Texte;
}

export const STANDARD_INHALTE: Inhalte = { programme: PROGRAMME, fragen: FRAGEN, texte: TEXTE };

export const INHALTE_ID = 'if-finder-inhalte';

export type Warnung = (meldung: string) => void;

type Objekt = Record<string, unknown>;
type Pruefer = (wert: unknown) => boolean;

const istObjekt = (wert: unknown): wert is Objekt => typeof wert === 'object' && wert !== null && !Array.isArray(wert);
const istText: Pruefer = (wert) => typeof wert === 'string' && wert.trim() !== '';
const istDatum: Pruefer = (wert) => typeof wert === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(wert);
const istStatus: Pruefer = (wert) => wert === 'offen' || wert === 'vormerken' || wert === 'demnaechst';

function istWebadresse(wert: unknown): boolean {
  if (typeof wert !== 'string') {
    return false;
  }
  try {
    const url = new URL(wert);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

const PROGRAMM_FELDER: Record<string, Pruefer> = {
  name: istText,
  nameAkkusativ: istText,
  beschreibung: istText,
  batch: istText,
  status: istStatus,
  frist: istDatum,
  start: istText,
  bewerbenUrl: istWebadresse,
  vormerkenUrl: istWebadresse,
};
const FRAGE_FELDER: Record<string, Pruefer> = { text: istText, hinweis: istText };
const OPTION_FELDER: Record<string, Pruefer> = { label: istText, unterzeile: istText, merkmal: istText };
const TEXT_FELDER: Record<string, Pruefer> = Object.fromEntries(Object.keys(TEXTE).map((schluessel) => [schluessel, istText]));
const BEREICHE = ['programme', 'texte', 'fragen', 'optionen'];

function bereich(roh: Objekt, name: string, warne: Warnung): Objekt {
  const wert = roh[name];
  if (wert === undefined) {
    return {};
  }
  if (!istObjekt(wert)) {
    warne(`„${name}“ muss ein Objekt sein und wird ignoriert.`);
    return {};
  }
  return wert;
}

function warneUnbekannte(roh: Objekt, bekannte: readonly string[], ort: string, warne: Warnung): void {
  for (const schluessel of Object.keys(roh)) {
    if (!bekannte.includes(schluessel)) {
      warne(`${ort}: unbekannter Eintrag „${schluessel}“ wird ignoriert.`);
    }
  }
}

function ueberschreibe<T extends object>(
  basis: T,
  roh: unknown,
  felder: Record<string, Pruefer>,
  ort: string,
  warne: Warnung,
): T {
  if (roh === undefined) {
    return basis;
  }
  if (!istObjekt(roh)) {
    warne(`${ort}: muss ein Objekt sein und wird ignoriert.`);
    return basis;
  }
  const ergebnis = { ...basis } as Objekt;
  for (const [feld, wert] of Object.entries(roh)) {
    const pruefe = felder[feld];
    if (!pruefe) {
      warne(`${ort}: unbekanntes Feld „${feld}“ wird ignoriert.`);
    } else if (!pruefe(wert)) {
      warne(`${ort}: ungültiger Wert für „${feld}“ wird ignoriert.`);
    } else {
      ergebnis[feld] = wert;
    }
  }
  return ergebnis as T;
}

function pruefeZeitraum(p: Programm, warne: Warnung): void {
  if (p.status === 'offen' && !p.frist) {
    warne(`programme.${p.id}: Status „offen“ ohne „frist“, es erscheint kein Bewerbungsschluss.`);
  }
  if (p.status !== 'offen' && !p.start) {
    warne(`programme.${p.id}: Status „${p.status}“ ohne „start“, es erscheint kein Starttermin.`);
  }
}

export function ladeInhalte(roh: unknown, warne: Warnung): Inhalte {
  if (!istObjekt(roh)) {
    warne('Die Inhalte müssen ein JSON-Objekt sein, es gelten die Standardwerte.');
    return STANDARD_INHALTE;
  }
  warneUnbekannte(roh, BEREICHE, 'Inhalte', warne);

  const programmeRoh = bereich(roh, 'programme', warne);
  const fragenRoh = bereich(roh, 'fragen', warne);
  const optionenRoh = bereich(roh, 'optionen', warne);
  warneUnbekannte(programmeRoh, PROGRAMME.map((p) => p.id), 'programme', warne);
  warneUnbekannte(fragenRoh, FRAGEN.map((f) => f.id), 'fragen', warne);
  warneUnbekannte(optionenRoh, FRAGEN.flatMap((f) => f.optionen.map((o) => o.code)), 'optionen', warne);

  const programme = PROGRAMME.map((p) =>
    ueberschreibe(p, programmeRoh[p.id], PROGRAMM_FELDER, `programme.${p.id}`, warne),
  );
  programme.forEach((p) => pruefeZeitraum(p, warne));

  return {
    programme,
    fragen: FRAGEN.map((f) => ({
      ...ueberschreibe(f, fragenRoh[f.id], FRAGE_FELDER, `fragen.${f.id}`, warne),
      optionen: f.optionen.map((o) => ueberschreibe(o, optionenRoh[o.code], OPTION_FELDER, `optionen.${o.code}`, warne)),
    })),
    texte: ueberschreibe(TEXTE, roh.texte, TEXT_FELDER, 'texte', warne),
  };
}

export function inhalteAusDokument(dokument: Document, warne: Warnung): Inhalte {
  const block = dokument.getElementById(INHALTE_ID);
  if (!block) {
    return STANDARD_INHALTE;
  }
  let roh: unknown;
  try {
    roh = JSON.parse(block.textContent ?? '');
  } catch {
    warne('Die Inhalte sind kein gültiges JSON, es gelten die Standardwerte.');
    return STANDARD_INHALTE;
  }
  return ladeInhalte(roh, warne);
}
