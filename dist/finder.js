"use strict";(()=>{function k(e,t={}){Array.isArray(window.dataLayer)&&window.dataLayer.push({event:e,...t})}var j={programme:[{id:"ifi",name:"Inkubator",nameAkkusativ:"den Inkubator",beschreibung:"Wir unterst\xFCtzen euch von der ersten Idee bis hin zum Markteintritt.",batch:"Batch 16",status:"offen",frist:"2026-12-14",start:null,bewerbenUrl:"https://bewerbung-ifi.impact-factory.de/",vormerkenUrl:"https://impact-factory.de/programm-inkubator"},{id:"ifa",name:"Accelerator",nameAkkusativ:"den Accelerator",beschreibung:"F\xFCr Teams, die bereits am Markt sind und nun skalieren m\xF6chten.",batch:"Batch 3",status:"vormerken",frist:null,start:"im Dezember oder Januar",bewerbenUrl:"https://bewerbung-ifa.impact-factory.de/",vormerkenUrl:"https://impact-factory.de/programm-ifanrw"},{id:"goods",name:"Goods",nameAkkusativ:"Goods",beschreibung:"Unser Accelerator f\xFCr Teams, die ein eigenes Produkt an Endkund:innen verkaufen.",batch:"Batch 1",status:"demnaechst",frist:null,start:"im ersten Halbjahr 2027",bewerbenUrl:null,vormerkenUrl:"https://impact-factory.de/programm-ubersicht"}]};var _={startEyebrow:"Bewerbung",startTitel:"Wie wollt ihr starten?",finderLabel:"Programm-Finder",finderTitel:"Wir sind uns noch unsicher.",finderText:"F\xFCnf kurze Fragen, dann bekommt ihr eine Empfehlung.",finderAktion:"Programm finden",direktLabel:"Direkt bewerben",direktTitel:"Wir wissen schon, wohin.",direktText:"W\xE4hlt euer Programm und geht direkt zur Bewerbung.",direktAktion:"Programm w\xE4hlen",direktwahlTitel:"F\xFCr welches Programm wollt ihr euch bewerben?",frageZaehler:"Programm-Finder \xB7 Frage {nummer} von {anzahl}",zurueck:"Zur\xFCck",zurueckZurAuswahl:"Zur\xFCck zur Auswahl",empfehlungEyebrow:"Unsere Empfehlung",empfehlungVorzeile:"Nach euren Angaben passt am besten:",gewaehltEyebrow:"Programm-Finder",gewaehltVorzeile:"Euer gew\xE4hltes Programm:",introIfi:"Laut euren Angaben steht ihr noch am Anfang eurer Reise. Wir unterst\xFCtzen euch von der ersten Idee bis hin zum Markteintritt.",introIfa:"Ihr seid bereits am Markt und m\xF6chtet nun skalieren. Nach euren Angaben erf\xFCllt ihr die Kernkriterien des Accelerators.",introGoods:"Ihr verkauft bereits ein eigenes Produkt an Endkund:innen. Goods ist unser Accelerator f\xFCr genau solche Teams.",kriteriumGegruendet:"Bereits gegr\xFCndet",kriteriumUmsatz:"Erste Ums\xE4tze",kriteriumTeam:"Team ab 3 Personen",kriteriumRunway:"Runway von mindestens 6 Monaten",kriteriumProdukt:"Physisches Produkt f\xFCr Endkund:innen",buttonBewerben:"Jetzt f\xFCr {programm} bewerben",buttonVormerken:"F\xFCr {programm} vormerken",statusOffen:"Bewerbung offen",statusFolgt:"Bewerbung folgt",zeitraumOffen:"Bewerbung f\xFCr {batch} offen bis einschlie\xDFlich {frist}.",zeitraumOffenOhneFrist:"Bewerbung f\xFCr {batch} offen.",zeitraumVormerken:"Die Bewerbungsphase f\xFCr {batch} beginnt {start}. Merkt euch jetzt den Start vor.",zeitraumVormerkenOhneStart:"Merkt euch jetzt den Start der n\xE4chsten Bewerbungsphase vor.",anderesProgramm:"Ich m\xF6chte ein anderes Programm w\xE4hlen",antwortenAendern:"Antworten \xE4ndern",unsicher:"Unsicher? Mit ein paar Fragen das passende Programm finden"};function b(e,t){return e.replace(/\{(\w+)\}/g,(o,r)=>{var s;return(s=t[r])!=null?s:o})}var y=j.programme;function N(e){return y.some(t=>t.id===e)}function H(e){return e.status==="offen"&&e.bewerbenUrl?e.bewerbenUrl:e.vormerkenUrl}function $(e,t){return b(e.status==="offen"?t.buttonBewerben:t.buttonVormerken,{programm:e.nameAkkusativ})}function D(e,t){return e.status==="offen"?e.frist?b(t.zeitraumOffen,{batch:e.batch,frist:ce(e.frist)}):b(t.zeitraumOffenOhneFrist,{batch:e.batch}):e.start?b(t.zeitraumVormerken,{batch:e.batch,start:e.start}):b(t.zeitraumVormerkenOhneStart,{batch:e.batch})}function ce(e){let[t,o,r]=e.split("-");return`${r}.${o}.${t}`}var x=[{id:"gegruendet",text:"Habt ihr schon gegr\xFCndet?",optionen:[{code:"a1",label:"Ja, wir haben gegr\xFCndet",unterzeile:"z. B. GmbH, gGmbH, UG oder Einzelunternehmen",merkmal:"Bereits gegr\xFCndet"},{code:"a2",label:"Nein, noch nicht",merkmal:"Noch nicht gegr\xFCndet"}]},{id:"umsatz",text:"Wie hoch ist euer Umsatz pro Jahr?",optionen:[{code:"b1",label:"Noch keine Ums\xE4tze",merkmal:"Noch keine Ums\xE4tze"},{code:"b2",label:"Bis 10.000 \u20AC",merkmal:"Umsatz bis 10.000 \u20AC"},{code:"b3",label:"10.000 bis 50.000 \u20AC",merkmal:"Umsatz 10.000 bis 50.000 \u20AC"},{code:"b4",label:"50.000 bis 100.000 \u20AC",merkmal:"Umsatz 50.000 bis 100.000 \u20AC"},{code:"b5",label:"\xDCber 100.000 \u20AC",merkmal:"Umsatz \xFCber 100.000 \u20AC"}]},{id:"team",text:"Wie viele Personen arbeiten in eurem Team?",optionen:[{code:"c1",label:"Ich gr\xFCnde allein",merkmal:"Solo-Gr\xFCndung"},{code:"c2",label:"Zu zweit",merkmal:"Team zu zweit"},{code:"c3",label:"3 bis 5 Personen",merkmal:"Team mit 3 bis 5 Personen"},{code:"c4",label:"6 oder mehr Personen",merkmal:"Team ab 6 Personen"}]},{id:"runway",text:"Wie lang ist euer Runway?",hinweis:"Runway hei\xDFt: wie lange euer Geld noch reicht, bevor neue Einnahmen oder Finanzierung n\xF6tig werden.",optionen:[{code:"d1",label:"Weniger als 6 Monate",merkmal:"Runway unter 6 Monaten"},{code:"d2",label:"6 bis 12 Monate",merkmal:"Runway 6 bis 12 Monate"},{code:"d3",label:"Mehr als 12 Monate",merkmal:"Runway \xFCber 12 Monate"},{code:"d4",label:"Nicht relevant",unterzeile:"Vor der Gr\xFCndung oder noch keine laufenden Kosten",merkmal:"Noch keine laufenden Kosten"}]},{id:"angebot",text:"Was entwickelt ihr?",optionen:[{code:"e1",label:"Ein physisches Produkt f\xFCr Endkund:innen",unterzeile:"z. B. Lebensmittel, Kosmetik, Mode, Haushaltswaren"},{code:"e2",label:"Etwas anderes",unterzeile:"z. B. Software, Dienstleistung, B2B-L\xF6sung"}]}];function G(e,t,o){var r,s;return(s=(r=e.find(i=>i.id===t))==null?void 0:r.optionen.find(i=>i.code===o))==null?void 0:s.merkmal}var q={frage:"gegruendet",erfuelltBei:["a1"],text:"kriteriumGegruendet"},K={frage:"umsatz",erfuelltBei:["b2","b3","b4","b5"],text:"kriteriumUmsatz"},W=[q,{frage:"angebot",erfuelltBei:["e1"],text:"kriteriumProdukt"},K],I=[q,K,{frage:"team",erfuelltBei:["c3","c4"],text:"kriteriumTeam"},{frage:"runway",erfuelltBei:["d2","d3"],text:"kriteriumRunway"}];function V(e,t){var o;return e.erfuelltBei.includes((o=t[e.frage])!=null?o:"")}var C=(e,t)=>e.every(o=>V(o,t));function Z(e,{fragen:t,texte:o}){return C(W,e)?{programm:"goods",intro:o.introGoods,gruende:W.map(r=>o[r.text])}:C(I,e)?{programm:"ifa",intro:o.introIfa,gruende:I.map(r=>o[r.text])}:{programm:"ifi",intro:o.introIfi,gruende:I.filter(r=>!V(r,e)).map(r=>G(t,r.frage,e[r.frage])).filter(r=>r!==void 0)}}function X(e){return x.map(t=>e[t.id]).filter(t=>t!==void 0).join("-")}var ge=`
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
.iff-link::after { content: "\u2192"; transition: transform 240ms var(--_ease); }
.iff-link:hover::after { transform: translateX(4px); }
.iff-link--zurueck::after { content: none; }
.iff-link--zurueck::before { content: "\u2190"; transition: transform 240ms var(--_ease); }
.iff-link--zurueck:hover::before { transform: translateX(-4px); }
.iff-link[aria-expanded]::after { content: "\u2193"; }
.iff-link[aria-expanded="true"]::after { content: "\u2191"; }
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
.iff-weg-aktion::after { content: "\u2192"; transition: transform 240ms var(--_ease); }
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
.iff-karte .iff-button-sekundaer {
  background: var(--_programm);
  transition: transform 240ms var(--_ease), box-shadow 240ms var(--_ease);
}
.iff-karte .iff-button-sekundaer:hover { background: var(--_programm); transform: translate(-3px, -3px); box-shadow: 6px 6px 0 var(--_teal); }

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
  .iff-option:hover, .iff-weg:hover, .iff-karte .iff-button-sekundaer:hover { transform: none; }
}
`,J="iff-stil";function Q(e){if(e.getElementById(J))return;let t=e.createElement("style");t.id=J,t.textContent=ge,e.head.appendChild(t)}function Y(e,t,o){let r=new URL(e);return r.searchParams.set("quelle",t.quelle),t.empfehlung&&r.searchParams.set("empfehlung",t.empfehlung),r.searchParams.set("gewaehlt",t.gewaehlt),t.antworten&&r.searchParams.set("antworten",t.antworten),new URL(o).searchParams.forEach((s,i)=>{i.startsWith("utm_")&&r.searchParams.set(i,s)}),r.toString()}var ee="http://www.w3.org/2000/svg";function n(e,t={},...o){let r=document.createElement(e);for(let[s,i]of Object.entries(t))r.setAttribute(s,i);for(let s of o)s!==null&&r.append(s);return r}function v(e,t,o){let r=n("button",{type:"button",class:e},t);return r.addEventListener("click",o),r}function pe(e){return[n("span",{},e),n("span",{class:"iff-pfeil","aria-hidden":"true"},"\u2192")]}function he(){let e=document.createElementNS(ee,"svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true"),e.setAttribute("class","iff-symbol");for(let t of["M3 5h18v16H3z","M3 10h18","M8 2v5","M16 2v5"]){let o=document.createElementNS(ee,"path");o.setAttribute("d",t),e.append(o)}return e}function te(e,t,o){let{fragen:r,programme:s,texte:i}=o;Q(e.ownerDocument),e.classList.add("iff");let d=n("div"),c=n("div",{class:"iff-sr","aria-live":"polite"});e.replaceChildren(d,c);let l={quelle:"finder",schritt:0,antworten:{},gestartet:!1};function ae(a){return s.find(f=>f.id===a)}function z(a,f){var u;d.replaceChildren(n("div",{class:"iff-ansicht"},...a)),f&&((u=d.querySelector(".iff-titel"))==null||u.focus())}function L(a){let f=a.status==="offen";return n("div",{class:`iff-zeitraum ${f?"ist-offen":"ist-folgend"}`},n("span",{class:"iff-status"},f?i.statusOffen:i.statusFolgt),n("p",{class:"iff-zeitraum-text"},he(),n("span",{},D(a,i))))}function M(a,f,u,m,g){let h=n("button",{type:"button",class:"iff-weg"},n("span",{class:"iff-weg-kopf"},n("span",{class:"iff-weg-label"},a),n("span",{class:"iff-weg-titel"},f)),n("span",{class:"iff-weg-fuss"},n("span",{class:"iff-weg-text"},u),n("span",{class:"iff-weg-aktion"},m)));return h.addEventListener("click",g),h}function T(a){c.textContent="",z([n("p",{class:"iff-eyebrow"},i.startEyebrow),n("h2",{class:"iff-titel",tabindex:"-1"},i.startTitel),n("div",{class:"iff-wege"},M(i.finderLabel,i.finderTitel,i.finderText,i.finderAktion,()=>{l.quelle="finder",l.schritt=0,w(!0)}),M(i.direktLabel,i.direktTitel,i.direktText,i.direktAktion,()=>{k("finder_direktwahl"),oe(!0)}))],a)}function oe(a){l.quelle="direktwahl",z([n("p",{class:"iff-eyebrow"},i.direktLabel),n("h2",{class:"iff-titel",tabindex:"-1"},i.direktwahlTitel),n("ul",{class:"iff-karten"},...s.map(f=>O(f,null))),n("div",{class:"iff-weiteres"},v("iff-link iff-link--zurueck",i.zurueckZurAuswahl,()=>T(!0)))],a)}function fe(){let a=n("div",{class:"iff-fortschritt","aria-hidden":"true",style:`--_schritte: ${r.length}`});return r.forEach((f,u)=>a.append(n("span",u<=l.schritt?{class:"ist-erreicht"}:{}))),a}function w(a){let f=r[l.schritt];c.textContent="";let u=f.optionen.map(g=>{let h=n("button",{type:"button",class:"iff-option","aria-pressed":String(l.antworten[f.id]===g.code)},n("span",{class:"iff-option-label"},g.label),g.unterzeile?n("span",{class:"iff-option-unterzeile"},g.unterzeile):null);return h.addEventListener("click",()=>se(f,g.code)),h}),m=l.schritt>0?v("iff-link iff-link--zurueck",i.zurueck,()=>{l.schritt-=1,w(!0)}):v("iff-link iff-link--zurueck",i.zurueckZurAuswahl,()=>T(!0));z([n("p",{class:"iff-eyebrow"},b(i.frageZaehler,{nummer:String(l.schritt+1),anzahl:String(r.length)})),fe(),n("h2",{class:"iff-titel",id:"iff-frage-titel",tabindex:"-1"},f.text),f.hinweis?n("p",{class:"iff-hinweis"},f.hinweis):null,n("div",{class:"iff-optionen",role:"group","aria-labelledby":"iff-frage-titel"},...u),m],a)}function se(a,f){if(l.gestartet||(l.gestartet=!0,k("finder_start")),l.antworten[a.id]=f,l.schritt+1<r.length)l.schritt+=1,w(!0);else{let u=Z(l.antworten,o);U(u.programm,u,!0)}}function S(a,f,u){let m=Y(H(a),{quelle:l.quelle,empfehlung:f,gewaehlt:a.id,antworten:l.quelle==="finder"?X(l.antworten):""},t),g=n("a",{class:u,href:m},...pe($(a,i)));return g.addEventListener("click",()=>k("finder_klick",{programm:a.id,quelle:l.quelle,empfohlen:a.id===f})),g}function O(a,f){return n("li",{class:`iff-karte iff-programm--${a.id}`},n("div",{class:"iff-karte-kopf"},n("h3",{class:"iff-karte-name"},a.name),n("p",{class:"iff-karte-text"},a.beschreibung)),n("div",{class:"iff-karte-fuss"},L(a),S(a,f,"iff-button-sekundaer")))}function le(a){return n("ul",{class:"iff-gruende","aria-label":"Darum passt dieses Programm"},...a.map(f=>n("li",{},n("span",{class:"iff-haken","aria-hidden":"true"},"\u2713"),f)))}function de(a){let f=n("ul",{class:"iff-karten",id:"iff-alternativen",hidden:""},...s.filter(m=>m.id!==a).map(m=>O(m,a))),u=n("button",{type:"button",class:"iff-link","aria-expanded":"false","aria-controls":"iff-alternativen"},i.anderesProgramm);return u.addEventListener("click",()=>{let m=f.hidden;f.hidden=!m,u.setAttribute("aria-expanded",String(m)),m&&k("finder_anderes_programm",{empfehlung:a})}),[u,f]}function me(){return l.quelle==="finder"?v("iff-link iff-link--zurueck",i.antwortenAendern,()=>w(!0)):v("iff-link",i.unsicher,()=>{l.quelle="finder",l.schritt=0,w(!0)})}function U(a,f,u){let m=ae(a),g=f?i.empfehlungVorzeile:i.gewaehltVorzeile,h=f?f.intro:m.beschreibung;z([n("section",{class:`iff-ergebnis iff-programm--${m.id}`,"aria-labelledby":"iff-ergebnis-titel"},n("p",{class:"iff-eyebrow"},f?i.empfehlungEyebrow:i.gewaehltEyebrow),n("h2",{class:"iff-titel",id:"iff-ergebnis-titel",tabindex:"-1"},n("span",{class:"iff-vorzeile"},g)," ",n("span",{class:"iff-programmname"},m.name)),n("p",{class:"iff-intro"},h),f&&f.gruende.length>0?le(f.gruende):null,n("div",{class:"iff-cta"},S(m,a,"iff-button")),L(m)),n("div",{class:"iff-weiteres"},...de(a),me())],u),c.textContent=`${g} ${m.name}. ${h}`,k("finder_ergebnis",{empfehlung:a,quelle:l.quelle})}let B=new URL(t).searchParams.get("programm");N(B)?(l.quelle="programmseite",U(B,null,!1)):T(!1)}var R={programme:y,fragen:x,texte:_},be="if-finder-inhalte",F=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),p=e=>typeof e=="string"&&e.trim()!=="",xe=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(e),ke=e=>e==="offen"||e==="vormerken"||e==="demnaechst";function re(e){if(typeof e!="string")return!1;try{let t=new URL(e);return t.protocol==="https:"||t.protocol==="http:"}catch{return!1}}var we={name:p,nameAkkusativ:p,beschreibung:p,batch:p,status:ke,frist:xe,start:p,bewerbenUrl:re,vormerkenUrl:re},ye={text:p,hinweis:p},ve={label:p,unterzeile:p,merkmal:p},ze=Object.fromEntries(Object.keys(_).map(e=>[e,p])),_e=["programme","texte","fragen","optionen"];function A(e,t,o){let r=e[t];return r===void 0?{}:F(r)?r:(o(`\u201E${t}\u201C muss ein Objekt sein und wird ignoriert.`),{})}function E(e,t,o,r){for(let s of Object.keys(e))t.includes(s)||r(`${o}: unbekannter Eintrag \u201E${s}\u201C wird ignoriert.`)}function P(e,t,o,r,s){if(t===void 0)return e;if(!F(t))return s(`${r}: muss ein Objekt sein und wird ignoriert.`),e;let i={...e};for(let[d,c]of Object.entries(t)){let l=o[d];l?l(c)?i[d]=c:s(`${r}: ung\xFCltiger Wert f\xFCr \u201E${d}\u201C wird ignoriert.`):s(`${r}: unbekanntes Feld \u201E${d}\u201C wird ignoriert.`)}return i}function Ee(e,t){e.status==="offen"&&!e.frist&&t(`programme.${e.id}: Status \u201Eoffen\u201C ohne \u201Efrist\u201C, es erscheint kein Bewerbungsschluss.`),e.status!=="offen"&&!e.start&&t(`programme.${e.id}: Status \u201E${e.status}\u201C ohne \u201Estart\u201C, es erscheint kein Starttermin.`)}function Pe(e,t){if(!F(e))return t("Die Inhalte m\xFCssen ein JSON-Objekt sein, es gelten die Standardwerte."),R;E(e,_e,"Inhalte",t);let o=A(e,"programme",t),r=A(e,"fragen",t),s=A(e,"optionen",t);E(o,y.map(d=>d.id),"programme",t),E(r,x.map(d=>d.id),"fragen",t),E(s,x.flatMap(d=>d.optionen.map(c=>c.code)),"optionen",t);let i=y.map(d=>P(d,o[d.id],we,`programme.${d.id}`,t));return i.forEach(d=>Ee(d,t)),{programme:i,fragen:x.map(d=>({...P(d,r[d.id],ye,`fragen.${d.id}`,t),optionen:d.optionen.map(c=>P(c,s[c.code],ve,`optionen.${c.code}`,t))})),texte:P(_,e.texte,ze,"texte",t)}}function ne(e,t){var s;let o=e.getElementById(be);if(!o)return R;let r;try{r=JSON.parse((s=o.textContent)!=null?s:"")}catch{return t("Die Inhalte sind kein g\xFCltiges JSON, es gelten die Standardwerte."),R}return Pe(r,t)}var ie=document.getElementById("if-finder");if(ie){let e=ne(document,t=>console.warn(`[Programm-Finder] ${t}`));te(ie,window.location.href,e)}})();
