from sqlalchemy import Column, Float, ForeignKey, Integer, String, Text

from app.core.database import Base


class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    resource_type = Column(String, nullable=False)
    subject_id = Column(Integer, ForeignKey("subjects.id"), nullable=False)
    topic_id = Column(Integer, ForeignKey("topics.id"), nullable=False)
    concept_id = Column(Integer, ForeignKey("concepts.id"), nullable=False)
    difficulty = Column(String, nullable=True)
    url = Column(String, nullable=True)
    file_path = Column(String, nullable=True)
    estimated_minutes = Column(Integer, default=10)
