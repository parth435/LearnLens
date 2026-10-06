export const student = {
  name: 'Rahul Sharma',
  accuracy: 82,
  xp: 1240,
  streak: 7,
  questionsSolved: 248,
  assessmentsCompleted: 14
};

export const concepts = [
  { name: 'Arrays', mastery: 91, severity: 'strong', confidence: 92, questionsAttempted: 52, improvement: 12 },
  { name: 'Linked Lists', mastery: 62, severity: 'moderate', confidence: 76, questionsAttempted: 44, improvement: 8 },
  { name: 'Recursion', mastery: 38, severity: 'critical', confidence: 91, questionsAttempted: 50, improvement: -5 },
  { name: 'Sorting', mastery: 74, severity: 'moderate', confidence: 80, questionsAttempted: 38, improvement: 10 }
];

export const learningGaps = [
  {
    id: 'recursion-base-cases',
    subConcept: 'Recursion Base Cases',
    mastery: 38,
    severity: 'HIGH',
    confidence: 91,
    questionsAnalyzed: 5,
    incorrect: 3,
    repeatedPattern: 2,
    whatWentWrong: 'The student is missing the base condition or applying it incorrectly when recursive calls unwind.',
    whyItHappened: 'The student understands recursive calls but does not consistently identify the termination condition that prevents infinite recursion.',
    affectedConcept: 'Recursion → Base Cases',
    evidence: 'You answered 3 recursion questions incorrectly. In 2 answers, the base condition was missing or incorrect. This indicates difficulty understanding recursion termination.',
    commonMistake: 'Forgetting to add a stopping condition or checking the wrong termination condition.',
    likelyMisconception: 'Student understands recursive calls but does not correctly identify termination conditions.',
    recommendedAction: ['Review recursion fundamentals', 'Complete beginner DPP', 'Attempt concept-check questions', 'Take reassessment']
  }
];

export const resources = [
  { id: 'r1', title: 'Recursion Fundamentals.pdf', type: 'PDF', topic: 'Recursion', difficulty: 'Beginner', duration: '18 min', relevance: 94, reason: 'Recommended because you are struggling with recursion base cases.', bookmarked: true },
  { id: 'r2', title: 'Recursion DPP — Level 1', type: 'DPP', topic: 'Recursion', difficulty: 'Easy', duration: '12 min', relevance: 91, reason: 'Practice these 10 questions to reinforce the concept.' },
  { id: 'r3', title: 'Data Structures Previous Paper', type: 'Question Paper', topic: 'Recursion', difficulty: 'Medium', duration: '22 min', relevance: 89, reason: 'Practice recursion questions from previous exams.' },
  { id: 'r4', title: 'AI Explanation: Base Cases', type: 'AI Explanation', topic: 'Recursion', difficulty: 'Beginner', duration: '8 min', relevance: 96, reason: 'Visual explanation of termination conditions with examples.' }
];

export const leaderboard = [
  { rank: 1, name: 'Aisha', accuracy: 94, improvement: 26, xp: 1540, streak: 15 },
  { rank: 2, name: 'Rahul Sharma', accuracy: 82, improvement: 18, xp: 1240, streak: 7, currentUser: true },
  { rank: 3, name: 'Karan', accuracy: 81, improvement: 17, xp: 1205, streak: 9 }
];

export const progressData = [
  { month: 'Jan', accuracy: 58 },
  { month: 'Feb', accuracy: 64 },
  { month: 'Mar', accuracy: 71 },
  { month: 'Apr', accuracy: 79 },
  { month: 'May', accuracy: 82 }
];

export const badges = [
  { id: 'b1', name: '7-Day Streak', icon: '🔥', unlocked: true, progress: 7, total: 7 },
  { id: 'b2', name: 'Concept Master', icon: '🧠', unlocked: true, progress: 3, total: 3 },
  { id: 'b3', name: 'Accuracy Master', icon: '🎯', unlocked: false, progress: 82, total: 90 },
  { id: 'b4', name: '100 Questions Solved', icon: '📚', unlocked: true, progress: 248, total: 100 }
];
