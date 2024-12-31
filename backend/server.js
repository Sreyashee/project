const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (change the URI to your MongoDB connection string)
mongoose.connect("mongodb://localhost:27017/myproj", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Define Address Schema and Model
const addressSchema = new mongoose.Schema({
  houseNo: String,
  area: String,
  category: String,
  });

const Address = mongoose.model("Address", addressSchema);

// Define POST route to save the address
app.post("/api/addresses", async (req, res) => {
  try {
    const { houseNo, area, category } = req.body;

    // Create a new Address document
    const newAddress = new Address({
      houseNo,
      area,
      category,
      
    });

    // Save the address to the database
    await newAddress.save();

    // Send back the saved address data
    res.status(201).json(newAddress);
  } catch (error) {
    console.error("Error saving address:", error);
    res.status(500).json({ error: "Failed to save address" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = Address;