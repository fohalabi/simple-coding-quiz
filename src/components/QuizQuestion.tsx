import { Question } from "../types/questionData";
import CodeBlock from "./CodeBlock";
import AnswerOptions from "./AnswerOptions";

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
}

export default function QuizQuestion({
  question,
  selectedAnswer,
  onAnswerSelect
}: QuizQuestionProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">{question.title}</h2>

      <CodeBlock code={question.code} language={question.language} />

      <h3 className="text-lg font-medium mb-4">{question.question}</h3>

      <AnswerOptions
        options={question.options}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={onAnswerSelect}
      />
    </div>
  );
}
