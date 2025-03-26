import { QuestionWithAnswers } from "@/types/index";

interface MCQQuestionProps {
  question: QuestionWithAnswers;
  onAnswerSelect: (answer: string) => void;
  selectedAnswer?: string;
}

export const MCQQuestion = ({
  question,
  onAnswerSelect,
  selectedAnswer,
}: MCQQuestionProps) => {
  if (!question.mcqData) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{question.text}</h3>
      <div className="space-y-2">
        {Array.isArray(question.mcqData.options) &&
          question.mcqData.options
            .filter((option): option is string => typeof option === "string")
            .map((option: string, index: number) => (
              <div
                key={index}
                className={`p-3 rounded-lg border cursor-pointer ${
                  selectedAnswer === option
                    ? "border-primary bg-primary/10"
                    : "border-border hover:bg-muted/50"
                }`}
                onClick={() => onAnswerSelect(option)}
              >
                {option}
              </div>
            ))}
      </div>
      {selectedAnswer && (
        <div className="p-4 rounded-lg bg-muted">
          <p className="font-medium">
            {selectedAnswer === question.mcqData.correctAnswer
              ? "Correct!"
              : "Incorrect"}
          </p>
          <p>{question.mcqData.explanation}</p>
        </div>
      )}
    </div>
  );
};
