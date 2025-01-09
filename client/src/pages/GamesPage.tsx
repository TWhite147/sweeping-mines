import React, { useState } from "react";
import PuzzleGrid from "../components/PuzzleGrid";
import { generatePuzzle } from "../services/puzzleService";

type Difficulty = "easy" | "medium" | "hard" | "custom";

const difficultySettings: Record<Difficulty, { rows: number; cols: number; mines: number }> = {
  easy: { rows: 8, cols: 8, mines: 10 },
  medium: { rows: 16, cols: 16, mines: 40 },
  hard: { rows: 24, cols: 24, mines: 99 },
  custom: { rows: 0, cols: 0, mines: 0 }, 
};

const GamesPage: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>([]);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  const startGame = async () => {
    try {
      const settings = difficultySettings[difficulty];

      let rows = settings.rows;
      let cols = settings.cols;
      let mines = settings.mines;

      if (difficulty === "custom") {
        rows = parseInt(prompt("Enter number of rows:", "10") || "10", 10);
        cols = parseInt(prompt("Enter number of columns:", "10") || "10", 10);
        mines = parseInt(prompt("Enter number of mines:", "10") || "10", 10);
      }

      const newGrid = await generatePuzzle(rows, cols, mines);
      setGrid(newGrid);
      setGameStatus("playing");
    } catch (error) {
      console.error(error);
      alert("Failed to generate puzzle. Please try again later.");
    }
  };

  const handleGameEnd = (status: "won" | "lost") => {
    setGameStatus(status);
  };

  return (
    <div>
      <div>
        <h1>Select Difficulty</h1>
        <div>
          {Object.keys(difficultySettings).map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level as Difficulty)}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <button onClick={startGame}>Start Game</button>

      {gameStatus === "lost" && <p>You Lost! 💥</p>}
      {gameStatus === "won" && <p>You Won! 🎉</p>}

      <div>
        <PuzzleGrid grid={grid} onGameEnd={handleGameEnd} />
      </div>
    </div>
  );
};

export default GamesPage;
