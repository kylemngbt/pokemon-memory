import { useState, useEffect, useCallback } from "react";
import PokemonCard from "./PokemonCard";
import type { Pokemon } from "../hooks/usePokemon";

interface GameBoardProps {
  pokemon: Pokemon[];
  difficulty: string;
  onGameOver: (finalScore: number) => void;
  onWin: (finalScore: number) => void;
  onCardFlip: () => void;
  onQuit: () => void;
  onButtonSound: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export default function GameBoard({ pokemon, difficulty, onGameOver, onWin, onCardFlip, onQuit, onButtonSound }: GameBoardProps) {
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
  const [showConfirm, setShowConfirm] = useState(false);

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

  }, [clicked, score, bestScore, isShuffling, pokemon, onGameOver, onWin, onCardFlip]);

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
          cursor: pointer;
          user-select: none;
        }

        .title-logo {
          width: 42px;
          height: 42px;
          transition: transform 0.3s ease;
        }

        .game-title:hover .title-logo {
          animation: spin 0.8s linear infinite;
        }

        .title-text {
          font-size: 20px;
          color: #fff;
          letter-spacing: 1px;
          display: inline-block;
          transition: transform 0.2s ease;
        }

        .game-title:hover .title-text {
          transform: scale(1.08);
        }

        .game-title .poke {
          color: #ff1616;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
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

        /* Confirm dialog */
        .confirm-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          font-family: 'Press Start 2P', monospace;
        }

        .confirm-dialog {
          background: #fff;
          border: 4px solid #000;
          box-shadow:
            inset -4px -4px 0 #999,
            inset 4px 4px 0 #fff,
            8px 8px 0 rgba(0,0,0,0.3);
          padding: 28px 36px 32px 36px;
          min-width: 320px;
          max-width: 380px;
          width: 90vw;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .confirm-dialog::before {
          content: '';
          position: absolute;
          inset: 6px;
          border: 2px solid #000;
          pointer-events: none;
        }

        .confirm-title {
          font-size: 11px;
          color: #242424;
          text-align: center;
          line-height: 2;
        }

        .confirm-divider {
          width: 100%;
          height: 2px;
          background: #000;
        }

        .confirm-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .confirm-btn {
          font-family: 'Press Start 2P', monospace;
          font-size: 10px;
          color: #242424;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px 0;
          transition: color 0.05s;
          letter-spacing: 0.5px;
        }

        .confirm-btn:hover {
          color: #000;
          text-decoration: underline;
        }
      `}</style>

      <div className="game-board">
        {/* Title */}
        <div className="game-title" onClick={() => setShowConfirm(true)}>
          <img className="title-logo" src="/pokeball-logo.png" alt="Pokeball" />
          <span className="title-text">
            <span className="poke">Poké</span>Memory
          </span>
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

      {/* Confirm quit dialog */}
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-dialog">
            <p className="confirm-title">Return to menu?<br />Your progress will be lost.</p>
            <div className="confirm-divider" />
            <div className="confirm-actions">
              <button className="confirm-btn" onClick={() => { onButtonSound(); onQuit(); }}>YES</button>
              <button className="confirm-btn" onClick={() => { onButtonSound(); setShowConfirm(false); }}>NO</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}