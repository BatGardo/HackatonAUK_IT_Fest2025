import os
import google.generativeai as genai

# зчитуємо ключ і модель з env
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.0-flash-001")

if not GEMINI_API_KEY:
    raise ValueError("❌ GEMINI_API_KEY is not set in environment variables")

# ініціалізація SDK
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel(GEMINI_MODEL)


def ask_gemini(prompt: str) -> dict:
    """
    Виконує запит до моделі Gemini і повертає текст відповіді у форматі інтерв'ю
    """
    try:
        response = model.generate_content(
            prompt,
            generation_config={"temperature": 0.4, "top_p": 0.9}
        )
        text = response.text.strip()

        # очікуємо формат:
        # Q1: ...
        # Q2: ...
        # Q3: ...
        # Q4: ...
        # Q5: ...
        questions = []
        for line in text.splitlines():
            line = line.strip()
            if line.startswith("Q") and ":" in line:
                questions.append(line.split(":", 1)[1].strip())

        return {"questions": questions}

    except Exception as e:
        return {"error": f"❌ Gemini API error: {str(e)}"}


def ask_gemini(prompt: str) -> str:
    """
    Виконує запит до моделі Gemini і повертає текст відповіді у форматі інтерв'ю
    """
    try:
        prepared_prompt = build_interview_prompt(prompt)

        response = model.generate_content(
            prepared_prompt,
            generation_config={
                "temperature": 0.4,
                "top_p": 0.9
            }
        )

        text = response.text

        # захист від випадків коли модель порушує структуру
        if not text.startswith("INTERVIEW:"):
            return "❌ Модель порушила структуру. Спробуйте знову."

        return text

    except Exception as e:
        return f"❌ Gemini API error: {str(e)}"

