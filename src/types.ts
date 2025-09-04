export type Question = {
  id: string;
  question: string;
  options: string[]; // exactly 4 items
  correctIndex: number; // 0-3
};

export type AnswerRecord = {
  questionId: string;
  selectedIndex: number; // 0-3
  isCorrect: boolean;
};

export type QuizResultState = {
  answers: AnswerRecord[];
  totalQuestions: number;
  score: number;
  questions: Question[];
};


