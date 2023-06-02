const express = require("express");
const {
  getAddress,
  addAddress,
  updateAddress,
  deleteAddress,
} = require("../controller/addressController");
const { protect } = require("./verifyToken");

const router = express.Router();

router.get("/", protect, getAddress);
router.post("/add", protect, addAddress);
router.put("/update/:addressId", protect, updateAddress);
router.delete("/delete/:addressId", protect, deleteAddress);
module.exports = router;
