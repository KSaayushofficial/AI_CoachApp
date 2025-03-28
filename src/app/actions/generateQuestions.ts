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
  UNIFIED: (course: string, university: string, subject: string, difficulty: string, numQuestions: number) => `
    Generate a well-structured and diverse question set for ${course} students at ${university}, 
    covering ${subject} at a ${difficulty} level.

    Ensure each question set follows a standardized academic format and includes:
    - A multiple-choice question (MCQ) with well-thought-out options and an explanation.
    - A short-answer question designed to test conceptual clarity with keywords and explanations.
    - A long-answer question that requires in-depth analysis, complete with key points and a grading rubric.

    Present questions in the following JSON format:

    \`
    {
      "mcq": {
        "question": "MCQ text clearly formulated",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "Correct option text",
        "explanation": "Detailed explanation of why the correct answer is right. Include a relatable, funny real-life analogy to clarify the concept. Provide 2-3 additional examples that help reinforce understanding. Also, include practical applications of the concept to assist students in the best possible way."
      },
      "shortAnswer": {
        "question": "Clearly framed short-answer question",
        "sampleAnswer": "Concise 3-5 sentence analytical response",
        "keywords": ["Relevant Keyword 1", "Relevant Keyword 2", "Relevant Keyword 3"],
        "explanation": "Brief rationale behind the question. Include a simple, humorous real-life scenario to explain the concept. Provide 2-3 different examples to ensure clarity. Also, suggest an alternative approach to answering the question to assist students in fully grasping the idea."
      },
      "longAnswer": {
        "question": "Comprehensive analytical question requiring deep understanding",
        "sampleAnswer": "Well-structured in-depth response",
        "keyPoints": [
          "Critical analytical point 1", 
          "Critical analytical point 2", 
          "Critical analytical point 3", 
          "Critical analytical point 4"
        ],
        "rubric": {
          "comprehension": "Evaluates understanding of core concepts",
          "analysis": "Assesses depth of critical thinking",
          "integration": "Measures connection to related topics and real-world application",
          "presentation": "Examines clarity, structure, and academic rigor"
        },
        "explanation": "Detailed context of the question to guide the student. Provide a practical real-world example that connects with students' everyday experiences. Include 2-3 additional unique variations of the question to deepen understanding. Also, ensure that a humor-based analogy or engaging story is used to make the concept memorable and easy to grasp."
      }
    }
    \`

    IMPORTANT: Ensure that all code responses are formatted properly inside code blocks to avoid jumbled output.
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
