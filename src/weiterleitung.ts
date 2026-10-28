import type { ProgrammId } from './programme';

export type Quelle = 'finder' | 'direktwahl' | 'programmseite';

export interface Herkunft {
  readonly quelle: Quelle;
  readonly empfehlung: ProgrammId | null;
  readonly gewaehlt: ProgrammId;
  readonly antworten: string;
}

// Bewusst nur diese Felder und utm_*: keine personenbezogenen Daten in Links.
export function mitHerkunft(zielUrl: string, herkunft: Herkunft, seitenUrl: string): string {
  const ziel = new URL(zielUrl);
  ziel.searchParams.set('quelle', herkunft.quelle);
  if (herkunft.empfehlung) {
    ziel.searchParams.set('empfehlung', herkunft.empfehlung);
  }
  ziel.searchParams.set('gewaehlt', herkunft.gewaehlt);
  if (herkunft.antworten) {
    ziel.searchParams.set('antworten', herkunft.antworten);
  }
  new URL(seitenUrl).searchParams.forEach((wert, name) => {
    if (name.startsWith('utm_')) {
      ziel.searchParams.set(name, wert);
    }
  });
  return ziel.toString();
}
