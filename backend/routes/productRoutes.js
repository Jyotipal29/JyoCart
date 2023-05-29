const express = require("express");
const {
  getAllProduct,
  getProduct,
} = require("../controller/productController");
const router = express.Router();

router.get("/", getAllProduct);
router.get("/find/:id", getProduct);
module.exports = router;
