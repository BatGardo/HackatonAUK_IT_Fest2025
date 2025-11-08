from pydantic import BaseModel
from datetime import datetime
from typing import List

class UserCreate(BaseModel):
    name: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str | None = None
    google_id: str | None = None

    class Config:
        orm_mode = True

class EducationEntry(BaseModel):
    institution: str
    degree: str
    field: str
    startYear: str
    endYear: str
    description: str

class ExperienceEntry(BaseModel):
    company: str
    position: str
    startDate: str
    endDate: str
    current: bool
    description: str

class Skill(BaseModel):
    name: str
    level: str

class CVBase(BaseModel):
    about_me: str | None = None
    professional_title: str | None = None
    education: List[EducationEntry] = []
    experience: List[ExperienceEntry] = []
    skills: List[Skill] = []

class CVCreate(CVBase):
    pass

class CVResponse(CVBase):
    id: int
    user_id: int
    updated_at: datetime

    class Config:
        orm_mode = True