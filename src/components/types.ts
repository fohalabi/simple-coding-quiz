export interface Question {
    id: number;
    title: string;
    code: string;
    language: string;
    options: string;
    CorrectAnswer: number;
    explanation: string;
}

export interface ProgressBarProps {
    current: number;
    total: number;
}

export interface CodeBlockProps{
    code:string;
    language: string;
}

export interface AnswerOptionsProps {
    options: string[];
    selectedAnswer: number  | null;
    OnAnswerSelect: (index: number) => void;
}

export interface QuestionNavigationProps {
    questions: Question[];
    currentQuestion: number;
    selectedAnswers: (number | null)[];
    onQuestionSelect: (index: number) => void;
}

export interface NavigationButtonsProps {
    currentQuestion: number;
    totalQuestion: number;
    selectedAnswers: (number | null)[];
    onPrevious: () => void;
    onNext: () => void;
    onSubmit: () => void;
}

export interface QuizQuestionProps {
    question: Question;
    selectedAnswer: number | null;
    onAnswerSelect: (index: number) => void;
}

export interface QuizResultsProps {
    questions: Question[];
    selectedAnswers: (number | null)[];
    onRestart: () => void;
}