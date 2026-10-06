from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User

router = APIRouter()


@router.get("/students/{student_id}/rewards", summary="Get student rewards and XP")
def get_student_rewards(student_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == student_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"success": True, "data": {"xp": user.xp, "streak": user.streak, "badges": ["7-Day Streak"]}, "message": "Rewards retrieved"}


@router.get("", summary="Get leaderboard")
def get_leaderboard(db: Session = Depends(get_db)):
    users = db.query(User).order_by(User.xp.desc()).all()
    leaderboard = [{"id": user.id, "name": user.name, "xp": user.xp, "streak": user.streak, "role": user.role} for user in users]
    return {"success": True, "data": leaderboard, "message": "Leaderboard retrieved"}
