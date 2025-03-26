import { QuestionWithAnswers } from "@/types/index";

interface ShortAnswerQuestionProps {
  question: QuestionWithAnswers;
  onAnswerSelect: (answer: string) => void;
  selectedAnswer?: string;
}

export const ShortAnswerQuestion = ({
  question,
  onAnswerSelect,
  selectedAnswer,
}: ShortAnswerQuestionProps) => {
  if (!question.shortAnswerData) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{question.text}</h3>
      <textarea
        className="w-full p-3 border rounded-lg"
        placeholder="Your answer..."
        value={selectedAnswer || ""}
        onChange={(e) => onAnswerSelect(e.target.value)}
      />
      {selectedAnswer && (
        <div className="p-4 rounded-lg bg-muted">
          <p className="font-medium">Sample Answer:</p>
          <p>{question.shortAnswerData.sampleAnswer}</p>
          <p className="mt-2 font-medium">Keywords:</p>
          <p>{question.shortAnswerData.keywords.join(", ")}</p>
        </div>
      )}
    </div>
  );
};
