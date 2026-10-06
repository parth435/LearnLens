from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.schemas.auth import UserLogin, UserOut, UserRegister

router = APIRouter()


@router.post("/register", response_model=UserOut, summary="Register a new user")
def register_user(payload: UserRegister, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == payload.email).first():
        raise HTTPException(status_code=400, detail="User already exists")
    user = User(
        name=payload.name,
        email=str(payload.email),
        password_hash=payload.password,
        role=payload.role,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post("/login", response_model=UserOut, summary="Log in a user")
def login_user(payload: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == str(payload.email), User.password_hash == payload.password).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user
