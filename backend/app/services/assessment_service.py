from __future__ import annotations

from datetime import datetime
from typing import Any, Dict, List

from sqlalchemy.orm import Session

from app.models.assessment import Assessment
from app.models.concept import Concept
from app.models.question import Question
from app.models.response import Response


class AssessmentService:
    def create_assessment(self, db: Session, payload: Dict[str, Any]) -> Assessment:
        assessment = Assessment(
            student_id=payload["student_id"],
            subject_id=payload["subject_id"],
            topic_id=payload["topic_id"],
            assessment_type=payload.get("assessment_type", "mcq"),
            difficulty=payload.get("difficulty", "medium"),
            total_questions=len(payload.get("questions", [])),
            status="created",
        )
        db.add(assessment)
        db.commit()
        db.refresh(assessment)
        return assessment

    def submit_assessment(self, db: Session, assessment_id: int, student_id: int, responses: List[Dict[str, Any]]) -> Dict[str, Any]:
        assessment = db.query(Assessment).filter(Assessment.id == assessment_id, Assessment.student_id == student_id).first()
        if not assessment:
            raise ValueError("Invalid assessment")

        correct = 0
        total = 0
        for item in responses:
            q = db.query(Question).filter(Question.id == item["question_id"]).first()
            if not q:
                continue
            total += 1
            selected = str(item.get("answer", "")).strip()
            is_correct = selected.upper() == str(q.correct_answer).upper() if q.correct_answer else False
            is_partial = False
            marks_obtained = 1 if is_correct else 0
            if is_correct:
                correct += 1
            response = Response(
                assessment_id=assessment.id,
                question_id=q.id,
                student_id=student_id,
                answer=selected,
                response_text=selected,
                is_correct=is_correct,
                is_partial=is_partial,
                marks_obtained=marks_obtained,
                analysis_status="evaluated",
            )
            db.add(response)

        assessment.score = float(correct)
        assessment.total_marks = total
        assessment.percentage = round((correct / total * 100), 2) if total else 0.0
        assessment.status = "submitted"
        assessment.completed_at = datetime.utcnow()
        db.commit()
        return {
            "assessment_id": assessment.id,
            "correct": correct,
            "total": total,
            "percentage": assessment.percentage,
            "status": assessment.status,
        }

    def concept_mastery(self, correct: int, partial: int, total_attempts: int) -> float:
        return round(((correct + 0.5 * partial) / max(total_attempts, 1)) * 100, 2)
