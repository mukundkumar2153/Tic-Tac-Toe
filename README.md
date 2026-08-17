# Tic Tac Toe 🎮

A browser-based Tic Tac Toe game built with vanilla HTML, CSS, and JavaScript — featuring a Play with Friend mode, a Play with AI mode (3 difficulty levels including an unbeatable minimax AI), sound effects, background music, and a win/draw popup.

🔗 **Live Demo:** [mukund-tic-tac-toe.netlify.app](https://mukund-tic-tac-toe.netlify.app/)

## Features

- 👥 **Play with Friend** — choose Male vs Male, Female vs Female, or Mixed, and get randomly assigned player names for each round
- 🤖 **Play with AI** — three difficulty levels:
  - 🟢 **Easy** — AI picks a random empty cell
  - 🟠 **Medium** — 50/50 mix of random moves and optimal (minimax) moves
  - 🔴 **Hard** — unbeatable AI using the minimax algorithm
- 🏆 Score tracking vs AI, saved across sessions using `localStorage`
- 🎉 Animated win popup with a celebration GIF
- 🔊 Sound effects for clicks, wins, resets, and errors, plus looping background music
- 📱 Responsive, mobile-friendly layout

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (no frameworks or libraries)

## Project Structure

```
Tic-Tac-Toe/
├── index.html        # App markup and screen layout
├── style.css          # Styling and layout
├── script.js          # Game logic (linked in index.html)
├── javascript.js       # Earlier draft version of script.js (not used by index.html)
├── background.jpg      # Background image
├── celebrate.gif       # Win popup animation
├── tic-tac-toe (1).png # Game icon/image
├── click.mp3            # Click sound effect
├── win.mp3               # Win sound effect
├── reset.mp3              # Reset sound effect
├── backmusic.mp3           # Background music (loops)
└── README.md
```

## How to Play

1. Open the [live site](https://mukund-tic-tac-toe.netlify.app/) or open `index.html` in your browser.
2. Choose a mode: **Play with Friend** or **Play with AI**.
3. If Friend mode, pick a player pairing (Male vs Male / Female vs Female / Mixed).
4. If AI mode, pick a difficulty (Easy / Medium / Hard).
5. Tap/click cells to place your mark. First to complete a row, column, or diagonal wins!
6. Use **🔁 Play Again** to reset the board, or **⬅️ Exit** to return to the mode menu.

## Run Locally

No build tools or dependencies needed — it's a static site.

```bash
git clone https://github.com/mukundkumar2153/Tic-Tac-Toe.git
cd Tic-Tac-Toe
```

Then just open `index.html` in your browser, or serve it locally:

```bash
python -m http.server 8000
```

and visit `http://localhost:8000`.

## Deployment

The project is deployed on [Netlify](https://mukund-tic-tac-toe.netlify.app/) as a static site — no build step required.

## Notes / Known Issues

- `index.html` references `error.mp3` and `start.mp3` audio elements, but these two files aren't currently in the repo.
- `javascript.js` appears to be an earlier draft of `script.js` and isn't referenced by `index.html` — it can likely be removed to keep the repo clean.

## Author

Built by [Mukund Kumar](https://github.com/mukundkumar2153).
