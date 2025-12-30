# AI Blog Automation Engine

A full-stack AI-powered application that automates blog ingestion, enhancement, and presentation using modern web technologies and Generative AI.

---

## 🚀 Project Overview

The AI Blog Automation Engine is designed to:

- Store original blog articles
- Automatically enhance blogs using Generative AI
- Fetch and cite external reference articles
- Maintain both original and AI-enhanced versions
- Display blogs in a modern, responsive UI 

The system is built with a clear separation between backend automation and frontend presentation.

---

## ✨ Key Features

- REST APIs for blog CRUD operations
- Slug-based routing for SEO-friendly URLs
- Background AI automation script (Phase 2)
- Gemini AI integration for content rewriting
- Graceful handling of scraping failures
- Responsive React + Tailwind UI
- Original vs AI-enhanced content support
- Reference citation storage and display

---

## 🏗️ Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL (Neon – Cloud Database)
- Prisma ORM
- Axios
- Cheerio
- Gemini AI (REST API)
- SerpAPI

### Frontend
- React
- React Router
- Tailwind CSS
- Vite

### Deployment
- Backend: Render
- Database: Neon
- Frontend: Vercel

---

## 📁 Project Structure

beyondchats-assignment/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── services/
│ ├── prisma/
│ ├── scripts/
│ │ └── articleUpdater.js
│ ├── server.js
│ ├── .env.example
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── services/
│ ├── App.jsx
│
└── README.md



---

## 🔁 AI Automation Pipeline (Phase 2)

1. Fetch stored articles from the database
2. Perform Google search using article titles (SerpAPI)
3. Fetch and scrape reference articles
4. Rewrite original content using Gemini AI
5. Store enhanced content and references
6. Update article status

This process runs as a background script and updates existing articles asynchronously.

---

## 🔐 Environment Variables

Sensitive information is managed using environment variables and is **not committed to GitHub**.

### Backend (`.env.example`)

```env
PORT=5000
DATABASE_URL=postgresql://<username>:<password>@<host>:5432/<database>
GEMINI_API_KEY=your_gemini_api_key
SERPAPI_KEY=your_serpapi_key


▶️ Local Setup Instructions
Backend
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev

Frontend
cd frontend
npm install
npm run dev


⚙️ Run AI Automation Script

cd backend
node scripts/articleUpdater.js

This script updates articles with AI-enhanced content and references.



🌍 Live Demo

Frontend: https://beyondchats-assignment-pi.vercel.app

Backend API: https://ai-blog-automation-engine.onrender.com




⚠️ Limitations

Some high-authority websites block scraping (403 errors)

These cases are handled gracefully without breaking the pipeline

Manual article seeding is used where scraping is restricted

