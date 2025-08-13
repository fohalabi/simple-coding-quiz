import { useState } from "react";
import { questions } from "../data/questions";
import { Question } from "../types/questionData";
import ProgressBar from "../components/ProgressBar";
import QuizQuestion from "../components/QuizQuestion";
import NavigationButtons from "../components/NavigationButtons";
import QuestionNavigation from "../components/QuestionNavigation";
import QuizResults from "../components/QuizResults";

export default function CodeReviewQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentQuestion] = answerIndex;
    setSelectedAnswers(updated);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const submitQuiz = () => setShowResults(true);

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
  };

  if (showResults) {
    return (
      <QuizResults
        questions={questions}
        selectedAnswers={selectedAnswers}
        onRestart={restartQuiz}
      />
    );
  }

  const question: Question = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Code Review Quiz</h1>
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>

        <ProgressBar current={currentQuestion} total={questions.length} />
      </div>

      <QuizQuestion
        question={question}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={handleAnswerSelect}
      />

      <div className="flex justify-between items-center">
        <NavigationButtons
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          selectedAnswers={selectedAnswers}
          onPrevious={prevQuestion}
          onNext={nextQuestion}
          onSubmit={submitQuiz}
        />

        <QuestionNavigation
          questions={questions}
          currentQuestion={currentQuestion}
          selectedAnswers={selectedAnswers}
          onQuestionSelect={setCurrentQuestion}
        />
      </div>
    </div>
  );
}
