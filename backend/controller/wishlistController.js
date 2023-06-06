const Wishlist = require("../model/wishlist");

const addToWish = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

     wish = await Wishlist.findOne({ user: req.user._id });
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

const getWishlist = async (req, res) => {
  try {
    const wish = await Wishlist.findOne({ user: req.user._id }).populate(
      "wishItems.product"
    );
    if (!wish) {
      return res.status(200).json({ wishItems: [] });
    }
    const wishItems = wish.wishItems.map((item) => ({
      id: item._id,
      product: {
        _id: item.product._id,
        brand: item.product.brand,
        description: item.product.description,
        imageUrl: item.product.imageUrl,
        price: item.product.price,
        qty: item.quantity,
        size: item.product.size,
        category: item.product.category,
      },
    }));
    res.status(200).json({ item: wishItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const removeWish = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    const wish = await Wishlist.findOne({ user: userId });

    if (!wish) {
      return res.status(404).json({ message: "wish not found." });
    }

    const updatedItems = wish.wishItems.filter(
      (item) => !item.product.equals(productId)
    );
    wish.wishItems = updatedItems;

    await wish.save();

    res
      .status(200)
      .json({ message: "Item removed from the cart successfully.", wish });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWishCount = async (req, res) => {
  const userId = req.user._id;

  try {
    const wish = await Wishlist.findOne({ user: userId });

    if (!wish) {
      return res.status(200).json({ count: 0 });
    }

    const totalCount = wish.wishItems.length;

    res.status(200).json({ count: totalCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addToWish,
  getWishlist,
  removeWish,
  getWishCount,
};
