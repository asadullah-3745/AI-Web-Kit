from app.config.settings import get_settings
from langchain_google_genai import ChatGoogleGenerativeAI


class LLMService:
    def __init__(self):
        settings = get_settings()
        self.llm = ChatGoogleGenerativeAI(
            model=settings.GEMINI_MODEL,
            temperature=0,
            google_api_key=settings.google_api_key,
        )

    def get_llm(self):
        return self.llm
