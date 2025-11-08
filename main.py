from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from app.security.google_auth import router as google_router
from app.security.account_manager import router as account_router
from app.services.gemini_manager import router as gemini_router
import os


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = FastAPI()

app.include_router(google_router)
app.include_router(account_router)
app.include_router(gemini_router)


# Отдаем статические файлы
app.mount("/assets", StaticFiles(directory=os.path.join(BASE_DIR, "frontend", "dist", "assets")), name="assets")

# Catch-all для React SPA
@app.get("/{full_path:path}")
async def spa_router(full_path: str):
    return FileResponse(os.path.join(BASE_DIR, "frontend", "dist", "index.html"))

