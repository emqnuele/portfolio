# emanuelefaraci — il mio portfolio

Questo repository contiene il sito che uso per presentare chi sono, i progetti che seguo e il modo in cui collaboro con team e clienti. È un playground interattivo dove racconto il mio percorso da indie builder, CS student e automation designer.

## Cosa voglio trasmettere
- Identità chiara: hero minimale con `BlurText` e typing loop che alterna i ruoli (software, AI, automations).
- Esperienza guidata: lo scroll è “assistito” e fa snap tra hero e sezione spotlight per mantenere il ritmo.
- Navigazione tattile: cards con tilt magnetico, pulsante “magnetic” e cursore contestuale accompagnano i CTA.
- Presence costante: la `ContactBubble` resta visibile ovunque per avviare subito una conversazione.
- Story + proof: la pagina About intreccia journey, stack e rituali con illustrazioni e micro-copy personali.

## Sezioni principali
1. **Landing / Hero** – Presento nome e ruoli con BlurText + TextType e invito lo scroll verso i focus principali.
2. **Focus cards** – Due split-card (projects & about) con meta-tag e illustrazioni che portano a studi di caso o al backstage.
3. **About page** – Timeline, skill stories, stack columns e ritual signals per mostrare come lavoro ogni settimana.
4. **Contact layer** – Bubble flottante e sezione finale con link diretti (email, Telegram, GitHub) e ritorno rapido alla landing.

## Stack e pattern
- **Frontend**: React 18 + TypeScript + Vite con React Router per gestire landing e pagina about.
- **UI kit**: componenti custom (BlurText, TextType, GradualBlur, ContactBubble, GlareHover) e App.css per la direzione artistica.
- **Motion & UX**: IntersectionObserver, cursor zones, snap scrolling manuale (wheel, keyboard, touch) per mantenere il controllo della scena.
- **Assets**: illustrazioni SVG custom e immagini AVIF leggere per ritagli e avatar.

## Avviare in locale
```bash
npm install
npm run dev
```
Il server di sviluppo Vite esporrà il portfolio su `http://localhost:5173`.

---
Se vuoi contattarmi, basta un messaggio: `t.me/emqnuele`. 
