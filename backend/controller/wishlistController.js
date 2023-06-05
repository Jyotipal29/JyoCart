const Wishlist = require("../model/wishlist");

const addToWish = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const wish = await Wishlist.findOne({ user: req.user._id });
    if (!wish) {
      wish = new Wishlist({ user: req.user._id, wishItems: [] });
    }

    const wishItems = wish.wishItems.find((item) => item.equals(productId));

    if (wishItems) {
      wishItems.quantity += Number(quantity);
    } else {
      wish.wishItems.push({ product: productId, quantity });
    }
    await wish.save();
    res
      .status(200)
      .json({ message: "Item added to the cart successfully.", wish });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToWish,
};
