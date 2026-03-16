import { useState } from "react";
import DifficultySelect from "./components/DifficultySelect";
import LoadingScreen from "./components/LoadingScreen";
import GameBoard from "./components/GameBoard";
import GameOverModal from "./components/GameOverModal";
import BGMToggle from "./components/BGMToggle";
import { usePokemon } from "./hooks/usePokemon";
import { useAudio } from "./hooks/useAudio";

const DIFFICULTY_CARD_COUNT: Record<string, number> = {
  easy: 5,
  medium: 10,
  hard: 18,
};

const NEXT_DIFFICULTY: Record<string, string> = {
  easy: "medium",
  medium: "hard",
  hard: "hard",
};

type Screen = "difficulty" | "loading" | "game" | "gameover" | "win";

export default function App() {
  const { pokemon, loading, error, fetchPokemon } = usePokemon();
  const [screen, setScreen] = useState<Screen>("difficulty");
  const [difficulty, setDifficulty] = useState("medium");
  const [finalScore, setFinalScore] = useState(0);
  const audio = useAudio();

  const handleDifficultySelect = async (selected: string) => {
    audio.playStartup();
    setDifficulty(selected);
    setScreen("loading");
    await fetchPokemon(DIFFICULTY_CARD_COUNT[selected]);
    setScreen("game");
  };

  const handleGameOver = (score: number) => {
    setFinalScore(score);
    setScreen("gameover");
    audio.playLose();
  };

  const handleWin = (score: number) => {
    setFinalScore(score);
    setScreen("win");
    audio.playVictory();
  };

  const handlePlayAgain = async () => {
    audio.stopEndGameSounds();
    audio.playLevelup();
    setScreen("loading");
    await fetchPokemon(DIFFICULTY_CARD_COUNT[difficulty]);
    setScreen("game");
  };

  const handleKeepPlaying = async () => {
    audio.stopEndGameSounds();
    audio.playLevelup();
    const next = NEXT_DIFFICULTY[difficulty];
    setDifficulty(next);
    setScreen("loading");
    await fetchPokemon(DIFFICULTY_CARD_COUNT[next]);
    setScreen("game");
  };

  const handleQuit = () => {
    audio.stopEndGameSounds();
    setScreen("difficulty");
  };

  // Error state
  if (error) return (
    <>
      <BGMToggle status={screen} />
      <div style={{
        fontFamily: "'Press Start 2P', monospace",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: "20px",
        padding: "20px",
        textAlign: "center",
        fontSize: "10px",
        background: "#5bb8d4",
        color: "#fff",
      }}>
        <p>Failed to load Pokémon.</p>
        <button
          onClick={() => setScreen("difficulty")}
          style={{ fontFamily: "inherit", fontSize: "9px", padding: "8px 16px", cursor: "pointer" }}
        >
          Try Again
        </button>
      </div>
    </>
  );

  if (screen === "difficulty") {
    return (
      <>
        <BGMToggle status={screen} />
        <DifficultySelect
          onSelect={handleDifficultySelect}
          onNavigate={audio.playButton}
        />
      </>
    );
  }

  if (screen === "loading" || loading) {
    return (
      <>
        <BGMToggle status={screen} />
        <LoadingScreen />
      </>
    );
  }

  if (screen === "game" || screen === "gameover" || screen === "win") {
    return (
      <>
        <BGMToggle status={screen} />
        <GameBoard
          pokemon={pokemon}
          difficulty={difficulty}
          onGameOver={handleGameOver}
          onWin={handleWin}
          onCardFlip={audio.playFlip}
        />
        {(screen === "gameover" || screen === "win") && (
          <GameOverModal
            status={screen}
            finalScore={finalScore}
            onPlayAgain={handlePlayAgain}
            onKeepPlaying={screen === "win" ? handleKeepPlaying : undefined}
            onQuit={handleQuit}
          />
        )}
      </>
    );
  }

  return (
    <>
      <BGMToggle status={screen} />
      <DifficultySelect
        onSelect={handleDifficultySelect}
        onNavigate={audio.playButton}
      />
    </>
  );
}