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

const user = new mongoose.Schema({
  email: String,
  password: String,
});

const Plant = mongoose.model("Plant", plantSchema);
const User = mongoose.model("User", user);

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


// ✅ Add new user (with basic validation and duplicate check)
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const newUser = new User({ email, password }); 
    await newUser.save();

   return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error during registration." });
  }
});

// ✅ User Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user: { email: user.email } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

