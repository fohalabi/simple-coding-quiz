import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

interface Question {
  id: number;
  title: string;
  code: string;
  language: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    title: "Array Method Issue",
    code: `function removeItem(arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === item) {
      arr.splice(i, 1);
    }
  }
  return arr;
}`,
    language: "javascript",
    question: "What's wrong with this function that removes items from an array?",
    options: [
      "Nothing wrong, it works perfectly",
      "It skips elements after removing an item",
      "It doesn't return anything",
      "It modifies the original array"
    ],
    correctAnswer: 1,
    explanation: "When you remove an item with splice(), the array length changes and elements shift. This causes the loop to skip the next element. Solution: iterate backwards or use filter()."
  },
  {
    id: 2,
    title: "Async/Await Problem",
    code: `async function fetchUserData(userIds) {
  const users = [];
  for (let id of userIds) {
    const user = await fetch(\`/api/users/\${id}\`);
    users.push(user.json());
  }
  return users;
}`,
    language: "javascript",
    question: "What issues exist in this async function?",
    options: [
      "Missing try-catch for error handling",
      "user.json() should be awaited",
      "Requests run sequentially instead of parallel",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Multiple issues: user.json() needs await, no error handling, and requests should run in parallel with Promise.all() for better performance."
  },
  {
    id: 3,
    title: "React Hook Issue",
    code: `function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  });
  
  return <div>{user?.name}</div>;
}`,
    language: "javascript",
    question: "What's the problem with this React component?",
    options: [
      "useState should be initialized with empty object",
      "useEffect is missing dependency array",
      "fetchUser should be awaited",
      "Component name should be lowercase"
    ],
    correctAnswer: 1,
    explanation: "Missing dependency array in useEffect causes infinite re-renders. Should be useEffect(() => {...}, [userId]) to only run when userId changes."
  },
  {
    id: 4,
    title: "CSS Flexbox Layout",
    code: `.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  flex: 1;
  overflow: scroll;
}

.footer {
  flex-shrink: 0;
}`,
    language: "css",
    question: "What could be improved in this CSS layout?",
    options: [
      "Use overflow: auto instead of scroll",
      "Add flex-grow: 1 to footer",
      "Remove height: 100vh from container",
      "Nothing needs improvement"
    ],
    correctAnswer: 0,
    explanation: "overflow: scroll always shows scrollbars even when not needed. overflow: auto only shows them when content overflows."
  },
  {
    id: 5,
    title: "Security Vulnerability",
    code: `app.get('/search', (req, res) => {
  const query = req.query.q;
  const sql = \`SELECT * FROM products 
              WHERE name LIKE '%\${query}%'\`;
  
  db.query(sql, (err, results) => {
    res.json(results);
  });
});`,
    language: "javascript",
    question: "What security issue exists in this code?",
    options: [
      "No input validation",
      "SQL injection vulnerability",
      "No error handling",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "This code has SQL injection vulnerability (user input directly in query), no input validation, and no proper error handling. Use parameterized queries instead."
  }
];

// Progress Bar Component
interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => (
  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
    <div 
      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
      style={{ width: `${((current + 1) / total) * 100}%` }}
    ></div>
  </div>
);

// Code Block Component
interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const getLanguageClass = (lang: string) => {
    const classes = {
      javascript: 'bg-yellow-50 border-yellow-200',
      css: 'bg-blue-50 border-blue-200',
      html: 'bg-orange-50 border-orange-200'
    };
    return classes[lang as keyof typeof classes] || 'bg-gray-50 border-gray-200';
  };

  return (
    <div className={`border-2 rounded-lg p-4 mb-6 ${getLanguageClass(language)}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          {language}
        </span>
      </div>
      <pre className="text-sm font-mono text-gray-800 overflow-x-auto whitespace-pre-wrap">
        {code}
      </pre>
    </div>
  );
};

// Answer Options Component
interface AnswerOptionsProps {
  options: string[];
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
}

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

// Question Navigation Component
interface QuestionNavigationProps {
  questions: Question[];
  currentQuestion: number;
  selectedAnswers: (number | null)[];
  onQuestionSelect: (index: number) => void;
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({ 
  questions, 
  currentQuestion, 
  selectedAnswers, 
  onQuestionSelect 
}) => (
  <div className="flex gap-2">
    {questions.map((_, index) => (
      <button
        key={index}
        onClick={() => onQuestionSelect(index)}
        className={`w-8 h-8 rounded-full text-sm font-medium ${
          index === currentQuestion
            ? 'bg-blue-600 text-white'
            : selectedAnswers[index] !== null
              ? 'bg-green-100 text-green-800 border-2 border-green-300'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
        }`}
      >
        {index + 1}
      </button>
    ))}
  </div>
);

// Navigation Buttons Component
interface NavigationButtonsProps {
  currentQuestion: number;
  totalQuestions: number;
  selectedAnswers: (number | null)[];
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentQuestion,
  totalQuestions,
  selectedAnswers,
  onPrevious,
  onNext,
  onSubmit
}) => (
  <div className="flex justify-between items-center">
    <button
      onClick={onPrevious}
      disabled={currentQuestion === 0}
      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ChevronLeft className="w-5 h-5" />
      Previous
    </button>

    {currentQuestion === totalQuestions - 1 ? (
      <button
        onClick={onSubmit}
        disabled={selectedAnswers.some(answer => answer === null)}
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

// Quiz Question Component
interface QuizQuestionProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, selectedAnswer, onAnswerSelect }) => (
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

// Quiz Results Component
interface QuizResultsProps {
  questions: Question[];
  selectedAnswers: (number | null)[];
  onRestart: () => void;
}

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
              
              <p className="text-gray-700 mb-4">{question.question}</p>
              
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

// Main App Component
export default function CodeReviewQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
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
