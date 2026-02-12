# AI-Powered Terminal Portfolio (v2)

**"A portfolio that talks back."**

*Live Demo:* [https://rphoenix10.github.io/ako.si.julius](https://rphoenix10.github.io/ako.si.julius)

A full-stack, conversational AI platform that simulates a terminal interface. It uses a custom-tuned LLM (Gemini 1.5 Flash) to answer recruiter questions based on my real resume data, hosted on enterprise-grade cloud infrastructure.

![Project Status](https://img.shields.io/badge/Status-Production-success)
![Build](https://img.shields.io/github/actions/workflow/status/rPhoenix10/ako.si.julius/deploy.yml)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## Architecture

This project is built as a **Distributed System** with separate frontend and backend services, containerized with Docker, and orchestrated via GitHub Actions.

### **Tech Stack**
* **Frontend:** React (Vite), CSS Modules (Matrix Theme)
* **Backend:** Node.js (Express), PDF Parsing
* **AI Model:** Google Gemini 1.5 Flash (System Prompt Engineering)
* **DevOps:** Docker, Docker Compose, GitHub Actions (CI/CD)
* **Cloud:** IBM Cloud (Backend API), GitHub Pages (Static Hosting)

### **Key Features**
* **Resume Injection:** The backend parses `Julius-Sale-Resume.pdf` on startup and injects it into the AI's context window.
* **Context-Aware Persona:** The AI is prompted to act as a "CLI Utility," providing robotic, concise answers strictly based on factual data.
* **Containerization:** Fully Dockerized development environment ensures "works on my machine" reliability.
* **Automated CI/CD:** Every push to `main` triggers a 4-step pipeline:
    1.  Build Docker Images
    2.  Run Backend Integration Tests (Jest)
    3.  Run Frontend Unit Tests (Jest/React Testing Library)
    4.  Deploy to Production

---

## Local Development

### **Prerequisites**
* Docker Desktop
* Node.js (v18+)
* Google Gemini API Key

### **Quick Start (Docker)**
The easiest way to run the entire stack is with Docker Compose.

```bash
# 1. Clone the repository
git clone [https://github.com/rPhoenix10/ako.si.julius.git](https://github.com/rPhoenix10/ako.si.julius.git)
cd ako.si.julius

# 2. Set up environment variables
- Create a .env file in /server-api with your key:
- GEMINI_API_KEY=your_key_here

# 3. Start the stack
docker-compose up --build

```

Access the app at http://localhost:5273/ako.si.julius.

## Testing

```bash
# Run all tests (Frontend + Backend)
npm test

# Run backend integration tests only
cd server-api && npm test
```
**Backend Tests:** Verify that the API correctly handles PDF parsing and mocks the Google AI response using jest.unstable_mockModule.

**Frontend Tests:** verify that the Terminal UI renders correctly and handles API states.

## Contact
**Julius Sale** - [LinkedIn](https://www.linkedin.com/in/kim-julius-sale-0722531a0/)