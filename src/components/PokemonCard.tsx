import { useMemo } from "react";
import Tilt from "react-parallax-tilt";

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  cardsShowing: boolean;
  onClick: () => void;
}

function capitalizeName(name: string): string {
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
  if (capitalized.length > 11) {
    return capitalized.slice(0, 11) + "…";
  }
  return capitalized;
}

const ANIMATION_TIME = 850;

export default function PokemonCard({ name, image, cardsShowing, onClick }: PokemonCardProps) {
  // Disable tilt on touch devices
  const isTouchDevice = useMemo(() => window.matchMedia("(hover: none)").matches, []);

  const card = (
    <div
      className={`card-container ${cardsShowing ? "" : "back"}`}
      onClick={onClick}
    >
      <div className="card-inner">
        {/* Front */}
        <div className="card-front">
          <img src={image} alt={name} draggable={false} />
          <span className="card-name">{capitalizeName(name)}</span>
        </div>
        {/* Back */}
        <div className="card-back">
          <img src="/card-back.png" alt="card back" draggable={false} />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        .card-container {
          width: 180px;
          height: 250px;
          perspective: 1000px;
          cursor: pointer;
          flex-shrink: 0;
        }

        .card-container.back .card-inner {
          transform: rotateY(180deg);
        }

        .card-inner {
          width: 100%;
          height: 100%;
          position: relative;
          text-align: center;
          transform-style: preserve-3d;
          transition: transform ${ANIMATION_TIME}ms;
          animation: flip-card ${ANIMATION_TIME}ms;
        }

        @keyframes flip-card {
          from {
            transform: rotateY(180deg);
            pointer-events: none;
          }
          to {
            transform: rotateY(0deg);
          }
        }

        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 5px;
          overflow: hidden;
        }

        .card-front {
          background: rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 0;
        }

        .card-front img {
          width: 180px;
          height: 200px;
          object-fit: contain;
          user-select: none;
        }

        .card-name {
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Press Start 2P', monospace;
          font-size: 14px;
          color: #fff;
          text-align: center;
          line-height: 1.5;
          padding: 0 6px;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          letter-spacing: -0.02em;
          text-transform: capitalize;
        }

        .card-back {
          background: #333;
          transform: rotateY(180deg);
          overflow: hidden;
        }

        .card-back img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Tablet (768px+) */
        @media (max-width: 768px) {
          .card-container {
            width: 150px;
            height: 210px;
          }

          .card-front img {
            width: 150px;
            height: 165px;
          }

          .card-name {
            height: 45px;
            font-size: 11px;
          }
        }

        /* Phone (< 480px) */
        @media (max-width: 480px) {
          .card-container {
            width: 120px;
            height: 170px;
          }

          .card-front img {
            width: 120px;
            height: 130px;
          }

          .card-name {
            height: 40px;
            font-size: 8px;
          }
        }
      `}</style>

      {isTouchDevice ? card : (
        <Tilt
          tiltReverse={true}
          reset={true}
          glareEnable={true}
          glareMaxOpacity={0.4}
          glareColor="#fff"
          glarePosition="all"
          tiltMaxAngleX={15}
          tiltMaxAngleY={15}
          scale={1.05}
          transitionSpeed={400}
        >
          {card}
        </Tilt>
      )}
    </>
  );
}