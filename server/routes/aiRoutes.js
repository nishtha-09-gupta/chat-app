import express from "express";
import axios from "axios";

const router = express.Router();
router.post("/send", async (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "x-ai/grok-4.1-fast:free",
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          { role: "user", content: text }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`
        }
      }
    );

    const reply = response.data?.choices?.[0]?.message?.content;

    if (!reply) {
      console.log("AI RESPONSE MISSING -->", response.data);
      return res.status(500).json({ error: "AI returned no content" });
    }

    res.json({ reply });

  } catch (error) {
    console.error("AI ERROR", error.response?.data || error.message);

    if (error.response?.status === 404) {
      return res.status(404).json({ error: "Model not available. Check model name or API key." });
    }

    res.status(500).json({ error: error.response?.data?.error || "AI request failed" });
  }
});

export default router;
