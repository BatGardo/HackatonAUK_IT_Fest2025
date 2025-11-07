# app/security/google_auth.py
from fastapi import APIRouter, Depends, Request
from fastapi.responses import RedirectResponse
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import os
import requests

from app.database.database import Base, engine, get_db
from app.database.models import User

router = APIRouter()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URI = os.getenv("OAUTH_REDIRECT_URI") 

@router.get("/auth/login")
def login_with_google():
    google_auth_url = (
        "https://accounts.google.com/o/oauth2/v2/auth"
        "?response_type=code"
        f"&client_id={GOOGLE_CLIENT_ID}"
        f"&redirect_uri={REDIRECT_URI}"
        "&scope=openid%20email%20profile"
    )
    return RedirectResponse(google_auth_url)

@router.get("/auth/callback")
def google_callback(request: Request, db: Session = Depends(get_db)):
    code = request.query_params.get("code")
    print("Google AUTH CODE:", code)  # <--- LOG

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

    print("TOKEN RESPONSE:", token_response)  # <--- LOG

    access_token = token_response.get("access_token")
    id_token = token_response.get("id_token")

    print("ID TOKEN:", id_token)  # <--- LOG

    user_info = requests.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        headers={"Authorization": f"Bearer {access_token}"}
    ).json()

    print("USER INFO:", user_info)  # <--- LOG

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

    response = RedirectResponse("/profile")
    response.set_cookie(
        "id_token",
        id_token,
        httponly=True,
        secure=True,
        samesite="lax",
        path="/"
    )
    return response

@router.post("/auth/logout")
def logout():
    res = JSONResponse({"message": "Logged out successfully"})
    res.delete_cookie("id_token")
    return res