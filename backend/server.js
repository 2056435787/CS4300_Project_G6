const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/nature_explorer", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("✅ Connected to MongoDB"));

// ✅ Define schema
const plantSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
});

const Plant = mongoose.model("Plant", plantSchema);

// ✅ Routes

// Get all plants
app.get("/api/plants", async (req, res) => {
  const plants = await Plant.find();
  res.json(plants);
});

// Add new plant
app.post("/api/plants", async (req, res) => {
  const { name, type, description } = req.body;
  const newPlant = new Plant({ name, type, description });
  await newPlant.save();
  res.json({ message: "Plant added successfully" });
});

// Delete a plant
app.delete("/api/plants/:id", async (req, res) => {
  await Plant.findByIdAndDelete(req.params.id);
  res.json({ message: "Plant deleted" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

