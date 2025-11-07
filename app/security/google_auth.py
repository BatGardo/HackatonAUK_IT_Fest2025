from fastapi import FastAPI, Depends, Request
from fastapi.responses import RedirectResponse, FileResponse
from sqlalchemy.orm import Session
import os
import requests

from database import Base, engine, get_db
from models import User
from app.security.auth import auth_required  
from app.views.login_router import router as login_router
from app.views.profile_router import router as profile_router

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI") 

app = FastAPI()

@app.get("/auth/login")
def login_with_google():
    google_auth_url = (
        "https://accounts.google.com/o/oauth2/v2/auth"
        "?response_type=code"
        f"&client_id={GOOGLE_CLIENT_ID}"
        f"&redirect_uri={REDIRECT_URI}"
        "&scope=openid%20email%20profile"
    )
    return RedirectResponse(google_auth_url)


@app.get("/auth/callback")
def google_callback(request: Request, db: Session = Depends(get_db)):
    code = request.query_params.get("code")

    token_data = {
        "code": code,
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "redirect_uri": REDIRECT_URI,
        "grant_type": "authorization_code"
    }

    token_response = requests.post(
        "https://oauth2.googleapis.com/token",
        data=token_data
    ).json()

    access_token = token_response.get("access_token")
    user_info = requests.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        headers={"Authorization": f"Bearer {access_token}"}
    ).json()

    user = db.query(User).filter(User.email == user_info["email"]).first()
    if not user:
        user = User(
            name=user_info.get("name", "No name"),
            email=user_info["email"],
            google_id=user_info["id"]
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    # створюємо cookie сесії
    response = RedirectResponse("/profile")
    response.set_cookie("user_id", str(user.id), httponly=True)
    return response

app.include_router(login_router)
app.include_router(profile_router)
