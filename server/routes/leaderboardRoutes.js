const Router = require("koa-router");
const { getLeaderboard, saveScore } = require("../controllers/leaderboardController");

const router = new Router({ prefix: "/leaderboard" });

router.get("/", getLeaderboard);
router.post("/", saveScore);

module.exports = router;
