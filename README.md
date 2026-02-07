# Julius Sale - Portfolio & AI Chatbot

![CI/CD Quality Gate](https://github.com/rPhoenix10/ako.si.julius/actions/workflows/test-suite.yml/badge.svg)
![Deploy Status](https://github.com/rPhoenix10/ako.si.julius/actions/workflows/deploy.yml/badge.svg)

A Full-Stack Portfolio featuring a Retrieval-Augmented Generation (RAG) chatbot designed to answer recruiter questions instantly using my resume as the Single Source of Truth.

---

## Engineering Standards
This project adheres to Test-Driven Development (TDD) and CI/CD principles:
* **Backend:** Logic coverage via Jest & Supertest (Input validation, AI mocking).
* **Frontend:** Integration testing via React Testing Library (User flows, Accessibility).
* **Pipeline:** Automated GitHub Actions workflow that prevents deployment on test failure.

---

## AI Recruiter Bot (RAG Feature)

### Architecture
This feature implements a Full Stack architecture separating the frontend from the secure backend.

- **Frontend (React):** A floating chat widget (`AIBot.jsx`) that manages optimistic UI updates for a seamless user experience. It communicates with the backend via a Vite proxy to avoid CORS issues.
- **Backend (Node.js/Express):** A dedicated API server that handles prompt engineering and secret management.
- **AI Integration:** Uses Google Gemini Pro (via `@google/generative-ai`) to generate natural language responses.
- **Dynamic Context Injection:**
  - Uses `pdf-parse-fork` to read the raw PDF resume on server startup.
  - Injects the resume text into the System Prompt dynamically for every request.
  - Mitigates hallucinations by strictly enforcing "Resume Only" answers and injecting the current date to resolve temporal ambiguity.

---

## How to Run Locally

### Option 1: Docker Compose (Recommended)
Run the entire full-stack environment (Frontend + Backend) with a single command. This ensures environment consistency.

```bash
# Build and start the services
docker-compose up --build

# Access the portfolio at http://localhost:5173

```

### Option 2: Manual Setup
Run the entire full-stack environment (Frontend + Backend) without Docker:

```bash
# Start the Backend
cd portfolio-v2/server-api
npm install
# Creates the API endpoint at http://localhost:3001/api/chat
node index.js

# Start the Frontend
cd portfolio-v2
npm install
# Proxies /api requests to port 3001
npm run dev

```