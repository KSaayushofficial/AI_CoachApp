"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { db } from "@/lib/prisma";
import { QuestionType, Difficulty } from "@prisma/client";

const QuestionGenerationParamsSchema = z.object({
  course: z.string().min(1, "Course is required"),
  university: z.string().min(1, "University is required"),
  subject: z.string().min(1, "Subject is required"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD", "MIXED"]),
  numQuestions: z.number().min(1).max(50),
  type: z.enum(["MCQ", "SHORT_ANSWER", "LONG_ANSWER"]),
});

const geminiAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const PROMPTS = {
  MCQ: (
    course: string,
    university: string,
    subject: string,
    difficulty: string
  ) => `
    Generate a multiple choice question (MCQ) for ${course} students at ${university} 
    studying ${subject} with ${difficulty} difficulty level. Follow these requirements:

    1. Question must test conceptual understanding
    2. Include 4 plausible options
    3. Mark correct answer clearly
    4. Add detailed explanation
    5. Use real-world examples where applicable

    Format:
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correctAnswer": "...",
      "explanation": "..."
    }
  `,

  SHORT_ANSWER: (
    course: string,
    university: string,
    subject: string,
    difficulty: string
  ) => `
    Generate a short answer question for ${course} students at ${university} 
    studying ${subject} with ${difficulty} difficulty. Requirements:

    1. Require concise 2-3 paragraph answer
    2. Include specific example requirement
    3. List 3-5 key keywords
    4. Provide model answer with example
    5. Focus on application of concepts

    Format:
    {
      "question": "...",
      "sampleAnswer": "...",
      "keywords": ["...", "...", "..."],
      "explanation": "..."
    }
  `,

  LONG_ANSWER: (
    course: string,
    university: string,
    subject: string,
    difficulty: string
  ) => `
    Generate a long answer question for ${course} students at ${university} 
    studying ${subject} with ${difficulty} difficulty. Requirements:

    1. Require comprehensive analysis
    2. Include 2+ real-world examples
    3. Minimum 5 key points in answer
    4. Detailed grading rubric
    5. Focus on critical thinking

    Format:
    {
      "question": "...",
      "sampleAnswer": "...",
      "keyPoints": ["...", "...", "...", "...", "..."],
      "rubric": {
        "analysis": "...",
        "examples": "...", 
        "structure": "...",
        "depth": "..."
      },
      "explanation": "..."
    }
  `,
};

function validateQuestion(question: any, type: QuestionType): boolean {
  try {
    if (type === "MCQ") {
      return (
        !!question.question &&
        question.options?.length === 4 &&
        question.correctAnswer &&
        question.explanation
      );
    }
    if (type === "SHORT_ANSWER") {
      return (
        !!question.question &&
        !!question.sampleAnswer &&
        question.keywords?.length >= 3 &&
        question.explanation &&
        question.sampleAnswer.includes("Example:")
      );
    }
    if (type === "LONG_ANSWER") {
      return (
        !!question.question &&
        !!question.sampleAnswer &&
        question.keyPoints?.length >= 5 &&
        question.rubric &&
        question.explanation &&
        (question.sampleAnswer.match(/Example/g) || []).length >= 2
      );
    }
    return false;
  } catch (error) {
    return false;
  }
}

export async function generateAIQuestions(
  params: z.infer<typeof QuestionGenerationParamsSchema>
) {
  try {
    const validatedParams = QuestionGenerationParamsSchema.parse(params);
    const { type, numQuestions, difficulty, course, university, subject } =
      validatedParams;

    const universityRecord = await db.university.upsert({
      where: { name: university },
      update: {},
      create: { name: university, shortName: university.slice(0, 10) },
    });

    const courseRecord = await db.course.upsert({
      where: {
        name_universityId: { name: course, universityId: universityRecord.id },
      },
      update: {},
      create: { name: course, universityId: universityRecord.id },
    });

    const subjectRecord = await db.subject.upsert({
      where: { name_courseId: { name: subject, courseId: courseRecord.id } },
      update: {},
      create: { name: subject, courseId: courseRecord.id },
    });

    const model = geminiAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const questions = [];

    for (let i = 0; i < numQuestions; i++) {
      try {
        const prompt = PROMPTS[type](course, university, subject, difficulty);
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const cleanedText = text.replace(/```(json)?/g, "").trim();
        const questionData = JSON.parse(cleanedText);

        if (!validateQuestion(questionData, type)) continue;

        const question = {
          type,
          text: questionData.question,
          difficulty: difficulty === "MIXED" ? "MEDIUM" : difficulty,
          subjectId: subjectRecord.id,
          ...(type === "MCQ" && {
            mcqData: {
              options: questionData.options,
              correctAnswer: questionData.correctAnswer,
              explanation: questionData.explanation,
            },
          }),
          ...(type === "SHORT_ANSWER" && {
            shortAnswerData: {
              sampleAnswer: questionData.sampleAnswer,
              keywords: questionData.keywords,
              explanation: questionData.explanation,
            },
          }),
          ...(type === "LONG_ANSWER" && {
            longAnswerData: {
              sampleAnswer: questionData.sampleAnswer,
              keyPoints: questionData.keyPoints,
              rubric: questionData.rubric,
              explanation: questionData.explanation,
            },
          }),
        };

        questions.push(question);
      } catch (error) {
        continue;
      }
    }

    const createdQuestions = await db.$transaction(
      questions.map((question) =>
        db.question.create({
          data: {
            ...question,
            mcqData: question.mcqData
              ? { create: question.mcqData }
              : undefined,
            shortAnswerData: question.shortAnswerData
              ? { create: question.shortAnswerData }
              : undefined,
            longAnswerData: question.longAnswerData
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

    return createdQuestions;
  } catch (error) {
    throw new Error(
      `Question generation failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
