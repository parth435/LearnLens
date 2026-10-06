from typing import Any, Dict, List

from pydantic import BaseModel


class TeacherDashboardOut(BaseModel):
    class_average_accuracy: float
    average_score: float
    questions_solved: int
    improvement: float
    common_learning_gaps: List[str]
    students_needing_attention: List[Dict[str, Any]]
    recent_assessments: List[Dict[str, Any]]
