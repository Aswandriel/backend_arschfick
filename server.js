const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let suggestions = [];

// Vorschlag empfangen
app.post("/suggestions", (req, res) => {
  const text = req.body.text?.trim();
  if (text) {
    suggestions.push(text);
  }
  res.json({ success: true });
});

// Alle Vorschläge abrufen
app.get("/suggestions", (req, res) => {
  res.json(suggestions);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
