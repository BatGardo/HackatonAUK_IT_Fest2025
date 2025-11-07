# app/views/login_router.py

from fastapi import APIRouter
from fastapi.responses import FileResponse

router = APIRouter()

@router.get("/login")
def login_page():
    return FileResponse("static/login.html")
