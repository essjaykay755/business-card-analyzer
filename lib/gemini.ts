import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("Missing Gemini API Key");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function analyzeBusinessCard(imageBase64: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt =
    "Analyze this business card image and extract the following information: name, company, title, phone, email, address, website. Also, categorize the business type (e.g., hotel, medical, legal, etc.).";

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: imageBase64,
      },
    },
  ]);

  const response = await result.response;
  const text = response.text();

  // Parse the text response and return structured data
  // This is a simplified example; you may need to implement more robust parsing
  const lines = text.split("\n");
  const data: Record<string, string> = {};

  lines.forEach((line) => {
    const [key, value] = line.split(":");
    if (key && value) {
      data[key.trim().toLowerCase()] = value.trim();
    }
  });

  return data;
}
