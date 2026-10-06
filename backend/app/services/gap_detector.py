from __future__ import annotations

from collections import defaultdict
from typing import Any, Dict, List


def _severity_from_mastery(mastery: float) -> str:
    if mastery >= 80:
        return "LOW"
    if mastery >= 60:
        return "MEDIUM"
    if mastery >= 40:
        return "HIGH"
    return "CRITICAL"


def detect_learning_gaps(responses: List[Dict[str, Any]], concept_lookup: Dict[int, str]) -> List[Dict[str, Any]]:
    grouped: Dict[int, List[Dict[str, Any]]] = defaultdict(list)
    for response in responses:
        concept_id = response.get("concept_id")
        if concept_id is not None:
            grouped[int(concept_id)].append(response)

    gaps: List[Dict[str, Any]] = []
    for concept_id, entries in grouped.items():
        correct = sum(1 for x in entries if x.get("is_correct"))
        partial = sum(1 for x in entries if x.get("is_partial"))
        incorrect = sum(1 for x in entries if not x.get("is_correct") and not x.get("is_partial"))
        total = max(len(entries), 1)
        mastery = ((correct + 0.5 * partial) / total) * 100
        repeated_pattern = incorrect >= 2 or partial >= 1
        if not repeated_pattern and mastery >= 80:
            continue
        evidence = {
            "questions_analyzed": total,
            "correct": correct,
            "incorrect": incorrect,
            "partial": partial,
            "repeated_pattern": repeated_pattern,
            "affected_concept": concept_lookup.get(concept_id, "Unknown concept"),
        }
        confidence = min(98.0, max(50.0, (100 - mastery) + (15 if repeated_pattern else 0)))
        gaps.append({
            "concept_id": concept_id,
            "concept_name": concept_lookup.get(concept_id, "Unknown concept"),
            "mastery_score": round(mastery, 2),
            "severity": _severity_from_mastery(mastery),
            "confidence": round(confidence, 2),
            "evidence": evidence,
            "misconception": f"Difficulty understanding {concept_lookup.get(concept_id, 'the concept')}.",
            "recommended_action": "Conduct targeted practice and review the fundamental concept before reassessment.",
        })
    return gaps
