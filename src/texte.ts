// Standardtexte. Jeder Schlüssel lässt sich im Webflow-Embed unter „texte“ überschreiben.
// {platzhalter} werden beim Anzeigen gefüllt.

export const TEXTE = {
  startEyebrow: 'Bewerbung',
  startTitel: 'Wie wollt ihr starten?',
  finderLabel: 'Programm-Finder',
  finderTitel: 'Wir sind uns noch unsicher.',
  finderText: 'Fünf kurze Fragen, dann bekommt ihr eine Empfehlung.',
  finderAktion: 'Programm finden',
  direktLabel: 'Direkt bewerben',
  direktTitel: 'Wir wissen schon, wohin.',
  direktText: 'Wählt euer Programm und geht direkt zur Bewerbung.',
  direktAktion: 'Programm wählen',
  direktwahlTitel: 'Für welches Programm wollt ihr euch bewerben?',
  frageZaehler: 'Programm-Finder · Frage {nummer} von {anzahl}',
  zurueck: 'Zurück',
  zurueckZurAuswahl: 'Zurück zur Auswahl',
  empfehlungEyebrow: 'Unsere Empfehlung',
  empfehlungVorzeile: 'Nach euren Angaben passt am besten:',
  gewaehltEyebrow: 'Programm-Finder',
  gewaehltVorzeile: 'Euer gewähltes Programm:',
  introIfi:
    'Laut euren Angaben steht ihr noch am Anfang eurer Reise. Wir unterstützen euch von der ersten Idee bis hin zum Markteintritt.',
  introIfa:
    'Ihr seid bereits am Markt und möchtet nun skalieren. Nach euren Angaben erfüllt ihr die Kernkriterien des Accelerators.',
  introGoods: 'Ihr verkauft bereits ein eigenes Produkt an Endkund:innen. Goods ist unser Accelerator für genau solche Teams.',
  kriteriumGegruendet: 'Bereits gegründet',
  kriteriumUmsatz: 'Erste Umsätze',
  kriteriumTeam: 'Team ab 3 Personen',
  kriteriumRunway: 'Runway von mindestens 6 Monaten',
  kriteriumProdukt: 'Physisches Produkt für Endkund:innen',
  buttonBewerben: 'Jetzt für {programm} bewerben',
  buttonVormerken: 'Für {programm} vormerken',
  statusOffen: 'Bewerbung offen',
  statusFolgt: 'Bewerbung folgt',
  zeitraumOffen: 'Bewerbung für {batch} offen bis einschließlich {frist}.',
  zeitraumOffenOhneFrist: 'Bewerbung für {batch} offen.',
  zeitraumVormerken: 'Die Bewerbungsphase für {batch} beginnt {start}. Merkt euch jetzt den Start vor.',
  zeitraumVormerkenOhneStart: 'Merkt euch jetzt den Start der nächsten Bewerbungsphase vor.',
  anderesProgramm: 'Ich möchte ein anderes Programm wählen',
  antwortenAendern: 'Antworten ändern',
  unsicher: 'Unsicher? Mit ein paar Fragen das passende Programm finden',
};

export type TextSchluessel = keyof typeof TEXTE;
export type Texte = Record<TextSchluessel, string>;

export function fuelle(vorlage: string, werte: Record<string, string>): string {
  return vorlage.replace(/\{(\w+)\}/g, (platzhalter, name: string) => werte[name] ?? platzhalter);
}
