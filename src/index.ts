import { starteFinder } from './finder';
import { inhalteAusDokument } from './inhalte';

const container = document.getElementById('if-finder');
if (container) {
  const inhalte = inhalteAusDokument(document, (meldung) => console.warn(`[Programm-Finder] ${meldung}`));
  starteFinder(container, window.location.href, inhalte);
}
