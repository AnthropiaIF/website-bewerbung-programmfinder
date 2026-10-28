// Gestaltung nach Design System „Impact Factory Markenpush“, Startup-Ebene (startup-ebene.css):
// kantig, Gold = Inkubator und Aktivierung, Orange = Accelerator, Schrift auf Programmfarben immer Ink.
// Schriftnamen wie in den @font-face-Regeln der Webflow-Site, damit sie dort ohne Nachladen greifen.
// Alles über --iff-* in Webflow überschreibbar.

const CSS = `
.iff {
  --_teal: var(--iff-color-primary, #007d87);
  --_teal-tief: var(--iff-color-primary-deep, #006269);
  --_gold: var(--iff-color-cta, #e1bc48);
  --_ink: var(--iff-color-ink, #1a1a1a);
  --_gedaempft: var(--iff-color-muted, #5a5f60);
  --_flaeche: var(--iff-color-surface, #f7f7f7);
  --_radius: var(--iff-radius, 0);
  --_titel-font: var(--iff-font-heading, "Intervogue Medium", "Intervogue", "Inter", Arial, sans-serif);
  --_ease: cubic-bezier(.2, .7, .2, 1);
  font-family: var(--iff-font, inherit);
  font-size: 17px;
  line-height: 1.5;
  color: var(--_ink);
  max-width: var(--iff-max-width, 64rem);
}
.iff *, .iff *::before, .iff *::after { box-sizing: border-box; }
.iff-programm--ifi { --_programm: var(--iff-farbe-ifi, #e1bc48); }
.iff-programm--ifa { --_programm: var(--iff-farbe-ifa, #fca14a); }
.iff-programm--goods { --_programm: var(--iff-farbe-goods, #cfeff1); }

.iff-ansicht { animation: iff-ein 280ms var(--_ease) both; }
@keyframes iff-ein { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }

.iff-eyebrow {
  display: flex; align-items: center; gap: 10px; margin: 0 0 14px;
  font-size: 13px; font-weight: 500; line-height: 1.3; letter-spacing: .08em; text-transform: uppercase;
  color: var(--_teal-tief);
}
.iff-eyebrow::before { content: ""; width: 10px; height: 10px; background: currentColor; flex: none; }
.iff-fortschritt { display: grid; grid-template-columns: repeat(var(--_schritte), 1fr); gap: 6px; margin: 0 0 32px; }
.iff-fortschritt span { height: 4px; background: #d9dcdd; }
.iff-fortschritt span.ist-erreicht { background: var(--_teal); }

.iff-titel {
  margin: 0 0 12px; font-family: var(--_titel-font); font-weight: 500;
  font-size: clamp(28px, 3.6vw, 44px); line-height: 1.1; letter-spacing: -.02em; color: var(--_ink);
}
.iff-titel:focus { outline: none; }
.iff-hinweis { margin: 0 0 8px; max-width: 38rem; color: var(--_gedaempft); }

.iff-optionen {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); gap: 12px; margin: 28px 0 24px;
}
.iff-option {
  display: flex; flex-direction: column; justify-content: center; gap: 4px; width: 100%; min-height: 76px;
  padding: 18px 20px; text-align: left; cursor: pointer;
  font: inherit; color: var(--_ink); background: #fff;
  border: 2px solid var(--_ink); border-radius: var(--_radius);
  transition: background-color 120ms linear, transform 240ms var(--_ease), box-shadow 240ms var(--_ease);
}
.iff-option:hover { transform: translate(-3px, -3px); box-shadow: 6px 6px 0 var(--_teal); }
.iff-option[aria-pressed="true"] { background: var(--_gold); }
.iff-option-label { font-family: var(--_titel-font); font-weight: 500; font-size: 18px; line-height: 1.25; }
.iff-option-unterzeile { font-size: 14px; line-height: 1.4; color: var(--_gedaempft); }
.iff-option[aria-pressed="true"] .iff-option-unterzeile { color: var(--_ink); }

.iff-link {
  display: inline-flex; align-items: baseline; gap: 10px; min-height: 24px; padding: 0 0 3px;
  font: inherit; font-weight: 500; color: var(--_ink); text-decoration: none; cursor: pointer;
  background: none; border: 0; border-bottom: 2px solid currentColor; border-radius: 0;
}
.iff-link::after { content: "→"; transition: transform 240ms var(--_ease); }
.iff-link:hover::after { transform: translateX(4px); }
.iff-link--zurueck::after { content: none; }
.iff-link--zurueck::before { content: "←"; transition: transform 240ms var(--_ease); }
.iff-link--zurueck:hover::before { transform: translateX(-4px); }
.iff-link[aria-expanded]::after { content: "↓"; }
.iff-link[aria-expanded="true"]::after { content: "↑"; }
.iff-link[aria-expanded]:hover::after { transform: none; }

.iff-ergebnis {
  padding: clamp(24px, 4vw, 48px); background: var(--_programm); color: var(--_ink); border-radius: var(--_radius);
}
.iff-ergebnis .iff-eyebrow { color: var(--_ink); }
.iff-vorzeile { display: block; margin-bottom: 6px; font-size: clamp(18px, 2vw, 22px); letter-spacing: -.01em; }
.iff-programmname { display: block; font-size: clamp(44px, 7vw, 80px); line-height: 1; letter-spacing: -.03em; }
.iff-intro { margin: 20px 0 0; max-width: 36rem; }
.iff-gruende { display: flex; flex-wrap: wrap; gap: 8px; margin: 20px 0 0; padding: 0; list-style: none; }
.iff-gruende li {
  display: inline-flex; align-items: center; gap: 8px; min-height: 36px; padding: 6px 14px;
  font-size: 14px; font-weight: 500; line-height: 1.2; border: 2px solid var(--_ink);
}
.iff-haken { font-weight: 700; }
.iff-cta { margin-top: 32px; }
.iff-zeitraum {
  display: flex; flex-direction: column; align-items: flex-start; gap: 12px; margin: 28px 0 0; padding-top: 20px;
  border-top: 2px solid var(--_ink);
}
.iff-zeitraum-text { display: flex; align-items: flex-start; gap: 12px; margin: 0; font-size: 15px; font-weight: 500; line-height: 1.4; }
.iff-status {
  display: inline-flex; align-items: center; gap: 8px; padding: 5px 10px;
  font-size: 12px; font-weight: 600; line-height: 1.2; letter-spacing: .08em; text-transform: uppercase;
  color: var(--_ink); border: 2px solid var(--_ink);
}
.iff-status::before { content: ""; width: 8px; height: 8px; flex: none; border: 2px solid currentColor; }
.ist-offen .iff-status { color: #fff; background: var(--_ink); }
.ist-offen .iff-status::before { background: currentColor; }
.ist-folgend .iff-status { border-style: dashed; }
.iff-symbol {
  width: 22px; height: 22px; flex: none; margin-top: -1px;
  fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: square;
}

.iff-button, .iff-button-sekundaer {
  display: inline-flex; align-items: center; justify-content: center; gap: 12px; max-width: 100%;
  font-family: var(--_titel-font); font-weight: 500; line-height: 1.1; letter-spacing: .06em; text-transform: uppercase;
  text-decoration: none; border: 2px solid var(--_ink); border-radius: var(--_radius); cursor: pointer;
  transition: background-color 120ms linear, color 120ms linear;
}
.iff-button { min-height: 52px; padding: 16px 24px; font-size: 15px; color: #fff; background: var(--_ink); }
.iff-button:hover { color: #fff; background: #000; }
.iff-button-sekundaer { min-height: 44px; padding: 12px 18px; font-size: 14px; color: var(--_ink); background: transparent; }
.iff-button-sekundaer:hover { color: var(--_ink); background: rgba(0, 0, 0, .06); }
.iff-pfeil { display: inline-block; font-size: 1.15em; line-height: 0; transition: transform 240ms var(--_ease); }
.iff-button:hover .iff-pfeil, .iff-button-sekundaer:hover .iff-pfeil { transform: translateX(4px); }

.iff-weiteres { display: flex; flex-direction: column; align-items: flex-start; gap: 20px; margin-top: 28px; }
.iff-wege { display: grid; gap: 16px; margin-top: 28px; }
.iff-weg {
  display: flex; align-items: stretch; justify-content: space-between; gap: 40px; width: 100%; min-height: 200px;
  padding: clamp(24px, 3.4vw, 44px); text-align: left; cursor: pointer;
  font: inherit; color: var(--_ink); background: #fff;
  border: 2px solid var(--_ink); border-radius: var(--_radius);
  transition: transform 240ms var(--_ease), box-shadow 240ms var(--_ease);
}
.iff-weg:hover { transform: translate(-4px, -4px); box-shadow: 8px 8px 0 var(--_teal); }
.iff-weg-kopf { display: flex; flex-direction: column; gap: 14px; flex: 7 1 0; }
.iff-weg-fuss { display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; gap: 20px; flex: 5 1 0; }
.iff-weg-label { font-size: 13px; font-weight: 500; line-height: 1.3; letter-spacing: .08em; text-transform: uppercase; color: var(--_teal-tief); }
.iff-weg-titel {
  font-family: var(--_titel-font); font-weight: 500; font-size: clamp(30px, 4vw, 48px); line-height: 1.05; letter-spacing: -.02em;
}
.iff-weg-text { color: var(--_gedaempft); }
.iff-weg-aktion {
  display: inline-flex; gap: 10px; padding-bottom: 3px;
  font-weight: 500; border-bottom: 2px solid currentColor;
}
.iff-weg-aktion::after { content: "→"; transition: transform 240ms var(--_ease); }
.iff-weg:hover .iff-weg-aktion::after { transform: translateX(4px); }

.iff-karten { display: grid; gap: 12px; width: 100%; margin: 0; padding: 0; list-style: none; container-type: inline-size; }
.iff-titel + .iff-karten { margin-top: 28px; }
.iff-karten[hidden] { display: none; }
.iff-karte {
  display: flex; flex-direction: column; gap: 20px;
  padding: 24px clamp(24px, 3vw, 36px); background: var(--_flaeche); border-radius: var(--_radius);
}
.iff-karte-kopf { display: flex; flex-direction: column; gap: 10px; }
.iff-karte-fuss { display: flex; flex-direction: column; align-items: flex-start; gap: 16px; }
@container (min-width: 640px) {
  .iff-karte { flex-direction: row; justify-content: space-between; gap: 40px; padding: 32px 36px; }
  .iff-karte-kopf { flex: 7 1 0; }
  .iff-karte-fuss { flex: 5 1 0; }
}
.iff-karte-name {
  display: flex; align-items: center; gap: 10px; margin: 0;
  font-family: var(--_titel-font); font-weight: 500; font-size: 24px; line-height: 1.2; letter-spacing: -.01em; color: var(--_ink);
}
.iff-karte-name::before { content: ""; width: 14px; height: 14px; background: var(--_programm); border: 2px solid var(--_ink); flex: none; }
.iff-karte-text { margin: 0; color: var(--_gedaempft); }
.iff-karte .iff-zeitraum { gap: 10px; margin: 0; padding: 0; border: 0; }
.iff-karte .iff-zeitraum-text { font-size: 14px; font-weight: 400; color: var(--_gedaempft); }
.iff-karte .iff-symbol { width: 18px; height: 18px; margin-top: 0; }
.iff-karte .ist-offen .iff-status { background: var(--_teal); border-color: var(--_teal); }

.iff :focus-visible { outline: 3px solid var(--_teal-tief); outline-offset: 3px; }
.iff-ergebnis :focus-visible { outline-color: var(--_ink); }
.iff-sr {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
}

@media (max-width: 640px) {
  .iff-weg { flex-direction: column; gap: 24px; aspect-ratio: 1 / 1; }
  .iff-weg-kopf, .iff-weg-fuss { flex: none; }
  .iff-weg-titel { font-size: 36px; }
  .iff-weg-fuss { margin-top: auto; }
}
@media (max-width: 560px) {
  .iff { font-size: 16px; }
  .iff-optionen { grid-template-columns: 1fr; }
  .iff-cta .iff-button { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .iff *, .iff-ansicht { animation: none !important; transition: none !important; }
  .iff-option:hover, .iff-weg:hover { transform: none; }
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
