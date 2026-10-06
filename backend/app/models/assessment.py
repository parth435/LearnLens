from datetime import datetime

from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String

from app.core.database import Base


class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    subject_id = Column(Integer, ForeignKey("subjects.id"), nullable=False)
    topic_id = Column(Integer, ForeignKey("topics.id"), nullable=False)
    assessment_type = Column(String, nullable=False)
    difficulty = Column(String, default="medium")
    total_questions = Column(Integer, default=0)
    total_marks = Column(Integer, default=0)
    score = Column(Float, default=0.0)
    percentage = Column(Float, default=0.0)
    status = Column(String, default="created")
    started_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
