import React, { useState } from "react";
import PuzzleGrid from "../components/PuzzleGrid";
import { generatePuzzle } from "../services/puzzleService";

const GamesPage: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>([]);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost" | null>("playing");

  const startGame = async () => {
    try {
      const newGrid = await generatePuzzle(8, 8, 10);
      console.log("Generated grid:", newGrid);
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
      <button
        onClick={startGame}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Start Game
      </button>

      {gameStatus === "lost" && <p className="text-red-500">You Lost! 💥</p>}
      {gameStatus === "won" && <p className="text-green-500">You Won! 🎉</p>}

      {grid.length > 0 && gameStatus === "playing" && (
        <div className="mt-4">
          <PuzzleGrid
            grid={grid}
            onGameEnd={handleGameEnd}
          />
        </div>
      )}
    </div>
  );
};

export default GamesPage;
