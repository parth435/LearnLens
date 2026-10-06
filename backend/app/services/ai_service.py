from __future__ import annotations

from typing import Any, Dict, List


class AIService:
    def __init__(self, api_key: str | None = None, provider: str = "gemini") -> None:
        self.api_key = api_key
        self.provider = provider

    def analyze_theory_answer(self, *, question_text: str, answer_text: str, concept: str | None = None) -> Dict[str, Any]:
        return {
            "concepts": {
                "understood": [concept] if concept else [],
                "partial": [],
                "weak": [concept] if concept else [],
            },
            "mistakes": [],
            "feedback": "Review the concept and clarify the core idea.",
            "score": 0.0,
            "max_score": 10.0,
            "confidence": 0.75,
        }

    def explain_learning_gap(self, *, concept: str, mastery: float, questions: int, incorrect: int, repeated_errors: int, evidence: str) -> Dict[str, Any]:
        return {
            "likely_misconception": f"Difficulty understanding {concept}.",
            "why": f"The student answered {incorrect} of {questions} related questions incorrectly and repeated the pattern {repeated_errors} times.",
            "student_friendly_explanation": f"You are finding it difficult to understand {concept}. Look closely at the evidence: {evidence}",
            "recommended_next_step": "Review the concept with targeted practice and then retest.",
        }

    def generate_recommendation(self, *, concept: str, severity: str, mastery: float) -> Dict[str, Any]:
        return {
            "resource_type": "practice",
            "concept": concept,
            "severity": severity,
            "mastery": mastery,
            "recommendation": f"Focus on {concept} with brief revision and targeted practice.",
        }

    def generate_practice_questions(self, *, concept: str, difficulty: str, count: int = 5) -> List[Dict[str, Any]]:
        items: List[Dict[str, Any]] = []
        for idx in range(count):
            items.append({
                "question": f"Practice question {idx + 1} for {concept} at {difficulty} level.",
                "concept": concept,
                "difficulty": difficulty,
                "options": ["A", "B", "C", "D"],
                "correct_answer": "A",
                "explanation": "This question tests the core understanding of the concept.",
            })
        return items

    def match_resources(self, *, concept: str, topic: str | None = None, difficulty: str | None = None, mastery: float = 0.0) -> List[Dict[str, Any]]:
        return [{
            "resource_name": f"{concept} review guide",
            "relevance": max(70, int(100 - mastery)),
            "reason": f"Matches the student's difficulty with {concept}.",
        }]

    def generate_teacher_insight(self, *, class_data: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "insights": [
                "Most students need additional support around the weakest concept areas.",
                "Targeted revision sessions will improve class confidence.",
            ],
            "summary": "Class-level analysis indicates recurring concept gaps that can be addressed with short, focused revision.",
        }


ai_service = AIService()
