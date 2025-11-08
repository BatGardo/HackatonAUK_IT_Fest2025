from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.database.models import CV
from app.security.account_manager import get_current_user
from app.schemas.schemas import CVCreate, CVResponse, UserResponse

router = APIRouter(prefix="/cv", tags=["CV Builder"])

@router.get("/me", response_model=CVResponse)
def get_my_cv(db: Session = Depends(get_db), user: UserResponse = Depends(get_current_user)):
    cv = db.query(CV).filter(CV.user_id == user.id).first()
    if not cv:
        raise HTTPException(status_code=404, detail="CV not found")
    return cv

@router.post("/", response_model=CVResponse)
def upsert_cv(
    payload: CVCreate,
    db: Session = Depends(get_db),
    user: UserResponse = Depends(get_current_user),
):
    cv = db.query(CV).filter(CV.user_id == user.id).first()

    if cv:
        for field, value in payload.model_dump().items():
            setattr(cv, field, value)
    else:
        cv = CV(user_id=user.id, **payload.model_dump())
        db.add(cv)

    db.commit()
    db.refresh(cv)
    return cv