import React, { useState } from "react";

interface Cell {
  value: number; 
  revealed: boolean;
  flagged: boolean;
}

interface PuzzleGridProps {
  grid: number[][]; 
  onGameEnd: (won: boolean) => void; 
}

const PuzzleGrid: React.FC<PuzzleGridProps> = ({ grid, onGameEnd }) => {
  const [cells, setCells] = useState<Cell[][]>(
    grid.map((row) =>
      row.map((value) => ({
        value,
        revealed: false,
        flagged: false,
      }))
    )
  );

  const revealCell = (row: number, col: number) => {
    const newCells = [...cells];
    const cell = newCells[row][col];

    if (cell.revealed || cell.flagged) return;

    cell.revealed = true;

    if (cell.value === -1) {
      onGameEnd(true);
    } else {
      if (cell.value === 0) {
        revealAdjacent(newCells, row, col);
      }

      if (checkWin(newCells)) {
        onGameEnd(true);
      }
    }

    setCells(newCells);
  };

  const revealAdjacent = (grid: Cell[][], row: number, col: number) => {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
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

  const checkWin = (grid: Cell[][]) => {
    return grid.every((row) =>
      row.every((cell) => (cell.value === -1 && !cell.revealed) || cell.revealed)
    );
  };

  const toggleFlag = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();

    const newCells = [...cells];
    const cell = newCells[row][col];

    if (!cell.revealed) {
      cell.flagged = !cell.flagged;
      setCells(newCells);
    }
  };

  return (
    <div style={{ gridTemplateColumns: `repeat(${grid[0].length}, 1fr)` }}>
      {cells.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            onClick={() => revealCell(rowIndex, colIndex)}
            onContextMenu={(e) => toggleFlag(e, rowIndex, colIndex)}
          >
            {cell.revealed
              ? cell.value === -1
                ? "💣"
                : cell.value > 0
                  ? cell.value
                  : ""
              : cell.flagged
                ? "🚩"
                : ""}
          </div>
        ))
      )}
    </div>
  );
};

export default PuzzleGrid;
