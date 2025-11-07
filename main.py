import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = FastAPI()

# Віддаємо JS/CSS/asset файли
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "frontend/dist/assets")), name="static")

# Всі інші запити повертають index.html
@app.get("/{full_path:path}")
async def spa_router(full_path: str):
    return FileResponse(os.path.join(BASE_DIR, "frontend/dist/index.html"))
