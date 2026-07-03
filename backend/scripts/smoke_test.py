"""Smoke tests for LLM wrapper and RAG pipeline."""

import os
import sys

from dotenv import load_dotenv

BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(BACKEND_DIR, ".env"), override=True)

sys.path.insert(0, BACKEND_DIR)


def main() -> int:
    print("=== AI Web Kit Backend Smoke Tests ===\n")

    if not os.getenv("GOOGLE_API_KEY"):
        print("FAIL: GOOGLE_API_KEY is not set in backend/.env")
        return 1

    print("1. Testing LLM wrapper...")
    from app.services.llm_service import LLMService

    llm = LLMService().get_llm()
    response = llm.invoke("Reply with exactly: OK")
    content = response.content if hasattr(response, "content") else str(response)
    print(f"   LLM response: {content[:80]}")
    print("   PASS\n")

    print("2. Testing vector store...")
    from app.vectordb.chroma_store import ChromaStore

    vectordb = ChromaStore().get_db()
    print("   Chroma collection ready")
    print("   PASS\n")

    print("3. Testing RAG pipeline...")
    from app.services.rag_service import RAGService

    rag = RAGService(llm, vectordb)
    result = rag.ask("What is 2+2? Answer briefly.")
    print(f"   Answer: {result['answer'][:120]}")
    print(f"   Citations: {len(result['citations'])}")
    print("   PASS\n")

    print("All backend smoke tests passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
