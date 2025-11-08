from fastapi import APIRouter
from app.services.gemini_client import ask_gemini

router = APIRouter(prefix="/ai", tags=["Gemini"])

@router.get("/ask")
def ask_ai(prompt: str):
    answer = ask_gemini(prompt)
    return {"response": answer}