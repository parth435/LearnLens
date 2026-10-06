from typing import List, Optional

from pydantic import BaseModel, Field


class QuestionSubmission(BaseModel):
    question_id: int
    answer: str


class AssessmentCreate(BaseModel):
    student_id: int
    subject_id: int
    topic_id: int
    assessment_type: str = "mcq"
    difficulty: str = "medium"
    questions: List[QuestionSubmission] = Field(default_factory=list)


class AssessmentSubmit(BaseModel):
    student_id: int
    responses: List[QuestionSubmission]


class AssessmentOut(BaseModel):
    id: int
    student_id: int
    subject_id: int
    topic_id: int
    assessment_type: str
    difficulty: str
    total_questions: int
    total_marks: int
    score: float
    percentage: float
    status: str

    class Config:
        from_attributes = True
