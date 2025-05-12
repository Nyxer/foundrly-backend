
const express = require("express");
const router = express.Router();
const { openai } = require("../services/openai");

router.post("/", async (req, res) => {
  const { idea, target_user, platform, features } = req.body;
  const prompt = `
You are a startup assistant AI.
User idea: "${idea}"
Audience: ${target_user}
Platform: ${platform}
Features: ${features.join(', ')}

Respond with JSON:
{
  "spec": "...",
  "code": "...",
  "instructions": "..."
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
    console.error("Generate error:", err.message);
    res.status(500).json({ error: "Failed to generate code." });
  }
});

module.exports = router;
