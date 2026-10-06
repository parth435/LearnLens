from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, String, Text

from app.core.database import Base


class Response(Base):
    __tablename__ = "responses"

    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(Integer, ForeignKey("assessments.id"), nullable=False)
    question_id = Column(Integer, ForeignKey("questions.id"), nullable=False)
    student_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    answer = Column(String, nullable=True)
    response_text = Column(Text, nullable=True)
    is_correct = Column(Boolean, default=False)
    is_partial = Column(Boolean, default=False)
    marks_obtained = Column(Float, default=0.0)
    analysis_status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)
