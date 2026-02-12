import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import pdf from 'pdf-parse-fork';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemma-3-12b-i" });

let resumeText = "";

// 1. Load Resume Function
const loadResume = async () => {
  try {
    // Check if the file exists
    if (fs.existsSync('./Julius-Sale-Resume.pdf')) {
        const dataBuffer = fs.readFileSync('./Julius-Sale-Resume.pdf');
        const data = await pdf(dataBuffer);
        resumeText = data.text;
        console.log(`Resume loaded successfully! (${resumeText.length} chars)`);
    } else {
        console.error("WARNING: 'Julius-Sale-Resume.pdf' not found in server-api folder.");
        resumeText = "Resume file missing. Please contact Julius directly.";
    }
  } catch (error) {
    console.error("Error reading resume:", error);
    resumeText = "Error reading resume file.";
  }
};

// Initialize resume load
loadResume();

// 2. Chat Endpoint
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    // Input Validation
    if (!message || typeof message !== 'string' || message.trim() === "") {
        return res.status(400).json({ error: "Invalid input: Message cannot be empty." });
    }

    // 3. The CLI Persona Prompt
    const prompt = `
    You are a CLI (Command Line Interface) utility for Kim Julius Sale's portfolio.
    
    TODAY'S DATE: ${new Date().toDateString()}

    PROTOCOL:
    1. Response Style: STRICTLY ROBOTIC and CONCISE.
    2. Max Length: Keep answers under 2-3 sentences.
    3. Tone: No politeness markers (e.g., "Please", "I hope that helps").
    4. Terminology: Use technical syntax (e.g., "Status:", "Index:", "Output:").
    5. Fallback: If the answer is NOT in the resume, return "ERR_DATA_NOT_FOUND: Please contact admin."

    CONTEXT (RESUME DATA):
    """
    ${resumeText}
    """

    USER QUERY: ${message}
    `;

    try {
        // We use standard generateContent
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Send back JSON so the Frontend can read it
        res.json({ reply: text });

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "System Overload. Try again later." });
    }
});

// Start Server (Only if not in Test mode)
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export default app;