# Memory Match

A small, accessible memory-card game built with plain HTML, CSS, and JavaScript.

## Run Locally

No build step or dependencies are required. Open `index.html` in a modern browser, or serve the folder with any static web server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## How to Play

1. Select **Start game**.
2. Reveal two cards at a time to find matching pairs.
3. Match all eight pairs before the ten-minute timer expires.
4. Use the **Dark mode** switch to change the appearance. The preference is saved locally in the browser.

Cards can be selected with a mouse, keyboard, or assistive technology. The game displays the current time, moves, matched pairs, and game status.

## Security Notes

- Card values are rendered with `textContent`, not injected as HTML.
- Card order uses the browser's Web Crypto API (`crypto.getRandomValues`).
- The page includes a restrictive Content Security Policy.
- Theme storage accepts only the expected `dark-mode` value.
- This is a client-only game. A user can modify browser code or state, so scores must not be trusted for a leaderboard, reward, or competition.

## Future Full-Stack Work

A backend could add accounts, saved game history, server-validated sessions, statistics, and leaderboards. Those features would require server-side validation rather than trusting values submitted by the browser.
