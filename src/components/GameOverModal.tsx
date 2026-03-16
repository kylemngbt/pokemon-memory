import { useEffect, useState } from "react";

interface GameOverModalProps {
  status: "gameover" | "win";
  finalScore: number;
  onPlayAgain: () => void;
  onKeepPlaying?: () => void;
  onQuit: () => void;
}

const KLIPY_API_KEY = import.meta.env.VITE_KLIPY_API_KEY;

const SAD_QUERIES = ["sad pokemon", "crying pokemon", "fainted pokemon"];
const HAPPY_QUERIES = ["happy pikachu", "excited pokemon", "pokemon celebrate"];

async function fetchRandomGif(queries: string[]): Promise<string | null> {
  try {
    const query = queries[Math.floor(Math.random() * queries.length)];
    const res = await fetch(
      `https://api.klipy.com/api/v1/${KLIPY_API_KEY}/gifs/search?q=${encodeURIComponent(query)}&page=1&per_page=25`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    const results = data?.data?.data;
    if (!results || results.length === 0) return null;
    const random = results[Math.floor(Math.random() * results.length)];
    return random?.file?.md?.gif?.url || null;
  } catch {
    return null;
  }
}

export default function GameOverModal({
  status,
  finalScore,
  onPlayAgain,
  onKeepPlaying,
  onQuit,
}: GameOverModalProps) {
  const [gifUrl, setGifUrl] = useState<string | null>(null);

  useEffect(() => {
    const queries = status === "win" ? HAPPY_QUERIES : SAD_QUERIES;
    fetchRandomGif(queries).then(setGifUrl);
  }, [status]);

  const isWin = status === "win";

  return (
    <>
      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          font-family: 'Press Start 2P', monospace;
        }

        .modal-dialog {
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
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .modal-dialog::before {
          content: '';
          position: absolute;
          inset: 6px;
          border: 2px solid #000;
          pointer-events: none;
        }

        .modal-title {
          font-size: 18px;
          color: #242424;
          text-align: center;
          line-height: 1.6;
        }

        .modal-gif {
          width: 160px;
          height: 160px;
          object-fit: cover;
        }

        .modal-gif-placeholder {
          width: 160px;
          height: 160px;
          background: #eee;
          border: 2px solid #000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 7px;
          color: #999;
        }

        .modal-score {
          font-size: 12px;
          color: #242424;
          text-align: center;
          line-height: 1.8;
        }

        .modal-divider {
          width: 100%;
          height: 2px;
          background: #000;
        }

        .modal-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          width: 100%;
        }

        .modal-btn {
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

        .modal-btn:hover {
          color: #000;
          text-decoration: underline;
        }
      `}</style>

      <div className="modal-overlay">
        <div className="modal-dialog">
          <h2 className="modal-title">{isWin ? "You Win!" : "Game Over!"}</h2>

          {gifUrl ? (
            <img className="modal-gif" src={gifUrl} alt={isWin ? "happy pokemon" : "sad pokemon"} />
          ) : (
            <div className="modal-gif-placeholder">Loading...</div>
          )}

          <p className="modal-score">Your final score is {finalScore}</p>

          <div className="modal-divider" />

          <div className="modal-actions">
            {isWin && onKeepPlaying && (
              <button className="modal-btn" onClick={onKeepPlaying}>KEEP PLAYING</button>
            )}
            <button className="modal-btn" onClick={onPlayAgain}>PLAY AGAIN</button>
            <button className="modal-btn" onClick={onQuit}>QUIT</button>
          </div>
        </div>
      </div>
    </>
  );
}