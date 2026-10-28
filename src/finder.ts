import { sendeEreignis } from './ereignisse';
import type { Frage } from './fragen';
import type { Inhalte } from './inhalte';
import { buttonText, istProgrammId, zeitraumText, zielUrlFuer, type Programm, type ProgrammId } from './programme';
import { antwortCodes, empfehle, type Antworten, type Empfehlung } from './regeln';
import { fuegeStilEin } from './stil';
import { fuelle } from './texte';
import { mitHerkunft, type Quelle } from './weiterleitung';

interface Zustand {
  quelle: Quelle;
  schritt: number;
  antworten: Antworten;
  gestartet: boolean;
}

type Kind = Node | string | null;

const SVG_NS = 'http://www.w3.org/2000/svg';

function el(tag: string, attribute: Record<string, string> = {}, ...kinder: Kind[]): HTMLElement {
  const element = document.createElement(tag);
  for (const [name, wert] of Object.entries(attribute)) {
    element.setAttribute(name, wert);
  }
  for (const kind of kinder) {
    if (kind !== null) {
      element.append(kind);
    }
  }
  return element;
}

function knopf(klasse: string, text: string, beiKlick: () => void): HTMLElement {
  const element = el('button', { type: 'button', class: klasse }, text);
  element.addEventListener('click', beiKlick);
  return element;
}

function mitPfeil(text: string): HTMLElement[] {
  return [el('span', {}, text), el('span', { class: 'iff-pfeil', 'aria-hidden': 'true' }, '→')];
}

function kalenderSymbol(): SVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('class', 'iff-symbol');
  for (const d of ['M3 5h18v16H3z', 'M3 10h18', 'M8 2v5', 'M16 2v5']) {
    const pfad = document.createElementNS(SVG_NS, 'path');
    pfad.setAttribute('d', d);
    svg.append(pfad);
  }
  return svg;
}

export function starteFinder(container: HTMLElement, seitenUrl: string, inhalte: Inhalte): void {
  const { fragen, programme, texte } = inhalte;
  fuegeStilEin(container.ownerDocument);
  container.classList.add('iff');

  const inhalt = el('div');
  const ansage = el('div', { class: 'iff-sr', 'aria-live': 'polite' });
  container.replaceChildren(inhalt, ansage);

  const zustand: Zustand = { quelle: 'finder', schritt: 0, antworten: {}, gestartet: false };

  function programm(id: ProgrammId): Programm {
    return programme.find((p) => p.id === id)!;
  }

  function zeige(teile: Kind[], fokussieren: boolean): void {
    inhalt.replaceChildren(el('div', { class: 'iff-ansicht' }, ...teile));
    if (fokussieren) {
      inhalt.querySelector<HTMLElement>('.iff-titel')?.focus();
    }
  }

  function zeitraum(p: Programm): HTMLElement {
    const offen = p.status === 'offen';
    return el(
      'div',
      { class: `iff-zeitraum ${offen ? 'ist-offen' : 'ist-folgend'}` },
      el('span', { class: 'iff-status' }, offen ? texte.statusOffen : texte.statusFolgt),
      el('p', { class: 'iff-zeitraum-text' }, kalenderSymbol(), el('span', {}, zeitraumText(p, texte))),
    );
  }

  function weg(label: string, titel: string, text: string, aktion: string, beiKlick: () => void): HTMLElement {
    const element = el(
      'button',
      { type: 'button', class: 'iff-weg' },
      el(
        'span',
        { class: 'iff-weg-kopf' },
        el('span', { class: 'iff-weg-label' }, label),
        el('span', { class: 'iff-weg-titel' }, titel),
      ),
      el(
        'span',
        { class: 'iff-weg-fuss' },
        el('span', { class: 'iff-weg-text' }, text),
        el('span', { class: 'iff-weg-aktion' }, aktion),
      ),
    );
    element.addEventListener('click', beiKlick);
    return element;
  }

  function zeigeStart(fokussieren: boolean): void {
    ansage.textContent = '';
    zeige(
      [
        el('p', { class: 'iff-eyebrow' }, texte.startEyebrow),
        el('h2', { class: 'iff-titel', tabindex: '-1' }, texte.startTitel),
        el(
          'div',
          { class: 'iff-wege' },
          weg(texte.finderLabel, texte.finderTitel, texte.finderText, texte.finderAktion, () => {
            zustand.quelle = 'finder';
            zustand.schritt = 0;
            zeigeFrage(true);
          }),
          weg(texte.direktLabel, texte.direktTitel, texte.direktText, texte.direktAktion, () => {
            sendeEreignis('finder_direktwahl');
            zeigeDirektwahl(true);
          }),
        ),
      ],
      fokussieren,
    );
  }

  function zeigeDirektwahl(fokussieren: boolean): void {
    zustand.quelle = 'direktwahl';
    zeige(
      [
        el('p', { class: 'iff-eyebrow' }, texte.direktLabel),
        el('h2', { class: 'iff-titel', tabindex: '-1' }, texte.direktwahlTitel),
        el('ul', { class: 'iff-karten' }, ...programme.map((p) => programmKarte(p, null))),
        el('div', { class: 'iff-weiteres' }, knopf('iff-link iff-link--zurueck', texte.zurueckZurAuswahl, () => zeigeStart(true))),
      ],
      fokussieren,
    );
  }

  function fortschritt(): HTMLElement {
    const balken = el('div', { class: 'iff-fortschritt', 'aria-hidden': 'true', style: `--_schritte: ${fragen.length}` });
    fragen.forEach((_, index) => balken.append(el('span', index <= zustand.schritt ? { class: 'ist-erreicht' } : {})));
    return balken;
  }

  function zeigeFrage(fokussieren: boolean): void {
    const frage = fragen[zustand.schritt]!;
    ansage.textContent = '';

    const optionen = frage.optionen.map((option) => {
      const element = el(
        'button',
        { type: 'button', class: 'iff-option', 'aria-pressed': String(zustand.antworten[frage.id] === option.code) },
        el('span', { class: 'iff-option-label' }, option.label),
        option.unterzeile ? el('span', { class: 'iff-option-unterzeile' }, option.unterzeile) : null,
      );
      element.addEventListener('click', () => beantworte(frage, option.code));
      return element;
    });

    const zurueck =
      zustand.schritt > 0
        ? knopf('iff-link iff-link--zurueck', texte.zurueck, () => {
            zustand.schritt -= 1;
            zeigeFrage(true);
          })
        : knopf('iff-link iff-link--zurueck', texte.zurueckZurAuswahl, () => zeigeStart(true));

    zeige(
      [
        el(
          'p',
          { class: 'iff-eyebrow' },
          fuelle(texte.frageZaehler, { nummer: String(zustand.schritt + 1), anzahl: String(fragen.length) }),
        ),
        fortschritt(),
        el('h2', { class: 'iff-titel', id: 'iff-frage-titel', tabindex: '-1' }, frage.text),
        frage.hinweis ? el('p', { class: 'iff-hinweis' }, frage.hinweis) : null,
        el('div', { class: 'iff-optionen', role: 'group', 'aria-labelledby': 'iff-frage-titel' }, ...optionen),
        zurueck,
      ],
      fokussieren,
    );
  }

  function beantworte(frage: Frage, code: string): void {
    if (!zustand.gestartet) {
      zustand.gestartet = true;
      sendeEreignis('finder_start');
    }
    zustand.antworten[frage.id] = code;

    if (zustand.schritt + 1 < fragen.length) {
      zustand.schritt += 1;
      zeigeFrage(true);
    } else {
      const empfehlung = empfehle(zustand.antworten, inhalte);
      zeigeErgebnis(empfehlung.programm, empfehlung, true);
    }
  }

  function programmLink(p: Programm, empfohlen: ProgrammId | null, klasse: string): HTMLElement {
    const href = mitHerkunft(
      zielUrlFuer(p),
      {
        quelle: zustand.quelle,
        empfehlung: empfohlen,
        gewaehlt: p.id,
        antworten: zustand.quelle === 'finder' ? antwortCodes(zustand.antworten) : '',
      },
      seitenUrl,
    );
    const link = el('a', { class: klasse, href }, ...mitPfeil(buttonText(p, texte)));
    link.addEventListener('click', () =>
      sendeEreignis('finder_klick', { programm: p.id, quelle: zustand.quelle, empfohlen: p.id === empfohlen }),
    );
    return link;
  }

  function programmKarte(p: Programm, empfohlen: ProgrammId | null): HTMLElement {
    return el(
      'li',
      { class: `iff-karte iff-programm--${p.id}` },
      el('div', { class: 'iff-karte-kopf' }, el('h3', { class: 'iff-karte-name' }, p.name), el('p', { class: 'iff-karte-text' }, p.beschreibung)),
      el('div', { class: 'iff-karte-fuss' }, zeitraum(p), programmLink(p, empfohlen, 'iff-button-sekundaer')),
    );
  }

  function gruendeListe(gruende: readonly string[]): HTMLElement {
    return el(
      'ul',
      { class: 'iff-gruende', 'aria-label': 'Darum passt dieses Programm' },
      ...gruende.map((grund) => el('li', {}, el('span', { class: 'iff-haken', 'aria-hidden': 'true' }, '✓'), grund)),
    );
  }

  function alternativen(empfohlen: ProgrammId): HTMLElement[] {
    const liste = el(
      'ul',
      { class: 'iff-karten', id: 'iff-alternativen', hidden: '' },
      ...programme.filter((p) => p.id !== empfohlen).map((p) => programmKarte(p, empfohlen)),
    );
    const umschalter = el(
      'button',
      { type: 'button', class: 'iff-link', 'aria-expanded': 'false', 'aria-controls': 'iff-alternativen' },
      texte.anderesProgramm,
    );
    umschalter.addEventListener('click', () => {
      const oeffnen = liste.hidden;
      liste.hidden = !oeffnen;
      umschalter.setAttribute('aria-expanded', String(oeffnen));
      if (oeffnen) {
        sendeEreignis('finder_anderes_programm', { empfehlung: empfohlen });
      }
    });
    return [umschalter, liste];
  }

  function folgeAktion(): HTMLElement {
    if (zustand.quelle === 'finder') {
      return knopf('iff-link iff-link--zurueck', texte.antwortenAendern, () => zeigeFrage(true));
    }
    return knopf('iff-link', texte.unsicher, () => {
      zustand.quelle = 'finder';
      zustand.schritt = 0;
      zeigeFrage(true);
    });
  }

  function zeigeErgebnis(empfohlen: ProgrammId, empfehlung: Empfehlung | null, fokussieren: boolean): void {
    const p = programm(empfohlen);
    const vorzeile = empfehlung ? texte.empfehlungVorzeile : texte.gewaehltVorzeile;
    const intro = empfehlung ? empfehlung.intro : p.beschreibung;

    zeige(
      [
        el(
          'section',
          { class: `iff-ergebnis iff-programm--${p.id}`, 'aria-labelledby': 'iff-ergebnis-titel' },
          el('p', { class: 'iff-eyebrow' }, empfehlung ? texte.empfehlungEyebrow : texte.gewaehltEyebrow),
          el(
            'h2',
            { class: 'iff-titel', id: 'iff-ergebnis-titel', tabindex: '-1' },
            el('span', { class: 'iff-vorzeile' }, vorzeile),
            ' ',
            el('span', { class: 'iff-programmname' }, p.name),
          ),
          el('p', { class: 'iff-intro' }, intro),
          empfehlung && empfehlung.gruende.length > 0 ? gruendeListe(empfehlung.gruende) : null,
          el('div', { class: 'iff-cta' }, programmLink(p, empfohlen, 'iff-button')),
          zeitraum(p),
        ),
        el('div', { class: 'iff-weiteres' }, ...alternativen(empfohlen), folgeAktion()),
      ],
      fokussieren,
    );
    ansage.textContent = `${vorzeile} ${p.name}. ${intro}`;
    sendeEreignis('finder_ergebnis', { empfehlung: empfohlen, quelle: zustand.quelle });
  }

  const direktProgramm = new URL(seitenUrl).searchParams.get('programm');
  if (istProgrammId(direktProgramm)) {
    zustand.quelle = 'programmseite';
    zeigeErgebnis(direktProgramm, null, false);
  } else {
    zeigeStart(false);
  }
}
