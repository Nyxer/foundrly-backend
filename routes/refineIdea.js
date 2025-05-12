const express = require("express");
const router = express.Router();
const { openai } = require("../services/openai");

router.post("/", async (req, res) => {
  const { idea } = req.body;

  const prompt = `
You are a cofounder AI. A user says: "${idea}"
Respond ONLY with valid JSON in this format:
{
  "status": "ready" or "clarify",
  "summary"?: "a short summary of the idea",
  "questions"?: ["question 1", "question 2"]
}
No explanation, no commentary, just JSON.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    });

    const content = completion.choices[0].message.content;
    try {
      const parsed = JSON.parse(content);
      res.json(parsed);
    } catch (err) {
      console.error("❌ Parse error:", err.message);
      console.error("🧾 Raw GPT content:", content);
      res.status(500).json({ error: "Failed to parse GPT response." });
    }
  } catch (err) {
    console.error("🔥 GPT request failed:", err.message);
    res.status(500).json({ error: "GPT API request failed." });
  }
});

module.exports = router;
