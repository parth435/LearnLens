from typing import Optional

from pydantic import BaseModel


class LearningGapOut(BaseModel):
    id: int
    student_id: int
    concept_id: int
    assessment_id: Optional[int]
    mastery_score: float
    severity: str
    confidence: float
    evidence: str
    misconception: str
    recommended_action: str
    status: str

    class Config:
        from_attributes = True
