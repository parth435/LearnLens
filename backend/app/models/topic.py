from sqlalchemy import Column, ForeignKey, Integer, String, Text

from app.core.database import Base


class Topic(Base):
    __tablename__ = "topics"

    id = Column(Integer, primary_key=True, index=True)
    subject_id = Column(Integer, ForeignKey("subjects.id"), nullable=False)
    parent_topic_id = Column(Integer, ForeignKey("topics.id"), nullable=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
