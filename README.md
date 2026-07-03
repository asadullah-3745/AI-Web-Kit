# AI Web Kit

A full-stack document chat app with PDF upload, Gemini-powered RAG, and Clerk authentication.

See **[frontend/clerk-nextjs/README.md](frontend/clerk-nextjs/README.md)** for setup, environment variables, and run instructions.

## Quick start

```powershell
# Backend
cd backend
py -m pip install -r requirements.txt
py -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8001

# Frontend (new terminal)
cd frontend/clerk-nextjs
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
