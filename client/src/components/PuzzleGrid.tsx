import React, { useState, useEffect } from "react";

interface Cell {
  value: number;
  revealed: boolean;
  flagged: boolean;
}

interface PuzzleGridProps {
  grid: number[][];
  onGameEnd: (status: "won" | "lost") => void;
  totalMines: number;
}

const PuzzleGrid: React.FC<PuzzleGridProps> = ({ grid, onGameEnd, totalMines }) => {
  const [cells, setCells] = useState<Cell[][]>([]);
  const [mineCount, setMineCount] = useState<number>(0);

  useEffect(() => {
    const initialCells = grid.map((row) =>
      row.map((value) => ({
        value,
        revealed: false,
        flagged: false,
      }))
    );
    setCells(initialCells);
    setMineCount(0);
  }, [grid]);

  const revealCell = (row: number, col: number) => {
    const newCells = [...cells];
    const cell = newCells[row][col];

    if (cell.revealed || cell.flagged) return;

    cell.revealed = true;

    if (cell.value === -1) {
      revealAllMines(newCells);
      onGameEnd("lost");
    } else {
      if(cell.value ===0) revealAdjacent(newCells, row, col);
      if (checkWinCondition(newCells)) {
        revealAllMines(newCells);
        onGameEnd("won");
        setMineCount(0);
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
        !grid[newRow][newCol].flagged &&
        !(grid[newRow][newCol].value === -1)
      ) {
        grid[newRow][newCol].revealed = true;

        if (grid[newRow][newCol].value === 0) {
          revealAdjacent(grid, newRow, newCol);
        }
      }
    });
  };

  const checkWinCondition = (grid: Cell[][]): boolean => {
    for (const row of grid) {
      for (const cell of row) {
        if (!cell.revealed && cell.value !== -1) {
          return false;
        }
      }
    }
    return true;
  };

  const revealAllMines = (grid: Cell[][]) => {
    grid.forEach((row) =>
      row.forEach((cell) => {
          cell.revealed = true;
          cell.flagged = false;
      })
    );
  };

  const toggleFlag = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();

    const newCells = [...cells];
    const cell = newCells[row][col];

    if (!cell.revealed) {
      if (cell.flagged) setMineCount(mineCount - 1);
      else setMineCount(mineCount+1)  
      cell.flagged = !cell.flagged;
      setCells(newCells);
    }

  };

  return (
    <div>
      <div> Total Mines: {`${totalMines}`}; Mines Flagged: {`${mineCount}`} </div>
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
