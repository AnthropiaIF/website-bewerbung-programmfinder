import { describe, expect, it } from 'vitest';
import { FRAGEN, type FrageId } from '../src/fragen';
import { STANDARD_INHALTE } from '../src/inhalte';
import { antwortCodes, empfehle as empfehleMit, type Antworten } from '../src/regeln';

const empfehle = (antworten: Antworten) => empfehleMit(antworten, STANDARD_INHALTE);

function codes(id: FrageId): string[] {
  return FRAGEN.find((f) => f.id === id)!.optionen.map((o) => o.code);
}

const REIF = { umsatz: ['b2', 'b3', 'b4', 'b5'], team: ['c3', 'c4'], runway: ['d2', 'd3'] };
const MIT_UMSATZ = ['b2', 'b3', 'b4', 'b5'];

const ALLE_KOMBINATIONEN = codes('gegruendet').flatMap((gegruendet) =>
  codes('umsatz').flatMap((umsatz) =>
    codes('team').flatMap((team) =>
      codes('runway').flatMap((runway) =>
        codes('angebot').map((angebot) => ({ gegruendet, umsatz, team, runway, angebot })),
      ),
    ),
  ),
);

function erwartetesProgramm({ gegruendet, umsatz, team, runway, angebot }: Required<Antworten>): string {
  if (gegruendet !== 'a1') {
    return 'ifi';
  }
  if (angebot === 'e1' && MIT_UMSATZ.includes(umsatz)) {
    return 'goods';
  }
  const reif = REIF.umsatz.includes(umsatz) && REIF.team.includes(team) && REIF.runway.includes(runway);
  return reif ? 'ifa' : 'ifi';
}

describe('empfehle: alle Antwortkombinationen', () => {
  it('deckt alle 320 Kombinationen ab', () => {
    expect(ALLE_KOMBINATIONEN).toHaveLength(320);
  });

  it.each(ALLE_KOMBINATIONEN)(
    'gegruendet=$gegruendet umsatz=$umsatz team=$team runway=$runway angebot=$angebot',
    (antworten) => {
      const empfehlung = empfehle(antworten);
      expect(empfehlung.programm).toBe(erwartetesProgramm(antworten));
      expect(empfehlung.gruende.length).toBeGreaterThan(0);
    },
  );
});

describe('empfehle: Gründe sprechen immer für das empfohlene Programm', () => {
  it('Inkubator: nennt die Angaben, die für den Anfang sprechen', () => {
    const empfehlung = empfehle({ gegruendet: 'a2', umsatz: 'b1', team: 'c1', runway: 'd4', angebot: 'e2' });
    expect(empfehlung.programm).toBe('ifi');
    expect(empfehlung.intro).toContain('am Anfang');
    expect(empfehlung.gruende).toEqual([
      'Noch nicht gegründet',
      'Noch keine Umsätze',
      'Solo-Gründung',
      'Noch keine laufenden Kosten',
    ]);
  });

  it('Inkubator: lässt Angaben weg, die schon für den Accelerator reichen', () => {
    const empfehlung = empfehle({ gegruendet: 'a1', umsatz: 'b4', team: 'c2', runway: 'd3', angebot: 'e2' });
    expect(empfehlung.gruende).toEqual(['Team zu zweit']);
  });

  it('Accelerator: nennt die erfüllten Kriterien', () => {
    const empfehlung = empfehle({ gegruendet: 'a1', umsatz: 'b5', team: 'c3', runway: 'd2', angebot: 'e2' });
    expect(empfehlung.programm).toBe('ifa');
    expect(empfehlung.intro).toContain('skalieren');
    expect(empfehlung.gruende).toEqual([
      'Bereits gegründet',
      'Erste Umsätze',
      'Team ab 3 Personen',
      'Runway von mindestens 6 Monaten',
    ]);
  });

  it('Goods: auch solo und ohne Runway, mit Vorrang vor dem Accelerator', () => {
    expect(empfehle({ gegruendet: 'a1', umsatz: 'b2', team: 'c1', runway: 'd4', angebot: 'e1' }).programm).toBe('goods');
    expect(empfehle({ gegruendet: 'a1', umsatz: 'b5', team: 'c4', runway: 'd3', angebot: 'e1' }).programm).toBe('goods');
  });

  it('Goods und Accelerator setzen eine Gründung voraus', () => {
    expect(empfehle({ gegruendet: 'a2', umsatz: 'b5', team: 'c4', runway: 'd3', angebot: 'e1' }).programm).toBe('ifi');
    expect(empfehle({ gegruendet: 'a2', umsatz: 'b5', team: 'c4', runway: 'd3', angebot: 'e2' }).programm).toBe('ifi');
  });
});

describe('antwortCodes', () => {
  it('verbindet die Codes in Fragenreihenfolge', () => {
    const antworten: Antworten = { angebot: 'e2', runway: 'd2', team: 'c3', umsatz: 'b4', gegruendet: 'a1' };
    expect(antwortCodes(antworten)).toBe('a1-b4-c3-d2-e2');
  });
});

describe('Fragen', () => {
  it('haben über alle Fragen eindeutige Codes', () => {
    const alle = FRAGEN.flatMap((f) => f.optionen.map((o) => o.code));
    expect(new Set(alle).size).toBe(alle.length);
  });

  it('haben ein Merkmal für jede Antwort, die als Grund erscheinen kann', () => {
    const relevant = FRAGEN.filter((f) => f.id !== 'angebot').flatMap((f) => f.optionen);
    expect(relevant.every((o) => o.merkmal)).toBe(true);
  });
});
