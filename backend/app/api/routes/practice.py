from typing import Any, Dict

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.concept import Concept
from app.models.practice import PracticeQuestion, PracticeSession
from app.schemas.practice import PracticeGenerateRequest
from app.services.practice_service import PracticeService

router = APIRouter()
service = PracticeService()


@router.post("/generate", summary="Generate targeted practice questions")
def generate_practice(payload: PracticeGenerateRequest, db: Session = Depends(get_db)):
    concept = db.query(Concept).filter(Concept.id == payload.concept_id).first()
    if not concept:
        raise HTTPException(status_code=404, detail="Concept not found")
    questions = service.generate_questions(student_id=payload.student_id, concept_id=payload.concept_id, difficulty=payload.difficulty, count=payload.count)
    session = PracticeSession(student_id=payload.student_id, concept_id=payload.concept_id, difficulty=payload.difficulty)
    db.add(session)
    db.commit()
    db.refresh(session)
    for item in questions:
        db.add(PracticeQuestion(session_id=session.id, question=item["question"], concept=item["concept"], difficulty=item["difficulty"], options=str(item.get("options", [])), correct_answer=item.get("correct_answer"), explanation=item.get("explanation")))
    db.commit()
    return {"success": True, "data": {"practice_id": session.id, "questions": questions}, "message": "Practice questions generated"}


@router.post("/{practice_id}/submit", summary="Submit a practice response")
def submit_practice(practice_id: int, payload: Dict[str, Any], db: Session = Depends(get_db)):
    session = db.query(PracticeSession).filter(PracticeSession.id == practice_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Practice session not found")
    questions = db.query(PracticeQuestion).filter(PracticeQuestion.session_id == practice_id).all()
    result = service.evaluate_submission(student_id=payload.get("student_id"), questions=[{"id": q.id, "correct_answer": q.correct_answer} for q in questions], answers=payload.get("answers", {}))
    session.score = result["accuracy"]
    session.status = "completed"
    db.commit()
    return {"success": True, "data": result, "message": "Practice submitted"}
