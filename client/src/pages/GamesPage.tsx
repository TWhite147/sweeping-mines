import React, { useState, useRef } from "react";
import PuzzleGrid from "../components/PuzzleGrid";
import { generatePuzzle } from "../services/puzzleService";
import { saveScore } from "../services/leaderboardService";

type Difficulty = "easy" | "medium" | "hard" | "custom";

const difficultySettings: Record<Difficulty, { rows: number; cols: number; mines: number }> = {
  easy: { rows: 9, cols: 9, mines: 10 },
  medium: { rows: 16, cols: 16, mines: 40 },
  hard: { rows: 30, cols: 16, mines: 99 },
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

    if (status === "won" && difficulty !== "custom") {
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
    <div className="min-h-screen bg-green-100 text-gray-800 p-8">
      <div className="text-4xl font-bold mb-6 text-center">
        <h1>Select Difficulty</h1>
        <div className="my-4">
          <label htmlFor="difficulty" className="text-lg font-medium">
            Difficulty:
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            className="border rounded-lg p-2 ml-2 bg-white text-gray-800"
          >
            {Object.keys(difficultySettings).map((level) => (
              <option key={level} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="border px-4 py-2 rounded-lg w-1/2"
          />
        </label>
      </div>

      <button
        onClick={startGame}
        className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
      >
        Start Game
      </button>

      {gameStatus === "lost" && <p className="text-red-500 font-bold mt-4">You Lost! 💥</p>}
      {gameStatus === "won" && <p className="text-green-500 font-bold mt-4">You Won! 🎉</p>}

      <div className="text-center mb-6">
        <p className="text-lg">Elapsed Time: {elapsedTime} seconds</p>
        <div className="flex justify-center">
          <PuzzleGrid grid={grid} onGameEnd={handleGameEnd} totalMines={totalMines} />
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
