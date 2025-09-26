// api/chat.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const { messages } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer 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}`, // Vercel 환경 변수
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
}
