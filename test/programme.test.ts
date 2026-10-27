import { describe, expect, it } from 'vitest';
import { PROGRAMME, buttonText, zeitraumText, zielUrlFuer } from '../src/programme';

describe('programme.json', () => {
  it('enthält jedes Programm genau einmal', () => {
    expect(PROGRAMME.map((p) => p.id).sort()).toEqual(['goods', 'ifa', 'ifi']);
  });

  it.each(PROGRAMME)('$id hat gültigen Status, absolute URLs und einen Zeitraum', (p) => {
    expect(['offen', 'vormerken', 'demnaechst']).toContain(p.status);
    expect(() => new URL(p.vormerkenUrl)).not.toThrow();
    expect(p.batch).not.toBe('');
    expect(p.beschreibung).not.toBe('');
    if (p.status === 'offen') {
      expect(p.bewerbenUrl).not.toBeNull();
      expect(() => new URL(p.bewerbenUrl!)).not.toThrow();
      expect(p.frist).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    } else {
      expect(p.start).toBeTruthy();
    }
  });
});

describe('Beschriftung je Status', () => {
  const inkubator = PROGRAMME.find((p) => p.id === 'ifi')!;

  it('offen: bewerben mit Frist', () => {
    const offen = { ...inkubator, status: 'offen' as const, batch: 'Batch 16', frist: '2026-12-14' };
    expect(buttonText(offen)).toBe('Jetzt für den Inkubator bewerben');
    expect(zeitraumText(offen)).toBe('Bewerbung für Batch 16 offen bis einschließlich 14.12.2026.');
    expect(zielUrlFuer(offen)).toBe(offen.bewerbenUrl);
  });

  it('vormerken: vormerken mit Starttermin', () => {
    const vormerken = { ...inkubator, status: 'vormerken' as const, batch: 'Batch 17', start: 'im Mai' };
    expect(buttonText(vormerken)).toBe('Für den Inkubator vormerken');
    expect(zeitraumText(vormerken)).toBe('Die Bewerbungsphase für Batch 17 beginnt im Mai. Merkt euch jetzt den Start vor.');
    expect(zielUrlFuer(vormerken)).toBe(vormerken.vormerkenUrl);
  });
});
