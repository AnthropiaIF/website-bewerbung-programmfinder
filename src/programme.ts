import daten from './programme.json';
import { fuelle, type Texte } from './texte';

export type ProgrammId = 'ifi' | 'ifa' | 'goods';
export type Status = 'offen' | 'vormerken' | 'demnaechst';

export interface Programm {
  readonly id: ProgrammId;
  readonly name: string;
  readonly nameAkkusativ: string;
  readonly beschreibung: string;
  readonly batch: string;
  readonly status: Status;
  readonly frist: string | null;
  readonly start: string | null;
  readonly bewerbenUrl: string | null;
  readonly vormerkenUrl: string;
}

export const PROGRAMME = daten.programme as readonly Programm[];

export function istProgrammId(wert: string | null): wert is ProgrammId {
  return PROGRAMME.some((p) => p.id === wert);
}

export function zielUrlFuer(p: Programm): string {
  return p.status === 'offen' && p.bewerbenUrl ? p.bewerbenUrl : p.vormerkenUrl;
}

export function buttonText(p: Programm, texte: Texte): string {
  return fuelle(p.status === 'offen' ? texte.buttonBewerben : texte.buttonVormerken, { programm: p.nameAkkusativ });
}

// Rückfalltexte, falls im Embed eine Frist oder ein Start fehlt: nie „geschlossen“ ohne Hinweis.
export function zeitraumText(p: Programm, texte: Texte): string {
  if (p.status === 'offen') {
    return p.frist
      ? fuelle(texte.zeitraumOffen, { batch: p.batch, frist: datumDeutsch(p.frist) })
      : fuelle(texte.zeitraumOffenOhneFrist, { batch: p.batch });
  }
  return p.start
    ? fuelle(texte.zeitraumVormerken, { batch: p.batch, start: p.start })
    : fuelle(texte.zeitraumVormerkenOhneStart, { batch: p.batch });
}

function datumDeutsch(isoDatum: string): string {
  const [jahr, monat, tag] = isoDatum.split('-');
  return `${tag}.${monat}.${jahr}`;
}
