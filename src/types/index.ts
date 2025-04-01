import {
  Question,
  MCQData,
  ShortAnswerData,
  LongAnswerData,
} from "@prisma/client";

export type QuestionWithAnswers = Question & {
  mcqData: MCQData | null;
  shortAnswerData: ShortAnswerData | null;
  longAnswerData: LongAnswerData | null;
};

export type GenerateQuestionsParams = {
  course: string;
  university: string;
  subject: string;
  difficulty: string;
  numQuestions: number;
  type: string;
};

