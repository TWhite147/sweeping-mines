const { getDb } = require("../config/db");

const getLeaderboard = async (ctx) => {
  const { difficulty } = ctx.query;
  const db = getDb();

  const leaderboard = await db
    .collection("leaderboards")
    .find({ difficulty })
    .sort({ time: 1 })
    .limit(10)
    .toArray();

  ctx.body = leaderboard;
};

const saveScore = async (ctx) => {
  const { username, time, difficulty } = ctx.request.body;
  const db = getDb();

  await db.collection("leaderboards").insertOne({
    username,
    time,
    difficulty,
    createdAt: new Date(),
  });

  ctx.body = { message: "Score saved successfully" };
};

module.exports = { getLeaderboard, saveScore };
