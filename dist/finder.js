"use strict";(()=>{function x(e,r={}){Array.isArray(window.dataLayer)&&window.dataLayer.push({event:e,...r})}var j={programme:[{id:"ifi",name:"Inkubator",nameAkkusativ:"den Inkubator",beschreibung:"Wir unterst\xFCtzen euch von der ersten Idee bis hin zum Markteintritt.",batch:"Batch 16",status:"offen",frist:"2026-12-14",start:null,bewerbenUrl:"https://bewerbung-ifi.impact-factory.de/",vormerkenUrl:"https://impact-factory.de/programm-inkubator"},{id:"ifa",name:"Accelerator",nameAkkusativ:"den Accelerator",beschreibung:"F\xFCr Teams, die bereits am Markt sind und nun skalieren m\xF6chten.",batch:"Batch 3",status:"vormerken",frist:null,start:"im Dezember oder Januar",bewerbenUrl:"https://bewerbung-ifa.impact-factory.de/",vormerkenUrl:"https://impact-factory.de/programm-ifanrw"},{id:"goods",name:"Goods",nameAkkusativ:"Goods",beschreibung:"Unser Accelerator f\xFCr Teams, die ein eigenes Produkt an Endkund:innen verkaufen.",batch:"Batch 1",status:"demnaechst",frist:null,start:"im ersten Halbjahr 2027",bewerbenUrl:null,vormerkenUrl:"https://impact-factory.de/programm-ubersicht"}]};var E={startEyebrow:"Bewerbung",startTitel:"Wie wollt ihr starten?",finderLabel:"Programm-Finder",finderTitel:"Wir sind uns noch unsicher.",finderText:"F\xFCnf kurze Fragen, dann bekommt ihr eine Empfehlung.",finderAktion:"Programm finden",direktLabel:"Direkt bewerben",direktTitel:"Wir wissen schon, wohin.",direktText:"W\xE4hlt euer Programm und geht direkt zur Bewerbung.",direktAktion:"Programm w\xE4hlen",direktwahlTitel:"F\xFCr welches Programm wollt ihr euch bewerben?",frageZaehler:"Programm-Finder \xB7 Frage {nummer} von {anzahl}",zurueck:"Zur\xFCck",zurueckZurAuswahl:"Zur\xFCck zur Auswahl",empfehlungEyebrow:"Unsere Empfehlung",empfehlungVorzeile:"Nach euren Angaben passt am besten:",gewaehltEyebrow:"Programm-Finder",gewaehltVorzeile:"Euer gew\xE4hltes Programm:",introIfi:"Laut euren Angaben steht ihr noch am Anfang eurer Reise. Wir unterst\xFCtzen euch von der ersten Idee bis hin zum Markteintritt.",introIfa:"Ihr seid bereits am Markt und m\xF6chtet nun skalieren. Nach euren Angaben erf\xFCllt ihr die Kernkriterien des Accelerators.",introGoods:"Ihr verkauft bereits ein eigenes Produkt an Endkund:innen. Goods ist unser Accelerator f\xFCr genau solche Teams.",kriteriumGegruendet:"Bereits gegr\xFCndet",kriteriumUmsatz:"Umsatz ab 10.000 \u20AC im Jahr",kriteriumTeam:"Team ab 3 Personen",kriteriumRunway:"Runway von mindestens 6 Monaten",kriteriumProdukt:"Physisches Produkt f\xFCr Endkund:innen",kriteriumErsteUmsaetze:"Erste Ums\xE4tze",buttonBewerben:"Jetzt f\xFCr {programm} bewerben",buttonVormerken:"F\xFCr {programm} vormerken",zeitraumOffen:"Bewerbung f\xFCr {batch} offen bis einschlie\xDFlich {frist}.",zeitraumOffenOhneFrist:"Bewerbung f\xFCr {batch} offen.",zeitraumVormerken:"Die Bewerbungsphase f\xFCr {batch} beginnt {start}. Merkt euch jetzt den Start vor.",zeitraumVormerkenOhneStart:"Merkt euch jetzt den Start der n\xE4chsten Bewerbungsphase vor.",anderesProgramm:"Ich m\xF6chte ein anderes Programm w\xE4hlen",antwortenAendern:"Antworten \xE4ndern",unsicher:"Unsicher? Mit ein paar Fragen das passende Programm finden"};function b(e,r){return e.replace(/\{(\w+)\}/g,(a,t)=>{var f;return(f=r[t])!=null?f:a})}var y=j.programme;function N(e){return y.some(r=>r.id===e)}function H(e){return e.status==="offen"&&e.bewerbenUrl?e.bewerbenUrl:e.vormerkenUrl}function D(e,r){return b(e.status==="offen"?r.buttonBewerben:r.buttonVormerken,{programm:e.nameAkkusativ})}function G(e,r){return e.status==="offen"?e.frist?b(r.zeitraumOffen,{batch:e.batch,frist:ue(e.frist)}):b(r.zeitraumOffenOhneFrist,{batch:e.batch}):e.start?b(r.zeitraumVormerken,{batch:e.batch,start:e.start}):b(r.zeitraumVormerkenOhneStart,{batch:e.batch})}function ue(e){let[r,a,t]=e.split("-");return`${t}.${a}.${r}`}var k=[{id:"gegruendet",text:"Habt ihr schon gegr\xFCndet?",optionen:[{code:"a1",label:"Ja, wir haben gegr\xFCndet",unterzeile:"z. B. GmbH, gGmbH, UG oder Einzelunternehmen",merkmal:"Bereits gegr\xFCndet"},{code:"a2",label:"Nein, noch nicht",merkmal:"Noch nicht gegr\xFCndet"}]},{id:"umsatz",text:"Wie hoch ist euer Umsatz pro Jahr?",optionen:[{code:"b1",label:"Noch keine Ums\xE4tze",merkmal:"Noch keine Ums\xE4tze"},{code:"b2",label:"Bis 10.000 \u20AC",merkmal:"Umsatz bis 10.000 \u20AC"},{code:"b3",label:"10.000 bis 50.000 \u20AC",merkmal:"Umsatz 10.000 bis 50.000 \u20AC"},{code:"b4",label:"50.000 bis 100.000 \u20AC",merkmal:"Umsatz 50.000 bis 100.000 \u20AC"},{code:"b5",label:"\xDCber 100.000 \u20AC",merkmal:"Umsatz \xFCber 100.000 \u20AC"}]},{id:"team",text:"Wie viele Personen arbeiten in eurem Team?",optionen:[{code:"c1",label:"Ich gr\xFCnde allein",merkmal:"Solo-Gr\xFCndung"},{code:"c2",label:"Zu zweit",merkmal:"Team zu zweit"},{code:"c3",label:"3 bis 5 Personen",merkmal:"Team mit 3 bis 5 Personen"},{code:"c4",label:"6 oder mehr Personen",merkmal:"Team ab 6 Personen"}]},{id:"runway",text:"Wie lang ist euer Runway?",hinweis:"Runway hei\xDFt: wie lange euer Geld noch reicht, bevor neue Einnahmen oder Finanzierung n\xF6tig werden.",optionen:[{code:"d1",label:"Weniger als 6 Monate",merkmal:"Runway unter 6 Monaten"},{code:"d2",label:"6 bis 12 Monate",merkmal:"Runway 6 bis 12 Monate"},{code:"d3",label:"Mehr als 12 Monate",merkmal:"Runway \xFCber 12 Monate"},{code:"d4",label:"Nicht relevant",unterzeile:"Vor der Gr\xFCndung oder noch keine laufenden Kosten",merkmal:"Noch keine laufenden Kosten"}]},{id:"angebot",text:"Was entwickelt ihr?",optionen:[{code:"e1",label:"Ein physisches Produkt f\xFCr Endkund:innen",unterzeile:"z. B. Lebensmittel, Kosmetik, Mode, Haushaltswaren"},{code:"e2",label:"Etwas anderes",unterzeile:"z. B. Software, Dienstleistung, B2B-L\xF6sung"}]}];function $(e,r,a){var t,f;return(f=(t=e.find(o=>o.id===r))==null?void 0:t.optionen.find(o=>o.code===a))==null?void 0:f.merkmal}var C={frage:"gegruendet",erfuelltBei:["a1"],text:"kriteriumGegruendet"},W=[C,{frage:"angebot",erfuelltBei:["e1"],text:"kriteriumProdukt"},{frage:"umsatz",erfuelltBei:["b2","b3","b4","b5"],text:"kriteriumErsteUmsaetze"}],I=[C,{frage:"umsatz",erfuelltBei:["b3","b4","b5"],text:"kriteriumUmsatz"},{frage:"team",erfuelltBei:["c3","c4"],text:"kriteriumTeam"},{frage:"runway",erfuelltBei:["d2","d3"],text:"kriteriumRunway"}];function K(e,r){var a;return e.erfuelltBei.includes((a=r[e.frage])!=null?a:"")}var q=(e,r)=>e.every(a=>K(a,r));function V(e,{fragen:r,texte:a}){return q(W,e)?{programm:"goods",intro:a.introGoods,gruende:W.map(t=>a[t.text])}:q(I,e)?{programm:"ifa",intro:a.introIfa,gruende:I.map(t=>a[t.text])}:{programm:"ifi",intro:a.introIfi,gruende:I.filter(t=>!K(t,e)).map(t=>$(r,t.frage,e[t.frage])).filter(t=>t!==void 0)}}function Z(e){return k.map(r=>e[r.id]).filter(r=>r!==void 0).join("-")}var ge=`
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
  display: flex; align-items: flex-start; gap: 12px; margin: 28px 0 0; padding-top: 20px;
  font-size: 15px; font-weight: 500; line-height: 1.4; border-top: 2px solid var(--_ink);
}
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

.iff-karten {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); gap: 12px;
  width: 100%; margin: 0; padding: 0; list-style: none;
}
.iff-titel + .iff-karten { margin-top: 28px; }
.iff-karten[hidden] { display: none; }
.iff-karte {
  display: grid; grid-row: span 4; grid-template-rows: subgrid; row-gap: 12px; justify-items: start; align-content: start;
  padding: 24px; background: var(--_flaeche); border-radius: var(--_radius);
}
.iff-karte-name {
  display: flex; align-items: center; gap: 10px; margin: 0;
  font-family: var(--_titel-font); font-weight: 500; font-size: 24px; line-height: 1.2; letter-spacing: -.01em; color: var(--_ink);
}
.iff-karte-name::before { content: ""; width: 14px; height: 14px; background: var(--_programm); border: 2px solid var(--_ink); flex: none; }
.iff-karte-text { margin: 0; color: var(--_gedaempft); }
.iff-karte .iff-button-sekundaer { align-self: start; }
.iff-karte .iff-zeitraum {
  align-self: start; margin-top: 0; padding-top: 14px; font-size: 14px; font-weight: 400; color: var(--_gedaempft);
  border-top-width: 1px; border-top-color: #c9cccd;
}
.iff-karte .iff-symbol { width: 18px; height: 18px; margin-top: 0; }

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
`,J="iff-stil";function X(e){if(e.getElementById(J))return;let r=e.createElement("style");r.id=J,r.textContent=ge,e.head.appendChild(r)}function Q(e,r,a){let t=new URL(e);return t.searchParams.set("quelle",r.quelle),r.empfehlung&&t.searchParams.set("empfehlung",r.empfehlung),t.searchParams.set("gewaehlt",r.gewaehlt),r.antworten&&t.searchParams.set("antworten",r.antworten),new URL(a).searchParams.forEach((f,o)=>{o.startsWith("utm_")&&t.searchParams.set(o,f)}),t.toString()}var Y="http://www.w3.org/2000/svg";function n(e,r={},...a){let t=document.createElement(e);for(let[f,o]of Object.entries(r))t.setAttribute(f,o);for(let f of a)f!==null&&t.append(f);return t}function v(e,r,a){let t=n("button",{type:"button",class:e},r);return t.addEventListener("click",a),t}function ce(e){return[n("span",{},e),n("span",{class:"iff-pfeil","aria-hidden":"true"},"\u2192")]}function pe(){let e=document.createElementNS(Y,"svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true"),e.setAttribute("class","iff-symbol");for(let r of["M3 5h18v16H3z","M3 10h18","M8 2v5","M16 2v5"]){let a=document.createElementNS(Y,"path");a.setAttribute("d",r),e.append(a)}return e}function ee(e,r,a){let{fragen:t,programme:f,texte:o}=a;X(e.ownerDocument),e.classList.add("iff");let m=n("div"),g=n("div",{class:"iff-sr","aria-live":"polite"});e.replaceChildren(m,g);let l={quelle:"finder",schritt:0,antworten:{},gestartet:!1};function ie(i){return f.find(s=>s.id===i)}function z(i,s){var u;m.replaceChildren(n("div",{class:"iff-ansicht"},...i)),s&&((u=m.querySelector(".iff-titel"))==null||u.focus())}function F(i){return n("p",{class:"iff-zeitraum"},pe(),n("span",{},G(i,o)))}function M(i,s,u,d,c){let h=n("button",{type:"button",class:"iff-weg"},n("span",{class:"iff-weg-kopf"},n("span",{class:"iff-weg-label"},i),n("span",{class:"iff-weg-titel"},s)),n("span",{class:"iff-weg-fuss"},n("span",{class:"iff-weg-text"},u),n("span",{class:"iff-weg-aktion"},d)));return h.addEventListener("click",c),h}function T(i){g.textContent="",z([n("p",{class:"iff-eyebrow"},o.startEyebrow),n("h2",{class:"iff-titel",tabindex:"-1"},o.startTitel),n("div",{class:"iff-wege"},M(o.finderLabel,o.finderTitel,o.finderText,o.finderAktion,()=>{l.quelle="finder",l.schritt=0,w(!0)}),M(o.direktLabel,o.direktTitel,o.direktText,o.direktAktion,()=>{x("finder_direktwahl"),ae(!0)}))],i)}function ae(i){l.quelle="direktwahl",z([n("p",{class:"iff-eyebrow"},o.direktLabel),n("h2",{class:"iff-titel",tabindex:"-1"},o.direktwahlTitel),n("ul",{class:"iff-karten"},...f.map(s=>U(s,null))),n("div",{class:"iff-weiteres"},v("iff-link iff-link--zurueck",o.zurueckZurAuswahl,()=>T(!0)))],i)}function oe(){let i=n("div",{class:"iff-fortschritt","aria-hidden":"true",style:`--_schritte: ${t.length}`});return t.forEach((s,u)=>i.append(n("span",u<=l.schritt?{class:"ist-erreicht"}:{}))),i}function w(i){let s=t[l.schritt];g.textContent="";let u=s.optionen.map(c=>{let h=n("button",{type:"button",class:"iff-option","aria-pressed":String(l.antworten[s.id]===c.code)},n("span",{class:"iff-option-label"},c.label),c.unterzeile?n("span",{class:"iff-option-unterzeile"},c.unterzeile):null);return h.addEventListener("click",()=>se(s,c.code)),h}),d=l.schritt>0?v("iff-link iff-link--zurueck",o.zurueck,()=>{l.schritt-=1,w(!0)}):v("iff-link iff-link--zurueck",o.zurueckZurAuswahl,()=>T(!0));z([n("p",{class:"iff-eyebrow"},b(o.frageZaehler,{nummer:String(l.schritt+1),anzahl:String(t.length)})),oe(),n("h2",{class:"iff-titel",id:"iff-frage-titel",tabindex:"-1"},s.text),s.hinweis?n("p",{class:"iff-hinweis"},s.hinweis):null,n("div",{class:"iff-optionen",role:"group","aria-labelledby":"iff-frage-titel"},...u),d],i)}function se(i,s){if(l.gestartet||(l.gestartet=!0,x("finder_start")),l.antworten[i.id]=s,l.schritt+1<t.length)l.schritt+=1,w(!0);else{let u=V(l.antworten,a);O(u.programm,u,!0)}}function S(i,s,u){let d=Q(H(i),{quelle:l.quelle,empfehlung:s,gewaehlt:i.id,antworten:l.quelle==="finder"?Z(l.antworten):""},r),c=n("a",{class:u,href:d},...ce(D(i,o)));return c.addEventListener("click",()=>x("finder_klick",{programm:i.id,quelle:l.quelle,empfohlen:i.id===s})),c}function U(i,s){return n("li",{class:`iff-karte iff-programm--${i.id}`},n("h3",{class:"iff-karte-name"},i.name),n("p",{class:"iff-karte-text"},i.beschreibung),S(i,s,"iff-button-sekundaer"),F(i))}function fe(i){return n("ul",{class:"iff-gruende","aria-label":"Darum passt dieses Programm"},...i.map(s=>n("li",{},n("span",{class:"iff-haken","aria-hidden":"true"},"\u2713"),s)))}function le(i){let s=n("ul",{class:"iff-karten",id:"iff-alternativen",hidden:""},...f.filter(d=>d.id!==i).map(d=>U(d,i))),u=n("button",{type:"button",class:"iff-link","aria-expanded":"false","aria-controls":"iff-alternativen"},o.anderesProgramm);return u.addEventListener("click",()=>{let d=s.hidden;s.hidden=!d,u.setAttribute("aria-expanded",String(d)),d&&x("finder_anderes_programm",{empfehlung:i})}),[u,s]}function me(){return l.quelle==="finder"?v("iff-link iff-link--zurueck",o.antwortenAendern,()=>w(!0)):v("iff-link",o.unsicher,()=>{l.quelle="finder",l.schritt=0,w(!0)})}function O(i,s,u){let d=ie(i),c=s?o.empfehlungVorzeile:o.gewaehltVorzeile,h=s?s.intro:d.beschreibung;z([n("section",{class:`iff-ergebnis iff-programm--${d.id}`,"aria-labelledby":"iff-ergebnis-titel"},n("p",{class:"iff-eyebrow"},s?o.empfehlungEyebrow:o.gewaehltEyebrow),n("h2",{class:"iff-titel",id:"iff-ergebnis-titel",tabindex:"-1"},n("span",{class:"iff-vorzeile"},c)," ",n("span",{class:"iff-programmname"},d.name)),n("p",{class:"iff-intro"},h),s&&s.gruende.length>0?fe(s.gruende):null,n("div",{class:"iff-cta"},S(d,i,"iff-button")),F(d)),n("div",{class:"iff-weiteres"},...le(i),me())],u),g.textContent=`${c} ${d.name}. ${h}`,x("finder_ergebnis",{empfehlung:i,quelle:l.quelle})}let B=new URL(r).searchParams.get("programm");N(B)?(l.quelle="programmseite",O(B,null,!1)):T(!1)}var R={programme:y,fragen:k,texte:E},he="if-finder-inhalte",L=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),p=e=>typeof e=="string"&&e.trim()!=="",be=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(e),ke=e=>e==="offen"||e==="vormerken"||e==="demnaechst";function re(e){if(typeof e!="string")return!1;try{let r=new URL(e);return r.protocol==="https:"||r.protocol==="http:"}catch{return!1}}var xe={name:p,nameAkkusativ:p,beschreibung:p,batch:p,status:ke,frist:be,start:p,bewerbenUrl:re,vormerkenUrl:re},we={text:p,hinweis:p},ye={label:p,unterzeile:p,merkmal:p},ve=Object.fromEntries(Object.keys(E).map(e=>[e,p])),ze=["programme","texte","fragen","optionen"];function A(e,r,a){let t=e[r];return t===void 0?{}:L(t)?t:(a(`\u201E${r}\u201C muss ein Objekt sein und wird ignoriert.`),{})}function _(e,r,a,t){for(let f of Object.keys(e))r.includes(f)||t(`${a}: unbekannter Eintrag \u201E${f}\u201C wird ignoriert.`)}function P(e,r,a,t,f){if(r===void 0)return e;if(!L(r))return f(`${t}: muss ein Objekt sein und wird ignoriert.`),e;let o={...e};for(let[m,g]of Object.entries(r)){let l=a[m];l?l(g)?o[m]=g:f(`${t}: ung\xFCltiger Wert f\xFCr \u201E${m}\u201C wird ignoriert.`):f(`${t}: unbekanntes Feld \u201E${m}\u201C wird ignoriert.`)}return o}function Ee(e,r){e.status==="offen"&&!e.frist&&r(`programme.${e.id}: Status \u201Eoffen\u201C ohne \u201Efrist\u201C, es erscheint kein Bewerbungsschluss.`),e.status!=="offen"&&!e.start&&r(`programme.${e.id}: Status \u201E${e.status}\u201C ohne \u201Estart\u201C, es erscheint kein Starttermin.`)}function _e(e,r){if(!L(e))return r("Die Inhalte m\xFCssen ein JSON-Objekt sein, es gelten die Standardwerte."),R;_(e,ze,"Inhalte",r);let a=A(e,"programme",r),t=A(e,"fragen",r),f=A(e,"optionen",r);_(a,y.map(m=>m.id),"programme",r),_(t,k.map(m=>m.id),"fragen",r),_(f,k.flatMap(m=>m.optionen.map(g=>g.code)),"optionen",r);let o=y.map(m=>P(m,a[m.id],xe,`programme.${m.id}`,r));return o.forEach(m=>Ee(m,r)),{programme:o,fragen:k.map(m=>({...P(m,t[m.id],we,`fragen.${m.id}`,r),optionen:m.optionen.map(g=>P(g,f[g.code],ye,`optionen.${g.code}`,r))})),texte:P(E,e.texte,ve,"texte",r)}}function te(e,r){var f;let a=e.getElementById(he);if(!a)return R;let t;try{t=JSON.parse((f=a.textContent)!=null?f:"")}catch{return r("Die Inhalte sind kein g\xFCltiges JSON, es gelten die Standardwerte."),R}return _e(t,r)}var ne=document.getElementById("if-finder");if(ne){let e=te(document,r=>console.warn(`[Programm-Finder] ${r}`));ee(ne,window.location.href,e)}})();
