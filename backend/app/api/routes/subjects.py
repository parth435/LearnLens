from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.question import Question
from app.models.subject import Subject
from app.models.topic import Topic

router = APIRouter()


@router.get("", summary="List all subjects")
def list_subjects(db: Session = Depends(get_db)):
    subjects = db.query(Subject).all()
    return {"success": True, "data": subjects, "message": "Subjects retrieved successfully"}


@router.get("/{subject_id}/topics", summary="List topics for a subject")
def list_topics(subject_id: int, db: Session = Depends(get_db)):
    subject = db.query(Subject).filter(Subject.id == subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    topics = db.query(Topic).filter(Topic.subject_id == subject_id).all()
    return {"success": True, "data": topics, "message": "Topics retrieved successfully"}


@router.get("/{subject_id}/questions", summary="List questions for a subject")
def list_questions(subject_id: int, db: Session = Depends(get_db)):
    subject = db.query(Subject).filter(Subject.id == subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    questions = db.query(Question).filter(Question.subject_id == subject_id).all()
    return {"success": True, "data": questions, "message": "Questions retrieved successfully"}
