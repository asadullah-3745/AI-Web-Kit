import os
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import upload
from app.api import chat
from app.api import auth
from app.config.settings import ENV_FILE, get_settings, is_gemini_configured
from app.services.container import get_service_status

# Load settings (and .env) before anything else
get_settings()

UPLOAD_DIR = Path(__file__).resolve().parents[1] / "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(upload.router)
app.include_router(chat.router)


@app.get("/")
def root():
    return {"message": "AI Web Kit Running"}


@app.get("/health")
def health():
    status = get_service_status()
    return {
        "status": "ok" if status["gemini_configured"] else "degraded",
        "env_file": str(ENV_FILE),
        **status,
    }
