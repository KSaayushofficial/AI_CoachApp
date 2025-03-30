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
  subtopic: z.string().min(1, "Subtopic is required"),
  type: z.enum(["MCQ", "SHORT_ANSWER", "LONG_ANSWER"]),
});

const geminiAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const PROMPTS = {
  UNIFIED: (
    university: string,
    selectedCourse: string,
    selectedSubject: string,
    subtopic: string,
    difficulty: string,
    numQuestions: number
  ) => `
    Generate a diverse set of ${numQuestions} **unique and non-repetitive** questions 
    for ${selectedCourse} students on **"${subtopic}"** within **${selectedSubject}** at a **${difficulty}** level.

    ### **Diversity Requirements:**
    Each question must focus on a **distinct aspect** of "${subtopic}". Ensure **conceptual depth** by covering:
    - **Fundamentals** (definitions, key principles)
    - **Practical Applications** (real-world use, industry relevance)
    - **Challenges & Solutions** (limitations, security, optimization)
    - **Comparative Analysis** (contrasting approaches, trade-offs)
    - **Problem-Solving Scenarios** (case-based or code-based, if applicable)

    Generate exactly ONE set of questions in the following format:
    
    1. **Multiple Choice Question (MCQ)** - A well-structured conceptual question with distinct answer choices.
    2. **Short Answer Question** - A concise yet analytical question covering a specific concept or challenge.
    3. **Long Answer Question** - A deep, **multi-perspective** question requiring a detailed response.

    ### **Rules for Generation:**
    - **Ensure diversity**: Cover **different** aspects of "${subtopic}".
    - **Avoid rewording**: No repetitive or rephrased versions of the same question.
    - **Include real-world relevance**: Industry applications, security concerns, best practices.
    - **Use examples where necessary**: Code snippets **only if they add clarity**.

    ### **Strict JSON Output Format:**
    {
      "mcq": {
        "question": "A precise MCQ covering a unique aspect of '${subtopic}'",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "Correct option text",
        "definition": "A clear explanation of the subtopic",
        "explanation": "Rationale behind the correct answer"
      },
      "shortAnswer": {
        "question": "A well-structured short-answer question about '${subtopic}'",
        "definition": "Concise definition of the subtopic",
        "sampleAnswer": "3-5 sentence response analyzing the concept",
        "keywords": ["Key Concept 1", "Key Concept 2", "Key Concept 3"],
        "explanation": "Brief rationale behind the question",
        "codeExample": "Include only if relevant"
      },
      "longAnswer": {
        "question": "A deep and analytical long-answer question about '${subtopic}'",
        "definition": "Clear definition of the subtopic",
        "sampleAnswer": "A structured response analyzing multiple perspectives",
        "keyPoints": [
          "Critical analytical point 1", 
          "Critical analytical point 2", 
          "Critical analytical point 3", 
          "Critical analytical point 4"
        ],
        "rubric": {
          "comprehension": "Criteria for understanding the topic",
          "analysis": "Criteria for critical thinking",
          "integration": "Criteria for connecting concepts",
          "presentation": "Criteria for academic writing"
        },
        "explanation": "Detailed context for why this question is relevant",
        "codeExample": "Include only if relevant"
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
        params.subtopic,
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
