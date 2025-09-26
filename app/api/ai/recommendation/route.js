import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Initialize Google GenAI with API key from env
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

// Helper function to generate content
async function generateContent(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
      Provide ONLY valid JSON.
      Do NOT include markdown, code fences, or explanations.
      the point should be the string of ai recommendation for proper train trafic manegement
      Example:
      {
  "recommendation": {
    "1": "First point",
    "2": "Second point",
    "3": "Third point"
  },
  "performance": {
    "Network_Throughput": {
      "value": "1,205 TU/hr",
      "change": "+5.2%"
    },
    "Average_Delay": {
      "value": "6.8 min",
      "change": "-12.5%"
    },
    "Track_Utilization": {
      "value": "85%",
      "change": "+2.1%"
    },
    "Punctuality": {
      "value": "92.3%",
      "change": "+1.8%"
    }
  }
}

      Input: ${JSON.stringify(prompt)}
    `,
  });

  let message = response.text.trim();

  // 🧹 Clean up unwanted markdown/code fences if model adds them
  if (message.startsWith("```")) {
    message = message.replace(/```json|```/g, "").trim();
  }

  // ✅ Ensure it's valid JSON
  let jsonMessage;
  try {
    jsonMessage = JSON.parse(message);
  } catch {
    // fallback: wrap as JSON string
    jsonMessage = { "1": message };
  }

  return jsonMessage;
}

// POST API handler
export async function POST(request) {
  const data = await request.json();

  if (!data) {
    return NextResponse.json(
      { message: "Please provide a prompt" },
      { status: 400 }
    );
  }

  try {
    const message = await generateContent(data);

    return NextResponse.json(
      { message },
      { status: 200 }
    );
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json(
      { message: "Error generating content" },
      { status: 500 }
    );
  }
}
