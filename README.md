# PokéMemory

A retro Pokémon-themed memory card game built with React + TypeScript. Test your memory by clicking each Pokémon card only once — the cards shuffle after every click!

---

## Live Preview

[pokemon-memory-beta.vercel.app](https://pokemon-memory-beta.vercel.app)

---

## Gameplay

- Select a difficulty to start the game
- Cards are revealed face-up showing a random Pokémon
- Click a card you **haven't clicked before** to score a point
- After every click, all cards shuffle into a new order
- Click a card you've **already clicked** and it's game over
- Click **all cards** without repeating to win and advance
- Click the **PokéMemory title** during a game to return to the menu

---

## Difficulties

| Difficulty | Cards |
|------------|-------|
| Easy       | 5     |
| Medium     | 10    |
| Hard       | 18    |

---

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v3](https://tailwindcss.com/)
- [PokéAPI](https://pokeapi.co/)
- [Klipy API](https://klipy.co/) — for Pokémon GIFs
- [react-parallax-tilt](https://github.com/mkosir/react-parallax-tilt)
- [react-howler](https://github.com/thangngoc89/react-howler) — for BGM

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

# Set up environment variables
cp .env.example .env
# Add your Klipy API key to .env

# Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Environment Variables

Create a `.env` file in the root of the project:

```
VITE_KLIPY_API_KEY=your_key_here
```

### Build for Production

```bash
npm run build
```

---
