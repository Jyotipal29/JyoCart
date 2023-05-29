const express = require("express");
const { protect } = require("./verifyToken");
const { addToCart, removeFromCart } = require("../controller/cartController");
const router = express.Router();

router.post("/add", protect, addToCart);
router.delete("/", protect, removeFromCart);
module.exports = router;
