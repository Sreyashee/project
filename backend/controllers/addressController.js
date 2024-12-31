const Address = require('../models/address');

const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user.id });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const addAddress = async (req, res) => {
  const { type, address, coordinates } = req.body;

  try {
    const newAddress = new Address({
      userId: req.user.id,
      type,
      address,
      coordinates,
    });

    await newAddress.save();
    res.json(newAddress);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteAddress = async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.json({ message: 'Address deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAddresses, addAddress, deleteAddress };
