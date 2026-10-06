from __future__ import annotations

from typing import Any, Dict


class ProgressService:
    def calculate(self, *, student_id: int, accuracy: float, questions_solved: int, tests_completed: int, improvement: float, streak: int) -> Dict[str, Any]:
        return {
            "student_id": student_id,
            "overall_accuracy": accuracy,
            "subject_accuracy": {"Data Structures": accuracy},
            "topic_accuracy": {"Recursion": accuracy},
            "concept_mastery": {"Recursion Base Cases": max(0.0, min(100.0, 100 - accuracy))},
            "questions_solved": questions_solved,
            "tests_completed": tests_completed,
            "improvement": improvement,
            "streak": streak,
        }
