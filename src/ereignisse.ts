// Der Finder lädt selbst kein Tracking. Existiert auf der Seite ein dataLayer (z. B. Tag Manager
// nach Einwilligung), landen die Ereignisse dort, sonst passiert nichts.

export type EreignisName =
  | 'finder_start'
  | 'finder_direktwahl'
  | 'finder_ergebnis'
  | 'finder_klick'
  | 'finder_anderes_programm';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function sendeEreignis(name: EreignisName, daten: Record<string, string | boolean> = {}): void {
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...daten });
  }
}
