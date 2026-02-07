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
    const { message } = req.body;

    const prompt = `
    You are a CLI (Command Line Interface) utility for Kim Julius Sale's portfolio.

    TODAY'S DATE: ${new Date().toDateString()}

    PROTOCOL:
    1.  Response Style: STRICTLY ROBOTIC and CONCISE.
    2.  Max Length: Keep answers under 2 sentences whenever possible.
    3.  Tone: No politeness markers (e.g., "Please", "I hope that helps"). No conversational filler.
    4.  Terminology: Use technical/system syntax where appropriate (e.g., "Status:", "Index:", "Output:").
    
    INSTRUCTIONS:
    - Answer recruiter questions based ONLY on the provided context.
    - If the answer is found: Output the raw facts efficiently.
    - If the answer is NOT found: Return error code "ERR_DATA_NOT_FOUND".
    
    CONTEXT:
    """
    ${resumeText}
    """

    USER QUESTION: ${message}
    `;

    try {
      const result = await model.generateContentStream(prompt);

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        res.write(chunkText);
    }

    res.end();

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).send("My brain is tired. Please try again later.");
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});