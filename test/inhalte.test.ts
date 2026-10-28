// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { INHALTE_ID, STANDARD_INHALTE, inhalteAusDokument, ladeInhalte } from '../src/inhalte';

function lade(roh: unknown): { inhalte: ReturnType<typeof ladeInhalte>; warnungen: string[] } {
  const warnungen: string[] = [];
  const inhalte = ladeInhalte(roh, (meldung) => warnungen.push(meldung));
  return { inhalte, warnungen };
}

const programm = (inhalte: ReturnType<typeof ladeInhalte>, id: string) => inhalte.programme.find((p) => p.id === id)!;

describe('ladeInhalte', () => {
  it('übernimmt gültige Werte und lässt den Rest beim Standard', () => {
    const { inhalte, warnungen } = lade({
      programme: { ifa: { status: 'offen', frist: '2027-01-31', bewerbenUrl: 'https://bewerbung-ifa.example/' } },
      texte: { startTitel: 'Neu' },
      fragen: { runway: { hinweis: 'Anders erklärt' } },
      optionen: { c1: { label: 'Solo', merkmal: 'Allein' } },
    });

    expect(warnungen).toEqual([]);
    expect(programm(inhalte, 'ifa')).toMatchObject({ status: 'offen', frist: '2027-01-31', name: 'Accelerator' });
    expect(programm(inhalte, 'ifi')).toEqual(STANDARD_INHALTE.programme.find((p) => p.id === 'ifi'));
    expect(inhalte.texte.startTitel).toBe('Neu');
    expect(inhalte.texte.finderTitel).toBe(STANDARD_INHALTE.texte.finderTitel);
    expect(inhalte.fragen.find((f) => f.id === 'runway')!.hinweis).toBe('Anders erklärt');
    const team = inhalte.fragen.find((f) => f.id === 'team')!;
    expect(team.optionen[0]).toMatchObject({ code: 'c1', label: 'Solo', merkmal: 'Allein' });
    expect(team.optionen[1]!.label).toBe('Zu zweit');
  });

  it('verändert die Standardwerte nicht', () => {
    lade({ texte: { startTitel: 'Neu' } });
    expect(STANDARD_INHALTE.texte.startTitel).toBe('Wie wollt ihr starten?');
  });

  it('ignoriert ungültige Werte mit Warnung', () => {
    const { inhalte, warnungen } = lade({
      programme: {
        ifi: { frist: '14.12.2026', status: 'geschlossen', bewerbenUrl: 'javascript:alert(1)', batch: '' },
      },
      texte: { startTitel: 42 },
    });

    expect(programm(inhalte, 'ifi')).toEqual(STANDARD_INHALTE.programme.find((p) => p.id === 'ifi'));
    expect(inhalte.texte.startTitel).toBe(STANDARD_INHALTE.texte.startTitel);
    expect(warnungen).toHaveLength(5);
    expect(warnungen.join('\n')).toContain('programme.ifi: ungültiger Wert für „frist“');
  });

  it('warnt bei unbekannten Bereichen, Programmen, Feldern und Codes', () => {
    const { warnungen } = lade({
      programm: {},
      programme: { ifx: {}, ifa: { farbe: 'rot' } },
      texte: { titel: 'x' },
      optionen: { z9: { label: 'x' } },
    });
    expect(warnungen).toEqual([
      'Inhalte: unbekannter Eintrag „programm“ wird ignoriert.',
      'programme: unbekannter Eintrag „ifx“ wird ignoriert.',
      'optionen: unbekannter Eintrag „z9“ wird ignoriert.',
      'programme.ifa: unbekanntes Feld „farbe“ wird ignoriert.',
      'texte: unbekanntes Feld „titel“ wird ignoriert.',
    ]);
  });

  it('warnt, wenn ein Programm ohne passenden Zeitraum geschaltet wird', () => {
    const { warnungen } = lade({ programme: { ifi: { status: 'vormerken' } } });
    expect(warnungen).toEqual(['programme.ifi: Status „vormerken“ ohne „start“, es erscheint kein Starttermin.']);
  });

  it('nimmt die Standardwerte, wenn kein Objekt übergeben wird', () => {
    const { inhalte, warnungen } = lade(['falsch']);
    expect(inhalte).toBe(STANDARD_INHALTE);
    expect(warnungen).toHaveLength(1);
  });
});

describe('inhalteAusDokument', () => {
  function dokumentMit(json: string | null): Document {
    const dokument = document.implementation.createHTMLDocument();
    if (json !== null) {
      dokument.body.innerHTML = `<script type="application/json" id="${INHALTE_ID}">${json}</script>`;
    }
    return dokument;
  }

  it('nimmt ohne Block die Standardwerte, ohne zu warnen', () => {
    const warnungen: string[] = [];
    expect(inhalteAusDokument(dokumentMit(null), (m) => warnungen.push(m))).toBe(STANDARD_INHALTE);
    expect(warnungen).toEqual([]);
  });

  it('liest den Block aus dem Dokument', () => {
    const inhalte = inhalteAusDokument(dokumentMit('{"texte": {"startTitel": "Aus Webflow"}}'), () => {});
    expect(inhalte.texte.startTitel).toBe('Aus Webflow');
  });

  it('fällt bei kaputtem JSON auf die Standardwerte zurück', () => {
    const warnungen: string[] = [];
    const inhalte = inhalteAusDokument(dokumentMit('{"texte": {"startTitel": "ohne Ende"'), (m) => warnungen.push(m));
    expect(inhalte).toBe(STANDARD_INHALTE);
    expect(warnungen).toEqual(['Die Inhalte sind kein gültiges JSON, es gelten die Standardwerte.']);
  });
});
