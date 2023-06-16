const Product = require("../model/products");

// get one product

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};
const getSuggestedProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    const brand = product.brand;

    // Find suggested products with the same brand
    const suggestedProducts = await Product.find({
      brand: brand,
      _id: { $ne: productId },
    }).limit(4);

    res.status(200).json(suggestedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProduct,
  getAllProduct,
  getSuggestedProduct,
};
