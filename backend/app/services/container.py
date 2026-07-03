from fastapi import HTTPException

from app.config.settings import is_gemini_configured
from app.services.chat_service import ChatService
from app.services.ingest_service import IngestService
from app.services.llm_service import LLMService
from app.services.rag_service import RAGService
from app.vectordb.chroma_store import ChromaStore

_llm = None
_vectordb = None
_ingest_service = None
_rag_service = None
_chat_service = None


def reset_services() -> None:
    global _llm, _vectordb, _ingest_service, _rag_service, _chat_service
    _llm = None
    _vectordb = None
    _ingest_service = None
    _rag_service = None
    _chat_service = None


def _require_gemini_key() -> None:
    if not is_gemini_configured():
        raise HTTPException(
            status_code=503,
            detail="GOOGLE_API_KEY is not configured in backend/.env",
        )


def get_ingest_service() -> IngestService:
    global _ingest_service, _vectordb

    _require_gemini_key()

    if _ingest_service is None:
        if _vectordb is None:
            _vectordb = ChromaStore().get_db()
        _ingest_service = IngestService(_vectordb)

    return _ingest_service


def get_rag_service() -> RAGService:
    global _rag_service, _llm, _vectordb

    _require_gemini_key()

    if _rag_service is None:
        if _llm is None:
            _llm = LLMService().get_llm()
        if _vectordb is None:
            _vectordb = ChromaStore().get_db()
        _rag_service = RAGService(_llm, _vectordb)

    return _rag_service


def get_llm():
    global _llm

    _require_gemini_key()

    if _llm is None:
        _llm = LLMService().get_llm()

    return _llm


def get_chat_service() -> ChatService:
    global _chat_service, _llm

    _require_gemini_key()

    if _chat_service is None:
        if _llm is None:
            _llm = LLMService().get_llm()
        _chat_service = ChatService(_llm)

    return _chat_service


def get_service_status() -> dict:
    return {
        "gemini_configured": is_gemini_configured(),
        "llm_ready": _llm is not None,
        "vectordb_ready": _vectordb is not None,
    }
