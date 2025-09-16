import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log("❌ Mongo Error:", err));

// Simple Schema
const MessageSchema = new mongoose.Schema({
  text: String,
});

const Message = mongoose.model("Message", MessageSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Hello from MERN backend 🚀");
});

app.get("/messages", async (req, res) => {
  const msgs = await Message.find();
  res.json(msgs);
});

app.post("/messages", async (req, res) => {
  const msg = new Message({ text: req.body.text });
  await msg.save();
  res.json(msg);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
