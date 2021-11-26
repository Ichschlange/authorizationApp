const Router = require("express");
const authController = require("./authController");
const {check} = require("express-validator");

const router = new Router();

router.post("/registration", [
    check("username", "No empty username").notEmpty(),
    check("password", "Password must be more than 4 symbols and less than 10").isLength({min: 4, max: 10})
],
authController.registration);
router.post("/login", authController.login);
router.get("/users", authController.users);

module.exports = router;