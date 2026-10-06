from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.services.progress_service import ProgressService

router = APIRouter()
service = ProgressService()


@router.get("/{student_id}/progress", summary="Get a student's progress overview")
def get_student_progress(student_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == student_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Student not found")
    progress = service.calculate(student_id=student_id, accuracy=82.0, questions_solved=248, tests_completed=14, improvement=43.0, streak=user.streak)
    return {"success": True, "data": progress, "message": "Progress retrieved"}


@router.get("/{student_id}/dashboard", summary="Get a student's dashboard payload")
def get_student_dashboard(student_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == student_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Student not found")
    return {
        "success": True,
        "data": {
            "student": {"id": user.id, "name": user.name, "role": user.role},
            "accuracy": 82,
            "xp": user.xp,
            "streak": user.streak,
            "questions_solved": 248,
            "tests_completed": 14,
            "strong_concepts": ["Array Traversal"],
            "learning_gaps": ["Recursion Base Cases"],
            "recommended_resources": [],
            "recommended_practice": {"concept": "Recursion Base Cases"},
            "next_assessment": {"id": 1, "subject": "Data Structures"},
        },
        "message": "Dashboard data loaded",
    }
