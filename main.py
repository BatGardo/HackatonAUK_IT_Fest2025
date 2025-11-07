from fastapi import FastAPI
from app.security.google_auth import router as google_auth_router
from app.views.login_router import router as login_router
from app.views.profile_router import router as profile_router

app = FastAPI()

app.include_router(google_auth_router)
app.include_router(login_router)
app.include_router(profile_router)


@app.get("/")
def root():
    return FileResponse("frontend/dist/index.html")

@app.get("/{full_path:path}")
def spa_router(full_path: str):
    return FileResponse("frontend/dist/index.html")
