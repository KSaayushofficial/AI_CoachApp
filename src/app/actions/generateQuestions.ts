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
  UNIFIED: (
    university: string,
    selectedCourse: string,
    selectedSubject: string,
    difficulty: string,
    numQuestions: number
  ) => `
    Generate unique comprehensive question set for ${selectedCourse} students   
    covering ${selectedSubject} with ${difficulty} complexity.

    Generate exactly ONE set of questions with THREE types:
    1. Multiple Choice Question (MCQ)
    2. Short Answer Question
    3. Long Answer Question

    IMPORTANT: Ensure questions are related and cover the same core academic concept.
    Only include code examples if the question is programming-related.

    Respond STRICTLY in this JSON format:
    {
      "mcq": {
        "question": "Precise unique and well structured MCQ text",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "Correct option text",
        "definition" : "Give a clear and concise definition of the concept",
        "explanation": "Comprehensive explanation"
      },
      "shortAnswer": {
        "question": "Precise unique and well structured Focused short-answer question",
        "definition" : "Give a clear and concise definition of the concept",
        "sampleAnswer": "Concise 3-5 sentence analytical response. Include code if necessary.",
        "keywords": ["Key Concept 1", "Key Concept 2", "Key Concept 3"],
        "explanation": "Brief rationale",
        "codeExample": "Include a code snippet only if the question requires it."
      },
      "longAnswer": {
        "question": "Precise unique and well structured Comprehensive long-form analytical question",
        "definition" : "Give a clear and concise definition of the concept",
        "sampleAnswer": "Structured in-depth response. Include code if necessary.",
        "keyPoints": [
          "Critical analytical point 1", 
          "Critical analytical point 2", 
          "Critical analytical point 3", 
          "Critical analytical point 4"
        ],
        "rubric": {
          "comprehension": "Understanding criteria",
          "analysis": "Critical thinking evaluation",
          "integration": "Concept connection criteria",
          "presentation": "Academic writing assessment"
        },
        "explanation": "Detailed question context",
        "codeExample": "Include a code snippet only if the question requires it."
      }
    }
  `,
};


function validateQuestionSet(questionSet: any): boolean {
  try {
    if (!questionSet.mcq || !questionSet.shortAnswer || !questionSet.longAnswer)
      return false;
    if (
      !questionSet.mcq.question ||
      !questionSet.mcq.options ||
      questionSet.mcq.options.length !== 4
    )
      return false;
    if (
      !questionSet.shortAnswer.question ||
      !questionSet.shortAnswer.sampleAnswer
    )
      return false;
    if (
      !questionSet.longAnswer.question ||
      !questionSet.longAnswer.sampleAnswer
    )
      return false;
    return true;
  } catch (error) {
    return false;
  }
}

function createQuestionObjects(
  questionSet: any,
  subjectId: string,
  difficulty: Difficulty
) {
  return [
    {
      type: "MCQ" as QuestionType,
      text: questionSet.mcq.question,
      difficulty,
      subjectId,
      mcqData: {
        options: questionSet.mcq.options,
        correctAnswer: questionSet.mcq.correctAnswer,
        explanation: questionSet.mcq.explanation,
      },
    },
    {
      type: "SHORT_ANSWER" as QuestionType,
      text: questionSet.shortAnswer.question,
      difficulty,
      subjectId,
      shortAnswerData: {
        sampleAnswer: questionSet.shortAnswer.sampleAnswer,
        keywords: questionSet.shortAnswer.keywords,
        explanation: questionSet.shortAnswer.explanation,
      },
    },
    {
      type: "LONG_ANSWER" as QuestionType,
      text: questionSet.longAnswer.question,
      difficulty,
      subjectId,
      longAnswerData: {
        sampleAnswer: questionSet.longAnswer.sampleAnswer,
        keyPoints: questionSet.longAnswer.keyPoints,
        rubric: questionSet.longAnswer.rubric,
        explanation: questionSet.longAnswer.explanation,
      },
    },
  ];
}

export async function generateAIQuestions(
  params: z.infer<typeof QuestionGenerationParamsSchema>
) {
  try {
    const validatedParams = QuestionGenerationParamsSchema.parse(params);
    const mappedDifficulty =
      params.difficulty === "MIXED" ? "MEDIUM" : params.difficulty;

    const university = await db.university.upsert({
      where: { name: params.university },
      update: {},
      create: {
        name: params.university,
        shortName: params.university.slice(0, 10),
      },
    });

    const course = await db.course.upsert({
      where: {
        name_universityId: { name: params.course, universityId: university.id },
      },
      update: {},
      create: { name: params.course, universityId: university.id },
    });

    const subject = await db.subject.upsert({
      where: { name_courseId: { name: params.subject, courseId: course.id } },
      update: {},
      create: { name: params.subject, courseId: course.id },
    });

    const model = geminiAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const questions = [];

    for (let i = 0; i < params.numQuestions; i++) {
      const prompt = PROMPTS.UNIFIED(
        params.course,
        params.university,
        params.subject,
        params.difficulty,
        params.numQuestions
      );

      const result = await model.generateContent(prompt);
      const content = result.response.text();
      if (!content) continue;

      try {
        const questionSet = JSON.parse(
          content.replace(/```(json)?/g, "").trim()
        );
        if (!validateQuestionSet(questionSet)) continue;

        const generatedQuestions = createQuestionObjects(
          questionSet,
          subject.id,
          mappedDifficulty
        );
        questions.push(...generatedQuestions);
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
