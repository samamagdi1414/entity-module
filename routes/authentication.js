const express = require("express");
const authenticationController = require("../controller/auth-controller");
const authenticate = require("../middleware/authentication-middleware");
const router = express.Router();

router.post("/signup", authenticationController.signup);
router.post("/login", authenticationController.login);

router.get("/profile", authenticate, authenticationController.profile);

module.exports = router;