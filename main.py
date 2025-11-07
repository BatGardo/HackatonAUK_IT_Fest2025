from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.security.google_auth import router as google_auth_router
from app.views.login_router import router as login_router
from app.views.profile_router import router as profile_router

app = FastAPI()

# Підключення статичних файлів (якщо є frontend)
app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(google_auth_router)
app.include_router(login_router)
app.include_router(profile_router)
