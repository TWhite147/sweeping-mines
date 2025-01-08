const Router = require("koa-router");
const { login, getUser } = require("../controllers/userController");

const router = new Router({ prefix: "/users" });

router.post("/login", login);
router.get("/:id", getUser);

module.exports = router;
