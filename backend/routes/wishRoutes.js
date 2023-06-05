const express = require("express");
const { protect } = require("./verifyToken");
const {
  getWishCount,
  getWishlist,
  addToWish,
  removeWish,
} = require("../controller/wishlistController");
const router = express.Router();

router.get("/", protect, getWishlist);
router.get("/count", protect, getWishCount);
router.post("/add", protect, addToWish);
router.post("/", protect, removeWish);
module.exports = router;
