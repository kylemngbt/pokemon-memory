import { useState, useEffect, useCallback } from "react";
import PokemonCard from "./PokemonCard";
import type { Pokemon } from "../hooks/usePokemon";

interface GameBoardProps {
  pokemon: Pokemon[];
  difficulty: string;
  onGameOver: (finalScore: number) => void;
  onWin: (finalScore: number) => void;
  onCardFlip: () => void;  // add this
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export default function GameBoard({ pokemon, difficulty, onGameOver, onWin, onCardFlip }: GameBoardProps) {
  const [cards, setCards] = useState<Pokemon[]>([]);
  const [clicked, setClicked] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    const stored = localStorage.getItem("bestScore");
    return stored ? parseInt(stored) : 0;
  });
  const [isShuffling, setIsShuffling] = useState(false);
  const [cardsShowing, setCardsShowing] = useState(true);
  const [shuffleCount, setShuffleCount] = useState(0);

  // Initial shuffle on mount
  useEffect(() => {
    setCards(shuffle(pokemon));
  }, [pokemon]);

  const handleCardClick = useCallback((id: number) => {
    if (isShuffling) return;
    onCardFlip();

    // Already clicked — game over
    if (clicked.has(id)) {
      onGameOver(score);
      return;
    }

    const newClicked = new Set(clicked).add(id);
    const newScore = score + 1;

    setScore(newScore);

    // Update best score
    if (newScore > bestScore) {
      setBestScore(newScore);
      localStorage.setItem("bestScore", String(newScore));
    }

    // Win condition — all cards clicked without repeating
    if (newClicked.size === pokemon.length) {
      onWin(newScore);
      return;
    }

    setClicked(newClicked);
    setIsShuffling(true);

    // Flip to back
    setCardsShowing(false);

    // After back is fully shown — shuffle and flip to front simultaneously
    setTimeout(() => {
      setCards(shuffle(pokemon));
      setShuffleCount(c => c + 1);
      setCardsShowing(true);
      setIsShuffling(false);
    }, 800);

  }, [clicked, score, bestScore, isShuffling, pokemon, onGameOver, onWin]);

  return (
    <>
      <style>{`
        .game-board {
          width: 100vw;
          min-height: 100vh;
          background-image: url("/pokemon-bg.png");
          background-size: cover;
          background-position: center bottom;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px 16px 40px 16px;
          font-family: 'Press Start 2P', monospace;
          image-rendering: pixelated;
          overflow-y: auto;
        }

        .game-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .game-title img {
          width: 42px;
          height: 42px;
        }

        .game-title .poke {
          color: #ff1616;
        }

        .game-title span {
          font-size: 20px;
          color: #fff;
          letter-spacing: 1px;
        }

        .scoreboard {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .score-row {
          font-size: 14px;
          color: #252525;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .progress {
          font-size: 14px;
          color: #252525;
          margin-bottom: 24px;
        }

        .card-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          justify-content: center;
          width: 100%;
          padding: 0 24px;
        }

        .difficulty-badge {
          font-size: 10px;
          color: #252525;
          margin-bottom: 8px;
        }
      `}</style>

      <div className="game-board">
        {/* Title */}
        <div className="game-title">
          <img src="/pokeball-logo.png" alt="Pokeball" />
          <span><span className="poke">Poké</span>Memory</span>
        </div>

        {/* Scoreboard */}
        <div className="scoreboard">
          <div className="score-row">SCORE: {score}</div>
          <div className="score-row">HIGH SCORE: {bestScore}</div>
        </div>

        {/* Difficulty badge */}
        <div className="difficulty-badge">{DIFFICULTY_LABEL[difficulty]}</div>

        {/* Progress */}
        <div className="progress">
          {clicked.size} / {pokemon.length}
        </div>

        {/* Card grid */}
        <div className="card-grid">
          {cards.map((p) => (
            <PokemonCard
              key={`${p.id}-${shuffleCount}`}
              id={p.id}
              name={p.name}
              image={p.image}
              cardsShowing={cardsShowing}
              onClick={() => handleCardClick(p.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}