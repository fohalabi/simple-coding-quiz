export interface Question {
  id: number;
  title: string;
  code: string;
  language: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
