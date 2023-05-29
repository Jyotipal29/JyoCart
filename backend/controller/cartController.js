const Cart = require("../model/cart");

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id });
    }

    const cartItem = cart.items.find((item) => item.product.equals(productId));

    if (cartItem) {
      cartItem.quantity = cartItem.quantity + Number(quantity);
    } else {
      cart.items.push({ product: productId, quantity: quantity });
    }

    await cart.save();
    res
      .status(200)
      .json({ message: "Item added to the cart successfully.", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToCart,
};
