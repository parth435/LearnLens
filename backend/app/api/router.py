from fastapi import APIRouter

from app.api.routes import analysis, assessments, auth, gamification, learning_gaps, practice, progress, resources, subjects, teacher, theory

api_router = APIRouter(prefix="/api")

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(subjects.router, prefix="/subjects", tags=["subjects"])
api_router.include_router(assessments.router, prefix="/assessments", tags=["assessments"])
api_router.include_router(theory.router, prefix="/theory", tags=["theory"])
api_router.include_router(analysis.router, prefix="/analysis", tags=["analysis"])
api_router.include_router(learning_gaps.router, prefix="/gaps", tags=["learning gaps"])
api_router.include_router(resources.router, prefix="/resources", tags=["resources"])
api_router.include_router(practice.router, prefix="/practice", tags=["practice"])
api_router.include_router(progress.router, prefix="/students", tags=["progress"])
api_router.include_router(gamification.router, prefix="/leaderboard", tags=["gamification"])
api_router.include_router(teacher.router, prefix="/teacher", tags=["teacher"])
