"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { db } from "@/lib/prisma";
import { QuestionType, Difficulty } from "@prisma/client";
import { checkUser } from "@/lib/checkUser";

const QuestionGenerationParamsSchema = z.object({
  course: z.string().min(1),
  university: z.string().min(1),
  subject: z.string().min(1),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD", "MIXED"]),
  numQuestions: z.number().min(1).max(20),
  subtopic: z.string().min(1),
  type: z.enum(["MCQ", "SHORT_ANSWER", "LONG_ANSWER"]),
});

const geminiAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const getStructuredPrompt = (
  subtopic: string,
  type: QuestionType,
  difficulty: string,
  existingQuestions: string[] = []
): string => {
  const typeSpecific = {
    MCQ: `Generate a unique, well-structured multiple-choice question about ${subtopic}.
- Provide 4 realistic answer options that are domain-specific, not generic (like "a, b, c, d").
- Format response as:
Question: [question text]
Correct: [correct answer]
Incorrect: [incorrect answer 1], [incorrect answer 2], [incorrect answer 3]
Explanation: [brief explanation of why the correct answer is right]
- Ensure all answer options are logical and non-repetitive.
- Shuffle the answer choices randomly.`,
    SHORT_ANSWER: `Generate a unique short-answer question about ${subtopic}.
- Answer should be 1-2 sentences
- Format response as:
Question: [question text]
Answer: [concise answer]
Explanation: [brief explanation]`,
    LONG_ANSWER: `Generate a unique long-answer question about ${subtopic}.
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

  return `${typeSpecific[type]}
Difficulty: ${difficulty}${uniqueness}
Ensure all answers are accurate and options are plausible.`;
};

const parseResponse = (content: string, type: QuestionType) => {
  content = content.trim();
  const question =
    content.match(/Question:\s*(.+?)(\n|$)/)?.[1] || content.split("\n")[0];
  let answer = "",
    options: string[] = [],
    correctAnswer = "",
    explanation = "";

  if (type === "MCQ") {
    correctAnswer = content.match(/Correct:\s*(.+?)(\n|$)/)?.[1]?.trim() || "";
    let incorrectMatches = content.match(/Incorrect:\s*(.+?)(\n|$)/);

    const incorrectOptions =
      incorrectMatches && incorrectMatches[1]
        ? incorrectMatches[1].split(",").map((s) => s.trim())
        : [];

    // Prevent AI returning incomplete or wrong format
    if (!correctAnswer || incorrectOptions.length < 3) {
      throw new Error("Invalid MCQ format received.");
    }

    options = [correctAnswer, ...incorrectOptions];

    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    explanation = content.match(/Explanation:\s*([\s\S]+)/)?.[1]?.trim() || "";
    answer = `Correct answer: ${correctAnswer}\n\n${explanation}`;
  } else {
    answer =
      content.match(/Answer:\s*([\s\S]+?)(\n*Explanation:|$)/s)?.[1]?.trim() ||
      "";
    explanation = content.match(/Explanation:\s*([\s\S]+)/s)?.[1]?.trim() || "";
  }

  return { question, answer, options, correctAnswer, explanation };
};

export async function generateAIQuestions(
  params: z.infer<typeof QuestionGenerationParamsSchema>
) {
  const user = await checkUser();
  if (!user) throw new Error("User authentication failed");

  const validatedParams = QuestionGenerationParamsSchema.parse(params);
  const questions = [];
  const model = geminiAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const existingQuestions: string[] = [];

  for (let i = 0; i < params.numQuestions; i++) {
    try {
      const prompt = getStructuredPrompt(
        params.subtopic,
        params.type,
        params.difficulty === "MIXED"
          ? ["EASY", "MEDIUM", "HARD"][Math.floor(Math.random() * 3)]
          : params.difficulty.toLowerCase(),
        existingQuestions
      );

      const result = await model.generateContent(prompt);
      const content = result.response.text();
      const { question, answer, options, correctAnswer, explanation } =
        parseResponse(content, params.type);

      if (
        !question ||
        (params.type === "MCQ" && (!correctAnswer || options.length < 2))
      ) {
        throw new Error("Invalid question format received from AI");
      }

      existingQuestions.push(question);

      const dbQuestion = await db.generatedQuestion.create({
        data: {
          userId: user.id,
          questionText: question,
          answerText: answer,
          questionType: params.type,
          difficulty:
            params.difficulty === "MIXED"
              ? (["EASY", "MEDIUM", "HARD"][
                  Math.floor(Math.random() * 3)
                ] as Difficulty)
              : (params.difficulty as Difficulty),
          course: params.course,
          subject: params.subject,
          university: params.university,
          subtopic: params.subtopic,
          formatType: "DEFAULT",
        },
      });

      const baseQuestion = {
        id: dbQuestion.id,
        type: params.type,
        text: question,
        difficulty: params.difficulty,
        subjectId: "generated",
        topic: params.subtopic,
      };

      switch (params.type) {
        case "MCQ":
          questions.push({
            ...baseQuestion,
            mcqData: {
              options,
              correctAnswer,
              explanation: explanation || "No explanation provided",
            },
          });
          break;
        case "SHORT_ANSWER":
          questions.push({
            ...baseQuestion,
            shortAnswerData: {
              sampleAnswer: answer || "Sample answer not generated",
              explanation:
                explanation || "This requires a concise 1-2 sentence response.",
            },
          });
          break;
        case "LONG_ANSWER":
          questions.push({
            ...baseQuestion,
            longAnswerData: {
              sampleAnswer: answer || "Detailed answer not generated",
              explanation:
                explanation ||
                "This requires a comprehensive explanation with examples.",
            },
          });
          break;
      }
    } catch (error) {
      console.error(`Error generating question ${i + 1}:`, error);
      questions.push(createFallbackQuestion(params, i));
    }
  }

  return questions;
}
function createFallbackQuestion(params: { difficulty: "EASY" | "MEDIUM" | "HARD" | "MIXED"; course: string; subject: string; university: string; subtopic: string; type: "MCQ" | "SHORT_ANSWER" | "LONG_ANSWER"; numQuestions: number; }, i: number): any {
  throw new Error("Function not implemented.");
}

