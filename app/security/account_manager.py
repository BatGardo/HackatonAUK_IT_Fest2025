from fastapi import APIRouter, Depends, HTTPException, Cookie, Header
import requests
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.database.models import User

router = APIRouter(prefix="/account", tags=["Account Management"])


def get_current_user(
    authorization: str = Header(None),
    id_token_cookie: str = Cookie(None),
    db: Session = Depends(get_db)
):
    token = None

    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
    elif id_token_cookie:
        token = id_token_cookie
    else:
        raise HTTPException(status_code=401, detail="Authorization required")

    # Перевіряємо токен через Google API
    resp = requests.get(f"https://oauth2.googleapis.com/tokeninfo?id_token={token}").json()
    
    email = resp.get("email")
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user

@router.get("/me")
def get_my_profile(user: User = Depends(get_current_user)):
    """
    Returns authenticated user info
    """
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
    }

@router.put("/update")
def update_account(name: str, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    """
    Updates user's basic profile information (example: name)
    """
    user.name = name
    db.commit()
    db.refresh(user)
    return {"message": "Profile updated", "name": user.name}


@router.delete("/delete")
def delete_account(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    """
    Deletes user account
    """
    db.delete(user)
    db.commit()

    from fastapi.responses import JSONResponse
    response = JSONResponse({"message": "Account deleted"})
    response.delete_cookie("user_id")
    return response
