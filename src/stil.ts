// Alle Farben, Schrift und Radius über --iff-* steuerbar, damit Webflow das Design anpassen kann,
// ohne das Script zu ändern. Standardwerte nach BRANDING.md (Teal, kantig).

const CSS = `
.iff {
  --_primaer: var(--iff-color-primary, #007d87);
  --_primaer-text: var(--iff-color-primary-text, #ffffff);
  --_text: var(--iff-color-text, #1a1a1a);
  --_gedaempft: var(--iff-color-muted, #555555);
  --_flaeche: var(--iff-color-surface, #f7f7f7);
  --_rand: var(--iff-color-border, #c8c8c8);
  --_radius: var(--iff-radius, 0);
  font-family: var(--iff-font, inherit);
  color: var(--_text);
  max-width: 40rem;
}
.iff *, .iff *::before, .iff *::after { box-sizing: border-box; }
.iff-schritt { margin: 0 0 .5rem; font-size: .875rem; color: var(--_gedaempft); }
.iff-titel { margin: 0 0 .75rem; font-size: 1.5rem; line-height: 1.25; }
.iff-titel:focus { outline: none; }
.iff-hinweis, .iff-begruendung, .iff-status { margin: 0 0 1rem; color: var(--_gedaempft); }
.iff-optionen { display: grid; gap: .5rem; margin: 0 0 1rem; }
.iff-option {
  display: block; width: 100%; padding: .875rem 1rem; text-align: left; cursor: pointer;
  font: inherit; color: var(--_text); background: var(--_flaeche);
  border: 2px solid var(--_rand); border-radius: var(--_radius);
}
.iff-option:hover, .iff-option[aria-pressed="true"] { border-color: var(--_primaer); }
.iff-option-label { display: block; font-weight: 600; }
.iff-option-unterzeile { display: block; margin-top: .125rem; font-size: .875rem; color: var(--_gedaempft); }
.iff-button, .iff-button-sekundaer {
  display: inline-block; padding: .875rem 1.5rem; font-weight: 600; text-decoration: none;
  border: 2px solid var(--_primaer); border-radius: var(--_radius);
}
.iff-button { margin: 0 0 .5rem; font-size: 1.125rem; color: var(--_primaer-text); background: var(--_primaer); }
.iff-button-sekundaer { padding: .5rem 1rem; color: var(--_primaer); background: transparent; }
.iff-link {
  padding: 0; font: inherit; font-size: .9375rem; color: var(--_primaer); text-decoration: underline;
  background: none; border: 0; cursor: pointer;
}
.iff-zurueck { margin-top: .5rem; }
.iff-kriterien { margin: 0 0 1.25rem; padding: 0; list-style: none; }
.iff-kriterien li { margin: 0 0 .25rem; }
.iff-zeichen { display: inline-block; width: 1.5em; font-weight: 700; }
.iff-erfuellt .iff-zeichen { color: var(--_primaer); }
.iff-nicht-erfuellt .iff-zeichen { color: var(--_gedaempft); }
.iff-alternativen { margin: 1rem 0 0; padding: 0; list-style: none; }
.iff-alternativen li { margin: 0 0 .75rem; padding: 1rem; background: var(--_flaeche); border-radius: var(--_radius); }
.iff-alternativen .iff-status { margin: .25rem 0 .75rem; font-size: .875rem; }
.iff-aktionen { margin-top: 1.5rem; }
.iff-option:focus-visible, .iff-button:focus-visible, .iff-button-sekundaer:focus-visible, .iff-link:focus-visible {
  outline: 3px solid var(--_primaer); outline-offset: 2px;
}
.iff-sr {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
}
`;

const STIL_ID = 'iff-stil';

export function fuegeStilEin(dokument: Document): void {
  if (dokument.getElementById(STIL_ID)) {
    return;
  }
  const stil = dokument.createElement('style');
  stil.id = STIL_ID;
  stil.textContent = CSS;
  dokument.head.appendChild(stil);
}
