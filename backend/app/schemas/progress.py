from typing import Any, Dict, List, Optional

from pydantic import BaseModel


class ProgressOut(BaseModel):
    student_id: int
    overall_accuracy: float
    subject_accuracy: Dict[str, float]
    topic_accuracy: Dict[str, float]
    concept_mastery: Dict[str, float]
    questions_solved: int
    tests_completed: int
    improvement: float
    streak: int

    class Config:
        from_attributes = True
