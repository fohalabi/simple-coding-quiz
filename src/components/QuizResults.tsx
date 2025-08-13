import React from 'react';
import { RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { QuizResultsProps } from './types';

const QuizResults: React.FC<QuizResultsProps> = ({ questions, selectedAnswers, onRestart }) => {
  const score = selectedAnswers.reduce((acc, answer, index) => {
    return answer === questions[index].correctAnswer ? acc + 1 : acc;
  }, 0);
  
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Quiz Results</h1>
        <div className="text-6xl font-bold mb-4">
          <span className={percentage >= 80 ? 'text-green-600' : percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}>
            {percentage}%
          </span>
        </div>
        <p className="text-xl text-gray-600">
          You scored {score} out of {questions.length} questions correctly
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {questions.map((question, index) => {
          const userAnswer = selectedAnswers[index];
          const isCorrect = userAnswer === question.correctAnswer;
          
          return (
            <div key={question.id} className="border rounded-lg p-6 bg-gray-50">
              <div className="flex items-center gap-2 mb-3">
                {isCorrect ? 
                  <CheckCircle className="text-green-600 w-6 h-6" /> : 
                  <XCircle className="text-red-600 w-6 h-6" />
                }
                <h3 className="text-lg font-semibold">
                  Question {index + 1}: {question.title}
                </h3>
              </div>
              
              <p className="text-gray-700 mb-4">{question.queestion}</p>
              
              <div className="space-y-2 mb-4">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className={`p-3 rounded border-2 ${
                    optionIndex === question.correctAnswer 
                      ? 'bg-green-100 border-green-300 text-green-800' 
                      : optionIndex === userAnswer 
                        ? 'bg-red-100 border-red-300 text-red-800'
                        : 'bg-white border-gray-200'
                  }`}>
                    {option}
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <p className="text-sm font-medium text-blue-800 mb-1">Explanation:</p>
                <p className="text-blue-700">{question.explanation}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <button
          onClick={onRestart}
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Restart Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizResults;