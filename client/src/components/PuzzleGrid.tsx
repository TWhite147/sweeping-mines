import React, { useState, useEffect } from "react";

interface Cell {
  value: number; // -1 for mines, 0-8 for other cells
  revealed: boolean;
  flagged: boolean;
}

interface PuzzleGridProps {
  grid: number[][];
  onGameEnd: (status: "won" | "lost") => void;
}

const PuzzleGrid: React.FC<PuzzleGridProps> = ({ grid, onGameEnd }) => {
  const [cells, setCells] = useState<Cell[][]>([]);

  useEffect(() => {
    // Initialize cells from grid
    const initialCells = grid.map((row) =>
      row.map((value) => ({
        value,
        revealed: false,
        flagged: false,
      }))
    );
    setCells(initialCells);
  }, [grid]);

  const revealCell = (row: number, col: number) => {
    const newCells = [...cells];
    const cell = newCells[row][col];

    if (cell.revealed || cell.flagged) return; // Ignore clicks on revealed/flagged cells

    cell.revealed = true;

    if (cell.value === -1) {
      // Player clicked on a mine
      onGameEnd("lost");
    } else {
      // Reveal cell and check win condition
      revealAdjacent(newCells, row, col);
      if (checkWinCondition(newCells)) {
        onGameEnd("won");
      }
    }

    setCells(newCells);
  };

  const revealAdjacent = (grid: Cell[][], row: number, col: number) => {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1], [1, 0], [1, 1],
    ];

    directions.forEach(([dr, dc]) => {
      const newRow = row + dr;
      const newCol = col + dc;

      if (
        newRow >= 0 &&
        newRow < grid.length &&
        newCol >= 0 &&
        newCol < grid[0].length &&
        !grid[newRow][newCol].revealed &&
        !grid[newRow][newCol].flagged
      ) {
        grid[newRow][newCol].revealed = true;

        if (grid[newRow][newCol].value === 0) {
          revealAdjacent(grid, newRow, newCol);
        }
      }
    });
  };

  const checkWinCondition = (grid: Cell[][]): boolean => {
    // Win if all non-mine cells are revealed
    for (const row of grid) {
      for (const cell of row) {
        if (!cell.revealed && cell.value !== -1) {
          return false;
        }
      }
    }
    return true;
  };

  const toggleFlag = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault(); // Prevent context menu

    const newCells = [...cells];
    const cell = newCells[row][col];

    if (!cell.revealed) {
      cell.flagged = !cell.flagged;
      setCells(newCells);
    }
  };

  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${grid[0].length}, 1fr)` }}>
      {cells.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`border h-10 w-10 flex items-center justify-center text-center ${
              cell.revealed
                ? cell.value === -1
                  ? "bg-red-500 text-white" // Mine
                  : "bg-gray-200"
                : "bg-gray-500"
            }`}
            onClick={() => revealCell(rowIndex, colIndex)}
            onContextMenu={(e) => toggleFlag(e, rowIndex, colIndex)}
          >
            {cell.revealed
              ? cell.value === -1
                ? "💣"
                : cell.value > 0
                ? cell.value
                : "⬛"
              : cell.flagged
              ? "🚩"
              : "⬜"}
          </div>
        ))
      )}
    </div>
  );
};

export default PuzzleGrid;
