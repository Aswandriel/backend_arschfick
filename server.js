const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB verbinden
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Schema & Modell
const suggestionSchema = new mongoose.Schema({ text: String });
const Suggestion = mongoose.model("Suggestion", suggestionSchema);

// POST – Vorschlag speichern
app.post("/suggestions", async (req, res) => {
  const text = req.body.text?.trim();
  if (text) {
    await Suggestion.create({ text });
  }
  res.json({ success: true });
});

// GET – Alle Vorschläge abrufen
app.get("/suggestions", async (req, res) => {
  const all = await Suggestion.find();
  res.json(all.map(s => s.text));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
