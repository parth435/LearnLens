from typing import List, Optional

from pydantic import BaseModel


class PracticeGenerateRequest(BaseModel):
    student_id: int
    concept_id: int
    difficulty: str = "beginner"
    count: int = 5


class PracticeQuestionOut(BaseModel):
    id: int
    question: str
    concept: str
    difficulty: str
    options: Optional[str]
    correct_answer: Optional[str]
    explanation: Optional[str]

    class Config:
        from_attributes = True
