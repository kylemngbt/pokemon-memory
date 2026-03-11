import { useState, useEffect } from "react";

const DIFFICULTIES = [
  { id: "easy",   label: "Easy",   cards: 5  },
  { id: "medium", label: "Medium", cards: 10 },
  { id: "hard",   label: "Hard",   cards: 18 },
];

interface DifficultySelectProps {
  onSelect?: (difficulty: string) => void;
}

export default function DifficultySelect({ onSelect }: DifficultySelectProps) {
  const [cursor, setCursor] = useState("medium");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = DIFFICULTIES.findIndex((d) => d.id === cursor);

      if (e.key === "ArrowDown") {
        const next = DIFFICULTIES[currentIndex + 1];
        if (next) setCursor(next.id);
      }

      if (e.key === "ArrowUp") {
        const prev = DIFFICULTIES[currentIndex - 1];
        if (prev) setCursor(prev.id);
      }

      if (e.key === "Enter") {
        if (onSelect) onSelect(cursor);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cursor, onSelect]);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        body, #root {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }

        .game-wrapper {
          width: 100vw;
          height: 100vh;
          background-size: cover;
          background-position: center bottom;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Press Start 2P', monospace;
          image-rendering: pixelated;
        }

        .nes-dialog {
          background: #fff;
          border: 4px solid #000;
          box-shadow:
            inset -4px -4px 0 #999,
            inset 4px 4px 0 #fff,
            8px 8px 0 rgba(0,0,0,0.3);
          padding: 28px 36px 32px 36px;
          min-width: 320px;
          max-width: 420px;
          width: 90vw;
          position: relative;
          font-weight: normal;
          -webkit-font-smoothing: antialiased;
        }

        .nes-dialog::before {
          content: '';
          position: absolute;
          inset: 6px;
          border: 2px solid #000;
          pointer-events: none;
        }

        .nes-dialog h2 {
          font-size: 13px;
          font-weight: 300;
          line-height: 1.8;
          color: #242424;
          margin-bottom: 20px;
          text-align: center;
          letter-spacing: 0.5px;
        }

        .nes-divider {
          width: 100%;
          height: 2px;
          background: #000;
          margin-bottom: 20px;
        }

        .difficulty-list {
          list-style: none;
          padding: 0;
          margin: 0 0 24px 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .difficulty-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          color: #242424;
          cursor: pointer;
          padding: 4px 0;
          transition: color 0.05s;
          user-select: none;
        }

        .difficulty-item:hover {
          color: #000;
        }

        .difficulty-item .cursor-arrow {
          width: 10px;
          display: inline-block;
          text-align: center;
          font-size: 11px;
          visibility: hidden;
        }

        .difficulty-item.selected .cursor-arrow {
          visibility: visible;
          animation: blink 0.7s step-start infinite;
        }

        .difficulty-item .label {
          line-height: 1;
        }

        .nes-footer {
          border-top: 2px solid #000;
          padding-top: 16px;
          font-size: 8px;
          color: #555;
          text-align: left;
          cursor: pointer;
          transition: color 0.1s;
        }

        .nes-footer:hover { color: #000; }

        @keyframes blink {
          0%, 100% { visibility: visible; }
          50%       { visibility: hidden; }
        }
      `}</style>

      <div
        className="game-wrapper"
        style={{ backgroundImage: `url("/pokemon-bg.png")` }}
      >
        <div className="nes-dialog">
          <h2>Select a difficulty level</h2>
          <div className="nes-divider" />

          <ul className="difficulty-list">
            {DIFFICULTIES.map((d) => (
              <li
                key={d.id}
                className={`difficulty-item ${cursor === d.id ? "selected" : ""}`}
                onClick={() => { setCursor(d.id); if (onSelect) onSelect(d.id); }}
                onMouseEnter={() => setCursor(d.id)}
              >
                <span className="cursor-arrow">▶</span>
                <span className="label">{d.label}</span>
              </li>
            ))}
          </ul>

          <div
            className="nes-footer"
            onClick={() => window.open("https://github.com/kylemngbt/pokemon-memory-game", "_blank")}
          >
            GITHUB REPO
          </div>
        </div>
      </div>
    </>
  );
}