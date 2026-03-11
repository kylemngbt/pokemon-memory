# PokéMemory

A retro Pokémon-themed memory card game built with React + TypeScript. Test your memory by clicking each Pokémon card only once — the cards shuffle after every click!

---

## Live Preview

> Coming soon

---

## Gameplay

- Select a difficulty to start the game
- Cards are revealed face-up showing a random Pokémon
- Click a card you **haven't clicked before** to score a point
- After every click, all cards shuffle into a new order
- Click a card you've **already clicked** and it's game over
- Click **all cards** without repeating to win and advance

---

## Difficulties

| Difficulty | Cards |
|------------|-------|
| Easy       | 5     |
| Medium     | 10    |
| Hard       | 18    |

---

## Features

- NES-style dialog UI with pixel font (Press Start 2P)
- Card flip animations with back/front reveal
- D tilt hover effect on cards via `react-parallax-tilt`
- Cards shuffle after every click
- Best score persisted across sessions via `localStorage`
- Random Pokémon fetched from [PokéAPI](https://pokeapi.co/) (1010+ pool)
- In-memory Pokémon caching to avoid duplicate fetches
- Keyboard navigation on difficulty select (↑ ↓ Enter)

---

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v3](https://tailwindcss.com/)
- [PokéAPI](https://pokeapi.co/)
- [react-parallax-tilt](https://github.com/mkosir/react-parallax-tilt)

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)

### Installation

```bash
# Clone the repo
git clone https://github.com/kylemngbt/pokemon-memory-game.git
cd pokemon-memory-game

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## Project Structure

```
src/
├── components/
│   ├── DifficultySelect.tsx   # Opening screen with difficulty options
│   ├── LoadingScreen.tsx      # Spinning Pokeball loading screen
│   ├── GameBoard.tsx          # Main game board with scoreboard + card grid
│   └── PokemonCard.tsx        # Individual card with flip animation + tilt
├── hooks/
│   └── usePokemon.ts          # PokeAPI fetch hook with in-memory cache
├── App.tsx                    # Screen routing and game state
└── index.css                  # Tailwind + global styles

public/
├── pokemon-bg.png             # Background image
├── card-back.png              # Card back image
└── pokeball-logo.png          # Title logo
```

---

## Roadmap

- [ ] Feature D — Game logic (win/game over screens with Pokémon GIFs)
- [ ] Feature E — Full win/game over screen UI
- [ ] Feature F — Audio (BGM + SFX)