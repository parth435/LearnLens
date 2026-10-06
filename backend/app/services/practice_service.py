from __future__ import annotations

from typing import Any, Dict, List

from app.services.ai_service import ai_service


class PracticeService:
    def generate_questions(self, *, student_id: int, concept_id: int, difficulty: str, count: int = 5) -> List[Dict[str, Any]]:
        concept_name = "Recursion Base Cases"
        return ai_service.generate_practice_questions(concept=concept_name, difficulty=difficulty, count=count)

    def evaluate_submission(self, *, student_id: int, questions: List[Dict[str, Any]], answers: Dict[str, str]) -> Dict[str, Any]:
        correct_count = 0
        total = len(questions)
        for item in questions:
            if answers.get(str(item["id"])) == item.get("correct_answer"):
                correct_count += 1
        return {
            "score": correct_count,
            "total": total,
            "accuracy": round((correct_count / total) * 100, 2) if total else 0,
        }
