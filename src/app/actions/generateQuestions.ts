"use server";
import { db } from "@/lib/prisma";
import { QuestionType, Difficulty } from "@prisma/client";

export async function generateQuestions(params: {
  course: string;
  university: string;
  subject: string;
  difficulty: string;
  numQuestions: number;
  type: QuestionType;
}) {
  const universityRecord = await db.university.upsert({
    where: { name: params.university },
    update: {},
    create: { name: params.university, shortName: params.university.slice(0, 10) },
  });

  const courseRecord = await db.course.upsert({
    where: {
      name_universityId: {
        name: params.course,
        universityId: universityRecord.id,
      },
    },
    update: {},
    create: {
      name: params.course,
      universityId: universityRecord.id,
    },
  });

  const subject = await db.subject.upsert({
    where: {
      name_courseId: {
        name: params.subject,
        courseId: courseRecord.id,
      },
    },
    update: {},
    create: {
      name: params.subject,
      courseId: courseRecord.id,
    },
  });

  const questions = [];
  for (let i = 0; i < params.numQuestions; i++) {
    const questionData = {
      type: params.type,
      text: `Sample ${params.type} question ${i + 1} about ${params.subject}`,
      subjectId: subject.id,
      difficulty: params.difficulty as Difficulty,
    };

    if (params.type === "MCQ") {
      questions.push({
        ...questionData,
        mcqData: {
          options: ["Option 1", "Option 2", "Option 3", "Option 4"],
          correctAnswer: "Option 1",
          explanation: "Explanation for correct answer",
        },
      });
    } else if (params.type === "SHORT_ANSWER") {
      questions.push({
        ...questionData,
        shortAnswerData: {
          sampleAnswer: "Sample short answer",
          keywords: ["keyword1", "keyword2"],
          explanation: "Explanation for short answer",
        },
      });
    } else if (params.type === "LONG_ANSWER") {
      questions.push({
        ...questionData,
        longAnswerData: {
          rubric: {},
          sampleAnswer: "Sample long answer",
          keyPoints: ["Point 1", "Point 2", "Point 3"],
        },
      });
    }
  }

  return await db.$transaction(
    questions.map((question) =>
      db.question.create({
        data: {
          ...question,
          mcqData: "mcqData" in question && question.mcqData ? { create: question.mcqData } : undefined,
          shortAnswerData: "shortAnswerData" in question && question.shortAnswerData
            ? { create: question.shortAnswerData }
            : undefined,
          longAnswerData: "longAnswerData" in question && question.longAnswerData
            ? { create: question.longAnswerData }
            : undefined,
        },
        include: {
          mcqData: true,
          shortAnswerData: true,
          longAnswerData: true,
        },
      })
    )
  );
}
