"use server";

import { OpenAI } from "openai";
import { z } from "zod";
import { db } from "@/lib/prisma";
import { QuestionType, Difficulty } from "@prisma/client";

const QuestionGenerationParamsSchema = z.object({
  course: z.string().min(1, "Course is required"),
  university: z.string().min(1, "University is required"),
  subject: z.string().min(1, "Subject is required"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  numQuestions: z
    .number()
    .min(1)
    .max(50, "Cannot generate more than 50 questions"),
  type: z.enum(["MCQ", "SHORT_ANSWER", "LONG_ANSWER"]),
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PROMPTS = {
  MCQ: (subject: string, difficulty: string) => `
    Generate a professional multiple-choice question about ${subject} 
    with difficulty level ${difficulty}. 
    Provide:
    - Question text
    - 4 answer options
    - Correct answer
    - Detailed explanation
    Format: 
    {
      "question": "...",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option X",
      "explanation": "Detailed explanation of the correct answer"
    }
  `,
  SHORT_ANSWER: (subject: string, difficulty: string) => `
    Create a short-answer question about ${subject} 
    with difficulty level ${difficulty}. 
    Provide:
    - Question text
    - Sample answer
    - Key keywords to look for in student's response
    - Explanation
    Format:
    {
      "question": "...",
      "sampleAnswer": "...",
      "keywords": ["key1", "key2"],
      "explanation": "Detailed explanation of the expected answer"
    }
  `,
  LONG_ANSWER: (subject: string, difficulty: string) => `
    Develop a comprehensive long-answer question about ${subject} 
    with difficulty level ${difficulty}. 
    Provide:
    - Question text
    - Sample answer structure
    - Key points to be addressed
    - Grading rubric criteria
    Format:
    {
      "question": "...",
      "sampleAnswer": "...",
      "keyPoints": ["Point 1", "Point 2", "Point 3"],
      "rubric": {
        "comprehension": "Level of understanding",
        "analysis": "Depth of analysis",
        "examples": "Relevance of examples"
      }
    }
  `,
};

const FALLBACK_QUESTIONS: Record<QuestionType, Record<Difficulty, any>> = {
  MCQ: {
    EASY: {
      question: "What is the basic concept of computer memory?",
      options: [
        "Storage for temporary data",
        "Permanent data storage device",
        "CPU processing unit",
        "Input/output controller"
      ],
      correctAnswer: "Storage for temporary data",
      explanation: "Computer memory provides temporary storage for data and instructions during processing."
    },
    MEDIUM: {
      question: "How does RAM differ from ROM?",
      options: [
        "RAM is volatile, ROM is non-volatile",
        "RAM is faster, ROM is slower",
        "RAM stores permanent data, ROM stores temporary data",
        "They are exactly the same"
      ],
      correctAnswer: "RAM is volatile, ROM is non-volatile",
      explanation: "Random Access Memory (RAM) loses data when power is turned off, while Read-Only Memory (ROM) retains data permanently."
    },
    HARD: {
      question: "Explain the concept of memory hierarchy in computer architecture",
      options: [
        "A single-level memory system",
        "Multiple memory levels with different speeds and sizes",
        "Only cache memory matters",
        "Memory is uniform across all computers"
      ],
      correctAnswer: "Multiple memory levels with different speeds and sizes",
      explanation: "Memory hierarchy organizes computer memory from fastest and smallest (like registers) to slowest and largest (like hard drives)."
    }
  },
  SHORT_ANSWER: {
    EASY: {
      question: "What is the purpose of an operating system?",
      sampleAnswer: "To manage hardware and software resources.",
      keywords: ["manage", "hardware", "software", "resources"],
      explanation: "An operating system acts as an intermediary between users and the computer hardware."
    },
    MEDIUM: {
      question: "Explain the concept of virtual memory.",
      sampleAnswer: "Virtual memory allows a computer to use hard drive space as additional RAM.",
      keywords: ["virtual memory", "hard drive", "RAM", "additional"],
      explanation: "Virtual memory extends the available memory by using disk storage to simulate additional RAM."
    },
    HARD: {
      question: "Describe the process of context switching in operating systems.",
      sampleAnswer: "Context switching is the process of storing and restoring the state of a CPU.",
      keywords: ["context switching", "CPU", "state", "process"],
      explanation: "Context switching allows multiple processes to share a single CPU efficiently."
    }
  },
  LONG_ANSWER: {
    EASY: {
      question: "Discuss the advantages of cloud computing.",
      sampleAnswer: "Cloud computing offers scalability, cost-efficiency, and accessibility.",
      keyPoints: ["scalability", "cost-efficiency", "accessibility"],
      rubric: {
        comprehension: "Understanding of cloud computing concepts",
        analysis: "Explanation of advantages",
        examples: "Relevant examples provided"
      }
    },
    MEDIUM: {
      question: "Explain the differences between relational and non-relational databases.",
      sampleAnswer: "Relational databases use structured tables, while non-relational databases use flexible formats.",
      keyPoints: ["structured tables", "flexible formats", "use cases"],
      rubric: {
        comprehension: "Understanding of database types",
        analysis: "Comparison of features",
        examples: "Examples of each type"
      }
    },
    HARD: {
      question: "Analyze the impact of artificial intelligence on modern industries.",
      sampleAnswer: "AI has transformed industries by improving efficiency, decision-making, and innovation.",
      keyPoints: ["efficiency", "decision-making", "innovation"],
      rubric: {
        comprehension: "Understanding of AI applications",
        analysis: "Depth of industry impact analysis",
        examples: "Specific industry examples"
      }
    }
  }
};

export async function generateAIQuestions(params: {
  course: string;
  university: string;
  subject: string;
  difficulty: string;
  numQuestions: number;
  type: QuestionType;
}) {
  try {
    const validatedParams = QuestionGenerationParamsSchema.parse(params);

    const universityRecord = await db.university.upsert({
      where: { name: params.university },
      update: {},
      create: {
        name: params.university,
        shortName: params.university.slice(0, 10),
      },
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
      try {
        const aiResponse = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-1106",
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                "You are an expert academic question generator for university-level courses.",
            },
            {
              role: "user",
              content: PROMPTS[params.type](params.subject, params.difficulty),
            },
          ],
          temperature: 0.7,
          max_tokens: 500,
        });

        const questionData = JSON.parse(
          aiResponse.choices[0].message.content || "{}"
        );

        const baseQuestionData = {
          type: params.type,
          text: questionData.question,
          subjectId: subject.id,
          difficulty: params.difficulty as Difficulty,
        };

        if (params.type === "MCQ") {
          questions.push({
            ...baseQuestionData,
            mcqData: {
              options: questionData.options,
              correctAnswer: questionData.correctAnswer,
              explanation: questionData.explanation,
            },
          });
        } else if (params.type === "SHORT_ANSWER") {
          questions.push({
            ...baseQuestionData,
            shortAnswerData: {
              sampleAnswer: questionData.sampleAnswer,
              keywords: questionData.keywords,
              explanation: questionData.explanation,
            },
          });
        } else if (params.type === "LONG_ANSWER") {
          questions.push({
            ...baseQuestionData,
            longAnswerData: {
              sampleAnswer: questionData.sampleAnswer,
              keyPoints: questionData.keyPoints,
              rubric: questionData.rubric,
            },
          });
        }
      } catch (questionError) {
        console.error(`Error generating AI question: ${questionError}`);
        
        // Fallback to predefined questions
        const fallbackQuestion = FALLBACK_QUESTIONS[params.type as "MCQ"][params.difficulty as Difficulty];
        
        const baseQuestionData = {
          type: params.type,
          text: fallbackQuestion.question,
          subjectId: subject.id,
          difficulty: params.difficulty as Difficulty,
        };

        if (params.type === "MCQ") {
          questions.push({
            ...baseQuestionData,
            mcqData: {
              options: fallbackQuestion.options,
              correctAnswer: fallbackQuestion.correctAnswer,
              explanation: fallbackQuestion.explanation,
            },
          });
        }
        // Add similar fallback logic for SHORT_ANSWER and LONG_ANSWER
      }
    }

    return await db.$transaction(
      questions.map((question) =>
        db.question.create({
          data: {
            ...question,
            mcqData:
              "mcqData" in question && question.mcqData
                ? { create: question.mcqData }
                : undefined,
            shortAnswerData:
              "shortAnswerData" in question && question.shortAnswerData
                ? { create: question.shortAnswerData }
                : undefined,
            longAnswerData:
              "longAnswerData" in question && question.longAnswerData
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
  } catch (error) {
    console.error("Question generation error:", error);
    throw new Error("Failed to generate questions. Please try again.");
  }
}