const express = require("express");
const {
  getAllProduct,
  getProduct,
  getSuggestedProduct,
} = require("../controller/productController");
const router = express.Router();

router.get("/", getAllProduct);
router.get("/find/:id", getProduct);
router.get("/:id", getSuggestedProduct);
module.exports = router;
