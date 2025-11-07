from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from app.security.google_auth import router as google_router
import os


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = FastAPI()

app.include_router(google_router)


# Віддаємо assets (JS, CSS, зображення)
app.mount("/assets", StaticFiles(directory=os.path.join(BASE_DIR, "frontend/dist/assets")), name="assets")

# Catch-all для React SPA
@app.get("/{full_path:path}")
async def spa_router(full_path: str):
    return FileResponse(os.path.join(BASE_DIR, "frontend/dist/index.html"))
