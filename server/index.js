const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const puzzleRoutes = require("./routes/puzzleRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const { connectToDatabase } = require("./config/db");

const app = new Koa();
const config = {origin: "http://localhost:5173", credentials: true}

app.use(bodyParser());
app.use(cors(config));

app.use(puzzleRoutes.routes());
app.use(leaderboardRoutes.routes());

connectToDatabase()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
