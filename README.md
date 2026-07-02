# Auflistung Technologien und Methoden zur Web-Programmierung

Entsprechend der Aufgabenstellung zur Finalisierungsphase ist hier stichpunktartig eine Auflistung aller bei der Lösung der Aufgabe erarbeiteten Errungenschaften und Erkenntnisse aufgeführt.

## Technologien

* HTML (Hypertext Markup Language): Strukturiert den Inhalt (Texte, Bilder, Links)
* CSS: Definiert das Design und Layout (Farben, Schriftarten, Abstände)    
* Javascript: script.js steuert seitenübergreifend den header und footer
* Über ```.htaccess``` wird auf einem Apache-Webserver (Annahme, um die 404-Seite einzubinden zu können) auf die error.html-Seite umgeleitet, sobald ein Besucher eine nicht vorhandene Seite aufruft.

**Änderung nach der Umstellung auf Tailwind CSS:** 
* Statt eigenem CSS wird jetzt ausschließlich Tailwind CSS (Play-CDN, ```<script src="https://cdn.tailwindcss.com">```) über Utility-Klassen direkt in den ```class```-Attributen der HTML-Dateien verwendet – es gibt keine eigenen CSS-Dateien mehr.

## Responsive Breakpoints

Einheitliches 2-Breakpoint-System, das in jeder HTML-Datei identisch über ```tailwind.config``` (```theme.screens```) definiert ist:

* **Tablet:** ```@media (min-width: 769px) and (max-width: 1024px)```
* **Mobile:** ```@media (max-width: 768px)```
* Desktop ist das Default-Layout ohne eigene Media Query

**Änderung nach der Umstellung auf Tailwind CSS:** 
* Die Breakpoints standen ursprünglich zentral in ```style-base.css```; da es keine eigenen CSS-Dateien mehr gibt, ist die gleiche Konfiguration jetzt in einem ```<script>```-Block im ```<head>``` jeder einzelnen HTML-Datei hinterlegt (```md``` = Tablet, ```max-md``` = Mobile als eigene, projektspezifische Screen-Namen statt Tailwinds Standardwerten).

## Projektstruktur

* Die HTML-Dateien sind nach Funktionen und nicht nach den Inhalten (wie im Navigationsmenü) benannt
* Saubere Trennung in ```js/```, ```assets/```, ```components/```
* ```components/header.html``` und ```components/footer.html``` werden von ```script.js``` per ```fetch()``` in jede Seite eingebunden, um Header/Footer nicht auf jeder Seite duplizieren zu müssen

**Änderung nach der Umstellung auf Tailwind CSS:** 
* Der Ordner ```css/``` mit der gemeinsamen Basis (```style-base.css```) und 7 seitenspezifischen Dateien wurde komplett entfernt. Das Design entsteht jetzt ausschließlich über Tailwind-Utility-Klassen direkt in den HTML-Dateien, sodass keine separaten CSS-Dateien mehr gepflegt werden müssen.

## CSS-only Interaktionen

* **Global (alle Seiten):** Checkbox-Hamburger-Menü mit Icon-Animation, Skip-Link mit ```:focus```-Sichtbarkeit, ```:hover```/```:focus-visible```/```:focus-within``` auf Buttons, Karten und Tabellenzeilen
* **index.html:** Bilder-Slider per Radio-Button-Sibling-Selektoren
* **landing_offer.html:** FAQ-Akkordeon via ```<details>/<summary>```
* **events.html:** Veranstaltungsfilter per Radio-Buttons (Tour/Training/Wettkampf/Pflege), Sprungnavigation per Anchor-Links
* **detail.html:** Tab-Umschaltung der Ausrüstungs-Checkliste per Radio-Button-Logik
* **compliance.html:** Datenschutz-Akkordeon via ```<details>/<summary>```, sticky Inhaltsverzeichnis

**Änderung nach der Umstellung auf Tailwind CSS:** 
* Die Monatsblöcke in events.html wurden von ```<details>/<summary>``` auf ein Checkbox-Muster (versteckte ```<input type="checkbox">``` + ```<label>``` + ```peer-checked:```) umgestellt, da sich ```<details>``` per CSS nicht zuverlässig automatisch öffnen ließ, wenn per Anchor-Link zu einem Monat gesprungen wird.

## CSS-Variablen & Layout

* CSS Grid für Kachel-/Kartenlayouts (z. B. Vorteile-Kacheln, Partner-Karten)
* Flexbox als Haupt-Layout-Werkzeug (Header, Compliance-Layout, Sicherheitsliste u. v. m.)
* ```calc()``` für dynamische Breiten/Offsets, ```column-count``` für Mehrspalten-Text im Tablet-Breakpoint
* ```linear-gradient()``` für visuelle Akzente (Wetterbanner, Download-Karte)
* Pseudo-Elemente ```::before```/```::after``` für Akkordeon-Icons, Timeline-Linie, Steps-Linie
* Transitions auf Hover/Focus (Farbe, Transform, Border)
* ```position: sticky``` für Header, Monatsnav, Compliance-TOC

**Änderung nach der Umstellung auf Tailwind CSS:** 
* Die eigenen CSS-Dateien (```style-base.css``` + 7 seitenspezifische Dateien in ```css/```) wurden vollständig durch Tailwind-Utility-Klassen (Play-CDN) ersetzt; der Ordner ```css/``` existiert nicht mehr. Damit entfielen auch die zuvor in ```:root``` definierten CSS-Variablen ```--header-height```, ```--header-height-tablet``` und ```--header-height-mobile``` sowie das native CSS Nesting (```&```-Selektor). 
* Die sticky-Offsets für Header, Monatsnav und Compliance-TOC sind jetzt als feste Pixelwerte direkt in den Tailwind-Klassen hinterlegt (z. B. ```top-[123px] md:top-[162px] max-md:top-[70px]```)
* Statt CSS Nesting kommt Tailwinds arbiträre Selektor-Syntax (```[&_...]```) direkt in den ```class```-Attributen zum Einsatz.

## Performance-Optimierungen

* ```dns-prefetch``` + ```preconnect``` für Google Fonts
* Nicht-blockierendes CSS-Ladepattern (```media="print" onload```) mit ```<noscript>```-Fallback
* ```<script defer>``` für die einzige JS-Datei
* ```fetchpriority="high"``` auf LCP-relevanten Bildern (Hero-/Fehlerbild) kombiniert mit ```loading="lazy"``` auf nachrangigen Bildern
* Explizite ```width```/```height```-Attribute gegen Cumulative Layout Shift

## Barrierefreiheit

Einige Beispiele zur Umsetzung der Barrierefreiheit:

* **serifenfreie Schrift**
* **Kontrasterhöhung** 
* **Inhaltsbilder** haben beschreibende Texte
* **ARIA-Attribute:** Accessible Rich Internet Applications und ist eine Gruppe von HTML-Attributen, die Webseiten für Menschen mit Behinderungen barrierefrei machen, insbesondere für Nutzer von Screenreadern. ARIA erweitert HTML um Semantik für komplexe, dynamische Inhalte (z.B. Menüs, Modale), die mit Standard-HTML nicht ausreichend beschrieben werden können, z. B. ```aria-label:``` HTML-Elementen wird eine textuelle Beschreibung für Screenreader hinzufügt
* ```.sr-only```-Klasse für versteckte, aber screenreaderlesbare Inhalte
* ```role-```Attribut ist ein wesentlicher Bestandteil von WAI-ARIA. Es teilt Hilfstechnologien wie Screenreadern mit, welche Funktion oder Bedeutung ein bestimmtes HTML-Element hat, insbesondere wenn dies nicht durch semantisches HTML (wie button, nav, header) ausgedrückt wird.
* ```:focus-visible:``` Diese CSS-Pseudoklasse wird verwendet, um interaktive Elemente (Links / Buttons) nur dann visuell hervorzuheben, wenn sie über die Tastatur (z. B. Tab-Taste) fokussiert werden.
 * WCAG 2.4.1: Tastaturnutzer können Navigation mit einem Skip-Link zum Hauptinhalt überspringen
 
**Änderung nach der Umstellung auf Tailwind CSS:**
* ```aria-current```/```aria-current="page"``` wurde aus dem Code entfernt: Da Header und Navigation per ```fetch()``` seitenübergreifend eingebunden werden, ließe sich das Attribut ohne JavaScript nicht korrekt pro Seite setzen – es hätte auf jeder Seite fälschlich denselben Link als „aktiv" markiert.
* ```.sr-only``` ist keine eigene, projektdefinierte CSS-Klasse mehr, sondern die von Tailwind CSS mitgelieferte Standard-Utility-Klasse.
* Der Skip-Link nutzt keine eigene ```skip-link```-Klasse mehr, sondern wird direkt mit Tailwind-Utility-Klassen inline gestylt (```absolute ... focus:top-0```), Verhalten und Wirkung sind aber identisch geblieben.

## Sonstige Hinweise

* Formatierung des Codes mit *Prettier - Code formatter*
* Test mit Google Lighthouse auf Barrierefreiheit, Leistung, Best Practices und SEO \
z. B. Umsetzung mit:
    * in jeder HTML-Datei ```<link rel="preconnect">``` + ```<link rel="stylesheet">``` im Head für schnelleres Font-Laden
    * ```<meta name="description">``` auf allen 7 Seiten
    * Bilder mit width/height um keinen potenziellen Layout-Shift zu verursachen
* Leere ```alt```-Tags: dekorative Bilder, die keinen inhaltlichen Mehrwert haben, sind WCAG-konform. Screenreader überspringen diese Bilder
dann vollständig. \
Leere ```alt```-Tags sind auch gewollt, wo Screenreader die Beschriftung aus ```<figcaption>``` lesen und das Bild selbst dabei korrekt übersprungen wird. Das ist die empfohlene WCAG-Methode für Bilder mit Bildunterschrift.

## Tailwind CSS: Play-CDN vs. Produktivumgebung

### Was hier umgesetzt wurde: Tailwind Play-CDN

```html
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = { theme: { screens: { ... } } };
</script>
```

Das lädt den vollständigen Tailwind-Compiler als JavaScript und führt ihn bei jedem Seitenaufruf live im Browser des Besuchers aus:

1. Der Browser lädt zunächst das rohe HTML mit allen ```class="..."```-Attributen – noch ungestyled.
2. Das CDN-Skript scannt das DOM nach benutzten Klassen und generiert das passende CSS zur Laufzeit, im Browser.
3. Erst dann wird das Styling angewendet.

Das erklärt auch die Bugs, die während der Umsetzung aufgetreten sind (Hover-Effekte, die nicht griffen, ```has-[:checked]```-Kombinationen, die nicht geparst wurden) – die CDN-Runtime ist ein vereinfachter JIT-Parser, kein vollständiger Compiler, und scheitert bei komplexeren arbiträren Selektor-Kombinationen.

### Was die Tailwind-Entwickler für Produktivbetrieb vorsehen: Build-Schritt

Die offizielle Empfehlung ist ein Build-Prozess, der das CSS *vorab* generiert:

1. Node.js/npm im Projekt, ```package.json``` mit Tailwind als Dependency
2. Eine ```tailwind.config.js```-Datei (eine zentrale Konfigurationsdatei statt Duplizierung in jeder HTML-Datei)
3. Eine Quell-CSS-Datei mit ```@tailwind base; @tailwind components; @tailwind utilities;```
4. Ein Build-Befehl (```npx tailwindcss -i input.css -o output.css```), der das fertige, statische CSS einmal vorab erzeugt
5. Die HTML-Dateien laden nur noch die fertige ```output.css``` per normalem ```<link rel="stylesheet">``` – kein ```<script>```-Tag, kein Laufzeit-Overhead

**Warum trotzdem das CDN gewählt wurde:** Bei der Umsetzung war auf dem System kein Node.js/npm installiert, sodass kein ```npm install```/Build-Schritt selbst ausgeführt werden konnte und es sollten keine weiteren Technologien verwendet werden. Es wurde daraufhin die CDN-Variante gewählt, damit das Ergebnis sofort im Browser sichtbar ist, ohne dass zuerst Node installiert werden muss.

### Die praktischen Unterschiede

| | Play-CDN (hier) | Build-Schritt (Produktiv-Standard) |
|---|---|---|
| Performance | CSS wird bei jedem Aufruf neu im Browser berechnet, zusätzlicher JS-Download (~300+ KB) | CSS ist vorab generiert, nur die tatsächlich genutzten Klassen, typischerweise wenige KB |
| Zuverlässigkeit | Komplexe Klassen-Kombinationen können unzuverlässig geparst werden (wie mehrfach erlebt) | Vollständiger Compiler, keine Parsing-Lücken |
| Konfiguration | In jeder der 7 HTML-Dateien dupliziert | Eine zentrale ```tailwind.config.js``` |
| Voraussetzung | Keine – läuft direkt im Browser | Node.js/npm lokal nötig |
| Tailwinds eigene Empfehlung | Ausdrücklich **nicht für Produktivbetrieb** vorgesehen | Der empfohlene Standardweg |

## Browser-Eignung für dieses Projekt

**Kurzfassung:** Alle aktuellen Browser der letzten ca. 4 Jahre funktionieren problemlos – auf Desktop, Tablet und Mobil gleichermaßen. Es gibt keine Browser-spezifischen Einschränkungen zwischen den drei Ansichten, da alles über responsive CSS-Klassen (Tailwind-Breakpoints) gesteuert wird, nicht über unterschiedlichen Code.

### Geeignet (empfohlen)

| Browser | Ab Version | Grund |
|---|---|---|
| **Chrome / Edge** (Chromium) | ~90+ | Volle Unterstützung aller genutzten CSS-Features |
| **Firefox** | ~90+ | Volle Unterstützung |
| **Safari** (macOS/iOS) | ~15+ | Volle Unterstützung, inkl. iOS Safari für Mobile |
| **Samsung Internet** | aktuell | Basiert auf Chromium, unproblematisch |

## Mehrsprachigkeit / Internationalisierung (nicht umgesetzt)

Das Projekt ist aktuell einsprachig (Deutsch, ```lang="de"``` fest in jeder HTML-Datei). Für eine mehrsprachige Erweiterung kämen bei einem reinen HTML/Tailwind-Projekt ohne Build-Prozess und ohne Backend grundsätzlich folgende Ansätze infrage:

* **Parallele HTML-Dateien pro Sprache** (am ehesten zur aktuellen Architektur passend): für jede Seite eine zweite Version in einer eigenen Sprachordnerstruktur (z. B. ```/de/``` und ```/en/```), jeweils mit korrektem ```lang```-Attribut und ```hreflang```-Verweisen für SEO. Nachteil: Texteänderungen müssen manuell in jeder Sprachversion nachgezogen werden, der Pflegeaufwand wächst mit jeder Seite und Sprache.
* **Ausgelagerte Übersetzungstexte** (z. B. ```de.json```/```en.json```) mit ```data-i18n```-Attributen im HTML und einem Skript, das die Inhalte beim Laden je nach gewählter Sprache einsetzt.
* **Umstieg auf einen Static-Site-Generator** (z. B. Eleventy, Astro) mit nativer Mehrsprachigkeits-Unterstützung über gemeinsame Layouts und Sprachordner.

**Bewusst nicht umgesetzt:** Sowohl die ausgelagerten Übersetzungstexte als auch ein Static-Site-Generator würden zusätzliche Technologien (JavaScript-Logik über die reine Header/Footer-Einbindung hinaus bzw. Node.js/npm und einen Build-Schritt) ins Projekt bringen. Das widerspricht der bewussten Architekturentscheidung dieses Projekts, ohne Build-Prozess und mit minimalem JavaScript auszukommen (siehe Abschnitt „Tailwind CSS: Play-CDN vs. Produktivumgebung"). Mehrsprachigkeit ist daher als mögliche künftige Erweiterung dokumentiert, aber nicht Teil der aktuellen Umsetzung.