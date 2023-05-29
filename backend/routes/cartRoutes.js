const express = require("express");
const { protect } = require("./verifyToken");
const { addToCart } = require("../controller/cartController");
const router = express.Router();

router.post("/add", protect, addToCart);
module.exports = router;
