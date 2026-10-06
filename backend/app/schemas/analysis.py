from typing import Any, Dict, List, Optional

from pydantic import BaseModel


class GapEvidence(BaseModel):
    questions_analyzed: int
    correct: int
    incorrect: int
    partial: int
    repeated_pattern: bool
    affected_concept: str


class GapDiagnosis(BaseModel):
    student_id: int
    concept_id: int
    concept_name: str
    mastery_score: float
    severity: str
    confidence: float
    evidence: GapEvidence
    misconception: str
    recommended_action: str
    status: str


class AnalysisResult(BaseModel):
    assessment_id: int
    concept_performance: Dict[str, Any]
    learning_gaps: List[GapDiagnosis]
    summary: str
