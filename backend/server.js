const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth"); // Import router

dotenv.config();
const app = express();

// ✅ Middleware
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

// ✅ Use auth routes
app.use("/api", authRoutes);

// ✅ Plant schema and model
const plantSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
});

const Plant = mongoose.model("Plant", plantSchema);

// ✅ Plant routes
app.get("/api/plants", async (req, res) => {
  const plants = await Plant.find();
  res.json(plants);
});

app.post("/api/plants", async (req, res) => {
  const { name, type, description } = req.body;
  const newPlant = new Plant({ name, type, description });
  await newPlant.save();
  res.json({ message: "Plant added successfully" });
});

app.delete("/api/plants/:id", async (req, res) => {
  await Plant.findByIdAndDelete(req.params.id);
  res.json({ message: "Plant deleted" });
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
