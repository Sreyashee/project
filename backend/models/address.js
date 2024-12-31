const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Address = require('./models/Address');

const app = express();
const port = 5000;

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myproj', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Serve React build files
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// POST route to save address
router.post('/api/address', async (req, res) => {
  const { houseNo, area, category } = req.body;

  try {
    // Create a new address document
    const newAddress = new Address({
      houseNo,
      area,
      category,
    });

    // Save the address to the database
    const savedAddress = await newAddress.save();

    // Return the saved address as a response
    res.json(savedAddress); // This should include all fields
  } catch (err) {
    console.error('Error saving address:', err);
    res.status(400).json({ error: 'Failed to save address' });
  }
});

// Catch-all route to send React index.html for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
module.exports = router;
