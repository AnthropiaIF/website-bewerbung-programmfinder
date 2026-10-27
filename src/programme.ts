import daten from './programme.json';

export type ProgrammId = 'ifi' | 'ifa' | 'goods';
export type Status = 'offen' | 'vormerken' | 'demnaechst';

export interface Programm {
  readonly id: ProgrammId;
  readonly name: string;
  readonly nameAkkusativ: string;
  readonly status: Status;
  readonly frist: string | null;
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

export function statusText(p: Programm): string {
  switch (p.status) {
    case 'offen':
      return p.frist ? `Bewerbung offen bis ${datumDeutsch(p.frist)}` : 'Bewerbung offen';
    case 'vormerken':
      return 'Bewerbungsphase derzeit geschlossen, Vormerken möglich';
    case 'demnaechst':
      return 'Startet demnächst, Vormerken möglich';
  }
}

function datumDeutsch(isoDatum: string): string {
  const [jahr, monat, tag] = isoDatum.split('-');
  return `${tag}.${monat}.${jahr}`;
}
