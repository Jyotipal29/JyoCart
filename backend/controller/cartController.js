const Cart = require("../model/cart");

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const cartItem = cart.items.find((item) => item.product.equals(productId));

    if (cartItem) {
      cartItem.quantity += Number(quantity);
    } else {
      cart.items.push({ product: productId, quantity });
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
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    const updatedItems = cart.items.filter(
      (item) => !item.product.equals(productId)
    );
    cart.items = updatedItems;

    await cart.save();

    res
      .status(200)
      .json({ message: "Item removed from the cart successfully.", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    // Find the cart for the logged-in user
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    // If cart not found, return empty array
    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    // Extract the cart items with associated product information
    const cartItems = cart.items.map((item) => ({
      id: item._id,
      product: {
        id: item.product._id,
        brand: item.product.brand,
        description: item.product.description,
        imageUrl: item.product.imageUrl,
        price: item.product.price,
        qty: item.quantity,
        size: item.product.size,
        category: item.product.category,
      },
    }));
    res.status(200).json({ items: cartItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
};
