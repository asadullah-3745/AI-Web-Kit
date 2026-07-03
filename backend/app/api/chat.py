import json
from typing import Literal

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from app.api.ai_errors import handle_ai_error
from app.services.container import get_chat_service, get_rag_service

router = APIRouter()


class ChatRequest(BaseModel):
    question: str | None = None
    message: str | None = None

    def text(self) -> str:
        return (self.message or self.question or "").strip()


class StreamMessage(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str


class StreamChatRequest(BaseModel):
    messages: list[StreamMessage]
    conversationId: str | None = Field(default=None, alias="conversationId")

    model_config = {"populate_by_name": True}


def _last_user_message(messages: list[StreamMessage]) -> str:
    for message in reversed(messages):
        if message.role == "user" and message.content.strip():
            return message.content.strip()
    return ""


def _sse(event: str, data: dict) -> str:
    return f"event: {event}\ndata: {json.dumps(data)}\n\n"


def _stream_response(generator):
    return StreamingResponse(
        generator,
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    )


@router.post("/chat")
async def chat(payload: ChatRequest):
    question = payload.text()

    if not question:
        raise HTTPException(status_code=400, detail="Question is required")

    try:
        result = get_rag_service().ask(question)
        return {"answer": result["answer"], "citations": result.get("citations", [])}
    except HTTPException:
        raise
    except Exception as exc:
        raise handle_ai_error(exc) from exc


@router.post("/chat/stream")
async def chat_stream(payload: StreamChatRequest):
    if not payload.messages:
        raise HTTPException(status_code=400, detail="messages are required")

    if not _last_user_message(payload.messages):
        raise HTTPException(status_code=400, detail="messages must include a user message")

    def generate():
        try:
            chat = get_chat_service()
            history = [m.model_dump() for m in payload.messages]

            for chunk in chat.stream_chat(history):
                yield _sse("token", {"content": chunk})

            yield _sse("done", {})
        except HTTPException as exc:
            yield _sse("error", {"message": str(exc.detail)})
        except Exception as exc:
            error = handle_ai_error(exc)
            yield _sse("error", {"message": str(error.detail)})

    return _stream_response(generate())


@router.post("/chat/rag/stream")
async def chat_rag_stream(payload: StreamChatRequest):
    question = _last_user_message(payload.messages)

    if not question:
        raise HTTPException(status_code=400, detail="messages must include a user message")

    def generate():
        try:
            for chunk in get_rag_service().stream_ask(question):
                if chunk:
                    yield _sse("token", {"content": chunk})
            yield _sse("done", {})
        except HTTPException as exc:
            yield _sse("error", {"message": str(exc.detail)})
        except Exception as exc:
            error = handle_ai_error(exc)
            yield _sse("error", {"message": str(error.detail)})

    return _stream_response(generate())
