import React, { useState } from 'react';
import QuizHeader from './QuizHeader';
import QuizQuestion from './QuizQuestion';
import NavigationButtons from './NavigationButtons';
import QuestionNavigation from './QuestionNavigation';
import QuizResults from './QuizResults';
import { questions } from './questionData';

export default function CodeReviewQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = () => {
    setShowResults(true);
  };

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

  const question = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <QuizHeader 
        currentQuestion={currentQuestion} 
        totalQuestions={questions.length} 
      />

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