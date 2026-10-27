import daten from './programme.json';

export type ProgrammId = 'ifi' | 'ifa' | 'goods';
export type Status = 'offen' | 'vormerken' | 'demnaechst';

// Offene Programme brauchen `frist`, alle anderen `start`, damit nie „geschlossen“ ohne Termin erscheint.
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

export function programm(id: ProgrammId): Programm {
  return PROGRAMME.find((p) => p.id === id)!;
}

export function zielUrlFuer(p: Programm): string {
  return p.status === 'offen' && p.bewerbenUrl ? p.bewerbenUrl : p.vormerkenUrl;
}

export function buttonText(p: Programm): string {
  return p.status === 'offen' ? `Jetzt für ${p.nameAkkusativ} bewerben` : `Für ${p.nameAkkusativ} vormerken`;
}

export function zeitraumText(p: Programm): string {
  if (p.status === 'offen') {
    return `Bewerbung für ${p.batch} offen bis einschließlich ${datumDeutsch(p.frist!)}.`;
  }
  return `Die Bewerbungsphase für ${p.batch} beginnt ${p.start}. Merkt euch jetzt den Start vor.`;
}

function datumDeutsch(isoDatum: string): string {
  const [jahr, monat, tag] = isoDatum.split('-');
  return `${tag}.${monat}.${jahr}`;
}
