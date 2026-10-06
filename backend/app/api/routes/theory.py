import os
import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.models.assessment import Assessment
from app.models.question import Question
from app.schemas.theory import TheoryEvaluationInput, TheoryUploadResponse
from app.services.ai_service import AIService
from app.services.ocr_service import OCRService
from app.services.theory_evaluator import TheoryEvaluator

router = APIRouter()
ocr_service = OCRService(settings.UPLOAD_DIR)
ai_service = AIService(settings.AI_API_KEY, settings.AI_PROVIDER)
theory_evaluator = TheoryEvaluator()


@router.post("/upload", response_model=TheoryUploadResponse, summary="Upload a theory paper for scanning")
def upload_theory_paper(
    student_id: int = Form(...),
    assessment_id: int | None = Form(default=None),
    question_id: int | None = Form(default=None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    try:
        ocr_service.validate_file(file.filename or "", file.content_type, file.size or 0)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    upload_dir = Path(settings.UPLOAD_DIR)
    upload_dir.mkdir(parents=True, exist_ok=True)
    safe_name = f"{uuid.uuid4().hex}_{Path(file.filename or 'document').name}"
    storage_path = upload_dir / safe_name
    with storage_path.open("wb") as buffer:
        while True:
            chunk = file.file.read(1024 * 1024)
            if not chunk:
                break
            buffer.write(chunk)

    return {"upload_id": safe_name, "status": "uploaded", "filename": safe_name}


@router.get("/{theory_id}", summary="Retrieve theory submission data")
def get_theory_submission(theory_id: int, db: Session = Depends(get_db)):
    assessment = db.query(Assessment).filter(Assessment.id == theory_id).first()
    if not assessment:
        raise HTTPException(status_code=404, detail="Theory submission not found")
    return {"success": True, "data": assessment, "message": "Theory submission retrieved"}


@router.post("/{theory_id}/analyze", summary="Analyze uploaded theory answer")
def analyze_theory_submission(theory_id: int, payload: TheoryEvaluationInput, db: Session = Depends(get_db)):
    question = db.query(Question).filter(Question.id == payload.question_id).first() if payload.question_id else None
    concept_name = question.concept_id if question else None
    evaluation = theory_evaluator.evaluate(payload.answer_text, concept_name)
    ai_result = ai_service.analyze_theory_answer(question_text="", answer_text=payload.answer_text, concept=concept_name)
    return {"success": True, "data": {"evaluation": evaluation, "ai": ai_result}, "message": "Theory answer analyzed"}
