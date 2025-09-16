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
.catch((err) => console.error("❌ Mongo Error:", err));

// Schema & Model
const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const Message = mongoose.model("Message", MessageSchema);

// Routes
app.get("/", (req, res) => {
  res.send("✅ Hello from MERN backend 🚀");
});

app.get("/messages", async (req, res) => {
  try {
    const msgs = await Message.find();
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ error: "Error fetching messages" });
  }
});

app.post("/messages", async (req, res) => {
  try {
    const msg = new Message({ text: req.body.text });
    await msg.save();
    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: "Error saving message" });
  }
});

// Start Server (Render requires process.env.PORT)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
