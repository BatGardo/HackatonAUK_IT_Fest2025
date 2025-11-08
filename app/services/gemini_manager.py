from uuid import uuid4
from fastapi import APIRouter
from app.services.gemini_client import ask_gemini
from app.services.promts.interview_prompt import build_interview_prompt

router = APIRouter(prefix="/ai", tags=["Gemini"])

session_store = {}

@router.get("/ask")
def ask_ai(prompt: str):
    answer = ask_gemini(prompt)
    return {"response": answer}

@router.post("/start_interview")
def start_interview(body: dict = None):
    session_id = str(uuid4())

    topic = body.get("topic") if body else "Загальні питання інтерв'ю направлені на оцінку кандидата та його Soft навички."

    prompt = build_interview_prompt(topic)
    response = ask_gemini(prompt)
    session_store[session_id] = {
        "questions": response.get("questions", []),
        "topic": topic
    }


    return {
        "session_id": session_id,
        "topic": topic,
        "questions": session_store[session_id]["questions"]
    }



@router.post("/submit_answers")
def submit_answers(body: dict):
    session_id = body["session_id"]
    answers = body["answers"]

    if session_id not in session_store:
        return {"error": "invalid session id"}

    questions = session_store[session_id]["questions"]

    formatted = "\n".join([
        f"Q: {q}\nA: {answers[q]}"
        for q in questions
    ])

    evaluation_prompt = f"""
    Виконай аналіз інтерв'ю.

    Оцінка кандидата:
    - Короткий підсумок (3 речення)
    - Сильні сторони
    - Слабкі місця
    - Оцінка від 1 до 10

    Дані інтерв'ю:
    {formatted}
    """

    result = ask_gemini(evaluation_prompt)

    return {"evaluation": result}