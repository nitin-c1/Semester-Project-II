import axios from "axios";
import { config } from "../config/env.js";

export const analyzeUrlWithAi = async (url) => {
  const prompt = `
You are a cybersecurity AI.

Analyze this URL: ${url}

IMPORTANT:
- Return ONLY valid JSON
- DO NOT include any text before or after JSON
- DO NOT use markdown

RULES:
- 0 = safe, 100 = phishing
- phishing keywords → score > 80
- trusted domains → score < 10
- impersonation → score > 90

Return JSON:
{
  "isPhishing": boolean,
  "finalScore": number,
  "reasons": ["string"],
  "summary": "string"
}
`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemini-2.5-flash",

        messages: [
          {
            role: "system",
            content:
              "STRICT: Return ONLY raw JSON. No explanation. No markdown."
          },
          {
            role: "user",
            content: prompt
          }
        ],

        temperature: 0,
        max_tokens: 300
      },
      {
        headers: {
          Authorization: `Bearer ${config.openRouterApiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "Phishing Detector"
        }
      }
    );

    let text = response.data?.choices?.[0]?.message?.content || "";

    // 🧹 Step 1: remove markdown
    text = text.replace(/```json|```/g, "").trim();

    // 🧠 Step 2: extract JSON safely (MOST IMPORTANT FIX)
    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("No JSON found");
    }

    const jsonString = text.substring(firstBrace, lastBrace + 1);

    let parsed = JSON.parse(jsonString);

    // 🔒 RULE ENGINE (guarantee correctness)
    const phishingRegex =
      /phishing|login|verify|account|bank|secure|update|password/i;

    const trustedDomains = [
      "amazon",
      "flipkart",
      "google",
      "microsoft",
      "facebook",
      "instagram",
      "netflix",
      "paypal"
    ];

    const urlLower = url.toLowerCase();

    const isTrusted = trustedDomains.some(d => urlLower.includes(d));
    const hasPhishingKeyword = phishingRegex.test(url);

    if (hasPhishingKeyword) {
      parsed.finalScore = Math.max(parsed.finalScore || 0, 85);
      parsed.isPhishing = true;
      parsed.reasons.push("Contains phishing keywords");
    }

    if (isTrusted && !hasPhishingKeyword) {
      parsed.finalScore = Math.min(parsed.finalScore || 20, 20);
      parsed.isPhishing = false;
      parsed.reasons.push("Trusted domain");
    }

    if (isTrusted && hasPhishingKeyword) {
      parsed.finalScore = 90;
      parsed.isPhishing = true;
      parsed.reasons.push("Brand impersonation");
    }

    // 🔒 safety
    if (!Array.isArray(parsed.reasons)) parsed.reasons = [];
    if (!parsed.summary) parsed.summary = "No summary provided";

    return parsed;

  } catch (err) {
    console.error("AI ERROR:", err.response?.data || err.message);

    return {
      isPhishing: false,
      finalScore: 40,
      reasons: ["AI unavailable"],
      summary: "Fallback result"
    };
  }
};

export const testOpenRouterConnection = async () => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "user",
            content: "Hello, respond with 'API working'."
          }
        ],
        max_tokens: 20
      },
      {
        headers: {
          Authorization: `Bearer ${config.openRouterApiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "Phishing Detector Test"
        }
      }
    );
    return {
      status: "success",
      message: "API and model are working correctly!",
      response: response.data?.choices?.[0]?.message?.content || ""
    };
  } catch (err) {
    return {
      status: "error",
      message: err.message,
      details: err.response?.data || null
    };
  }
};