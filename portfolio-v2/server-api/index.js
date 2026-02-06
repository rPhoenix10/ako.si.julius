import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import pdf from 'pdf-parse-fork';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemma-3-12b-it" });

console.log("Loading resume...");

let resumeText = "";

const loadResume = async () => {
  try {
    if (fs.existsSync('./Julius-Sale-Resume.pdf')) {
        const dataBuffer = fs.readFileSync('./Julius-Sale-Resume.pdf');
        const data = await pdf(dataBuffer);
        resumeText = data.text;
        console.log(`Resume loaded successfully! (${resumeText.length} chars)`);
    } else {
        console.error("Error: 'Julius-Sale-Resume.pdf' not found.");
        resumeText = "Resume file missing.";
    }
  } catch (error) {
    console.error("Error reading resume:", error);
    resumeText = "Error reading resume file.";
  }
};

loadResume();

// Defining chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const prompt = `
    You are an AI assistant for Kim Julius Sale's portfolio website. 
    Your goal is to answer recruiter questions about Julius based on his resume.

    TODAY'S DATE: ${new Date().toDateString()}

    INSTRUCTIONS:
    - The user will ask questions about Julius.
    - You must answer ONLY using the facts from the "Resume Content" below.
    - If the resume says "June 2025" for a degree, treat it as COMPLETED/GRADUATED.
    - If the resume lists "Ancora Training", clarify it is a "Training Program" and not a degree.
    - Be professional, concise, and enthusiastic.

    RESUME CONTENT:
    """
    ${resumeText} 
    """

    USER QUESTION: ${message}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "My brain is tired. Please try again later." });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});