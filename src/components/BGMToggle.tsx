import { memo, useEffect, useRef, useState } from "react";
import ReactHowler from "react-howler";
import bgmSrc from "../assets/audio/bgm.mp3";
import buttonSrc from "../assets/audio/button.mp3";

const buttonAudio = new Audio(buttonSrc);
buttonAudio.volume = 0.3;

interface BGMToggleProps {
  status: string;
}

export default memo(function BGMToggle({ status }: BGMToggleProps) {
  const [isBGMOn, setIsBGMOn] = useState(true);

  const hasStarted = useRef(false);
  const howlerRef = useRef<any>(null);

  useEffect(() => {
    const handleFirstMove = () => {
      if (hasStarted.current) return;
      hasStarted.current = true;
      howlerRef.current?.howler?.play();
      document.removeEventListener("mousemove", handleFirstMove);
    };

    document.addEventListener("mousemove", handleFirstMove);
    return () => document.removeEventListener("mousemove", handleFirstMove);
  }, []);

  const isGameOver = status === "gameover" || status === "win";

  return (
    <>
      <style>{`
        .bgm-toggle {
          position: fixed;
          top: 16px;
          left: 16px;
          z-index: 200;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.1s ease;
        }

        .bgm-toggle:hover {
          transform: scale(1.1);
        }

        .bgm-toggle:active {
          transform: scale(0.95);
        }

        .bgm-toggle img {
          width: 40px;
          height: 40px;
          image-rendering: pixelated;
        }
      `}</style>

      {/* BGM — always mounted, playing controlled by isBGMOn and game status */}
      <ReactHowler
        ref={howlerRef}
        src={bgmSrc}
        volume={0.1}
        loop={true}
        playing={isBGMOn && !isGameOver}
      />

      <button
        className="bgm-toggle"
        onClick={() => {
          buttonAudio.currentTime = 0;
          buttonAudio.play().catch(() => {});
          setIsBGMOn(prev => !prev);
        }}
        title={isBGMOn ? "Mute BGM" : "Unmute BGM"}
      >
        <img
          src={isBGMOn ? "/music-on.png" : "/music-off.png"}
          alt={isBGMOn ? "BGM on" : "BGM off"}
        />
      </button>
    </>
  );
});