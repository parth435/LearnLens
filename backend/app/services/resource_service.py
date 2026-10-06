from __future__ import annotations

from typing import Any, Dict, List


class ResourceService:
    def recommend_for_gap(self, *, concept_id: int, concept_name: str, student_mastery: float, resources: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        ranked: List[Dict[str, Any]] = []
        for resource in resources:
            if resource.get("concept_id") == concept_id:
                ranked.append({
                    "resource_id": resource.get("id"),
                    "title": resource.get("title"),
                    "relevance": max(75, int(100 - student_mastery)),
                    "reason": f"Matches the student's identified difficulty with {concept_name}.",
                    "resource": resource,
                })
        return ranked[:4]
