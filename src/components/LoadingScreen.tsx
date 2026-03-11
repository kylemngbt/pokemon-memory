export default function LoadingScreen() {
  return (
    <>
      <style>{`
        .loading-screen {
          width: 100vw;
          height: 100vh;
          background-image: url("/pokemon-bg.png");
          background-size: cover;
          background-position: center bottom;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 28px;
          font-family: 'Press Start 2P', monospace;
          image-rendering: pixelated;
        }

        .pokeball-wrapper {
          animation: spin 1s linear infinite;
          width: 120px;
          height: 120px;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .loading-text {
          font-size: 16px;
          color: #212121;
          padding: 8px 16px;
          letter-spacing: 1px;
        }

        .loading-dots::after {
          content: '';
          animation: dots 1.2s steps(3, end) infinite;
        }

        @keyframes dots {
          0%   { content: ''; }
          33%  { content: '.'; }
          66%  { content: '..'; }
          100% { content: '...'; }
        }
      `}</style>

      <div className="loading-screen">
        {/* Pokéball SVG */}
        <div className="pokeball-wrapper">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* Top half - red */}
            <path
              d="M 50 5 A 45 45 0 0 1 95 50 L 65 50 A 15 15 0 0 0 35 50 L 5 50 A 45 45 0 0 1 50 5 Z"
              fill="#e53935"
              stroke="#212121"
              strokeWidth="4"
            />
            {/* Bottom half - white */}
            <path
              d="M 95 50 A 45 45 0 0 1 5 50 L 35 50 A 15 15 0 0 0 65 50 Z"
              fill="#f5f5f5"
              stroke="#212121"
              strokeWidth="4"
            />
            {/* Center divider line */}
            <line x1="5" y1="50" x2="35" y2="50" stroke="#212121" strokeWidth="4" />
            <line x1="65" y1="50" x2="95" y2="50" stroke="#212121" strokeWidth="4" />
            {/* Center button outer */}
            <circle cx="50" cy="50" r="15" fill="#f5f5f5" stroke="#212121" strokeWidth="4" />
            {/* Center button inner */}
            <circle cx="50" cy="50" r="7" fill="#f5f5f5" stroke="#212121" strokeWidth="3" />
          </svg>
        </div>

        <div className="loading-text">
          Loading Pokemon<span className="loading-dots" />
        </div>
      </div>
    </>
  );
}