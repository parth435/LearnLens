from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.learning_gap import LearningGap

router = APIRouter()


@router.get("/{student_id}", summary="List learning gaps for a student")
def list_student_gaps(student_id: int, db: Session = Depends(get_db)):
    gaps = db.query(LearningGap).filter(LearningGap.student_id == student_id).all()
    return {"success": True, "data": gaps, "message": "Student gaps retrieved"}


@router.get("/gap/{gap_id}", summary="Get a specific learning gap")
def get_gap(gap_id: int, db: Session = Depends(get_db)):
    gap = db.query(LearningGap).filter(LearningGap.id == gap_id).first()
    if not gap:
        raise HTTPException(status_code=404, detail="Learning gap not found")
    return {"success": True, "data": gap, "message": "Gap retrieved"}
