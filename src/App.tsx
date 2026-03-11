import { useState } from "react";
import DifficultySelect from "./components/DifficultySelect";
import LoadingScreen from "./components/LoadingScreen";
import GameBoard from "./components/GameBoard";
import { usePokemon } from "./hooks/usePokemon";

const DIFFICULTY_CARD_COUNT: Record<string, number> = {
  easy: 5,
  medium: 10,
  hard: 18,
};

type Screen = "difficulty" | "loading" | "game" | "gameover" | "win";

export default function App() {
  const { pokemon, loading, error, fetchPokemon } = usePokemon();
  const [screen, setScreen] = useState<Screen>("difficulty");
  const [difficulty, setDifficulty] = useState("medium");
  const [finalScore, setFinalScore] = useState(0);

  const handleDifficultySelect = async (selected: string) => {
    setDifficulty(selected);
    setScreen("loading");
    await fetchPokemon(DIFFICULTY_CARD_COUNT[selected]);
    setScreen("game");
  };

  const handleGameOver = (score: number) => {
    setFinalScore(score);
    setScreen("gameover");
  };

  const handleWin = (score: number) => {
    setFinalScore(score);
    setScreen("win");
  };

  // Error state
  if (error) return (
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
  );

  if (screen === "difficulty") {
    return <DifficultySelect onSelect={handleDifficultySelect} />;
  }

  if (screen === "loading" || loading) {
    return <LoadingScreen />;
  }

  if (screen === "game" && pokemon.length > 0) {
    return (
      <GameBoard
        pokemon={pokemon}
        difficulty={difficulty}
        onGameOver={handleGameOver}
        onWin={handleWin}
      />
    );
  }

  // Placeholder screens — Feature E will replace these
  if (screen === "gameover") return (
    <div style={{
      fontFamily: "'Press Start 2P', monospace",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      gap: "16px",
      background: "#5bb8d4",
      color: "#fff",
      fontSize: "10px",
      textAlign: "center",
      padding: "20px",
    }}>
      <p>GAME OVER</p>
      <p>Score: {finalScore}</p>
      <p style={{ fontSize: "8px", opacity: 0.7 }}>(Win/Game Over screens coming in Feature E)</p>
      <button
        onClick={() => setScreen("difficulty")}
        style={{ fontFamily: "inherit", fontSize: "9px", padding: "8px 16px", cursor: "pointer", marginTop: "8px" }}
      >
        Play Again
      </button>
    </div>
  );

  if (screen === "win") return (
    <div style={{
      fontFamily: "'Press Start 2P', monospace",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      gap: "16px",
      background: "#5bb8d4",
      color: "#fff",
      fontSize: "10px",
      textAlign: "center",
      padding: "20px",
    }}>
      <p>YOU WIN! 🎉</p>
      <p>Score: {finalScore}</p>
      <p style={{ fontSize: "8px", opacity: 0.7 }}>(Win/Game Over screens coming in Feature E)</p>
      <button
        onClick={() => setScreen("difficulty")}
        style={{ fontFamily: "inherit", fontSize: "9px", padding: "8px 16px", cursor: "pointer", marginTop: "8px" }}
      >
        Play Again
      </button>
    </div>
  );

  return <DifficultySelect onSelect={handleDifficultySelect} />;
}