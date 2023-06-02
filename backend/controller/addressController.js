const Address = require("../model/address");

const getAddress = async (req, res) => {
  try {
    const address = await Address.find({ user: req.user._id });
    if (address) {
      return res.status(200).json(address);
    } else {
      return res.status(404).json({ message: "address not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addAddress = async (req, res) => {
  try {
    const { street, city, state, country, postalCode } = req.body;
    if (!street || !city || !state || !country || !postalCode) {
      return res.status(400).json({ message: "please provide all the fields" });
    }
    const address = new Address({
      user: req.user._id,
      street,
      city,
      state,
      country,
      postalCode,
    });

    await address.save();
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { street, city, state, country, postalCode } = req.body;
    if (!street || !city || !state || !country || !postalCode) {
      return res.status(400).json({ message: "please provide all the fields" });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: req.params.addressId,
        user: req.user._id,
      },
      { street, city, state, country, postalCode },
      { new: true }
    );
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({
      _id: req.params.addressId,
      user: req.user._id,
    });
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAddress,
  addAddress,
  updateAddress,
  deleteAddress,
};
