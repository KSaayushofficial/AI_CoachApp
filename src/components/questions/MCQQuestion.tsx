import { Question } from "@prisma/client";
import { CheckCircle2, X } from "lucide-react";

interface MCQQuestionProps {
  question: Question & {
    mcqData?: {
      options: string[];
      correctAnswer: string;
      explanation: string;
    } | null;
  };
  onAnswerSelect: (answer: string) => void;
  selectedAnswer?: string;
  showCorrectAnswer?: boolean;
}

export const MCQQuestion = ({
  question,
  onAnswerSelect,
  selectedAnswer,
  showCorrectAnswer = false,
}: MCQQuestionProps) => {
  if (!question.mcqData) return null;

  const isCorrect = selectedAnswer === question.mcqData.correctAnswer;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{question.text}</h3>
      <div className="space-y-2">
        {question.mcqData.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isActuallyCorrect = option === question.mcqData?.correctAnswer;

          return (
            <div
              key={index}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                isSelected
                  ? isCorrect
                    ? "border-green-500 bg-green-500/10"
                    : "border-red-500 bg-red-500/10"
                  : showCorrectAnswer && isActuallyCorrect
                  ? "border-green-500 bg-green-500/10"
                  : "border-border hover:bg-muted/50"
              }`}
              onClick={() => onAnswerSelect(option)}
            >
              <div className="flex items-center gap-2">
                {option}
                {showCorrectAnswer && isActuallyCorrect && (
                  <CheckCircle2 className="h-4 w-4 text-green-500 ml-auto" />
                )}
              </div>
            </div>
          );
        })}
      </div>
      {selectedAnswer && (
        <div className="p-4 rounded-lg bg-muted">
          <div className="flex items-start gap-2">
            {isCorrect ? (
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
            ) : (
              <X className="h-5 w-5 text-red-500 mt-0.5" />
            )}
            <div>
              <p className="font-medium">
                {isCorrect ? "Correct!" : "Incorrect"}
              </p>
              <p className="text-sm mt-1">{question.mcqData.explanation}</p>
              {!isCorrect && (
                <p className="text-sm mt-2">
                  <span className="font-medium">Correct answer:</span>{" "}
                  {question.mcqData.correctAnswer}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
