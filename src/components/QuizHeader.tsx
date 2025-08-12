import React from 'react';
import ProgressBar from './ProgressBar';

interface QuizHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({ currentQuestion, totalQuestions }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold text-gray-800">Code Review Quiz</h1>
      <span className="text-sm text-gray-500">
        Question {currentQuestion + 1} of {totalQuestions}
      </span>
    </div>
    
    <ProgressBar current={currentQuestion} total={totalQuestions} />
  </div>
);

export default QuizHeader;