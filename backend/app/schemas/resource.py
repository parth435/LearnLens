from typing import Optional

from pydantic import BaseModel


class ResourceOut(BaseModel):
    id: int
    title: str
    description: Optional[str]
    resource_type: str
    subject_id: int
    topic_id: int
    concept_id: int
    difficulty: Optional[str]
    url: Optional[str]
    file_path: Optional[str]
    estimated_minutes: int

    class Config:
        from_attributes = True
