from fastapi import APIRouter, Depends, HTTPException, Cookie
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.database.models import User

router = APIRouter(prefix="/account", tags=["Account Management"])


def get_current_user(user_id: str = Cookie(None), db: Session = Depends(get_db)):
    """
    Shared dependency — checks if a user is authenticated and returns DB user
    """
    if not user_id:
        raise HTTPException(status_code=401, detail="Authentication required")

    user = db.query(User).filter(User.id == int(user_id)).first()

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
