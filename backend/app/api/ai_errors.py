from fastapi import HTTPException

try:
    from google.api_core.exceptions import GoogleAPIError, PermissionDenied, Unauthenticated
except ImportError:
    GoogleAPIError = Exception  # type: ignore[misc, assignment]
    Unauthenticated = PermissionDenied = Exception  # type: ignore[misc, assignment]

try:
    from google.genai.errors import ClientError, ServerError
except ImportError:
    ClientError = ServerError = Exception  # type: ignore[misc, assignment]

try:
    from langchain_google_genai._common import GoogleGenerativeAIError
except ImportError:
    GoogleGenerativeAIError = Exception  # type: ignore[misc, assignment]


def handle_ai_error(exc: Exception) -> HTTPException:
    message = str(exc).lower()

    if isinstance(exc, (Unauthenticated, PermissionDenied)) or (
        "api key" in message
        or "api_key" in message
        or ("invalid" in message and "key" in message)
        or "unauthenticated" in message
        or "permission_denied" in message
    ):
        return HTTPException(
            status_code=401,
            detail="Invalid Google API key. Check GOOGLE_API_KEY in backend/.env.",
        )

    if isinstance(exc, (GoogleAPIError, ClientError, ServerError, GoogleGenerativeAIError)):
        return HTTPException(
            status_code=502,
            detail=f"Gemini request failed: {exc}",
        )

    if "not found" in message and "model" in message:
        return HTTPException(
            status_code=502,
            detail=f"Gemini model error: {exc}",
        )

    return HTTPException(status_code=500, detail=f"An unexpected error occurred: {exc}")
