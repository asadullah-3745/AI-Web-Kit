from fastapi import APIRouter

router = APIRouter()


@router.get("/auth/status")
def auth_status():
    return {"authenticated": False, "note": "Auth is enforced by Clerk on the frontend"}