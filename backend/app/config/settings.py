from pathlib import Path

from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

BACKEND_DIR = Path(__file__).resolve().parents[2]
ENV_FILE = BACKEND_DIR / ".env"

load_dotenv(ENV_FILE, override=True)


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=str(ENV_FILE),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    GOOGLE_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-2.5-flash"
    GEMINI_EMBEDDING_MODEL: str = "models/gemini-embedding-001"

    @property
    def google_api_key(self) -> str:
        return self.GOOGLE_API_KEY.strip()


def get_settings() -> Settings:
    # Reload .env on each read so uvicorn --reload picks up .env edits
    load_dotenv(ENV_FILE, override=True)
    return Settings()


def is_gemini_configured() -> bool:
    return bool(get_settings().google_api_key)
