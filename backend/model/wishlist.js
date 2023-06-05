const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  wishItems: [
    {
      products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
});

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = Wishlist;
