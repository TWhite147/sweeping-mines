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

  ctx.body = { grid };
};

const savePuzzle = async (ctx) => {
  const { userId, state, difficulty, timeSpent } = ctx.request.body;
  const db = getDb();

  const result = await db.collection("puzzles").insertOne({
    userId,
    state,
    difficulty,
    timeSpent,
    createdAt: new Date(),
  });

  ctx.body = { message: "Puzzle saved successfully", id: result.insertedId };
};

const getUserPuzzles = async (ctx) => {
  const { userId } = ctx.params;
  const db = getDb();

  const puzzles = await db.collection("puzzles").find({ userId }).toArray();
  ctx.body = puzzles;
};

module.exports = { generatePuzzle, savePuzzle, getUserPuzzles };
