"use strict";(()=>{function p(e,r={}){Array.isArray(window.dataLayer)&&window.dataLayer.push({event:e,...r})}var m=[{id:"gegruendet",text:"Habt ihr schon gegr\xFCndet?",optionen:[{code:"a1",label:"Ja, wir haben gegr\xFCndet",unterzeile:"z. B. GmbH, gGmbH, UG oder Einzelunternehmen",merkmal:"Bereits gegr\xFCndet"},{code:"a2",label:"Nein, noch nicht",merkmal:"Noch nicht gegr\xFCndet"}]},{id:"umsatz",text:"Wie hoch ist euer Umsatz pro Jahr?",optionen:[{code:"b1",label:"Noch keine Ums\xE4tze",merkmal:"Noch keine Ums\xE4tze"},{code:"b2",label:"Bis 10.000 \u20AC",merkmal:"Umsatz bis 10.000 \u20AC"},{code:"b3",label:"10.000 bis 50.000 \u20AC",merkmal:"Umsatz 10.000 bis 50.000 \u20AC"},{code:"b4",label:"50.000 bis 100.000 \u20AC",merkmal:"Umsatz 50.000 bis 100.000 \u20AC"},{code:"b5",label:"\xDCber 100.000 \u20AC",merkmal:"Umsatz \xFCber 100.000 \u20AC"}]},{id:"team",text:"Wie viele Personen arbeiten in eurem Team?",optionen:[{code:"c1",label:"Ich gr\xFCnde allein",merkmal:"Solo-Gr\xFCndung"},{code:"c2",label:"Zu zweit",merkmal:"Team zu zweit"},{code:"c3",label:"3 bis 5 Personen",merkmal:"Team mit 3 bis 5 Personen"},{code:"c4",label:"6 oder mehr Personen",merkmal:"Team ab 6 Personen"}]},{id:"runway",text:"Wie lang ist euer Runway?",hinweis:"Runway hei\xDFt: wie lange euer Geld noch reicht, bevor neue Einnahmen oder Finanzierung n\xF6tig werden.",optionen:[{code:"d1",label:"Weniger als 6 Monate",merkmal:"Runway unter 6 Monaten"},{code:"d2",label:"6 bis 12 Monate",merkmal:"Runway 6 bis 12 Monate"},{code:"d3",label:"Mehr als 12 Monate",merkmal:"Runway \xFCber 12 Monate"},{code:"d4",label:"Nicht relevant",unterzeile:"Vor der Gr\xFCndung oder noch keine laufenden Kosten",merkmal:"Noch keine laufenden Kosten"}]},{id:"angebot",text:"Was entwickelt ihr?",optionen:[{code:"e1",label:"Ein physisches Produkt f\xFCr Endkund:innen",unterzeile:"z. B. Lebensmittel, Kosmetik, Mode, Haushaltswaren"},{code:"e2",label:"Etwas anderes",unterzeile:"z. B. Software, Dienstleistung, B2B-L\xF6sung"}]}];function y(e,r){var f,s;return(s=(f=m.find(i=>i.id===e))==null?void 0:f.optionen.find(i=>i.code===r))==null?void 0:s.merkmal}var w={programme:[{id:"ifi",name:"Inkubator",nameAkkusativ:"den Inkubator",beschreibung:"Wir unterst\xFCtzen euch von der ersten Idee bis hin zum Markteintritt.",batch:"Batch 16",status:"offen",frist:"2026-12-14",start:null,bewerbenUrl:"https://bewerbung-ifi.impact-factory.de/",vormerkenUrl:"https://impact-factory.de/programm-inkubator"},{id:"ifa",name:"Accelerator",nameAkkusativ:"den Accelerator",beschreibung:"F\xFCr Teams, die bereits am Markt sind und nun skalieren m\xF6chten.",batch:"Batch 3",status:"vormerken",frist:null,start:"im Dezember oder Januar",bewerbenUrl:"https://bewerbung-ifa.impact-factory.de/",vormerkenUrl:"https://impact-factory.de/programm-ifanrw"},{id:"goods",name:"Goods",nameAkkusativ:"Goods",beschreibung:"Unser Accelerator f\xFCr Teams, die ein eigenes Produkt an Endkund:innen verkaufen.",batch:"Batch 1",status:"demnaechst",frist:null,start:"im ersten Halbjahr 2027",bewerbenUrl:null,vormerkenUrl:"https://impact-factory.de/programm-ubersicht"}]};var h=w.programme;function z(e){return h.some(r=>r.id===e)}function _(e){return h.find(r=>r.id===e)}function E(e){return e.status==="offen"&&e.bewerbenUrl?e.bewerbenUrl:e.vormerkenUrl}function P(e){return e.status==="offen"?`Jetzt f\xFCr ${e.nameAkkusativ} bewerben`:`F\xFCr ${e.nameAkkusativ} vormerken`}function A(e){return e.status==="offen"?`Bewerbung f\xFCr ${e.batch} offen bis einschlie\xDFlich ${j(e.frist)}.`:`Die Bewerbungsphase f\xFCr ${e.batch} beginnt ${e.start}. Merkt euch jetzt den Start vor.`}function j(e){let[r,f,s]=e.split("-");return`${s}.${f}.${r}`}var L={frage:"gegruendet",erfuelltBei:["a1"],text:"Bereits gegr\xFCndet"},I=[L,{frage:"angebot",erfuelltBei:["e1"],text:"Physisches Produkt f\xFCr Endkund:innen"},{frage:"umsatz",erfuelltBei:["b2","b3","b4","b5"],text:"Erste Ums\xE4tze"}],b=[L,{frage:"umsatz",erfuelltBei:["b3","b4","b5"],text:"Umsatz ab 10.000 \u20AC im Jahr"},{frage:"team",erfuelltBei:["c3","c4"],text:"Team ab 3 Personen"},{frage:"runway",erfuelltBei:["d2","d3"],text:"Runway von mindestens 6 Monaten"}];function U(e,r){var f;return e.erfuelltBei.includes((f=r[e.frage])!=null?f:"")}var M=(e,r)=>e.every(f=>U(f,r));function T(e){return M(I,e)?{programm:"goods",intro:"Ihr verkauft bereits ein eigenes Produkt an Endkund:innen. Goods ist unser Accelerator f\xFCr genau solche Teams.",gruende:I.map(r=>r.text)}:M(b,e)?{programm:"ifa",intro:"Ihr seid bereits am Markt und m\xF6chtet nun skalieren. Nach euren Angaben erf\xFCllt ihr die Kernkriterien des Accelerators.",gruende:b.map(r=>r.text)}:{programm:"ifi",intro:"Laut euren Angaben steht ihr noch am Anfang eurer Reise. Wir unterst\xFCtzen euch von der ersten Idee bis hin zum Markteintritt.",gruende:b.filter(r=>!U(r,e)).map(r=>y(r.frage,e[r.frage])).filter(r=>r!==void 0)}}function F(e){return m.map(r=>e[r.id]).filter(r=>r!==void 0).join("-")}var J=`
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
  max-width: 52rem;
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
.iff-alternativen {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); gap: 12px;
  width: 100%; margin: 0; padding: 0; list-style: none;
}
.iff-alternativen[hidden] { display: none; }
.iff-alternative { display: flex; flex-direction: column; align-items: flex-start; gap: 10px; padding: 24px; background: var(--_flaeche); border-radius: var(--_radius); }
.iff-alternative-name {
  display: flex; align-items: center; gap: 10px; margin: 0;
  font-family: var(--_titel-font); font-weight: 500; font-size: 24px; line-height: 1.2; letter-spacing: -.01em;
}
.iff-alternative-name::before { content: ""; width: 14px; height: 14px; background: var(--_programm); border: 2px solid var(--_ink); flex: none; }
.iff-alternative-text { margin: 0; color: var(--_gedaempft); }
.iff-alternative .iff-button-sekundaer { margin-top: 6px; }
.iff-alternative .iff-zeitraum {
  margin-top: 6px; padding-top: 14px; font-size: 14px; font-weight: 400; color: var(--_gedaempft);
  border-top-width: 1px; border-top-color: #c9cccd;
}
.iff-alternative .iff-symbol { width: 18px; height: 18px; margin-top: 0; }

.iff :focus-visible { outline: 3px solid var(--_teal-tief); outline-offset: 3px; }
.iff-ergebnis :focus-visible { outline-color: var(--_ink); }
.iff-sr {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
}

@media (max-width: 560px) {
  .iff { font-size: 16px; }
  .iff-optionen { grid-template-columns: 1fr; }
  .iff-cta .iff-button { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .iff *, .iff-ansicht { animation: none !important; transition: none !important; }
  .iff-option:hover { transform: none; }
}
`,R="iff-stil";function B(e){if(e.getElementById(R))return;let r=e.createElement("style");r.id=R,r.textContent=J,e.head.appendChild(r)}function S(e,r,f){let s=new URL(e);return s.searchParams.set("quelle",r.quelle),s.searchParams.set("empfehlung",r.empfehlung),s.searchParams.set("gewaehlt",r.gewaehlt),r.antworten&&s.searchParams.set("antworten",r.antworten),new URL(f).searchParams.forEach((i,c)=>{c.startsWith("utm_")&&s.searchParams.set(c,i)}),s.toString()}var H="http://www.w3.org/2000/svg";function t(e,r={},...f){let s=document.createElement(e);for(let[i,c]of Object.entries(r))s.setAttribute(i,c);for(let i of f)i!==null&&s.append(i);return s}function Q(e){return[t("span",{},e),t("span",{class:"iff-pfeil","aria-hidden":"true"},"\u2192")]}function Z(){let e=document.createElementNS(H,"svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true"),e.setAttribute("class","iff-symbol");for(let r of["M3 5h18v16H3z","M3 10h18","M8 2v5","M16 2v5"]){let f=document.createElementNS(H,"path");f.setAttribute("d",r),e.append(f)}return e}function N(e){return t("p",{class:"iff-zeitraum"},Z(),t("span",{},A(e)))}function G(e,r){B(e.ownerDocument),e.classList.add("iff");let f=t("div"),s=t("div",{class:"iff-sr","aria-live":"polite"});e.replaceChildren(f,s);let i={quelle:"finder",schritt:0,antworten:{},gestartet:!1};function c(a,n){var l;f.replaceChildren(t("div",{class:"iff-ansicht"},...a)),n&&((l=f.querySelector(".iff-titel"))==null||l.focus())}function q(){let a=t("div",{class:"iff-fortschritt","aria-hidden":"true",style:`--_schritte: ${m.length}`});return m.forEach((n,l)=>a.append(t("span",l<=i.schritt?{class:"ist-erreicht"}:{}))),a}function u(a){let n=m[i.schritt];s.textContent="";let l=n.optionen.map(d=>{let g=t("button",{type:"button",class:"iff-option","aria-pressed":String(i.antworten[n.id]===d.code)},t("span",{class:"iff-option-label"},d.label),d.unterzeile?t("span",{class:"iff-option-unterzeile"},d.unterzeile):null);return g.addEventListener("click",()=>K(n,d.code)),g}),o=null;i.schritt>0&&(o=t("button",{type:"button",class:"iff-link iff-link--zurueck"},"Zur\xFCck"),o.addEventListener("click",()=>{i.schritt-=1,u(!0)})),c([t("p",{class:"iff-eyebrow"},`Programm-Finder \xB7 Frage ${i.schritt+1} von ${m.length}`),q(),t("h2",{class:"iff-titel",id:"iff-frage-titel",tabindex:"-1"},n.text),n.hinweis?t("p",{class:"iff-hinweis"},n.hinweis):null,t("div",{class:"iff-optionen",role:"group","aria-labelledby":"iff-frage-titel"},...l),o],a)}function K(a,n){if(i.gestartet||(i.gestartet=!0,p("finder_start")),i.antworten[a.id]=n,i.schritt+1<m.length)i.schritt+=1,u(!0);else{let l=T(i.antworten);k(l.programm,l,!0)}}function x(a,n,l){let o=S(E(a),{quelle:i.quelle,empfehlung:n,gewaehlt:a.id,antworten:i.quelle==="finder"?F(i.antworten):""},r),d=t("a",{class:l,href:o},...Q(P(a)));return d.addEventListener("click",()=>p("finder_klick",{programm:a.id,empfohlen:a.id===n})),d}function C(a){return t("ul",{class:"iff-gruende","aria-label":"Darum passt dieses Programm"},...a.map(n=>t("li",{},t("span",{class:"iff-haken","aria-hidden":"true"},"\u2713"),n)))}function D(a){let n=t("ul",{class:"iff-alternativen",id:"iff-alternativen",hidden:""},...h.filter(o=>o.id!==a).map(o=>t("li",{class:`iff-alternative iff-programm--${o.id}`},t("h3",{class:"iff-alternative-name"},o.name),t("p",{class:"iff-alternative-text"},o.beschreibung),x(o,a,"iff-button-sekundaer"),N(o)))),l=t("button",{type:"button",class:"iff-link","aria-expanded":"false","aria-controls":"iff-alternativen"},"Ich m\xF6chte ein anderes Programm w\xE4hlen");return l.addEventListener("click",()=>{let o=n.hidden;n.hidden=!o,l.setAttribute("aria-expanded",String(o)),o&&p("finder_anderes_programm",{empfehlung:a})}),[l,n]}function W(){if(i.quelle==="finder"){let n=t("button",{type:"button",class:"iff-link iff-link--zurueck"},"Antworten \xE4ndern");return n.addEventListener("click",()=>u(!0)),n}let a=t("button",{type:"button",class:"iff-link"},"Unsicher? Mit ein paar Fragen das passende Programm finden");return a.addEventListener("click",()=>{i.quelle="finder",u(!0)}),a}function k(a,n,l){let o=_(a),d=n?"Nach euren Angaben passt am besten:":"Euer gew\xE4hltes Programm:",g=n?n.intro:o.beschreibung;c([t("section",{class:`iff-ergebnis iff-programm--${o.id}`,"aria-labelledby":"iff-ergebnis-titel"},t("p",{class:"iff-eyebrow"},n?"Unsere Empfehlung":"Programm-Finder"),t("h2",{class:"iff-titel",id:"iff-ergebnis-titel",tabindex:"-1"},t("span",{class:"iff-vorzeile"},d)," ",t("span",{class:"iff-programmname"},o.name)),t("p",{class:"iff-intro"},g),n&&n.gruende.length>0?C(n.gruende):null,t("div",{class:"iff-cta"},x(o,a,"iff-button")),N(o)),t("div",{class:"iff-weiteres"},...D(a),W())],l),s.textContent=`${d} ${o.name}. ${g}`,p("finder_ergebnis",{empfehlung:a,quelle:i.quelle})}let v=new URL(r).searchParams.get("programm");z(v)?(i.quelle="programmseite",k(v,null,!1)):u(!1)}var $=document.getElementById("if-finder");$&&G($,window.location.href);})();
