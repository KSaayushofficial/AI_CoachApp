"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { db } from "@/lib/prisma";
import { QuestionType, Difficulty } from "@prisma/client";
import { checkUser } from "@/lib/checkUser";

// Enhanced validation schema
const QuestionGenerationParamsSchema = z.object({
  course: z.string().min(1, "Course name is required"),
  university: z.string().min(1, "University name is required"),
  subject: z.string().min(1, "Subject is required"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD", "MIXED"]),
  numQuestions: z.number().min(1).max(20),
  subtopic: z.string().min(1, "Subtopic is required"),
  type: z.enum(["MCQ", "SHORT_ANSWER", "LONG_ANSWER"]),
});

// Initialize Gemini AI with better error handling
let geminiAI: GoogleGenerativeAI | null = null;
try {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }
  geminiAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
} catch (error) {
  console.error("Failed to initialize Gemini AI:", error);
}

// Improved prompt generator
const getStructuredPrompt = (
  subtopic: string,
  type: QuestionType,
  difficulty: string,
  existingQuestions: string[] = []
): string => {
  const typeSpecific = {
    MCQ: `Generate a unique multiple-choice question about ${subtopic}.
- Difficulty: ${difficulty}
- Provide 1 correct answer and 3 plausible but incorrect options
- Format response as:
Question: [question text]
Correct: [correct answer]
Incorrect: [comma-separated incorrect options]
Explanation: [brief explanation]`,
    SHORT_ANSWER: `Generate a unique short-answer question about ${subtopic}.
- Difficulty: ${difficulty}
- Answer should be 1-2 sentences
- Format response as:
Question: [question text]
Answer: [concise answer]
Explanation: [brief explanation]`,
    LONG_ANSWER: `Generate a unique long-answer question about ${subtopic}.
- Difficulty: ${difficulty}
- Answer should be detailed with examples
- Format response as:
Question: [question text]
Answer: [detailed explanation]
Explanation: [additional context if needed]`,
  };

  const uniqueness =
    existingQuestions.length > 0
      ? `\n\nAvoid these questions:\n${existingQuestions.join("\n")}`
      : "";

  return `${typeSpecific[type]}${uniqueness}`;
};

// More robust response parser
const parseResponse = (content: string, type: QuestionType) => {
  if (!content) throw new Error("Empty response content");

  const question =
    content.match(/Question:\s*(.+?)(\n|$)/)?.[1]?.trim() ||
    content.split("\n")[0]?.trim() ||
    "Could not parse question";

  let answer = "";
  let options: string[] = [];
  let correctAnswer = "";
  let explanation = "";

  switch (type) {
    case "MCQ":
      correctAnswer =
        content.match(/Correct:\s*(.+?)(\n|$)/)?.[1]?.trim() || "";
      const incorrect =
        content
          .match(/Incorrect:\s*(.+?)(\n|$)/)?.[1]
          ?.split(",")
          .map((s) => s.trim())
          .filter(Boolean) || [];

      explanation =
        content.match(/Explanation:\s*([\s\S]+)/)?.[1]?.trim() ||
        "No explanation provided";

      options = [correctAnswer, ...incorrect]
        .filter(Boolean)
        .sort(() => Math.random() - 0.5); // Better shuffling

      answer = `Correct answer: ${correctAnswer}\n\n${explanation}`;
      break;

    default:
      answer =
        content
          .match(/Answer:\s*([\s\S]+?)(\n*Explanation:|$)/s)?.[1]
          ?.trim() || "No answer generated";
      explanation =
        content.match(/Explanation:\s*([\s\S]+)/s)?.[1]?.trim() ||
        "No explanation provided";
  }

  return { question, answer, options, correctAnswer, explanation };
};

// Enhanced fallback question generator
async function createFallbackQuestion(
  params: z.infer<typeof QuestionGenerationParamsSchema>,
  index: number
) {
  const getSubjectId = async () => {
    try {
      const subject = await db.subject.findFirst({
        where: { name: params.subject },
        select: { id: true },
      });
      return subject?.id || null;
    } catch {
      return null;
    }
  };

  const subjectId = await getSubjectId();
  const baseQuestion = {
    id: `fallback-${Date.now()}-${index}`,
    type: params.type,
    difficulty: params.difficulty === "MIXED" ? "MEDIUM" : params.difficulty,
    subjectId,
    topic: params.subtopic,
    text: "",
  };

  const questionTexts = {
    MCQ: `Which of the following best describes ${params.subtopic}?`,
    SHORT_ANSWER: `Explain ${params.subtopic} briefly.`,
    LONG_ANSWER: `Discuss ${params.subtopic} in detail.`,
  };

  baseQuestion.text = questionTexts[params.type] || questionTexts.SHORT_ANSWER;

  switch (params.type) {
    case "MCQ":
      return {
        ...baseQuestion,
        mcqData: {
          options: [
            "Correct answer (example)",
            "Incorrect option 1",
            "Incorrect option 2",
            "Incorrect option 3",
          ],
          correctAnswer: "Correct answer (example)",
          explanation: `This is a fallback question about ${params.subtopic}`,
        },
      };
    case "SHORT_ANSWER":
      return {
        ...baseQuestion,
        shortAnswerData: {
          sampleAnswer: `Sample answer about ${params.subtopic}`,
          explanation: "This is a fallback question",
        },
      };
    case "LONG_ANSWER":
      return {
        ...baseQuestion,
        longAnswerData: {
          sampleAnswer: `Detailed explanation about ${params.subtopic}`,
          explanation: "This is a fallback question",
        },
      };
    default:
      return baseQuestion;
  }
}

// Main function with comprehensive error handling
export async function generateAIQuestions(
  params: z.infer<typeof QuestionGenerationParamsSchema>
) {
  try {
    // Authentication check
    const user = await checkUser();
    if (!user) throw new Error("User authentication failed");
    if (!geminiAI) throw new Error("Gemini AI service is unavailable");

    // Input validation
    const validatedParams = QuestionGenerationParamsSchema.parse(params);
    if (!validatedParams.subtopic.trim()) {
      throw new Error("Subtopic cannot be empty");
    }

    const questions = [];
    const model = geminiAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const existingQuestions: string[] = [];

    for (let i = 0; i < validatedParams.numQuestions; i++) {
      try {
        // Rate limiting
        if (i > 0) await new Promise((resolve) => setTimeout(resolve, 1500));

        const difficulty =
          validatedParams.difficulty === "MIXED"
            ? ["EASY", "MEDIUM", "HARD"][Math.floor(Math.random() * 3)]
            : validatedParams.difficulty.toLowerCase();

        const prompt = getStructuredPrompt(
          validatedParams.subtopic,
          validatedParams.type,
          difficulty,
          existingQuestions
        );

        // API call with error handling
        const result = await model.generateContent(prompt);
        if (!result.response) throw new Error("Empty API response");

        const content = result.response.text();
        const { question, answer, options, correctAnswer, explanation } =
          parseResponse(content, validatedParams.type);

        // Validate parsed content
        if (
          !question ||
          (validatedParams.type === "MCQ" &&
            (!correctAnswer || options.length < 2))
        ) {
          throw new Error("Invalid question format received");
        }

        existingQuestions.push(question);

        // Database operation with error handling
        const dbQuestion = await db.generatedQuestion.create({
          data: {
            userId: user.id,
            questionText: question,
            answerText: answer,
            questionType: validatedParams.type,
            difficulty:
              validatedParams.difficulty === "MIXED"
                ? (["EASY", "MEDIUM", "HARD"][
                    Math.floor(Math.random() * 3)
                  ] as Difficulty)
                : (validatedParams.difficulty as Difficulty),
            course: validatedParams.course,
            subject: validatedParams.subject,
            university: validatedParams.university,
            subtopic: validatedParams.subtopic,
            formatType: "DEFAULT",
          },
        });

        // Format response
        const formattedQuestion = {
          id: dbQuestion.id,
          type: validatedParams.type,
          text: question,
          difficulty: validatedParams.difficulty,
          subjectId: "generated",
          topic: validatedParams.subtopic,
        };

        switch (validatedParams.type) {
          case "MCQ":
            questions.push({
              ...formattedQuestion,
              mcqData: {
                options:
                  options.length === 4
                    ? options
                    : [
                        correctAnswer,
                        "Incorrect option 1",
                        "Incorrect option 2",
                        "Incorrect option 3",
                      ],
                correctAnswer,
                explanation,
              },
            });
            break;
          case "SHORT_ANSWER":
            questions.push({
              ...formattedQuestion,
              shortAnswerData: {
                sampleAnswer: answer,
                explanation,
              },
            });
            break;
          case "LONG_ANSWER":
            questions.push({
              ...formattedQuestion,
              longAnswerData: {
                sampleAnswer: answer,
                explanation,
              },
            });
            break;
        }
      } catch (error) {
        console.error(`Error generating question ${i + 1}:`, error);
        questions.push(await createFallbackQuestion(validatedParams, i));
      }
    }

    return questions;
  } catch (error) {
    console.error("Critical error in generateAIQuestions:", error);
    // Return fallback questions if complete failure
    const fallbacks = [];
    const numQuestions = params?.numQuestions || 3;
    for (let i = 0; i < numQuestions; i++) {
      fallbacks.push(
        await createFallbackQuestion(
          params || {
            course: "General",
            university: "Unknown",
            subject: "General",
            difficulty: "MEDIUM",
            numQuestions: 3,
            subtopic: "general topic",
            type: "MCQ",
          },
          i
        )
      );
    }
    return fallbacks;
  }
}
