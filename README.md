# Auflistung Technologien und Methoden zur Web-Programmierung

Entsprechend der Aufgabenstellung zur Finalisierungsphase ist hier stichpunktartig eine Auflistung aller bei der Lösung der Aufgabe erarbeiteten Errungenschaften und Erkenntnisse aufgeführt.

## Technologien

* HTML (Hypertext Markup Language): Strukturiert den Inhalt (Texte, Bilder, Links)
* CSS: Definiert das Design und Layout (Farben, Schriftarten, Abstände)    
* Javascript: script.js steuert seitenübergreifend den header und footer
* Über ```.htaccess``` wird auf einem Apache-Webserver (Annahme, um die 404-Seite einzubinden zu können) auf die error.html-Seite umgeleitet, sobald ein Besucher eine nicht vorhandene Seite aufruft.

## Responsive Breakpoints

Einheitliches 2-Breakpoint-System in ```style-base.css``` und allen 7 seitenspezifischen ```style-*.css```-Dateien:

* **Tablet:** ```@media (min-width: 769px) and (max-width: 1024px)```
* **Mobile:** ```@media (max-width: 768px)```
* Desktop ist das Default-Layout ohne eigene Media Query

## Projektstruktur

* Die HTML-Dateien sind nach Funktionen und nicht nach den Inhalten (wie im Navigationsmenü) benannt
* Saubere Trennung in ```css/```, ```js/```, ```assets/```, ```components/```
* CSS modular aufgeteilt: gemeinsame Basis (```style-base.css```) + 7 seitenspezifische Dateien statt einer einzigen Monolith-Datei
* ```components/header.html``` und ```components/footer.html``` werden von ```script.js``` per ```fetch()``` in jede Seite eingebunden, um Header/Footer nicht auf jeder Seite duplizieren zu müssen

## CSS-only Interaktionen

* **Global (alle Seiten):** Checkbox-Hamburger-Menü mit Icon-Animation, Skip-Link mit ```:focus```-Sichtbarkeit, ```:hover```/```:focus-visible```/```:focus-within``` auf Buttons, Karten und Tabellenzeilen
* **index.html:** Bilder-Slider per Radio-Button-Sibling-Selektoren
* **landing_offer.html:** FAQ-Akkordeon via ```<details>/<summary>```
* **events.html:** Veranstaltungsfilter per Radio-Buttons (Tour/Training/Wettkampf/Pflege), Monatsblöcke als ```<details>```-Akkordeon, Sprungnavigation per Anchor-Links
* **detail.html:** Tab-Umschaltung der Ausrüstungs-Checkliste per Radio-Button-Logik
* **compliance.html:** Datenschutz-Akkordeon via ```<details>/<summary>```, sticky Inhaltsverzeichnis

## CSS-Variablen & Layout

* ```--header-height```, ```--header-height-tablet```, ```--header-height-mobile``` in ```:root``` definiert, für konsistente ```position: sticky```-Offsets in mehreren Dateien wiederverwendet (z. B. ```top: calc(var(--header-height) + 10px)```)
* CSS Grid für Kachel-/Kartenlayouts (z. B. Vorteile-Kacheln, Partner-Karten)
* Flexbox als Haupt-Layout-Werkzeug (Header, Compliance-Layout, Sicherheitsliste u. v. m.)
* ```calc()``` für dynamische Breiten/Offsets, ```column-count``` für Mehrspalten-Text im Tablet-Breakpoint
* ```linear-gradient()``` für visuelle Akzente (Wetterbanner, Download-Karte)
* Pseudo-Elemente ```::before```/```::after``` für Akkordeon-Icons, Timeline-Linie, Steps-Linie
* Transitions auf Hover/Focus (Farbe, Transform, Border)
* ```position: sticky``` für Header, Monatsnav, Compliance-TOC
* CSS Nesting (```&```-Selektor) in jeder Datei, bis zu 4 Ebenen tief

## Performance-Optimierungen

* ```dns-prefetch``` + ```preconnect``` für Google Fonts
* Nicht-blockierendes CSS-Ladepattern (```media="print" onload```) mit ```<noscript>```-Fallback
* ```<script defer>``` für die einzige JS-Datei
* ```fetchpriority="high"``` auf LCP-relevanten Bildern (Hero-/Fehlerbild) kombiniert mit ```loading="lazy"``` auf nachrangigen Bildern
* Explizite ```width```/```height```-Attribute gegen Cumulative Layout Shift

## Barrierefreiheit

Einige Beispiele zur Umsetzung der Barrierefreiheit:

* **serifenfreie Schrift**
* **Kontrast** erhöht
* **Inhaltsbilder** haben beschreibende Texte
* **ARIA-Attribute:** Accessible Rich Internet Applications und ist eine Gruppe von HTML-Attributen, die Webseiten für Menschen mit Behinderungen barrierefrei machen, insbesondere für Nutzer von Screenreadern. ARIA erweitert HTML um Semantik für komplexe, dynamische Inhalte (z.B. Menüs, Modale), die mit Standard-HTML nicht ausreichend beschrieben werden können. \
*Im folgenden einige Beispiele für den Code:*
    * ```aria-label:``` HTML-Elementen wird eine textuelle Beschreibung für Screenreader hinzufügt
    * ```aria-current:``` um das aktuell aktive Element innerhalb einer Gruppe verwandter Elemente (hier: Navigation) für Screenreader zu kennzeichnen
    * ```aria-current="page":``` ist ein technisches Attribut für Webseiten-Barrierefreiheit, das Screenreadern mitteilt, welches Element in einer Navigationsleiste oder einem Menü die aktuelle Seite darstellt. Es markiert den aktiven Link, damit blinde oder sehbehinderte Nutzer wissen, wo sie sich befinden.
* ```.sr-only```-Klasse für versteckte, aber screenreaderlesbare Inhalte
* ```role-```Attribut ist ein wesentlicher Bestandteil von WAI-ARIA. Es teilt Hilfstechnologien wie Screenreadern mit, welche Funktion oder Bedeutung ein bestimmtes HTML-Element hat, insbesondere wenn dies nicht durch semantisches HTML (wie button, nav, header) ausgedrückt wird.
* ```:focus-visible:``` Diese CSS-Pseudoklasse wird verwendet, um interaktive Elemente (Links / Buttons) nur dann visuell hervorzuheben, wenn sie über die Tastatur (z. B. Tab-Taste) fokussiert werden.
 * WCAG 2.4.1: Tastaturnutzer können Navigation mit ``` <a class="skip-link" href="#main-content"> ``` überspringen
 
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