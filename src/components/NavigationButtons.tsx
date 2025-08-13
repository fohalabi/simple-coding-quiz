import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationButtonsProps {
  currentQuestion: number;
  totalQuestions: number;
  selectedAnswers: (number | null)[];
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export default function NavigationButtons({
  currentQuestion,
  totalQuestions,
  selectedAnswers,
  onPrevious,
  onNext,
  onSubmit
}: NavigationButtonsProps) {
  const allAnswered = !selectedAnswers.some(a => a === null);
  const onLast = currentQuestion === totalQuestions - 1;

  return (
    <div className="flex justify-between items-center">
      <button
        onClick={onPrevious}
        disabled={currentQuestion === 0}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
        Previous
      </button>

      {onLast ? (
        <button
          onClick={onSubmit}
          disabled={!allAnswered}
          className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Quiz
        </button>
      ) : (
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
