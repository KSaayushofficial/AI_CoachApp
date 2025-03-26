import { db } from "@/lib/prisma";
import { QuestionType, Difficulty } from "@prisma/client";

interface CreateQuestionParams {
  type: QuestionType;
  text: string;
  subjectId: string;
  difficulty: Difficulty;
  topic?: string;
  tags?: string[];
  mcqData?: {
    options: string[];
    correctAnswer: string;
    explanation: string;
    distractorAnalysis?: string;
  };
  shortAnswerData?: {
    sampleAnswer: string;
    keywords: string[];
    explanation: string;
  };
  longAnswerData?: {
    rubric: any;
    sampleAnswer: string;
    keyPoints: string[];
  };
}

export const createQuestion = async (data: CreateQuestionParams) => {
  return await db.question.create({
    data: {
      type: data.type,
      text: data.text,
      subjectId: data.subjectId,
      difficulty: data.difficulty,
      topic: data.topic,
      tags: data.tags || [],
      mcqData: data.mcqData
        ? {
            create: {
              options: data.mcqData.options,
              correctAnswer: data.mcqData.correctAnswer,
              explanation: data.mcqData.explanation,
              distractorAnalysis: data.mcqData.distractorAnalysis,
            },
          }
        : undefined,
      shortAnswerData: data.shortAnswerData
        ? {
            create: {
              sampleAnswer: data.shortAnswerData.sampleAnswer,
              keywords: data.shortAnswerData.keywords,
              explanation: data.shortAnswerData.explanation,
            },
          }
        : undefined,
      longAnswerData: data.longAnswerData
        ? {
            create: {
              rubric: data.longAnswerData.rubric,
              sampleAnswer: data.longAnswerData.sampleAnswer,
              keyPoints: data.longAnswerData.keyPoints,
            },
          }
        : undefined,
    },
    include: {},
  });
};
