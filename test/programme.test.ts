import { describe, expect, it } from 'vitest';
import { PROGRAMME, buttonText, statusText, zielUrlFuer } from '../src/programme';

describe('programme.json', () => {
  it('enthält jedes Programm genau einmal', () => {
    expect(PROGRAMME.map((p) => p.id).sort()).toEqual(['goods', 'ifa', 'ifi']);
  });

  it.each(PROGRAMME)('$id hat gültigen Status und absolute URLs', (p) => {
    expect(['offen', 'vormerken', 'demnaechst']).toContain(p.status);
    expect(() => new URL(p.vormerkenUrl)).not.toThrow();
    if (p.status === 'offen') {
      expect(p.bewerbenUrl).not.toBeNull();
      expect(() => new URL(p.bewerbenUrl!)).not.toThrow();
    }
    if (p.frist !== null) {
      expect(p.frist).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe('Beschriftung je Status', () => {
  const inkubator = PROGRAMME.find((p) => p.id === 'ifi')!;

  it('offen: bewerben mit Frist', () => {
    const offen = { ...inkubator, status: 'offen' as const, frist: '2026-12-14' };
    expect(buttonText(offen)).toBe('Jetzt für den Inkubator bewerben');
    expect(statusText(offen)).toBe('Bewerbung offen bis 14.12.2026');
    expect(zielUrlFuer(offen)).toBe(offen.bewerbenUrl);
  });

  it('vormerken: vormerken statt bewerben', () => {
    const vormerken = { ...inkubator, status: 'vormerken' as const };
    expect(buttonText(vormerken)).toBe('Für den Inkubator vormerken');
    expect(zielUrlFuer(vormerken)).toBe(vormerken.vormerkenUrl);
  });
});
