const { MongoClient } = require("mongodb");

let db;

const connectToDatabase = async () => {
  const client = new MongoClient("mongodb://localhost:27017");
  await client.connect();
  console.log("Connected to MongoDB");
  db = client.db("minesweeper");
};

const getDb = () => {
  if (!db) throw new Error("Database not initialized");
  return db;
};

module.exports = { connectToDatabase, getDb };
