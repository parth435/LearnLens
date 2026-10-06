from __future__ import annotations

from typing import Any, Dict, List


class TheoryEvaluator:
    def evaluate(self, answer_text: str, concept: str | None = None) -> Dict[str, Any]:
        concepts = {"understood": [], "partial": [], "weak": []}
        if concept:
            concepts["understood"].append(concept)
            concepts["weak"].append(concept)
        return {
            "score": 7.5,
            "max_score": 10,
            "concepts": concepts,
            "mistakes": [{
                "type": "conceptual",
                "concept": concept or "General concept",
                "evidence": "The answer misses the core reasoning behind the concept.",
            }],
            "feedback": "Review the key concept explanation and clarify the termination or reasoning step.",
            "rubric": {
                "concept_understanding": 8,
                "explanation": 6,
                "accuracy": 7,
                "completeness": 5,
            },
            "confidence": 0.85,
            "severity": "MEDIUM",
        }
