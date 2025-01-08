const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("cors");
const puzzleRoutes = require("./routes/puzzleRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const userRoutes = require("./routes/userRoutes");
const { connectToDatabase } = require("./config/db");

const app = new Koa();
const config = {origin: "http://localhost:5173"}

app.use(cors(config));
app.use(bodyParser());

app.use(puzzleRoutes.routes());
app.use(leaderboardRoutes.routes());
app.use(userRoutes.routes());

connectToDatabase()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
