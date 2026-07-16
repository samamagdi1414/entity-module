const userController = require("../controller/user-controller");
const authenticate = require("../middleware/authentication-middleware");
const restrictTo = require("../middleware/authorization-middlleware");

const express = require("express");
const router = express.Router();

router.route("/")
.get(authenticate, restrictTo("admin"), userController.getAllUsers);

router.route("/:id")
.delete(authenticate, restrictTo("admin"), userController.deleteUser);

router
.route("/:id/role")
.patch(authenticate, restrictTo("admin"), userController.updateUserRole);

module.exports = router;