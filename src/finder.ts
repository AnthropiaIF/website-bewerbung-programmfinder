import { sendeEreignis } from './ereignisse';
import { FRAGEN, type Frage } from './fragen';
import {
  PROGRAMME,
  buttonText,
  istProgrammId,
  programm,
  zeitraumText,
  zielUrlFuer,
  type Programm,
  type ProgrammId,
} from './programme';
import { antwortCodes, empfehle, type Antworten, type Empfehlung } from './regeln';
import { fuegeStilEin } from './stil';
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

function zeitraum(p: Programm): HTMLElement {
  return el('p', { class: 'iff-zeitraum' }, kalenderSymbol(), el('span', {}, zeitraumText(p)));
}

export function starteFinder(container: HTMLElement, seitenUrl: string): void {
  fuegeStilEin(container.ownerDocument);
  container.classList.add('iff');

  const inhalt = el('div');
  const ansage = el('div', { class: 'iff-sr', 'aria-live': 'polite' });
  container.replaceChildren(inhalt, ansage);

  const zustand: Zustand = { quelle: 'finder', schritt: 0, antworten: {}, gestartet: false };

  function zeige(teile: Kind[], fokussieren: boolean): void {
    inhalt.replaceChildren(el('div', { class: 'iff-ansicht' }, ...teile));
    if (fokussieren) {
      inhalt.querySelector<HTMLElement>('.iff-titel')?.focus();
    }
  }

  function weg(label: string, titel: string, text: string, aktion: string, beiKlick: () => void): HTMLElement {
    const element = el(
      'button',
      { type: 'button', class: 'iff-weg' },
      el('span', { class: 'iff-weg-label' }, label),
      el('span', { class: 'iff-weg-titel' }, titel),
      el('span', { class: 'iff-weg-text' }, text),
      el('span', { class: 'iff-weg-aktion' }, aktion),
    );
    element.addEventListener('click', beiKlick);
    return element;
  }

  function zeigeStart(fokussieren: boolean): void {
    ansage.textContent = '';
    zeige(
      [
        el('p', { class: 'iff-eyebrow' }, 'Bewerbung'),
        el('h2', { class: 'iff-titel', tabindex: '-1' }, 'Wie wollt ihr starten?'),
        el(
          'div',
          { class: 'iff-wege' },
          weg(
            'Programm-Finder',
            'Wir sind uns noch unsicher.',
            'Fünf kurze Fragen, dann bekommt ihr eine Empfehlung.',
            'Programm finden',
            () => {
              zustand.quelle = 'finder';
              zustand.schritt = 0;
              zeigeFrage(true);
            },
          ),
          weg(
            'Direkt bewerben',
            'Wir wissen schon, wohin.',
            'Wählt euer Programm und geht direkt zur Bewerbung.',
            'Programm wählen',
            () => {
              sendeEreignis('finder_direktwahl');
              zeigeDirektwahl(true);
            },
          ),
        ),
      ],
      fokussieren,
    );
  }

  function zeigeDirektwahl(fokussieren: boolean): void {
    zustand.quelle = 'direktwahl';
    zeige(
      [
        el('p', { class: 'iff-eyebrow' }, 'Direkt bewerben'),
        el('h2', { class: 'iff-titel', tabindex: '-1' }, 'Für welches Programm wollt ihr euch bewerben?'),
        el('ul', { class: 'iff-karten' }, ...PROGRAMME.map((p) => programmKarte(p, null))),
        el(
          'div',
          { class: 'iff-weiteres' },
          knopf('iff-link iff-link--zurueck', 'Zurück zur Auswahl', () => zeigeStart(true)),
        ),
      ],
      fokussieren,
    );
  }

  function fortschritt(): HTMLElement {
    const balken = el('div', { class: 'iff-fortschritt', 'aria-hidden': 'true', style: `--_schritte: ${FRAGEN.length}` });
    FRAGEN.forEach((_, index) => balken.append(el('span', index <= zustand.schritt ? { class: 'ist-erreicht' } : {})));
    return balken;
  }

  function zeigeFrage(fokussieren: boolean): void {
    const frage = FRAGEN[zustand.schritt]!;
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
        ? knopf('iff-link iff-link--zurueck', 'Zurück', () => {
            zustand.schritt -= 1;
            zeigeFrage(true);
          })
        : knopf('iff-link iff-link--zurueck', 'Zurück zur Auswahl', () => zeigeStart(true));

    zeige(
      [
        el('p', { class: 'iff-eyebrow' }, `Programm-Finder · Frage ${zustand.schritt + 1} von ${FRAGEN.length}`),
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

    if (zustand.schritt + 1 < FRAGEN.length) {
      zustand.schritt += 1;
      zeigeFrage(true);
    } else {
      const empfehlung = empfehle(zustand.antworten);
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
    const link = el('a', { class: klasse, href }, ...mitPfeil(buttonText(p)));
    link.addEventListener('click', () =>
      sendeEreignis('finder_klick', { programm: p.id, quelle: zustand.quelle, empfohlen: p.id === empfohlen }),
    );
    return link;
  }

  function programmKarte(p: Programm, empfohlen: ProgrammId | null): HTMLElement {
    return el(
      'li',
      { class: `iff-karte iff-programm--${p.id}` },
      el('h3', { class: 'iff-karte-name' }, p.name),
      el('p', { class: 'iff-karte-text' }, p.beschreibung),
      programmLink(p, empfohlen, 'iff-button-sekundaer'),
      zeitraum(p),
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
      ...PROGRAMME.filter((p) => p.id !== empfohlen).map((p) => programmKarte(p, empfohlen)),
    );
    const umschalter = el(
      'button',
      { type: 'button', class: 'iff-link', 'aria-expanded': 'false', 'aria-controls': 'iff-alternativen' },
      'Ich möchte ein anderes Programm wählen',
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
      return knopf('iff-link iff-link--zurueck', 'Antworten ändern', () => zeigeFrage(true));
    }
    return knopf('iff-link', 'Unsicher? Mit ein paar Fragen das passende Programm finden', () => {
      zustand.quelle = 'finder';
      zustand.schritt = 0;
      zeigeFrage(true);
    });
  }

  function zeigeErgebnis(empfohlen: ProgrammId, empfehlung: Empfehlung | null, fokussieren: boolean): void {
    const p = programm(empfohlen);
    const vorzeile = empfehlung ? 'Nach euren Angaben passt am besten:' : 'Euer gewähltes Programm:';
    const intro = empfehlung ? empfehlung.intro : p.beschreibung;

    zeige(
      [
        el(
          'section',
          { class: `iff-ergebnis iff-programm--${p.id}`, 'aria-labelledby': 'iff-ergebnis-titel' },
          el('p', { class: 'iff-eyebrow' }, empfehlung ? 'Unsere Empfehlung' : 'Programm-Finder'),
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
