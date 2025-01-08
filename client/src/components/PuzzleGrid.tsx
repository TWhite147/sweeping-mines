import React from "react";

interface PuzzleGridProps {
  grid: number[][];
}

const PuzzleGrid: React.FC<PuzzleGridProps> = ({ grid }) => {
  return (
    <div style={{ gridTemplateColumns: `repeat(${grid[0].length}, 1fr)` }}>
      {grid.flat().map((cell, idx) => (
        <div
          key={idx}
        >
          {cell === -1 ? "💣" : cell}
        </div>
      ))}
    </div>
  );
};

export default PuzzleGrid;
