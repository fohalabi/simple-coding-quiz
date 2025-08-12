export interface Question {
    id: number;
    title: string;
    code: string;
    language: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

export interface ProgressBarProps {
    current: number;
    total: number;
}

export interface AnswerOptionsProps {
    options: string[];
    selectedAnswer: number  | null;
    onAnswerSelect: (index: number) => void;
}

export interface QuestionNavigationProps {
    questions: Question[];
    currentQuestion: number;
    selectedAnswers: (number | null)[];
    onQuestionSelect: (index: number) => void;
}

export interface NavigationButtonsProps {
    currentQuestion: number;
    totalQuestions: number;
    selectedAnswers: (number | null)[];
    onPrevious: () => void;
    onNext: () => void;
    onSubmit: () => void;
}

export interface QuizResultsProps {
    questions: Question[];
    selectedAnswers: (number | null)[];
    onRestart: () => void;
}