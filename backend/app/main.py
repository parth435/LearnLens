from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import settings
from app.core.database import Base, engine
from app.seed.seed_data import seed_database

app = FastAPI(
    title="LearnLens API",
    description="AI-powered learning gap detection backend for educational diagnostics.",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

origins = [origin.strip() for origin in settings.ALLOWED_ORIGINS.split(",") if origin.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/", summary="Backend welcome and API links")
def root():
    return {
        "service": "LearnLens Backend",
        "docs": "/docs",
        "health": "/health",
    }


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "LearnLens Backend"}


Base.metadata.create_all(bind=engine)
seed_database()
