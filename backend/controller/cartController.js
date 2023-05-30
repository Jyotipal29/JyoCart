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


const removeFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }

    // Find the index of the item in the cart items array
    const itemIndex = cart.items.findIndex((item) =>
      item.product.equals(productId)
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in cart." });
    }
    cart.items.splice(itemIndex, 1);

    await cart.save();

    res
      .status(200)
      .json({ message: "Item removed from cart successfully.", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "cart not found" });
    }

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
};
