import { describe, expect, it } from 'vitest';
import { mitHerkunft } from '../src/weiterleitung';

const HERKUNFT = { quelle: 'finder', empfehlung: 'ifa', gewaehlt: 'ifi', antworten: 'a2-b4-c3-d2' } as const;

describe('mitHerkunft', () => {
  it('hängt Herkunft, Empfehlung, Wahl und Antworten an', () => {
    const url = new URL(mitHerkunft('https://tool.example/start', HERKUNFT, 'https://impact-factory.de/bewerben'));
    expect(Object.fromEntries(url.searchParams)).toEqual({
      quelle: 'finder',
      empfehlung: 'ifa',
      gewaehlt: 'ifi',
      antworten: 'a2-b4-c3-d2',
    });
  });

  it('reicht utm-Parameter durch, aber keine anderen Seitenparameter', () => {
    const seite = 'https://impact-factory.de/bewerben?utm_source=linkedin&utm_campaign=batch16&email=a%40b.de&programm=ifa';
    const url = new URL(mitHerkunft('https://tool.example/', HERKUNFT, seite));
    expect(url.searchParams.get('utm_source')).toBe('linkedin');
    expect(url.searchParams.get('utm_campaign')).toBe('batch16');
    expect(url.searchParams.has('email')).toBe(false);
    expect(url.searchParams.has('programm')).toBe(false);
  });

  it('lässt antworten weg, wenn keine vorliegen', () => {
    const url = new URL(
      mitHerkunft('https://tool.example/', { ...HERKUNFT, quelle: 'programmseite', antworten: '' }, 'https://impact-factory.de/bewerben'),
    );
    expect(url.searchParams.has('antworten')).toBe(false);
    expect(url.searchParams.get('quelle')).toBe('programmseite');
  });

  it('behält Parameter, die schon in der Ziel-URL stehen', () => {
    const url = new URL(mitHerkunft('https://tool.example/?kohorte=16', HERKUNFT, 'https://impact-factory.de/bewerben'));
    expect(url.searchParams.get('kohorte')).toBe('16');
  });
});
