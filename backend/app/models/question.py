from sqlalchemy import Column, ForeignKey, Integer, String, Text

from app.core.database import Base


class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    subject_id = Column(Integer, ForeignKey("subjects.id"), nullable=False)
    topic_id = Column(Integer, ForeignKey("topics.id"), nullable=False)
    concept_id = Column(Integer, ForeignKey("concepts.id"), nullable=False)
    question_text = Column(Text, nullable=False)
    question_type = Column(String, nullable=False)
    difficulty = Column(String, nullable=False)
    options = Column(Text, nullable=True)
    correct_answer = Column(String, nullable=True)
    marks = Column(Integer, default=1)
    explanation = Column(Text, nullable=True)
