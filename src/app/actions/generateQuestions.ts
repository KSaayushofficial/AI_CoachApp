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
    MCQ: `Generate a unique multiple-choice question about ${subtopic}.
- Provide 1 correct answer and 3 plausible but incorrect options
- Format response as:
Question: [question text]
Correct: [correct answer]
Incorrect: [comma-separated incorrect options]
Explanation: [brief explanation]
- Jumble the answer options so correct answer isn't always first`,
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
    correctAnswer = content.match(/Correct:\s*(.+?)(\n|$)/)?.[1] || "";
    const incorrect =
      content
        .match(/Incorrect:\s*(.+?)(\n|$)/)?.[1]
        ?.split(",")
        .map((s) => s.trim()) || [];
    explanation = content.match(/Explanation:\s*([\s\S]+)/)?.[1] || "";

    // Combine and shuffle options
    options = [correctAnswer, ...incorrect];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    answer = `Correct answer: ${correctAnswer}\n\n${explanation}`;
  } else {
    answer =
      content.match(/Answer:\s*([\s\S]+?)(\n*Explanation:|$)/s)?.[1]?.trim() ||
      "";
    explanation =
      content.match(/Explanation:\s*([\s\S]+)/s)?.[1]?.trim() ||
      "This requires a detailed explanation with examples.";
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

function createFallbackQuestion(params: any, index: number) {
  // Create more meaningful fallback questions based on the subtopic
  const getQuestionText = (subtopic: string, type: QuestionType) => {
    const questionTypes = {
      MCQ: [
        `Which of the following best describes ${subtopic}?`,
        `What is a key characteristic of ${subtopic}?`,
        `Which statement about ${subtopic} is correct?`,
        `In the context of ${subtopic}, which option is most accurate?`,
      ],
      SHORT_ANSWER: [
        `Briefly explain the concept of ${subtopic}.`,
        `Summarize the importance of ${subtopic} in 1-2 sentences.`,
        `What are the main principles of ${subtopic}?`,
        `Define ${subtopic} and give a short example.`,
      ],
      LONG_ANSWER: [
        `Explain ${subtopic} in detail, including its applications and significance.`,
        `Discuss the main concepts of ${subtopic} with relevant examples.`,
        `Compare and contrast different approaches to understanding ${subtopic}.`,
        `Analyze how ${subtopic} has evolved and its current relevance.`,
      ],
    };

    // Select a question randomly from the appropriate type
    const questions = questionTypes[type];
    return questions[index % questions.length];
  };

  // Create more realistic options for MCQs
  const getMCQOptions = (subtopic: string) => {
    // These are generic but related to the subtopic
    return {
      options: [
        `The primary function of ${subtopic}`,
        `A secondary aspect of ${subtopic}`,
        `A common misconception about ${subtopic}`,
        `An alternative approach to ${subtopic}`,
      ],
      correctAnswer: `The primary function of ${subtopic}`,
    };
  };

  // Create better sample answers
  const getSampleAnswer = (subtopic: string, type: QuestionType) => {
    if (type === "SHORT_ANSWER") {
      return `${subtopic} refers to a fundamental concept that plays a critical role in this field. It is characterized by specific properties that distinguish it from related concepts.`;
    } else {
      return `${subtopic} is a comprehensive framework that encompasses several key principles. First, it involves understanding the core mechanisms that drive its functionality. Second, it requires analysis of how these mechanisms interact within broader systems.

Examples of ${subtopic} can be found in various contexts, such as [specific example 1] and [specific example 2]. These examples demonstrate how ${subtopic} principles are applied in practical scenarios.

The significance of ${subtopic} extends to multiple domains, including [related domain 1] and [related domain 2], where its application has led to important developments and innovations.`;
    }
  };

  const base = {
    id: `fallback-${Date.now()}-${index}`,
    type: params.type,
    difficulty: params.difficulty === "MIXED" ? "MEDIUM" : params.difficulty,
    subjectId: "generated",
    topic: params.subtopic,
    text: getQuestionText(params.subtopic, params.type),
  };

  switch (params.type) {
    case "MCQ":
      const { options, correctAnswer } = getMCQOptions(params.subtopic);
      return {
        ...base,
        mcqData: {
          options,
          correctAnswer,
          explanation: `The correct answer refers to the primary and most essential characteristic of ${params.subtopic}. The other options, while related, either represent secondary aspects, common misunderstandings, or alternative approaches that don't fully capture the core concept.`,
        },
      };
    case "SHORT_ANSWER":
      return {
        ...base,
        shortAnswerData: {
          sampleAnswer: getSampleAnswer(params.subtopic, "SHORT_ANSWER"),
          explanation: `A good response should briefly define ${params.subtopic} and highlight its key characteristics or importance within the field. Concise explanations that demonstrate understanding of core principles are ideal.`,
        },
      };
    case "LONG_ANSWER":
      return {
        ...base,
        longAnswerData: {
          sampleAnswer: getSampleAnswer(params.subtopic, "LONG_ANSWER"),
          explanation: `A comprehensive answer should cover the fundamental aspects of ${params.subtopic}, provide relevant examples, analyze its significance, and potentially discuss related concepts or applications. Critical thinking and synthesis of information are important.`,
        },
      };
    default:
      return base;
  }
}
