import { sendeEreignis } from './ereignisse';
import { FRAGEN, type Frage } from './fragen';
import {
  PROGRAMME,
  buttonText,
  istProgrammId,
  programm,
  statusText,
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

function mitPfeil(text: string): HTMLElement[] {
  return [el('span', {}, text), el('span', { class: 'iff-pfeil', 'aria-hidden': 'true' }, '→')];
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

  function fortschritt(): HTMLElement {
    const balken = el('div', { class: 'iff-fortschritt', 'aria-hidden': 'true', style: `--_schritte: ${FRAGEN.length}` });
    FRAGEN.forEach((_, index) => balken.append(el('span', index <= zustand.schritt ? { class: 'ist-erreicht' } : {})));
    return balken;
  }

  function zeigeFrage(fokussieren: boolean): void {
    const frage = FRAGEN[zustand.schritt]!;
    ansage.textContent = '';

    const optionen = frage.optionen.map((option) => {
      const knopf = el(
        'button',
        { type: 'button', class: 'iff-option', 'aria-pressed': String(zustand.antworten[frage.id] === option.code) },
        el('span', { class: 'iff-option-label' }, option.label),
        option.unterzeile ? el('span', { class: 'iff-option-unterzeile' }, option.unterzeile) : null,
      );
      knopf.addEventListener('click', () => beantworte(frage, option.code));
      return knopf;
    });

    let zurueck: HTMLElement | null = null;
    if (zustand.schritt > 0) {
      zurueck = el('button', { type: 'button', class: 'iff-link iff-link--zurueck' }, 'Zurück');
      zurueck.addEventListener('click', () => {
        zustand.schritt -= 1;
        zeigeFrage(true);
      });
    }

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

  function programmLink(p: Programm, empfohlen: ProgrammId, klasse: string): HTMLElement {
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
      sendeEreignis('finder_klick', { programm: p.id, empfohlen: p.id === empfohlen }),
    );
    return link;
  }

  function kriterienListe(empfehlung: Empfehlung): HTMLElement {
    return el(
      'ul',
      { class: 'iff-kriterien', 'aria-label': 'Kriterien' },
      ...empfehlung.kriterien.map((k) =>
        el(
          'li',
          { class: k.erfuellt ? 'iff-erfuellt' : 'iff-nicht-erfuellt' },
          el('span', { class: 'iff-zeichen', 'aria-hidden': 'true' }, k.erfuellt ? '✓' : '–'),
          el('span', { class: 'iff-sr' }, k.erfuellt ? 'erfüllt: ' : 'nicht erfüllt: '),
          k.text,
        ),
      ),
    );
  }

  function alternativen(empfohlen: ProgrammId): HTMLElement[] {
    const liste = el(
      'ul',
      { class: 'iff-alternativen', id: 'iff-alternativen', hidden: '' },
      ...PROGRAMME.filter((p) => p.id !== empfohlen).map((p) =>
        el(
          'li',
          { class: `iff-alternative iff-programm--${p.id}` },
          el('h3', { class: 'iff-alternative-name' }, p.name),
          el('p', { class: 'iff-status' }, statusText(p)),
          programmLink(p, empfohlen, 'iff-button-sekundaer'),
        ),
      ),
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
      const aendern = el('button', { type: 'button', class: 'iff-link iff-link--zurueck' }, 'Antworten ändern');
      aendern.addEventListener('click', () => zeigeFrage(true));
      return aendern;
    }
    const fragenStarten = el(
      'button',
      { type: 'button', class: 'iff-link' },
      'Unsicher? Mit ein paar Fragen das passende Programm finden',
    );
    fragenStarten.addEventListener('click', () => {
      zustand.quelle = 'finder';
      zeigeFrage(true);
    });
    return fragenStarten;
  }

  function zeigeErgebnis(empfohlen: ProgrammId, empfehlung: Empfehlung | null, fokussieren: boolean): void {
    const p = programm(empfohlen);
    const vorzeile = empfehlung ? 'Nach euren Angaben passt am besten:' : 'Euer gewähltes Programm:';

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
          empfehlung ? el('p', { class: 'iff-begruendung' }, empfehlung.begruendung) : null,
          empfehlung ? kriterienListe(empfehlung) : null,
          el(
            'div',
            { class: 'iff-cta' },
            programmLink(p, empfohlen, 'iff-button'),
            el('p', { class: 'iff-status' }, statusText(p)),
          ),
        ),
        el('div', { class: 'iff-weiteres' }, ...alternativen(empfohlen), folgeAktion()),
      ],
      fokussieren,
    );
    ansage.textContent = empfehlung ? `${vorzeile} ${p.name}. ${empfehlung.begruendung}` : `${vorzeile} ${p.name}`;
    sendeEreignis('finder_ergebnis', { empfehlung: empfohlen, quelle: zustand.quelle });
  }

  const direktProgramm = new URL(seitenUrl).searchParams.get('programm');
  if (istProgrammId(direktProgramm)) {
    zustand.quelle = 'programmseite';
    zeigeErgebnis(direktProgramm, null, false);
  } else {
    zeigeFrage(false);
  }
}
