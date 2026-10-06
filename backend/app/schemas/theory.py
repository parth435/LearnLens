from typing import List, Optional

from pydantic import BaseModel


class TheoryUploadResponse(BaseModel):
    upload_id: str
    status: str
    filename: str


class TheoryEvaluationInput(BaseModel):
    student_id: int
    assessment_id: Optional[int] = None
    question_id: Optional[int] = None
    answer_text: str
