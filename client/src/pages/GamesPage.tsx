import React, { useState } from "react";
import PuzzleGrid from "../components/PuzzleGrid";
import { generatePuzzle } from "../services/puzzleService";

const GamesPage: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>([]);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost" | null>(null);

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

  const handleGameEnd = (won: boolean) => {
    if (won) {
      setGameStatus("won");
    } else {
      setGameStatus("lost");
    }
  };

  return (
    <div>
      <button
        onClick={startGame}
      >
        Start Game
      </button>

      {gameStatus && (
        <p>
          {gameStatus === "won" ? "Congratulations! You won!" : "You lost! Try again."}
        </p>
      )}

      {grid.length > 0 && (
        <div>
          <PuzzleGrid grid={grid} onGameEnd={handleGameEnd} />
        </div>
      )}
    </div>
  );
};

export default GamesPage;
