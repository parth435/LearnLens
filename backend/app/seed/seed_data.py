from datetime import datetime
from pathlib import Path

from sqlalchemy.orm import Session

from app.core.database import Base, engine
from app.models.assessment import Assessment
from app.models.concept import Concept
from app.models.learning_gap import LearningGap
from app.models.practice import PracticeSession
from app.models.question import Question
from app.models.resource import Resource
from app.models.subject import Subject
from app.models.topic import Topic
from app.models.user import User


def seed_database() -> None:
    db = Session(bind=engine)
    existing = db.query(Subject).first()
    if existing:
        db.close()
        return

    subject = Subject(name="Data Structures", description="Core algorithmic and data structure concepts")
    db.add(subject)
    db.flush()

    arrays = Topic(subject_id=subject.id, name="Arrays", description="Array fundamentals")
    linked_lists = Topic(subject_id=subject.id, name="Linked Lists", description="Linked list operations")
    recursion = Topic(subject_id=subject.id, name="Recursion", description="Recursive thinking and problem solving")
    sorting = Topic(subject_id=subject.id, name="Sorting", description="Sorting algorithms")
    searching = Topic(subject_id=subject.id, name="Searching", description="Searching algorithms")
    db.add_all([arrays, linked_lists, recursion, sorting, searching])
    db.flush()

    concept_names = {
        "Array Traversal": arrays.id,
        "Array Operations": arrays.id,
        "Linked List Traversal": linked_lists.id,
        "Linked List Insertion": linked_lists.id,
        "Recursion Base Cases": recursion.id,
        "Recursive Calls": recursion.id,
        "Bubble Sort": sorting.id,
        "Binary Search": searching.id,
    }
    concepts = []
    for name, topic_id in concept_names.items():
        concepts.append(Concept(topic_id=topic_id, name=name, description=name, difficulty="medium"))
    db.add_all(concepts)
    db.flush()

    concept_map = {concept.name: concept for concept in concepts}

    questions = [
        Question(subject_id=subject.id, topic_id=arrays.id, concept_id=concept_map["Array Traversal"].id, question_text="What is the time complexity of traversing an array of n elements?", question_type="mcq", difficulty="beginner", options='{"A":"O(1)","B":"O(log n)","C":"O(n)","D":"O(n^2)"}', correct_answer="C", marks=1, explanation="Traversing all n elements requires O(n) time."),
        Question(subject_id=subject.id, topic_id=arrays.id, concept_id=concept_map["Array Operations"].id, question_text="Which array operation changes the value at a given index?", question_type="mcq", difficulty="easy", options='{"A":"Append","B":"Insert","C":"Access","D":"Update"}', correct_answer="D", marks=1, explanation="Updating a value at an index is the correct operation."),
        Question(subject_id=subject.id, topic_id=recursion.id, concept_id=concept_map["Recursion Base Cases"].id, question_text="Why is a base case necessary in recursion?", question_type="mcq", difficulty="beginner", options='{"A":"To terminate recursion","B":"To increase speed","C":"To calculate complexity","D":"To allocate memory"}', correct_answer="A", marks=1, explanation="The base case stops the recursion from continuing indefinitely."),
        Question(subject_id=subject.id, topic_id=recursion.id, concept_id=concept_map["Recursive Calls"].id, question_text="What happens when a recursive function calls itself?", question_type="mcq", difficulty="medium", options='{"A":"It loops without limit","B":"It re-enters the function with a smaller problem","C":"It stops immediately","D":"It sorts the input"}', correct_answer="B", marks=1, explanation="Recursive calls continue with a smaller or transformed subproblem."),
        Question(subject_id=subject.id, topic_id=recursion.id, concept_id=concept_map["Recursion Base Cases"].id, question_text="Which condition defines a proper recursion termination condition?", question_type="mcq", difficulty="advanced", options='{"A":"n > 0","B":"n == 0","C":"n < 0","D":"None of these"}', correct_answer="B", marks=1, explanation="A termination condition closes the recursion by reaching the base case."),
        Question(subject_id=subject.id, topic_id=sorting.id, concept_id=concept_map["Bubble Sort"].id, question_text="Bubble sort repeatedly compares adjacent elements to do what?", question_type="mcq", difficulty="easy", options='{"A":"Merge partitions","B":"Swap out-of-order values","C":"Hash values","D":"Traverse without comparison"}', correct_answer="B", marks=1, explanation="Bubble sort swaps adjacent inverted pairs until the array is sorted."),
        Question(subject_id=subject.id, topic_id=searching.id, concept_id=concept_map["Binary Search"].id, question_text="Binary search works efficiently on which data structure?", question_type="mcq", difficulty="medium", options='{"A":"Unsorted array","B":"Sorted array","C":"Linked list","D":"Tree with no ordering"}', correct_answer="B", marks=1, explanation="Binary search requires sorted input to halve the search space each step."),
    ]
    db.add_all(questions)
    db.flush()

    student = User(name="Rahul Sharma", email="rahul@example.com", password_hash="demo_hash", role="student", xp=1240, streak=7)
    teacher = User(name="Aditi Teacher", email="teacher@example.com", password_hash="demo_hash", role="teacher", xp=0, streak=0)
    db.add_all([student, teacher])
    db.flush()

    assessment = Assessment(student_id=student.id, subject_id=subject.id, topic_id=recursion.id, assessment_type="mcq", difficulty="medium", total_questions=5, total_marks=5, score=2.0, percentage=40.0, status="completed")
    db.add(assessment)
    db.flush()

    learning_gap = LearningGap(student_id=student.id, concept_id=concept_map["Recursion Base Cases"].id, assessment_id=assessment.id, mastery_score=38.0, severity="HIGH", confidence=91.0, evidence="3 incorrect responses with 2 missing termination conditions.", misconception="Difficulty understanding recursion termination.", recommended_action="Review recursion termination conditions and practice base-case examples.", status="active")
    db.add(learning_gap)

    resource1 = Resource(title="Recursion Fundamentals.pdf", description="Introduction to recursion and base cases", resource_type="PDF", subject_id=subject.id, topic_id=recursion.id, concept_id=concept_map["Recursion Base Cases"].id, difficulty="beginner", url="https://example.com/recursion-fundamentals", file_path="/tmp/recursion-fundamentals.pdf", estimated_minutes=15)
    resource2 = Resource(title="Recursion DPP – Level 1", description="Practice set on recursion base cases", resource_type="DPP", subject_id=subject.id, topic_id=recursion.id, concept_id=concept_map["Recursion Base Cases"].id, difficulty="beginner", url="https://example.com/recursion-dpp", file_path="/tmp/recursion-dpp.pdf", estimated_minutes=20)
    resource3 = Resource(title="Data Structures Previous Paper", description="Previous exam paper with recursion questions", resource_type="QUESTION_PAPER", subject_id=subject.id, topic_id=recursion.id, concept_id=concept_map["Recursion Base Cases"].id, difficulty="medium", url="https://example.com/data-structures-paper", file_path="/tmp/data-structures-paper.pdf", estimated_minutes=25)
    resource4 = Resource(title="Recursion AI Explanation", description="AI-generated tutorial for recursion base cases", resource_type="AI_EXPLANATION", subject_id=subject.id, topic_id=recursion.id, concept_id=concept_map["Recursion Base Cases"].id, difficulty="beginner", url="https://example.com/ai-recursion", file_path="/tmp/ai-recursion.pdf", estimated_minutes=10)
    db.add_all([resource1, resource2, resource3, resource4])

    practice = PracticeSession(student_id=student.id, concept_id=concept_map["Recursion Base Cases"].id, difficulty="beginner", status="generated", score=0.0)
    db.add(practice)
    db.flush()

    db.commit()
    db.close()
