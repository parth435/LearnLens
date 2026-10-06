from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_user_creation_and_login():
    register = client.post(
        "/api/auth/register",
        json={"name": "Test Student", "email": "student@example.com", "password": "secret", "role": "student"},
    )
    assert register.status_code in (200, 201)
    login = client.post("/api/auth/login", json={"email": "student@example.com", "password": "secret"})
    assert login.status_code == 200
    assert login.json()["email"] == "student@example.com"


def test_subject_retrieval():
    response = client.get("/api/subjects")
    assert response.status_code == 200
    assert response.json()["success"] is True
    assert isinstance(response.json()["data"], list)


def test_question_retrieval():
    response = client.get("/api/subjects/1/questions")
    assert response.status_code == 200
    assert response.json()["success"] is True


def test_assessment_submission_and_mcq_evaluation():
    payload = {"student_id": 1, "subject_id": 1, "topic_id": 3, "assessment_type": "mcq", "difficulty": "medium", "questions": [{"question_id": 3, "answer": "A"}]}
    created = client.post("/api/assessments", json=payload)
    assert created.status_code == 200
    assessment_id = created.json()["data"]["assessment_id"]
    submit = client.post(f"/api/assessments/{assessment_id}/submit", json={"student_id": 1, "responses": [{"question_id": 3, "answer": "A"}]})
    assert submit.status_code == 200
    assert submit.json()["success"] is True


def test_concept_mastery_and_learning_gap_detection():
    analysis = client.post("/api/analysis/1")
    assert analysis.status_code == 200
    body = analysis.json()
    assert body["success"] is True
    assert "learning_gaps" in body["data"]


def test_theory_upload_and_analysis():
    payload = {"student_id": 1, "assessment_id": 1, "question_id": 1, "answer_text": "The recursive function terminates with a base case."}
    response = client.post("/api/theory/1/analyze", json=payload)
    assert response.status_code == 200
    assert response.json()["success"] is True


def test_practice_generation():
    payload = {"student_id": 1, "concept_id": 5, "difficulty": "beginner", "count": 3}
    response = client.post("/api/practice/generate", json=payload)
    assert response.status_code == 200
    assert response.json()["success"] is True


def test_progress_and_dashboard_endpoints():
    assert client.get("/api/students/1/progress").status_code == 200
    assert client.get("/api/students/1/dashboard").status_code == 200


def test_teacher_endpoints():
    assert client.get("/api/teacher/dashboard").status_code == 200
    assert client.get("/api/teacher/insights").status_code == 200
