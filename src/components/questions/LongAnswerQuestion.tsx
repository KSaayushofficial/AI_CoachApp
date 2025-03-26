import { QuestionWithAnswers } from "@/types/index";

interface LongAnswerQuestionProps {
  question: QuestionWithAnswers;
  onAnswerSelect: (answer: string) => void;
  selectedAnswer?: string;
}

export const LongAnswerQuestion = ({
  question,
  onAnswerSelect,
  selectedAnswer,
}: LongAnswerQuestionProps) => {
  if (!question.longAnswerData) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{question.text}</h3>
      <textarea
        className="w-full p-3 border rounded-lg min-h-[200px]"
        placeholder="Your answer..."
        value={selectedAnswer || ""}
        onChange={(e) => onAnswerSelect(e.target.value)}
      />
      {selectedAnswer && (
        <div className="p-4 rounded-lg bg-muted">
          <p className="font-medium">Sample Answer:</p>
          <p>{question.longAnswerData.sampleAnswer}</p>
          <p className="mt-2 font-medium">Key Points:</p>
          <ul className="list-disc pl-5">
            {question.longAnswerData.keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
