from typing import Any, Dict

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.assessment import Assessment
from app.models.concept import Concept
from app.models.learning_gap import LearningGap
from app.models.question import Question
from app.models.response import Response
from app.services.gap_detector import detect_learning_gaps

router = APIRouter()


@router.post("/{assessment_id}", summary="Analyze an assessment for concept-level learning gaps")
def analyze_assessment(assessment_id: int, db: Session = Depends(get_db)):
    assessment = db.query(Assessment).filter(Assessment.id == assessment_id).first()
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")

    responses = db.query(Response).filter(Response.assessment_id == assessment_id).all()
    details = []
    concept_lookup = {}
    for response in responses:
        question = db.query(Question).filter(Question.id == response.question_id).first()
        if question:
            concept = db.query(Concept).filter(Concept.id == question.concept_id).first()
            if concept:
                concept_lookup[question.concept_id] = concept.name
            details.append({
                "concept_id": question.concept_id,
                "is_correct": response.is_correct,
                "is_partial": response.is_partial,
            })

    gaps = detect_learning_gaps(details, concept_lookup)
    result = {
        "assessment_id": assessment_id,
        "concept_performance": {
            "summary": f"Processed {len(details)} responses",
            "gaps": gaps,
        },
        "learning_gaps": gaps,
        "summary": "Deterministic analysis complete",
    }
    return {"success": True, "data": result, "message": "Assessment analyzed"}


@router.get("/{assessment_id}", summary="Get analysis for an assessment")
def get_assessment_analysis(assessment_id: int, db: Session = Depends(get_db)):
    return analyze_assessment(assessment_id, db)
