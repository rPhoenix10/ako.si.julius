# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## 🤖 AI Recruiter Bot (New Feature)

A Retrieval-Augmented Generation (RAG) chatbot designed to answer recruiter questions instantly using my resume as the Single Source of Truth.

### 🏗 Architecture
This feature implements a Full Stack architecture separating the frontend "Client" from the secure "Brain."

- **Frontend (React):** A floating chat widget (`RecruiterBot.jsx`) that manages optimistic UI updates for a seamless user experience. It communicates with the backend via a Vite proxy to avoid CORS issues.
- **Backend (Node.js/Express):** A dedicated API server that handles prompt engineering and secret management.
- **AI Integration:** Uses Google Gemini Pro (via `@google/generative-ai`) to generate natural language responses.
- **Dynamic Context Injection:**
  - Uses `pdf-parse-fork` to read the raw PDF resume on server startup.
  - Injects the resume text into the System Prompt dynamically for every request.
  - Mitigates hallucinations by strictly enforcing "Resume Only" answers and injecting the current date to resolve temporal ambiguity (e.g., "June 2025" is treated as "Graduated").

### 🚀 How to Run Locally
Since this feature requires a backend server, you must run both the client and server terminals.

**1. Start the Backend (The Brain)**
```bash
cd server-api
# Creates the API endpoint at http://localhost:3001/api/chat
npx nodemon index.js
cd portfolio-v2
# Proxies /api requests to port 3001
npm run dev
