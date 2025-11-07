from fastapi import APIRouter, Depends, Cookie, HTTPException
from fastapi.responses import FileResponse

router = APIRouter()

def auth_required(user_id: str = Cookie(None)):
    if not user_id:
        raise HTTPException(status_code=401, detail="Auth required")
    return user_id

@router.get("/profile")
def profile_page(user_id: str = Depends(auth_required)):
    return FileResponse("static/profile.html")
