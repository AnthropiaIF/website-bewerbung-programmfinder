import { describe, expect, it } from 'vitest';
import { FRAGEN, type FrageId } from '../src/fragen';
import { antwortCodes, empfehle, type Antworten } from '../src/regeln';

function codes(id: FrageId): string[] {
  return FRAGEN.find((f) => f.id === id)!.optionen.map((o) => o.code);
}

const ACCELERATOR_REIF = { umsatz: ['a3', 'a4', 'a5'], team: ['b3', 'b4'], runway: ['c2', 'c3'] };
const MIT_UMSATZ = ['a2', 'a3', 'a4', 'a5'];

const ALLE_KOMBINATIONEN = codes('umsatz').flatMap((umsatz) =>
  codes('team').flatMap((team) =>
    codes('runway').flatMap((runway) => codes('angebot').map((angebot) => ({ umsatz, team, runway, angebot }))),
  ),
);

function erwartetesProgramm({ umsatz, team, runway, angebot }: Required<Antworten>): string {
  if (angebot === 'd1' && MIT_UMSATZ.includes(umsatz)) {
    return 'goods';
  }
  const reif =
    ACCELERATOR_REIF.umsatz.includes(umsatz) &&
    ACCELERATOR_REIF.team.includes(team) &&
    ACCELERATOR_REIF.runway.includes(runway);
  return reif ? 'ifa' : 'ifi';
}

describe('empfehle: alle Antwortkombinationen', () => {
  it('deckt alle 160 Kombinationen ab', () => {
    expect(ALLE_KOMBINATIONEN).toHaveLength(160);
  });

  it.each(ALLE_KOMBINATIONEN)(
    'umsatz=$umsatz team=$team runway=$runway angebot=$angebot',
    (antworten) => {
      expect(empfehle(antworten).programm).toBe(erwartetesProgramm(antworten));
    },
  );
});

describe('empfehle: Goods', () => {
  it('empfiehlt Goods bei Produkt und Umsatz, auch solo und ohne Runway', () => {
    const empfehlung = empfehle({ umsatz: 'a2', team: 'b1', runway: 'c4', angebot: 'd1' });
    expect(empfehlung.programm).toBe('goods');
    expect(empfehlung.kriterien.every((k) => k.erfuellt)).toBe(true);
  });

  it('hat Vorrang vor dem Accelerator', () => {
    expect(empfehle({ umsatz: 'a5', team: 'b4', runway: 'c3', angebot: 'd1' }).programm).toBe('goods');
  });

  it('schließt Produkte ohne Umsatz aus und nennt Goods als nächsten Schritt', () => {
    const empfehlung = empfehle({ umsatz: 'a1', team: 'b3', runway: 'c3', angebot: 'd1' });
    expect(empfehlung.programm).toBe('ifi');
    expect(empfehlung.begruendung).toContain('Goods');
  });
});

describe('empfehle: Kriterien für die Begründung', () => {
  it('zeigt beim Inkubator, welche Accelerator-Kriterien fehlen', () => {
    const empfehlung = empfehle({ umsatz: 'a2', team: 'b3', runway: 'c2', angebot: 'd2' });
    expect(empfehlung.programm).toBe('ifi');
    expect(empfehlung.kriterien.map((k) => k.erfuellt)).toEqual([false, true, true]);
    expect(empfehlung.begruendung).not.toContain('Goods');
  });
});

describe('antwortCodes', () => {
  it('verbindet die Codes in Fragenreihenfolge', () => {
    const antworten: Antworten = { angebot: 'd2', runway: 'c2', team: 'b3', umsatz: 'a4' };
    expect(antwortCodes(antworten)).toBe('a4-b3-c2-d2');
  });
});

describe('Antwort-Codes', () => {
  it('sind über alle Fragen eindeutig', () => {
    const alle = FRAGEN.flatMap((f) => f.optionen.map((o) => o.code));
    expect(new Set(alle).size).toBe(alle.length);
  });
});
