from fastapi import FastAPI
from app.security.google_auth import router as google_auth_router
from app.views.login_router import router as login_router
from app.views.profile_router import router as profile_router

app = FastAPI()

app.include_router(google_auth_router)  # /auth/login, /auth/callback
app.include_router(login_router)        # /login
app.include_router(profile_router)      # /profile
