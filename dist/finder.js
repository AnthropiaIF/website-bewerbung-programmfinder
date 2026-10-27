"use strict";(()=>{function p(e,n={}){Array.isArray(window.dataLayer)&&window.dataLayer.push({event:e,...n})}var m=[{id:"umsatz",text:"Wie hoch ist euer Umsatz pro Jahr?",optionen:[{code:"a1",label:"Noch keine Ums\xE4tze"},{code:"a2",label:"Bis 10.000 \u20AC"},{code:"a3",label:"10.000 bis 50.000 \u20AC"},{code:"a4",label:"50.000 bis 100.000 \u20AC"},{code:"a5",label:"\xDCber 100.000 \u20AC"}]},{id:"team",text:"Wie viele Personen arbeiten in eurem Team?",optionen:[{code:"b1",label:"Ich gr\xFCnde allein"},{code:"b2",label:"Zu zweit"},{code:"b3",label:"3 bis 5 Personen"},{code:"b4",label:"6 oder mehr Personen"}]},{id:"runway",text:"Wie lang ist euer Runway?",hinweis:"Runway hei\xDFt: wie lange euer Geld noch reicht, bevor neue Einnahmen oder Finanzierung n\xF6tig werden.",optionen:[{code:"c1",label:"Weniger als 6 Monate"},{code:"c2",label:"6 bis 12 Monate"},{code:"c3",label:"Mehr als 12 Monate"},{code:"c4",label:"Nicht relevant",unterzeile:"Vor der Gr\xFCndung oder noch keine laufenden Kosten"}]},{id:"angebot",text:"Was entwickelt ihr?",optionen:[{code:"d1",label:"Ein physisches Produkt f\xFCr Endkund:innen",unterzeile:"z. B. Lebensmittel, Kosmetik, Mode, Haushaltswaren"},{code:"d2",label:"Etwas anderes",unterzeile:"z. B. Software, Dienstleistung, B2B-L\xF6sung"}]}];var y={programme:[{id:"ifi",name:"Inkubator",nameAkkusativ:"den Inkubator",status:"offen",frist:"2026-12-14",bewerbenUrl:"https://bewerbung-ifi.impact-factory.de/",vormerkenUrl:"https://impact-factory.de/programm-inkubator"},{id:"ifa",name:"Accelerator",nameAkkusativ:"den Accelerator",status:"vormerken",frist:null,bewerbenUrl:"https://bewerbung-ifa.impact-factory.de/",vormerkenUrl:"https://impact-factory.de/programm-ifanrw"},{id:"goods",name:"Goods",nameAkkusativ:"Goods",status:"demnaechst",frist:null,bewerbenUrl:null,vormerkenUrl:"https://impact-factory.de/programm-ubersicht"}]};var g=y.programme;function w(e){return g.some(n=>n.id===e)}function _(e){return g.find(n=>n.id===e)}function z(e){return e.status==="offen"&&e.bewerbenUrl?e.bewerbenUrl:e.vormerkenUrl}function E(e){return e.status==="offen"?`Jetzt f\xFCr ${e.nameAkkusativ} bewerben`:`F\xFCr ${e.nameAkkusativ} vormerken`}function h(e){switch(e.status){case"offen":return e.frist?`Bewerbung offen bis ${C(e.frist)}`:"Bewerbung offen";case"vormerken":return"Bewerbungsphase derzeit geschlossen, Vormerken m\xF6glich";case"demnaechst":return"Startet demn\xE4chst, Vormerken m\xF6glich"}}function C(e){let[n,l,f]=e.split("-");return`${f}.${l}.${n}`}var G=[{frage:"angebot",erfuelltBei:["d1"],text:"Physisches Produkt f\xFCr Endkund:innen"},{frage:"umsatz",erfuelltBei:["a2","a3","a4","a5"],text:"Erste Ums\xE4tze"}],N=[{frage:"umsatz",erfuelltBei:["a3","a4","a5"],text:"Umsatz ab 10.000 \u20AC im Jahr"},{frage:"team",erfuelltBei:["b3","b4"],text:"Team ab 3 Personen"},{frage:"runway",erfuelltBei:["c2","c3"],text:"Runway von mindestens 6 Monaten"}];function P(e,n){return e.map(l=>{var f;return{text:l.text,erfuellt:l.erfuelltBei.includes((f=n[l.frage])!=null?f:"")}})}var I=e=>e.every(n=>n.erfuellt);function A(e){let n=P(G,e);if(I(n))return{programm:"goods",begruendung:"Ihr verkauft schon ein physisches Produkt. Genau daf\xFCr ist Goods gedacht.",kriterien:n};let l=P(N,e);return I(l)?{programm:"ifa",begruendung:"Ihr erf\xFCllt alle drei Kriterien, mit denen Startups in den Accelerator starten.",kriterien:l}:{programm:"ifi",begruendung:n[0].erfuellt?"F\xFCr den Accelerator sollten alle drei Kriterien erf\xFCllt sein. Goods kommt infrage, sobald euer Produkt erste Ums\xE4tze macht. Bis dahin ist der Inkubator euer Weg.":"F\xFCr den Accelerator sollten alle drei Kriterien erf\xFCllt sein. Der Inkubator bringt euch genau dorthin.",kriterien:l}}function L(e){return m.map(n=>e[n.id]).filter(n=>n!==void 0).join("-")}var O=`
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
.iff-begruendung { margin: 20px 0 0; max-width: 36rem; }
.iff-kriterien { display: flex; flex-wrap: wrap; gap: 8px; margin: 20px 0 0; padding: 0; list-style: none; }
.iff-kriterien li {
  display: inline-flex; align-items: center; gap: 8px; min-height: 36px; padding: 6px 14px;
  font-size: 14px; font-weight: 500; line-height: 1.2; border: 2px solid var(--_ink);
}
.iff-kriterien li.iff-nicht-erfuellt { border-style: dashed; }
.iff-zeichen { font-weight: 700; }
.iff-cta { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 20px; margin-top: 32px; }

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
.iff-status { margin: 0; font-size: 14px; font-weight: 500; }

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
.iff-alternative .iff-status { color: var(--_gedaempft); font-weight: 400; }
.iff-alternative .iff-button-sekundaer { margin-top: 6px; }

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
`,F="iff-stil";function U(e){if(e.getElementById(F))return;let n=e.createElement("style");n.id=F,n.textContent=O,e.head.appendChild(n)}function M(e,n,l){let f=new URL(e);return f.searchParams.set("quelle",n.quelle),f.searchParams.set("empfehlung",n.empfehlung),f.searchParams.set("gewaehlt",n.gewaehlt),n.antworten&&f.searchParams.set("antworten",n.antworten),new URL(l).searchParams.forEach((a,c)=>{c.startsWith("utm_")&&f.searchParams.set(c,a)}),f.toString()}function r(e,n={},...l){let f=document.createElement(e);for(let[a,c]of Object.entries(n))f.setAttribute(a,c);for(let a of l)a!==null&&f.append(a);return f}function W(e){return[r("span",{},e),r("span",{class:"iff-pfeil","aria-hidden":"true"},"\u2192")]}function R(e,n){U(e.ownerDocument),e.classList.add("iff");let l=r("div"),f=r("div",{class:"iff-sr","aria-live":"polite"});e.replaceChildren(l,f);let a={quelle:"finder",schritt:0,antworten:{},gestartet:!1};function c(i,t){var s;l.replaceChildren(r("div",{class:"iff-ansicht"},...i)),t&&((s=l.querySelector(".iff-titel"))==null||s.focus())}function K(){let i=r("div",{class:"iff-fortschritt","aria-hidden":"true",style:`--_schritte: ${m.length}`});return m.forEach((t,s)=>i.append(r("span",s<=a.schritt?{class:"ist-erreicht"}:{}))),i}function u(i){let t=m[a.schritt];f.textContent="";let s=t.optionen.map(d=>{let k=r("button",{type:"button",class:"iff-option","aria-pressed":String(a.antworten[t.id]===d.code)},r("span",{class:"iff-option-label"},d.label),d.unterzeile?r("span",{class:"iff-option-unterzeile"},d.unterzeile):null);return k.addEventListener("click",()=>B(t,d.code)),k}),o=null;a.schritt>0&&(o=r("button",{type:"button",class:"iff-link iff-link--zurueck"},"Zur\xFCck"),o.addEventListener("click",()=>{a.schritt-=1,u(!0)})),c([r("p",{class:"iff-eyebrow"},`Programm-Finder \xB7 Frage ${a.schritt+1} von ${m.length}`),K(),r("h2",{class:"iff-titel",id:"iff-frage-titel",tabindex:"-1"},t.text),t.hinweis?r("p",{class:"iff-hinweis"},t.hinweis):null,r("div",{class:"iff-optionen",role:"group","aria-labelledby":"iff-frage-titel"},...s),o],i)}function B(i,t){if(a.gestartet||(a.gestartet=!0,p("finder_start")),a.antworten[i.id]=t,a.schritt+1<m.length)a.schritt+=1,u(!0);else{let s=A(a.antworten);x(s.programm,s,!0)}}function b(i,t,s){let o=M(z(i),{quelle:a.quelle,empfehlung:t,gewaehlt:i.id,antworten:a.quelle==="finder"?L(a.antworten):""},n),d=r("a",{class:s,href:o},...W(E(i)));return d.addEventListener("click",()=>p("finder_klick",{programm:i.id,empfohlen:i.id===t})),d}function S(i){return r("ul",{class:"iff-kriterien","aria-label":"Kriterien"},...i.kriterien.map(t=>r("li",{class:t.erfuellt?"iff-erfuellt":"iff-nicht-erfuellt"},r("span",{class:"iff-zeichen","aria-hidden":"true"},t.erfuellt?"\u2713":"\u2013"),r("span",{class:"iff-sr"},t.erfuellt?"erf\xFCllt: ":"nicht erf\xFCllt: "),t.text)))}function $(i){let t=r("ul",{class:"iff-alternativen",id:"iff-alternativen",hidden:""},...g.filter(o=>o.id!==i).map(o=>r("li",{class:`iff-alternative iff-programm--${o.id}`},r("h3",{class:"iff-alternative-name"},o.name),r("p",{class:"iff-status"},h(o)),b(o,i,"iff-button-sekundaer")))),s=r("button",{type:"button",class:"iff-link","aria-expanded":"false","aria-controls":"iff-alternativen"},"Ich m\xF6chte ein anderes Programm w\xE4hlen");return s.addEventListener("click",()=>{let o=t.hidden;t.hidden=!o,s.setAttribute("aria-expanded",String(o)),o&&p("finder_anderes_programm",{empfehlung:i})}),[s,t]}function H(){if(a.quelle==="finder"){let t=r("button",{type:"button",class:"iff-link iff-link--zurueck"},"Antworten \xE4ndern");return t.addEventListener("click",()=>u(!0)),t}let i=r("button",{type:"button",class:"iff-link"},"Unsicher? Mit ein paar Fragen das passende Programm finden");return i.addEventListener("click",()=>{a.quelle="finder",u(!0)}),i}function x(i,t,s){let o=_(i),d=t?"Nach euren Angaben passt am besten:":"Euer gew\xE4hltes Programm:";c([r("section",{class:`iff-ergebnis iff-programm--${o.id}`,"aria-labelledby":"iff-ergebnis-titel"},r("p",{class:"iff-eyebrow"},t?"Unsere Empfehlung":"Programm-Finder"),r("h2",{class:"iff-titel",id:"iff-ergebnis-titel",tabindex:"-1"},r("span",{class:"iff-vorzeile"},d)," ",r("span",{class:"iff-programmname"},o.name)),t?r("p",{class:"iff-begruendung"},t.begruendung):null,t?S(t):null,r("div",{class:"iff-cta"},b(o,i,"iff-button"),r("p",{class:"iff-status"},h(o)))),r("div",{class:"iff-weiteres"},...$(i),H())],s),f.textContent=t?`${d} ${o.name}. ${t.begruendung}`:`${d} ${o.name}`,p("finder_ergebnis",{empfehlung:i,quelle:a.quelle})}let v=new URL(n).searchParams.get("programm");w(v)?(a.quelle="programmseite",x(v,null,!1)):u(!1)}var T=document.getElementById("if-finder");T&&R(T,window.location.href);})();
