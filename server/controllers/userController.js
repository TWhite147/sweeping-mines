const { getDb } = require("../config/db");

const login = async (ctx) => {
  const { username } = ctx.request.body;
  const db = getDb();

  let user = await db.collection("users").findOne({ username });
  if (!user) {
    const result = await db.collection("users").insertOne({ username });
    user = { _id: result.insertedId, username };
  }

  ctx.body = user;
};

const getUser = async (ctx) => {
  const { id } = ctx.params;
  const db = getDb();

  const user = await db.collection("users").findOne({ _id: id });
  if (!user) {
    ctx.throw(404, "User not found");
  }

  ctx.body = user;
};

module.exports = { login, getUser };
