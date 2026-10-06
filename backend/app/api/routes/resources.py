from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.resource import Resource
from app.models.subject import Subject
from app.models.topic import Topic
from app.models.concept import Concept
from app.services.resource_service import ResourceService

router = APIRouter()
service = ResourceService()


@router.get("", summary="List all resources")
def list_resources(db: Session = Depends(get_db)):
    resources = db.query(Resource).all()
    return {"success": True, "data": resources, "message": "Resources retrieved"}


@router.get("/recommended/{student_id}", summary="Recommend resources for a student")
def recommended_resources(student_id: int, db: Session = Depends(get_db)):
    resources = db.query(Resource).all()
    if not resources:
        return {"success": True, "data": [], "message": "No resources available"}
    concept = db.query(Concept).filter(Concept.name == "Recursion Base Cases").first()
    if not concept:
        return {"success": True, "data": [], "message": "No concept match"}
    recommended = service.recommend_for_gap(concept_id=concept.id, concept_name=concept.name, student_mastery=38.0, resources=[{**r.__dict__} for r in resources])
    return {"success": True, "data": recommended, "message": "Recommended resources generated"}


@router.post("/{resource_id}/bookmark", summary="Bookmark a resource")
def bookmark_resource(resource_id: int, db: Session = Depends(get_db)):
    resource = db.query(Resource).filter(Resource.id == resource_id).first()
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    return {"success": True, "data": {"resource_id": resource.id, "bookmarked": True}, "message": "Resource bookmarked"}
