from typing import Any, Dict, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.assessment import Assessment
from app.models.question import Question
from app.models.response import Response
from app.services.assessment_service import AssessmentService

router = APIRouter()
service = AssessmentService()


@router.post("", summary="Create an assessment")
def create_assessment(payload: Dict[str, Any], db: Session = Depends(get_db)):
    assessment = service.create_assessment(db, payload)
    return {"success": True, "data": {"assessment_id": assessment.id}, "message": "Assessment created"}


@router.get("/{assessment_id}", summary="Get an assessment by id")
def get_assessment(assessment_id: int, db: Session = Depends(get_db)):
    assessment = db.query(Assessment).filter(Assessment.id == assessment_id).first()
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
    return {"success": True, "data": assessment, "message": "Assessment retrieved"}


@router.post("/{assessment_id}/submit", summary="Submit assessment responses")
def submit_assessment(assessment_id: int, payload: Dict[str, Any], db: Session = Depends(get_db)):
    student_id = payload.get("student_id")
    responses = payload.get("responses", [])
    result = service.submit_assessment(db, assessment_id, student_id, responses)
    return {"success": True, "data": result, "message": "Assessment submitted"}
