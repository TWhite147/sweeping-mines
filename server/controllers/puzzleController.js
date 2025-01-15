const { getDb } = require("../config/db");

const generatePuzzle = async (ctx) => {
  const { rows, cols, mines } = ctx.request.body;

  const grid = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(0));

  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (grid[row][col] !== -1) {
      grid[row][col] = -1;
      minesPlaced++;
    }
  }
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === -1) continue;

      let mineCount = 0;

      for (const [dr, dc] of directions) {
        const newRow = r + dr;
        const newCol = c + dc;

        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          if (grid[newRow][newCol] === -1) {
            mineCount++;
          }
        }
      }

      grid[r][c] = mineCount;
    }
  }

  return ctx.body = { grid, mines };
};

const savePuzzle = async (ctx) => {
  const { userId, state, difficulty, timeSpent } = ctx.request.body;
  const db = getDb();

  const result = await db.collection("puzzles").insertOne({
    userId,
    state,
    difficulty,
    timeSpent,
  });

  return ctx.body = { message: "Puzzle saved successfully", id: result.insertedId };
};

module.exports = { generatePuzzle, savePuzzle};
