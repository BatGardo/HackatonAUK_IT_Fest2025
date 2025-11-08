def build_interview_prompt(topic: str):
    return f"""
            Ти — HR інтерв'юер.
            Створи РІВНО 5 питань по темі: {topic}.

            Формат відповіді строго:

            QUESTIONS:
            1. <question>
            2. <question>
            3. <question>
            4. <question>
            5. <question>
            """
