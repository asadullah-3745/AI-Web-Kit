import os

from fastapi import APIRouter, HTTPException, UploadFile, File

from app.api.ai_errors import handle_ai_error
from app.services.container import get_ingest_service

router = APIRouter()

UPLOAD_DIR = "uploads"


@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...)
):
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    path = f"{UPLOAD_DIR}/{file.filename}"

    with open(path, "wb") as f:
        f.write(await file.read())

    try:
        chunks = get_ingest_service().ingest_pdf(path)
    except HTTPException:
        raise
    except Exception as exc:
        raise handle_ai_error(exc) from exc

    return {
        "message": "uploaded",
        "chunks": chunks,
    }
