import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("✅ Handler triggered");

  const { query } = req.body;
  console.log("✅ API Key Exists:", !!process.env.OPENAI_API_KEY);
  console.log("✅ Query:", query);

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: "Invalid or missing query in request body." });
  }

  const fallbackToChatGPT = () => {
    const redirectUrl = `https://chat.openai.com/?q=${encodeURIComponent(query)}`;
    return res.status(307).json({ redirect: redirectUrl });
  };

  if (!process.env.OPENAI_API_KEY) {
    return fallbackToChatGPT();
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: query }],
      }),
    });

    const json = await openaiRes.json();
    console.log("OpenAI Response:", json);

    if (!openaiRes.ok) {
      console.error("OpenAI API Error:", json);
      if (json.error?.code === 'insufficient_quota' || json.error?.code === 'invalid_api_key') {
        return fallbackToChatGPT();
      }
      return res.status(500).json({ error: "Failed to get response from OpenAI" });
    }

    const result = json.choices?.[0]?.message?.content;
    if (!result) {
      console.error("No content in OpenAI response:", json);
      return res.status(500).json({ error: "No response content received" });
    }

    res.status(200).json({ result });
  } catch (err) {
    console.error("❌ Error contacting OpenAI API:", err);
    return fallbackToChatGPT();
  }
}
