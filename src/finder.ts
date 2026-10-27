import { sendeEreignis } from './ereignisse';
import type { Frage } from './fragen';
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
import { antwortCodes, empfehle, fragenFuer, type Antworten, type Empfehlung } from './regeln';
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

export function starteFinder(container: HTMLElement, seitenUrl: string): void {
  fuegeStilEin(container.ownerDocument);
  container.classList.add('iff');

  const inhalt = el('div');
  const ansage = el('div', { class: 'iff-sr', 'aria-live': 'polite' });
  container.replaceChildren(inhalt, ansage);

  const zustand: Zustand = { quelle: 'finder', schritt: 0, antworten: {}, gestartet: false };

  function zeige(teile: Node[], fokussieren: boolean): void {
    inhalt.replaceChildren(...teile);
    if (fokussieren) {
      inhalt.querySelector<HTMLElement>('.iff-titel')?.focus();
    }
  }

  function zeigeFrage(fokussieren: boolean): void {
    const fragen = fragenFuer(zustand.antworten);
    const frage = fragen[zustand.schritt]!;
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
      zurueck = el('button', { type: 'button', class: 'iff-link iff-zurueck' }, 'Zurück');
      zurueck.addEventListener('click', () => {
        zustand.schritt -= 1;
        zeigeFrage(true);
      });
    }

    zeige(
      [
        el('p', { class: 'iff-schritt' }, `Frage ${zustand.schritt + 1} von ${fragen.length}`),
        el('h2', { class: 'iff-titel', id: 'iff-frage-titel', tabindex: '-1' }, frage.text),
        frage.hinweis ? el('p', { class: 'iff-hinweis' }, frage.hinweis) : null,
        el('div', { class: 'iff-optionen', role: 'group', 'aria-labelledby': 'iff-frage-titel' }, ...optionen),
        zurueck,
      ].filter((teil): teil is HTMLElement => teil !== null),
      fokussieren,
    );
  }

  function beantworte(frage: Frage, code: string): void {
    if (!zustand.gestartet) {
      zustand.gestartet = true;
      sendeEreignis('finder_start');
    }
    zustand.antworten[frage.id] = code;

    if (zustand.schritt + 1 < fragenFuer(zustand.antworten).length) {
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
    const link = el('a', { class: klasse, href }, buttonText(p));
    link.addEventListener('click', () =>
      sendeEreignis('finder_klick', { programm: p.id, empfohlen: p.id === empfohlen }),
    );
    return link;
  }

  function kriterienListe(empfehlung: Empfehlung): HTMLElement | null {
    if (empfehlung.kriterien.length === 0) {
      return null;
    }
    return el(
      'ul',
      { class: 'iff-kriterien' },
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
          {},
          el('strong', {}, p.name),
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
      const aendern = el('button', { type: 'button', class: 'iff-link' }, 'Antworten ändern');
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
    const titel = empfehlung ? `Nach euren Angaben passt am besten: ${p.name}` : `Euer gewähltes Programm: ${p.name}`;

    zeige(
      [
        el('h2', { class: 'iff-titel', tabindex: '-1' }, titel),
        empfehlung ? el('p', { class: 'iff-begruendung' }, empfehlung.begruendung) : null,
        empfehlung ? kriterienListe(empfehlung) : null,
        el('div', {}, programmLink(p, empfohlen, 'iff-button')),
        el('p', { class: 'iff-status' }, statusText(p)),
        ...alternativen(empfohlen),
        el('div', { class: 'iff-aktionen' }, folgeAktion()),
      ].filter((teil): teil is HTMLElement => teil !== null),
      fokussieren,
    );
    ansage.textContent = empfehlung ? `${titel}. ${empfehlung.begruendung}` : titel;
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
