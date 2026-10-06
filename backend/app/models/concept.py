from sqlalchemy import Column, Float, ForeignKey, Integer, String, Text

from app.core.database import Base


class Concept(Base):
    __tablename__ = "concepts"

    id = Column(Integer, primary_key=True, index=True)
    topic_id = Column(Integer, ForeignKey("topics.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    difficulty = Column(String, nullable=True)
    mastery_score = Column(Float, default=0.0)
