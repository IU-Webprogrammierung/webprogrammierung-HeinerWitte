# Auflistung Technologien und Methoden zur Web-Programmierung

Entsprechend der Aufgabenstellung zur Finalisierungsphase ist hier stichpunktartig eine Auflistung aller bei der Lösung der Aufgabe erarbeiteten Errungenschaften und Erkenntnisse aufgeführt.

## Technologien

* HTML (Hypertext Markup Language): Strukturiert den Inhalt (Texte, Bilder, Links)
* CSS: Definiert das Design und Layout (Farben, Schriftarten, Abstände)

## Barrierefreiheit

Einige Beispiele zur Umsetzung der Barrierefreiheit:

* **serifenfreie Schrift**
* **Kontrast** erhöhen
* **Inhaltsbilder** haben beschreibende Texte
* **ARIA-Attribute:** Accessible Rich Internet Applications und ist eine Gruppe von HTML-Attributen, die Webseiten für Menschen mit Behinderungen barrierefrei machen, insbesondere für Nutzer von Screenreadern. ARIA erweitert HTML um Semantik für komplexe, dynamische Inhalte (z.B. Menüs, Modale), die mit Standard-HTML nicht ausreichend beschrieben werden können. \
*Im folgenden einige Beispiele für den Code:*
    * **```aria-label:```** HTML-Elementen wird eine textuelle Beschreibung für Screenreader hinzufügt
    * **```aria-current:```** um das aktuell aktive Element innerhalb einer Gruppe verwandter Elemente (hier: Navigation) für Screenreader zu kennzeichnen
    * **```aria-current="page":```**  ist ein technisches Attribut für Webseiten-Barrierefreiheit, das Screenreadern mitteilt, welches Element in einer Navigationsleiste oder einem Menü die aktuelle Seite darstellt. Es markiert den aktiven Link, damit blinde oder sehbehinderte Nutzer wissen, wo sie sich befinden.
* ```role-```Attribut ist ein wesentlicher Bestandteil von WAI-ARIA. Es teilt Hilfstechnologien wie Screenreadern mit, welche Funktion oder Bedeutung ein bestimmtes HTML-Element hat, insbesondere wenn dies nicht durch semantisches HTML (wie button, nav, header) ausgedrückt wird.
* **```:focus-visible:```** Diese CSS-Pseudoklasse wird verwendet, um interaktive Elemente (Links / Buttons) nur dann visuell hervorzuheben, wenn sie über die Tastatur (z. B. Tab-Taste) fokussiert werden.
 * WCAG 2.4.1: Tastaturnutzer können Navigation mit ``` <a class="skip-link" href="#main-content"> ``` überspringen
 * 

## Sonstige Hinweise

* Die HTML-Dateien sind nach Funktionen und nicht nach den Inhalten (wie im Navigationsmenü) benannt
* Test auf Barrierefreiheit mit Google Lighthouse