from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi import FastAPI, Depends
import os
from sqlalchemy.orm import Session
from database import Base, engine, get_db
from models import User
from schemas import UserCreate, UserResponse


GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv(" GOOGLE_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")
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
    return RedirectResponse(url=google_auth_url)


@app.get("/auth/callback")
def google_callback(code: str, db: Session = Depends(get_db)):
    """Обробка відповіді від Google OAuth"""

    # обмін коду на access_token
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
    if not access_token:
        return {"error": "Google did not send access token"}

    # отримуємо дані користувача
    user_info = requests.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        headers={"Authorization": f"Bearer {access_token}"}
    ).json()

    google_id = user_info["id"]
    email = user_info["email"]
    name = user_info.get("name", "No name")

    # шукаємо користувача по email
    user = db.query(User).filter(User.email == email).first()

    if not user:
        # створюємо нового
        user = User(name=name, email=email, google_id=google_id)
        db.add(user)
        db.commit()
        db.refresh(user)

    return {
        "message": "Authenticated ✅",
        "id": user.id,
        "name": user.name,
        "email": user.email
    }

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def root_page():
    return FileResponse("static/index.html")

@app.on_event("startup")
def on_startup():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    print("✅ Tables recreated")


@app.post("/user", response_model=UserResponse)
def create_user(data: UserCreate, db: Session = Depends(get_db)):
    user = User(name=data.name)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@app.get("/users")
def list_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users
