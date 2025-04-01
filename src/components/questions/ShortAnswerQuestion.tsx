import { Question } from "@prisma/client";
import { CheckCircle2, Lightbulb, X } from "lucide-react";

interface ShortAnswerQuestionProps {
  question: Question & {
    shortAnswerData?: {
      sampleAnswer: string;
      explanation: string;
    } | null;
  };
  onAnswerSelect: (answer: string) => void;
  selectedAnswer?: string;
  showFeedback?: boolean;
}

export const ShortAnswerQuestion = ({
  question,
  onAnswerSelect,
  selectedAnswer,
  showFeedback = false,
}: ShortAnswerQuestionProps) => {
  if (!question.shortAnswerData) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{question.text}</h3>
      <textarea
        className="w-full p-3 border rounded-lg min-h-[120px]"
        placeholder="Type your answer here..."
        value={selectedAnswer || ""}
        onChange={(e) => onAnswerSelect(e.target.value)}
      />

      {selectedAnswer && showFeedback && (
        <div className="p-4 rounded-lg bg-muted space-y-3">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-green-500">Model Answer</p>
              <p className="text-sm mt-1">
                {question.shortAnswerData.sampleAnswer}
              </p>
            </div>
          </div>

          {question.shortAnswerData.explanation && (
            <div className="flex items-start gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-amber-500">Explanation</p>
                <p className="text-sm mt-1">
                  {question.shortAnswerData.explanation}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
