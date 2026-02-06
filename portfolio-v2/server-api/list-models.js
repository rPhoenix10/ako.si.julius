import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

console.log("Fetching available models...");

try {
  const response = await fetch(url);
  const data = await response.json();
  
  // Filter for models that support "generateContent"
  const availableModels = data.models
    .filter(m => m.supportedGenerationMethods.includes("generateContent"))
    .map(m => m.name); // Just get the names

  console.log("Models you can use:", availableModels);
} catch (error) {
  console.error("Error fetching models:", error);
}