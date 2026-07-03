from pathlib import Path

from app.config.settings import get_settings
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings

BACKEND_DIR = Path(__file__).resolve().parents[2]


class ChromaStore:
    def __init__(self):
        settings = get_settings()
        self.db = Chroma(
            persist_directory=str(BACKEND_DIR / "chroma_db"),
            embedding_function=GoogleGenerativeAIEmbeddings(
                model=settings.GEMINI_EMBEDDING_MODEL,
                google_api_key=settings.google_api_key,
            ),
        )

    def get_db(self):
        return self.db
