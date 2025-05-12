
const express = require("express");
const router = express.Router();
const { openai } = require("../services/openai");

router.post("/", async (req, res) => {
  const { idea } = req.body;
  const prompt = `
You're a cofounder AI. A user says: "${idea}"
Respond with:
{
  "status": "ready" or "clarify",
  "summary"?: "...",
  "questions"?: ["...", "..."]
}
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    });

    const content = completion.choices[0].message.content;
    const parsed = JSON.parse(content);
    res.json(parsed);
  } catch (err) {
    console.error("Refine error:", err.message);
    res.status(500).json({ error: "Failed to clarify idea." });
  }
});

module.exports = router;
