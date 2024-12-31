const express = require('express');
const { getAddresses, addAddress, deleteAddress } = require('../controllers/addressController');
const router = express.Router();

router.route('/')
  .get(getAddresses)
  .post(addAddress);

router.route('/:id')
  .delete(deleteAddress);

module.exports = router;