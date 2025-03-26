import { MCQQuestion } from "./questions/MCQQuestion";
import { ShortAnswerQuestion } from "./questions/ShortAnswerQuestion";
import { LongAnswerQuestion } from "./questions/LongAnswerQuestion";
import { QuestionWithAnswers } from "@/types/index";

interface QuestionRendererProps {
  question: QuestionWithAnswers;
  onAnswerSelect: (answer: string) => void;
  selectedAnswer?: string;
}

export const QuestionRenderer = ({
  question,
  onAnswerSelect,
  selectedAnswer,
}: QuestionRendererProps) => {
  switch (question.type) {
    case "MCQ":
      return (
        <MCQQuestion
          question={question}
          onAnswerSelect={onAnswerSelect}
          selectedAnswer={selectedAnswer}
        />
      );
    case "SHORT_ANSWER":
      return (
        <ShortAnswerQuestion
          question={question}
          onAnswerSelect={onAnswerSelect}
          selectedAnswer={selectedAnswer}
        />
      );
    case "LONG_ANSWER":
      return (
        <LongAnswerQuestion
          question={question}
          onAnswerSelect={onAnswerSelect}
          selectedAnswer={selectedAnswer}
        />
      );
    default:
      return null;
  }
};
