# app/routes.py

from fastapi import FastAPI
from app.security.google_auth import router as google_auth_router
from app.views.profile_router import router as profile_router
from app.views.login_router import router as login_router

def register_routes(app: FastAPI):
    app.include_router(google_auth_router)
    app.include_router(login_router)
