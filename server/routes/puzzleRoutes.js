const Router = require("koa-router");
const { generatePuzzle, savePuzzle, getUserPuzzles } = require("../controllers/puzzleController");

const router = new Router({ prefix: "/puzzles" });

router.post("/generate", generatePuzzle);
router.post("/save", savePuzzle);
router.get("/:userId", getUserPuzzles);

module.exports = router;
