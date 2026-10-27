import { starteFinder } from './finder';

const container = document.getElementById('if-finder');
if (container) {
  starteFinder(container, window.location.href);
}
