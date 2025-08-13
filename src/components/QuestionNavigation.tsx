import { Question } from "../types/questionData";

interface QuestionNavigationProps {
  questions: Question[];
  currentQuestion: number;
  selectedAnswers: (number | null)[];
  onQuestionSelect: (index: number) => void;
}

export default function QuestionNavigation({
  questions,
  currentQuestion,
  selectedAnswers,
  onQuestionSelect
}: QuestionNavigationProps) {
  return (
    <div className="flex gap-2">
      {questions.map((_, index) => (
        <button
          key={index}
          onClick={() => onQuestionSelect(index)}
          className={`w-8 h-8 rounded-full text-sm font-medium ${
            index === currentQuestion
              ? "bg-blue-600 text-white"
              : selectedAnswers[index] !== null
                ? "bg-green-100 text-green-800 border-2 border-green-300"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
