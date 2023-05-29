const express = require("express");
const { login, register } = require("../controller/authController");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
module.exports = router;
