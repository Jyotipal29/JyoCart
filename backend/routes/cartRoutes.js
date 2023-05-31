const express = require("express");
const { protect } = require("./verifyToken");
const {
  addToCart,
  removeFromCart,
  getCart,
} = require("../controller/cartController");
const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.post("/", protect, removeFromCart);
module.exports = router;
