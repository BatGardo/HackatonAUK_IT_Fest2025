from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse, JSONResponse
from sqlalchemy.orm import Session

from app.security.auth import auth_required
from database import get_db
from models import User

router = APIRouter()


@router.get("/profile")
def profile_page(user_id: str = Depends(auth_required), db: Session = Depends(get_db)):
    """
    Профіль користувача:
    - отримуємо user_id з cookie через auth_required
    - шукаємо користувача у БД
    - повертаємо JSON або HTML
    """

    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user:
        return JSONResponse({"error": "User not found"}, status_code=404)

    # Приклад: віддаємо JSON з даними
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email
    }
