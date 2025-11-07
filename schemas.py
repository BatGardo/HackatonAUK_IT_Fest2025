from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str | None = None
    google_id: str | None = None

    class Config:
        orm_mode = True
