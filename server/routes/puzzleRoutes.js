const Router = require("koa-router");
const { generatePuzzle, savePuzzle } = require("../controllers/puzzleController");

const router = new Router({ prefix: "/puzzles" });

router.post("/generate", generatePuzzle);
router.post("/save", savePuzzle);

module.exports = router;
