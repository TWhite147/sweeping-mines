import React, { useState, useRef } from "react";
import PuzzleGrid from "../components/PuzzleGrid";
import { generatePuzzle } from "../services/puzzleService";
import { saveScore } from "../services/leaderboardService";

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
  const [totalMines, setTotalMines] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [username, setUsername] = useState<string>("");

  const timerRef = useRef<NodeJS.Timeout | null>(null); 

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
      console.log(newGrid);
      
      setGameStatus("playing");
      setTotalMines(mines);
      setElapsedTime(0);
      if (timerRef.current) clearInterval(timerRef.current); 
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error(error);
      alert("Failed to generate puzzle. Please try again later.");
    }
  };

  const handleGameEnd = async (status: "won" | "lost") => {
    setGameStatus(status);
    if (timerRef.current) clearInterval(timerRef.current); 

    if (status === "won") {
      try {
        await saveScore({
          username,
          difficulty,
          time: elapsedTime,
        });
        alert("Score submitted successfully!");
      } catch (error) {
        console.error("Failed to submit score:", error);
      }
    }
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

      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </label>
      </div>

      <button onClick={startGame}>Start Game</button>

      {gameStatus === "lost" && <p>You Lost! 💥</p>}
      {gameStatus === "won" && <p>You Won! 🎉</p>}

      <div>
        <p>Elapsed Time: {elapsedTime} seconds</p>
        <PuzzleGrid grid={grid} onGameEnd={handleGameEnd} totalMines={totalMines} />
      </div>
    </div>
  );
};

export default GamesPage;
