import React, { useState } from "react";
import PuzzleGrid from "../components/PuzzleGrid";
import { generatePuzzle } from "../services/puzzleService";

const GamesPage: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>([]);

  const createPuzzle = async () => {
    try {
      const newGrid = await generatePuzzle(8, 8, 10);
      setGrid(newGrid);
    } catch (error) {
      console.error(error);
      alert("Failed to generate puzzle. Please try again later.");
    }
  };

  return (
    <div>
      <button onClick={createPuzzle}>
        Generate Puzzle
      </button>
      <div>
        {grid.length > 0 && <PuzzleGrid grid={grid} />}
      </div>
    </div>
  );
};

export default GamesPage;
