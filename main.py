import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.security.google_auth import router as google_auth_router
from app.views.login_router import router as login_router
from app.views.profile_router import router as profile_router

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = FastAPI()

# Підключаємо бекенд роутери
app.include_router(google_auth_router)
app.include_router(login_router)
app.include_router(profile_router)

# Підключаємо статичні файли фронту
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "frontend/dist/assets")), name="static")

# Головна сторінка та SPA fallback
@app.get("/{full_path:path}")
def spa_router(full_path: str):
    return FileResponse(os.path.join(BASE_DIR, "frontend/dist/index.html"))
