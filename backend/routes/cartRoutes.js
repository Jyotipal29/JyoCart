const express = require("express");
const { protect } = require("./verifyToken");
const {
  addToCart,
  removeFromCart,
  getCart,
  getCartCount,
  removeAll,
} = require("../controller/cartController");
const router = express.Router();

router.get("/", protect, getCart);
router.get("/count", protect, getCartCount);
router.post("/add", protect, addToCart);
router.post("/", protect, removeFromCart);
router.delete("/", protect, removeAll);
module.exports = router;
