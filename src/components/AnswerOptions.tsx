import React from 'react';
import { AnswerOptionsProps } from './types';

const AnswerOptions: React.FC<AnswerOptionsProps> = ({ options, selectedAnswer, onAnswerSelect }) => (
  <div className="space-y-3 mb-8">
    {options.map((option, index) => (
      <label
        key={index}
        className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
          selectedAnswer === index
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
        }`}
      >
        <input
          type="radio"
          name="answer"
          value={index}
          checked={selectedAnswer === index}
          onChange={() => onAnswerSelect(index)}
          className="sr-only"
        />
        <div className="flex items-center">
          <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
            selectedAnswer === index
              ? 'border-blue-500 bg-blue-500'
              : 'border-gray-300'
          }`}>
            {selectedAnswer === index && (
              <div className="w-2 h-2 rounded-full bg-white m-auto mt-0.5"></div>
            )}
          </div>
          <span className="text-gray-800">{option}</span>
        </div>
      </label>
    ))}
  </div>
);

export default AnswerOptions;