import { describe, expect, it } from 'vitest';
import { FRAGEN, type FrageId } from '../src/fragen';
import { antwortCodes, empfehle, fragenFuer, istVollstaendig, type Antworten } from '../src/regeln';

function codes(id: FrageId): string[] {
  return FRAGEN.find((f) => f.id === id)!.optionen.map((o) => o.code);
}

const REIF = { umsatz: ['b3', 'b4', 'b5'], team: ['c3', 'c4'], runway: ['d2', 'd3'] };

describe('empfehle: alle Antwortkombinationen ohne Konsumprodukt', () => {
  const kombinationen = codes('umsatz').flatMap((umsatz) =>
    codes('team').flatMap((team) => codes('runway').map((runway) => ({ umsatz, team, runway }))),
  );

  it('deckt alle 80 Kombinationen ab', () => {
    expect(kombinationen).toHaveLength(80);
  });

  it.each(kombinationen)('umsatz=$umsatz team=$team runway=$runway', ({ umsatz, team, runway }) => {
    const empfehlung = empfehle({ angebot: 'a2', umsatz, team, runway });
    const erfuellt = [
      REIF.umsatz.includes(umsatz),
      REIF.team.includes(team),
      REIF.runway.includes(runway),
    ];

    expect(empfehlung.programm).toBe(erfuellt.every(Boolean) ? 'ifa' : 'ifi');
    expect(empfehlung.kriterien.map((k) => k.erfuellt)).toEqual(erfuellt);
  });
});

describe('empfehle: Konsumprodukt', () => {
  it('empfiehlt Goods ohne weitere Kriterien', () => {
    const empfehlung = empfehle({ angebot: 'a1' });
    expect(empfehlung.programm).toBe('goods');
    expect(empfehlung.kriterien).toEqual([]);
  });

  it('empfiehlt Goods auch bei veralteten Antworten auf Reife-Fragen', () => {
    expect(empfehle({ angebot: 'a1', umsatz: 'b5', team: 'c4', runway: 'd3' }).programm).toBe('goods');
  });
});

describe('fragenFuer und istVollstaendig', () => {
  it('fragt bei Konsumprodukt nur die erste Frage', () => {
    expect(fragenFuer({ angebot: 'a1' }).map((f) => f.id)).toEqual(['angebot']);
    expect(istVollstaendig({ angebot: 'a1' })).toBe(true);
  });

  it('fragt sonst alle vier Fragen', () => {
    expect(fragenFuer({}).map((f) => f.id)).toEqual(['angebot', 'umsatz', 'team', 'runway']);
    expect(istVollstaendig({ angebot: 'a2', umsatz: 'b1', team: 'c1' })).toBe(false);
    expect(istVollstaendig({ angebot: 'a2', umsatz: 'b1', team: 'c1', runway: 'd1' })).toBe(true);
  });
});

describe('antwortCodes', () => {
  it('verbindet die Codes in Fragenreihenfolge', () => {
    const antworten: Antworten = { runway: 'd2', angebot: 'a2', team: 'c3', umsatz: 'b4' };
    expect(antwortCodes(antworten)).toBe('a2-b4-c3-d2');
  });

  it('lässt veraltete Antworten bei Konsumprodukt weg', () => {
    expect(antwortCodes({ angebot: 'a1', umsatz: 'b4' })).toBe('a1');
  });
});

describe('Antwort-Codes', () => {
  it('sind über alle Fragen eindeutig', () => {
    const alle = FRAGEN.flatMap((f) => f.optionen.map((o) => o.code));
    expect(new Set(alle).size).toBe(alle.length);
  });
});
