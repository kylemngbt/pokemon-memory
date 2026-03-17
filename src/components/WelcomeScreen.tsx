interface WelcomeScreenProps {
  onPlay: () => void;
}

export default function WelcomeScreen({ onPlay }: WelcomeScreenProps) {
  return (
    <>
      <style>{`
        .welcome-wrapper {
          width: 100vw;
          height: 100vh;
          background-image: url("/pokemon-bg.png");
          background-size: cover;
          background-position: center bottom;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Press Start 2P', monospace;
          image-rendering: pixelated;
          overflow: hidden;
        }

        .welcome-dialog {
          background: #fff;
          border: 4px solid #000;
          box-shadow:
            inset -4px -4px 0 #999,
            inset 4px 4px 0 #fff,
            8px 8px 0 rgba(0,0,0,0.3);
          padding: 28px 36px 32px 36px;
          min-width: 320px;
          max-width: 460px;
          width: 90vw;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .welcome-dialog::before {
          content: '';
          position: absolute;
          inset: 6px;
          border: 2px solid #000;
          pointer-events: none;
        }

        .welcome-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .welcome-logo {
          width: 36px;
          height: 36px;
          animation: spin 1.5s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .welcome-title-text {
          font-size: 16px;
          color: #242424;
          letter-spacing: 1px;
        }

        .welcome-title-text .poke {
          color: #ff1616;
        }

        .welcome-divider {
          width: 100%;
          height: 2px;
          background: #000;
        }

        .welcome-instructions {
          font-size: 9px;
          color: #242424;
          line-height: 2.2;
          text-align: center;
          padding: 0 4px;
        }

        .welcome-play-btn {
          font-family: 'Press Start 2P', monospace;
          font-size: 11px;
          color: #242424;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px 0;
          letter-spacing: 1px;
          transition: color 0.05s;
          margin-top: 4px;
        }

        .welcome-play-btn:hover {
          color: #000;
          text-decoration: underline;
        }
      `}</style>

      <div className="welcome-wrapper">
        <div className="welcome-dialog">

          {/* Title */}
          <div className="welcome-title">
            <img className="welcome-logo" src="/pokeball-logo.png" alt="Pokeball" />
            <span className="welcome-title-text">
              <span className="poke">Poké</span>Memory
            </span>
          </div>

          <div className="welcome-divider" />

          {/* Instructions */}
          <p className="welcome-instructions">
            Click on each Pokémon card once to score a point. After every click, the cards shuffle into a new order. Remember which Pokémon you have already clicked, clicking the same one twice ends the game. Click every card without repeating to win!
          </p>

          <div className="welcome-divider" />

          {/* Play button */}
          <button className="welcome-play-btn" onClick={onPlay}>
            PLAY
          </button>

        </div>
      </div>
    </>
  );
}