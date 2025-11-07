import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = FastAPI()

# Підключаємо статичні файли (JS, CSS, зображення)
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "frontend/dist/assets")), name="static")

# Всі інші запити повертають index.html (SPA fallback)
@app.get("/{full_path:path}")
def spa_router(full_path: str):
    return FileResponse(os.path.join(BASE_DIR, "frontend/dist/index.html"))
