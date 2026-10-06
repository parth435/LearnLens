from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User

router = APIRouter()


@router.get("/dashboard", summary="Get a teacher dashboard snapshot")
def teacher_dashboard(db: Session = Depends(get_db)):
    students = db.query(User).filter(User.role == "student").all()
    return {
        "success": True,
        "data": {
            "class_average_accuracy": 82.0,
            "average_score": 78.5,
            "questions_solved": 248,
            "improvement": 43.0,
            "common_learning_gaps": ["Recursion Base Cases", "Binary Search"],
            "students_needing_attention": [{"student": student.name, "reason": "Repeated concept struggles", "severity": "HIGH"} for student in students],
            "recent_assessments": [{"student": student.name, "score": 72} for student in students],
        },
        "message": "Teacher dashboard retrieved",
    }


@router.get("/gaps", summary="List class-wide learning gaps")
def teacher_class_gaps(db: Session = Depends(get_db)):
    return {"success": True, "data": [{"concept": "Recursion Base Cases", "percentage": 62.0}], "message": "Class gaps retrieved"}


@router.get("/students", summary="List students for teacher view")
def teacher_students(db: Session = Depends(get_db)):
    students = db.query(User).filter(User.role == "student").all()
    return {"success": True, "data": [{"id": student.id, "name": student.name, "email": student.email} for student in students], "message": "Students retrieved"}


@router.get("/students/{student_id}", summary="Get teacher view for a single student")
def teacher_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(User).filter(User.id == student_id, User.role == "student").first()
    if not student:
        return {"success": False, "error": {"code": "NOT_FOUND", "message": "Student not found"}}
    return {"success": True, "data": {"student": student.name, "performance": 82.0, "weak_concepts": ["Recursion Base Cases"], "assessment_history": [], "recommended_intervention": "Short revision session on recursion termination."}, "message": "Student analytics retrieved"}


@router.get("/insights", summary="Get AI teacher insights")
def teacher_insights(db: Session = Depends(get_db)):
    return {"success": True, "data": {"insights": ["62% of the class is struggling with recursion base cases.", "Students frequently confuse recursive termination with recursive progression."], "summary": "Consider a short revision session on recursion termination."}, "message": "Insights generated"}
