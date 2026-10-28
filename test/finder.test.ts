// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { starteFinder } from '../src/finder';

const SEITE = 'https://impact-factory.de/bewerben';

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

function starteFragen(seitenUrl = SEITE): void {
  starteFinder(container, seitenUrl);
  klicke('Wir sind uns noch unsicher');
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

function gruende(): string[] {
  return [...container.querySelectorAll('.iff-gruende li')].map((li) => li.textContent!.replace('✓', ''));
}

function zeitraum(): string {
  return container.querySelector('.iff-ergebnis .iff-zeitraum')!.textContent!;
}

function hauptLink(): URL {
  return new URL(container.querySelector<HTMLAnchorElement>('.iff-button')!.href);
}

function ereignisse(): string[] {
  return (window.dataLayer as { event: string }[]).map((e) => e.event);
}

describe('Erstansicht', () => {
  it('ersetzt den Fallback und bietet zwei Wege an, ohne Fokus zu stehlen', () => {
    starteFinder(container, SEITE);
    expect(container.textContent).not.toContain('Fallback');
    expect(titel()).toBe('Wie wollt ihr starten?');
    expect(container.querySelectorAll('.iff-weg')).toHaveLength(2);
    expect(document.activeElement).toBe(document.body);
    expect(document.getElementById('iff-stil')).not.toBeNull();
    expect(ereignisse()).toEqual([]);
  });

  it('führt links in die Fragen und von Frage 1 zurück zur Auswahl', () => {
    starteFragen();
    expect(titel()).toBe('Habt ihr schon gegründet?');
    expect(container.textContent).toContain('Frage 1 von 5');
    klicke('Zurück zur Auswahl');
    expect(titel()).toBe('Wie wollt ihr starten?');
  });
});

describe('Direktwahl', () => {
  it('zeigt alle drei Programme mit Zeitraum und Link ohne Empfehlung', () => {
    starteFinder(container, `${SEITE}?utm_source=newsletter`);
    klicke('Wir wissen schon, wohin');

    expect(titel()).toBe('Für welches Programm wollt ihr euch bewerben?');
    const karten = [...container.querySelectorAll('.iff-karte')];
    expect(karten).toHaveLength(3);
    expect(karten.every((k) => k.querySelector('.iff-zeitraum'))).toBe(true);
    expect(ereignisse()).toEqual(['finder_direktwahl']);

    const link = new URL(karten[0]!.querySelector<HTMLAnchorElement>('a')!.href);
    expect(link.searchParams.get('quelle')).toBe('direktwahl');
    expect(link.searchParams.get('gewaehlt')).toBe('ifi');
    expect(link.searchParams.has('empfehlung')).toBe(false);
    expect(link.searchParams.has('antworten')).toBe(false);
    expect(link.searchParams.get('utm_source')).toBe('newsletter');
  });

  it('kann zurück zur Auswahl und von dort in die Fragen', () => {
    starteFinder(container, SEITE);
    klicke('Wir wissen schon, wohin');
    klicke('Zurück zur Auswahl');
    klicke('Wir sind uns noch unsicher');
    expect(titel()).toBe('Habt ihr schon gegründet?');
    klicke('Ja, wir haben');
    expect(titel()).toBe('Wie hoch ist euer Umsatz pro Jahr?');
  });
});

describe('Finder-Strecke', () => {
  it('führt zur Accelerator-Empfehlung mit Kriterien, Zeitraum und Herkunft im Link', () => {
    starteFragen(`${SEITE}?utm_source=newsletter`);
    beantworteAlle('Ja, wir haben', 'Über 100.000 €', '3 bis 5 Personen', 'Mehr als 12 Monate', 'Etwas anderes');

    expect(titel()).toBe('Nach euren Angaben passt am besten: Accelerator');
    expect(programmname()).toBe('Accelerator');
    expect(container.querySelector('.iff-ergebnis')!.classList).toContain('iff-programm--ifa');
    expect(gruende()).toContain('Team ab 3 Personen');
    expect(zeitraum()).toBe('Die Bewerbungsphase für Batch 3 beginnt im Dezember oder Januar. Merkt euch jetzt den Start vor.');
    expect(document.activeElement).toBe(container.querySelector('.iff-titel'));
    expect(container.querySelector('[aria-live]')!.textContent).toContain('Accelerator');

    const link = hauptLink();
    expect(link.searchParams.get('quelle')).toBe('finder');
    expect(link.searchParams.get('empfehlung')).toBe('ifa');
    expect(link.searchParams.get('gewaehlt')).toBe('ifa');
    expect(link.searchParams.get('antworten')).toBe('a1-b5-c3-d3-e2');
    expect(link.searchParams.get('utm_source')).toBe('newsletter');
    expect(ereignisse()).toEqual(['finder_start', 'finder_ergebnis']);
  });

  it('empfiehlt den Inkubator und zeigt die Angaben, die dafür sprechen', () => {
    starteFragen();
    beantworteAlle('Nein, noch nicht', 'Noch keine Umsätze', 'Ich gründe allein', 'Nicht relevant', 'Etwas anderes');

    expect(programmname()).toBe('Inkubator');
    expect(container.querySelector('.iff-intro')!.textContent).toContain('am Anfang eurer Reise');
    expect(gruende()).toEqual(['Noch nicht gegründet', 'Noch keine Umsätze', 'Solo-Gründung', 'Noch keine laufenden Kosten']);
    expect(zeitraum()).toBe('Bewerbung für Batch 16 offen bis einschließlich 14.12.2026.');
    expect(hauptLink().searchParams.get('antworten')).toBe('a2-b1-c1-d4-e2');
  });

  it('empfiehlt Goods bei Gründung, Produkt und ersten Umsätzen', () => {
    starteFragen();
    beantworteAlle('Ja, wir haben', 'Bis 10.000 €', 'Ich gründe allein', 'Nicht relevant', 'Ein physisches Produkt');
    expect(programmname()).toBe('Goods');
    expect(zeitraum()).toContain('im ersten Halbjahr 2027');
  });

  it('kann zurückgehen und behält die gewählte Antwort markiert', () => {
    starteFragen();
    klicke('Ja, wir haben');
    klicke('Noch keine Umsätze');
    klicke('Zurück');

    expect(titel()).toBe('Wie hoch ist euer Umsatz pro Jahr?');
    const markiert = container.querySelector('[aria-pressed="true"]');
    expect(markiert?.textContent).toBe('Noch keine Umsätze');
  });

  it('kann vom Ergebnis zurück zu den Antworten', () => {
    starteFragen();
    beantworteAlle('Ja, wir haben', 'Bis 10.000 €', 'Zu zweit', '6 bis 12 Monate', 'Etwas anderes');
    klicke('Antworten ändern');
    expect(titel()).toBe('Was entwickelt ihr?');
  });

  it('bietet andere Programme mit Zeitraum an und markiert sie im Link als abweichende Wahl', () => {
    starteFragen();
    beantworteAlle('Ja, wir haben', 'Bis 10.000 €', 'Zu zweit', '6 bis 12 Monate', 'Ein physisches Produkt');
    const liste = container.querySelector<HTMLElement>('#iff-alternativen')!;
    expect(liste.hidden).toBe(true);

    klicke('anderes Programm');
    expect(liste.hidden).toBe(false);
    expect(liste.querySelectorAll('.iff-zeitraum')).toHaveLength(2);

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
    expect(window.dataLayer).toContainEqual({ event: 'finder_klick', programm: 'ifi', quelle: 'finder', empfohlen: false });
    expect(ereignisse()).toContain('finder_anderes_programm');
  });
});

describe('Direkteinstieg von einer Programmseite', () => {
  it('zeigt bei ?programm=ifa direkt das Ergebnis mit Beschreibung, ohne Gründe und Antworten', () => {
    starteFinder(container, `${SEITE}?programm=ifa`);
    expect(titel()).toBe('Euer gewähltes Programm: Accelerator');
    expect(container.querySelector('.iff-intro')!.textContent).toContain('skalieren');
    expect(gruende()).toEqual([]);
    const link = hauptLink();
    expect(link.searchParams.get('quelle')).toBe('programmseite');
    expect(link.searchParams.get('gewaehlt')).toBe('ifa');
    expect(link.searchParams.has('antworten')).toBe(false);
  });

  it('kann von dort in die Fragen wechseln', () => {
    starteFinder(container, `${SEITE}?programm=ifa`);
    klicke('passende Programm finden');
    expect(titel()).toBe('Habt ihr schon gegründet?');
  });

  it('ignoriert unbekannte Programme und zeigt die Erstansicht', () => {
    starteFinder(container, `${SEITE}?programm=xyz`);
    expect(titel()).toBe('Wie wollt ihr starten?');
  });
});

describe('ohne dataLayer', () => {
  it('läuft ohne Fehler', () => {
    delete window.dataLayer;
    starteFinder(container, SEITE);
    expect(() => klicke('Wir wissen schon, wohin')).not.toThrow();
  });
});
