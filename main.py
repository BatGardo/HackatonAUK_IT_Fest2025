from fastapi import FastAPI, Depends
import os
from sqlalchemy.orm import Session
from database import Base, engine, get_db
from models import User
from schemas import UserCreate, UserResponse

app = FastAPI()

# створення таблиць при першому запуску
@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {"message": "Backend is running on Render ✅"}


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
