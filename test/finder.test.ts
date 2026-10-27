// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { starteFinder } from '../src/finder';

let container: HTMLElement;

beforeEach(() => {
  document.head.innerHTML = '';
  document.body.innerHTML = '<div id="if-finder"><a href="/programm-inkubator">Fallback</a></div>';
  container = document.getElementById('if-finder')!;
  window.dataLayer = [];
});

function klicke(text: string): void {
  const knopf = [...container.querySelectorAll<HTMLElement>('button')].find((b) => b.textContent?.includes(text));
  if (!knopf) {
    throw new Error(`Kein Button mit „${text}“ in: ${container.textContent}`);
  }
  knopf.click();
}

function beantworteAlle(...antworten: string[]): void {
  antworten.forEach(klicke);
}

function titel(): string {
  return container.querySelector('.iff-titel')!.textContent!;
}

function programmname(): string {
  return container.querySelector('.iff-programmname')!.textContent!;
}

function hauptLink(): URL {
  return new URL(container.querySelector<HTMLAnchorElement>('.iff-button')!.href);
}

function ereignisse(): string[] {
  return (window.dataLayer as { event: string }[]).map((e) => e.event);
}

describe('Finder-Strecke', () => {
  it('ersetzt den Fallback und zeigt die erste Frage ohne Fokus zu stehlen', () => {
    starteFinder(container, 'https://impact-factory.de/bewerben');
    expect(container.textContent).not.toContain('Fallback');
    expect(titel()).toBe('Wie hoch ist euer Umsatz pro Jahr?');
    expect(container.textContent).toContain('Frage 1 von 4');
    expect(document.activeElement).toBe(document.body);
    expect(document.getElementById('iff-stil')).not.toBeNull();
  });

  it('führt über vier Fragen zur Accelerator-Empfehlung mit Herkunft im Link', () => {
    starteFinder(container, 'https://impact-factory.de/bewerben?utm_source=newsletter');
    beantworteAlle('Über 100.000 €', '3 bis 5 Personen', 'Mehr als 12 Monate', 'Etwas anderes');

    expect(titel()).toBe('Nach euren Angaben passt am besten: Accelerator');
    expect(programmname()).toBe('Accelerator');
    expect(container.querySelector('.iff-ergebnis')!.classList).toContain('iff-programm--ifa');
    expect(document.activeElement).toBe(container.querySelector('.iff-titel'));
    expect(container.querySelector('[aria-live]')!.textContent).toContain('Accelerator');

    const link = hauptLink();
    expect(link.searchParams.get('quelle')).toBe('finder');
    expect(link.searchParams.get('empfehlung')).toBe('ifa');
    expect(link.searchParams.get('gewaehlt')).toBe('ifa');
    expect(link.searchParams.get('antworten')).toBe('a5-b3-c3-d2');
    expect(link.searchParams.get('utm_source')).toBe('newsletter');
    expect(ereignisse()).toEqual(['finder_start', 'finder_ergebnis']);
  });

  it('empfiehlt den Inkubator und zeigt, welche Kriterien fehlen', () => {
    starteFinder(container, 'https://impact-factory.de/bewerben');
    beantworteAlle('Bis 10.000 €', '3 bis 5 Personen', '6 bis 12 Monate', 'Etwas anderes');

    expect(programmname()).toBe('Inkubator');
    expect(container.querySelectorAll('.iff-nicht-erfuellt')).toHaveLength(1);
    expect(container.querySelectorAll('.iff-erfuellt')).toHaveLength(2);
    expect(hauptLink().searchParams.get('antworten')).toBe('a2-b3-c2-d2');
  });

  it('empfiehlt Goods erst am Ende und nur mit Umsatz', () => {
    starteFinder(container, 'https://impact-factory.de/bewerben');
    beantworteAlle('Bis 10.000 €', 'Ich gründe allein', 'Nicht relevant', 'Ein physisches Produkt');
    expect(programmname()).toBe('Goods');
    expect(hauptLink().searchParams.get('antworten')).toBe('a2-b1-c4-d1');
  });

  it('kann zurückgehen und behält die gewählte Antwort markiert', () => {
    starteFinder(container, 'https://impact-factory.de/bewerben');
    klicke('Noch keine Umsätze');
    klicke('Zurück');

    expect(titel()).toBe('Wie hoch ist euer Umsatz pro Jahr?');
    const markiert = container.querySelector('[aria-pressed="true"]');
    expect(markiert?.textContent).toBe('Noch keine Umsätze');
  });

  it('kann vom Ergebnis zurück zu den Antworten', () => {
    starteFinder(container, 'https://impact-factory.de/bewerben');
    beantworteAlle('Bis 10.000 €', 'Zu zweit', '6 bis 12 Monate', 'Etwas anderes');
    klicke('Antworten ändern');
    expect(titel()).toBe('Was entwickelt ihr?');
  });

  it('bietet andere Programme an und markiert sie im Link als abweichende Wahl', () => {
    starteFinder(container, 'https://impact-factory.de/bewerben');
    beantworteAlle('Bis 10.000 €', 'Zu zweit', '6 bis 12 Monate', 'Ein physisches Produkt');
    const liste = container.querySelector<HTMLElement>('#iff-alternativen')!;
    expect(liste.hidden).toBe(true);

    klicke('anderes Programm');
    expect(liste.hidden).toBe(false);

    const links = [...liste.querySelectorAll<HTMLAnchorElement>('a')];
    expect(links.map((a) => a.textContent)).toEqual([
      'Jetzt für den Inkubator bewerben→',
      'Für den Accelerator vormerken→',
    ]);
    const inkubator = new URL(links[0]!.href);
    expect(inkubator.searchParams.get('empfehlung')).toBe('goods');
    expect(inkubator.searchParams.get('gewaehlt')).toBe('ifi');

    links[0]!.addEventListener('click', (e) => e.preventDefault());
    links[0]!.click();
    expect(window.dataLayer).toContainEqual({ event: 'finder_klick', programm: 'ifi', empfohlen: false });
    expect(ereignisse()).toContain('finder_anderes_programm');
  });
});

describe('Direkteinstieg von einer Programmseite', () => {
  it('zeigt bei ?programm=ifa direkt das Ergebnis ohne Antworten im Link', () => {
    starteFinder(container, 'https://impact-factory.de/bewerben?programm=ifa');
    expect(titel()).toBe('Euer gewähltes Programm: Accelerator');
    const link = hauptLink();
    expect(link.searchParams.get('quelle')).toBe('programmseite');
    expect(link.searchParams.get('gewaehlt')).toBe('ifa');
    expect(link.searchParams.has('antworten')).toBe(false);
  });

  it('kann von dort in die Fragen wechseln', () => {
    starteFinder(container, 'https://impact-factory.de/bewerben?programm=ifa');
    klicke('passende Programm finden');
    expect(titel()).toBe('Wie hoch ist euer Umsatz pro Jahr?');
  });

  it('ignoriert unbekannte Programme und startet die Fragen', () => {
    starteFinder(container, 'https://impact-factory.de/bewerben?programm=xyz');
    expect(titel()).toBe('Wie hoch ist euer Umsatz pro Jahr?');
  });
});

describe('ohne dataLayer', () => {
  it('läuft ohne Fehler', () => {
    delete window.dataLayer;
    starteFinder(container, 'https://impact-factory.de/bewerben');
    expect(() => klicke('Noch keine Umsätze')).not.toThrow();
  });
});
