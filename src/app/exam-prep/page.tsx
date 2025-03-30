"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen,
  Brain,
  CheckCircle2,
  Clock,
  Code,
  FileText,
  Lightbulb,
  MessageSquare,
  Search,
  ThumbsDown,
  ThumbsUp,
  Zap,
  X,
  Calendar,
  GraduationCap,
  Building,
  ArrowRight,
  Download,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { AIAssistant } from "@/components/shared/ai-assistant";
import { MediaSlider } from "@/components/shared/media-slider";
import { QuestionFilter } from "@/components/shared/question-filter";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { generateAIQuestions } from "@/app/actions/generateQuestions";
import { Question, QuestionType, Difficulty } from "@prisma/client";

type QuestionWithExtras = Question & {
  mcqData?: {
    options: string[];
    correctAnswer: string;
    explanation: string;
  } | null;
  shortAnswerData?: {
    sampleAnswer: string;
    keywords: string[];
    explanation: string;
  } | null;
  longAnswerData?: {
    sampleAnswer: string;
    keyPoints: string[];
    rubric: Record<string, string>;
    explanation: string;
  } | null;
};

const DUMMY_QUESTIONS: QuestionWithExtras[] = [
  {
    id: "1",
    type: "MCQ",
    text: "What is the primary purpose of inheritance in OOP?",
    difficulty: "MEDIUM",
    subjectId: "dummy",
    topic: "Object-Oriented Programming",
    tags: ["OOP", "Inheritance"],
    explanation: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    mcqData: {
      options: [
        "Code Reusability",
        "Memory Management",
        "Data Hiding",
        "Network Communication",
      ],
      correctAnswer: "Code Reusability",
      explanation:
        "Inheritance allows classes to inherit properties and methods from parent classes.",
    },
  },
  {
    id: "2",
    type: "SHORT_ANSWER",
    text: "Explain polymorphism with an example.",
    difficulty: "MEDIUM",
    subjectId: "dummy",
    topic: "Object-Oriented Programming",
    tags: ["OOP", "Polymorphism"],
    explanation: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    shortAnswerData: {
      sampleAnswer:
        "Polymorphism allows methods to perform different tasks based on the object. Example: Animal sound() method with different implementations.",
      keywords: ["Polymorphism", "Method Overriding", "Runtime"],
      explanation:
        "Polymorphism enables one interface to be used for multiple forms.",
    },
  },
  {
    id: "3",
    type: "LONG_ANSWER",
    text: "Describe SOLID principles in object-oriented design.",
    difficulty: "HARD",
    subjectId: "dummy",
    topic: "Software Design Principles",
    tags: ["SOLID", "Design Principles"],
    explanation: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    longAnswerData: {
      sampleAnswer:
        "SOLID principles are: Single Responsibility, Open-Closed, Liskov Substitution...",
      keyPoints: [
        "Single Responsibility Principle",
        "Open/Closed Principle",
        "Liskov Substitution",
        "Interface Segregation",
        "Dependency Inversion",
      ],
      rubric: {
        comprehension: "Understanding of each principle",
        analysis: "Real-world application examples",
        integration: "Connection between principles",
        presentation: "Clear structure and examples",
      },
      explanation: "SOLID principles guide maintainable software design.",
    },
  },
];

const courses = [
  {
    id: "BCA",
    name: "Bachelor of Computer Applications (BCA)",
    subjects: [
      "Data Structures",
      "Database Management",
      "Web Technology",
      "Computer Networks",
    ],
  },
  {
    id: "BScCSIT",
    name: "Bachelor of Science in Computer Science & IT (BSc CSIT)",
    subjects: [
      "Operating Systems",
      "Artificial Intelligence",
      "Software Engineering",
      "Cloud Computing",
    ],
  },
];

function handleShowExplanation(question: string, explanation: string) {
  alert(`Question: ${question}\nExplanation: ${explanation}`);
}

export default function ExamPrepPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<QuestionType>("MCQ");
  const [university, setUniversity] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("MEDIUM");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<{
    question: string;
    answer: string;
  } | null>(null);
  const [numQuestions, setNumQuestions] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPastQuestions, setShowPastQuestions] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    difficulty: "all",
    popularity: "all",
    relevance: "all",
  });
  const [generatedQuestions, setGeneratedQuestions] =
    useState<QuestionWithExtras[]>(DUMMY_QUESTIONS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userSelections, setUserSelections] = useState<Record<string, string>>(
    {}
  );
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(
    new Set()
  );
  const [strengths, setStrengths] = useState<string[]>([]);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const selectedCourseData = courses.find((c) => c.id === selectedCourse);

  const totalQuestions = generatedQuestions.length;
  const completion = (answeredQuestions.size / totalQuestions) * 100;
  const accuracy =
    answeredQuestions.size > 0
      ? Math.round((correctAnswers / answeredQuestions.size) * 100)
      : 0;

  const handleCheckAnswer = (questionId: string, isCorrect: boolean) => {
    setShowAnswers((prev) => ({ ...prev, [questionId]: true }));
    setAnsweredQuestions((prev) => new Set(prev.add(questionId)));

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      setStrengths((prev) => [...new Set([...prev, selectedCourse])]);
    } else {
      setIncorrectAnswers((prev) => prev + 1);
      setWeaknesses((prev) => [...new Set([...prev, selectedSubject])]);
    }
  };

  const renderQuestionCounter = () => (
    <Badge
      variant="outline"
      className="bg-primary/10 text-primary border-primary/20"
    >
      Question {currentQuestionIndex + 1} of {filteredQuestions.length}
    </Badge>
  );

  const handleGenerateQuestions = async () => {
    if (!selectedCourse || !selectedSubject || !university) {
      toast({
        title: "Missing information",
        description:
          "Please select a course, university, and subject before generating questions.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setUserSelections({});
    setShowAnswers({});
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setAnsweredQuestions(new Set());

    try {
      const questions = await generateAIQuestions({
        course: selectedCourse,
        university,
        subject: selectedSubject,
        difficulty,
        numQuestions,
        type: "MCQ",
      });

      setGeneratedQuestions(
        questions.map((question) => ({
          ...question,
          mcqData: question.mcqData
            ? {
                ...question.mcqData,
                options: Array.isArray(question.mcqData.options)
                  ? question.mcqData.options.filter(
                      (option): option is string => typeof option === "string"
                    )
                  : [],
              }
            : null,
          longAnswerData: question.longAnswerData
            ? {
                ...question.longAnswerData,
                rubric:
                  typeof question.longAnswerData.rubric === "object" &&
                  question.longAnswerData.rubric !== null
                    ? (question.longAnswerData.rubric as Record<string, string>)
                    : {},
                explanation: question.longAnswerData.explanation ?? "",
              }
            : null,
        }))
      );
      setCurrentQuestionIndex(0);
      toast({
        title: "Questions generated",
        description: `${questions.length} questions for ${selectedSubject} have been generated.`,
      });
    } catch (error) {
      toast({
        title: "Error generating questions",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNextQuestion = () => {
    const filteredQuestions = generatedQuestions.filter(
      (q) => q.type === activeTab
    );
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const filteredQuestions = generatedQuestions.filter(
    (q) => q.type === activeTab
  );
  const currentQuestionData = filteredQuestions[currentQuestionIndex];

  const mediaItems: { type: "video" | "image"; title: string; src: string; thumbnail?: string }[] = [
    {
      type: "video",
      title: "OOP Concepts",
      src: "https://www.youtube.com/embed/PFmuCDHHpwk",
      thumbnail: "/placeholder.svg",
    },
    { type: "image", title: "Class Diagram", src: "/placeholder.svg" },
  ];

  const pastPapers = [
    {
      id: 1,
      title: "BCA OOP Exam",
      university: "TU",
      year: "2022",
      semester: "Spring",
      questions: 7,
      duration: "3h",
      downloads: 1245,
      color: "#3B82F6",
    },
  ];

  const renderMCQContent = (question: QuestionWithExtras) => {
    if (isGenerating)
      return (
        <div className="space-y-4">
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4 rounded-lg" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        </div>
      );

    if (!question.mcqData) return null;
    const { id, text, mcqData } = question;
    const { options, correctAnswer, explanation } = mcqData;
    const hasAnswered = showAnswers[id];
    const userAnswer = userSelections[id];
    

    return (
      <div className="space-y-6">
        <div className="p-4 rounded-lg border border-border/10 bg-background/80">
          <p className="font-medium">{text}</p>
        </div>

        <RadioGroup
          value={userAnswer}
          onValueChange={(value) =>
            setUserSelections((prev) => ({ ...prev, [id]: value }))
          }
          className="space-y-3"
        >
          {options.map((option, index) => {
            const isCorrect = option === correctAnswer;
            const isSelected = userAnswer === option;
            let borderColor = "border-border/10";
            let bgColor = "bg-background/80";

            if (hasAnswered) {
              borderColor = isCorrect
                ? "border-green-500"
                : isSelected
                ? "border-red-500"
                : borderColor;
              bgColor = isCorrect
                ? "bg-green-500/10"
                : isSelected
                ? "bg-red-500/10"
                : bgColor;
            }

            return (
              <div
                key={index}
                className={`flex items-center space-x-2 p-3 rounded-lg border ${borderColor} ${bgColor}`}
              >
                <RadioGroupItem
                  value={option}
                  id={`option-${index}-${id}`}
                  disabled={hasAnswered}
                />
                <Label
                  htmlFor={`option-${index}-${id}`}
                  className="flex-1 cursor-pointer"
                >
                  {option}
                </Label>
                {hasAnswered && isCorrect && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
                {hasAnswered && isSelected && !isCorrect && (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>
            );
          })}
        </RadioGroup>

        {hasAnswered && (
          <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/10">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-500">
                  {userAnswer === correctAnswer ? "Correct!" : "Incorrect"}
                </h4>
                <p className="text-sm mt-1">{explanation}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-primary"
                  onClick={() =>
                    handleShowExplanation(
                      text,
                      `${correctAnswer}\n\n${explanation}`
                    )
                  }
                >
                  <Brain className="mr-1 h-4 w-4" /> Explain Further
                </Button>
              </div>
            </div>
          </div>
        )}

        {!hasAnswered && userAnswer && (
          <Button
            className="w-full"
            onClick={() => handleCheckAnswer(id, userAnswer === correctAnswer)}
          >
            Check Answer
          </Button>
        )}
      </div>
    );
  };

  const renderShortAnswerContent = (question: QuestionWithExtras) => {
    if (isGenerating)
      return (
        <div className="space-y-4">
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>
      );

    if (!question.shortAnswerData) return null;
    const { id, text, shortAnswerData } = question;
    const { sampleAnswer, keywords, explanation } = shortAnswerData;

    return (
      <div className="space-y-6">
        <div className="p-4 rounded-lg border border-border/10 bg-background/80">
          <p className="font-medium">{text}</p>
        </div>

        <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/10">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-500">Model Answer</h4>
              <p className="text-sm mt-1">{sampleAnswer}</p>
              <div className="mt-2">
                <h5 className="text-sm font-medium">Keywords:</h5>
                <div className="flex flex-wrap gap-2 mt-1">
                  {keywords.map((keyword, index) => (
                    <Badge key={index} variant="outline">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
              <p className="text-sm mt-2">{explanation}</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-primary"
                onClick={() =>
                  handleShowExplanation(
                    text,
                    `${sampleAnswer}\n\nKeywords: ${keywords.join(
                      ", "
                    )}\n\n${explanation}`
                  )
                }
              >
                <Brain className="mr-1 h-4 w-4" /> Explain Further
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderLongAnswerContent = (question: QuestionWithExtras) => {
    if (isGenerating)
      return (
        <div className="space-y-4">
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      );

    if (!question.longAnswerData) return null;
    const { id, text, longAnswerData } = question;
    const { sampleAnswer, keyPoints, rubric, explanation } = longAnswerData;

    return (
      <div className="space-y-6">
        <div className="p-4 rounded-lg border border-border/10 bg-background/80">
          <p className="font-medium">{text}</p>
        </div>

        <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/10">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-500">Model Answer</h4>
              <p className="text-sm mt-1">{sampleAnswer}</p>
              <h5 className="font-medium mt-3">Key Points</h5>
              <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                {keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
              <h5 className="font-medium mt-3">Rubric</h5>
              <div className="space-y-2 text-sm mt-1">
                {Object.entries(rubric).map(([criteria, description]) => (
                  <div key={criteria}>
                    <strong>{criteria}:</strong> {description}
                  </div>
                ))}
              </div>
              <p className="text-sm mt-2">{explanation}</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-primary"
                onClick={() =>
                  handleShowExplanation(
                    text,
                    `${sampleAnswer}\n\nKey Points:\n${keyPoints.join(
                      "\n"
                    )}\n\nRubric:\n${Object.entries(rubric)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join("\n")}\n\n${explanation}`
                  )
                }
              >
                <Brain className="mr-1 h-4 w-4" /> Explain Further
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

    const renderReferenceSection = () => (
      <div>
        <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">
              Reference Materials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MediaSlider items={mediaItems} className="mb-4" />
            <div className="space-y-4">
              <div className="p-3 rounded-lg border border-border/10 bg-background/80">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span>Key Resources</span>
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                    </div>
                    <span>Java Documentation: OOP Concepts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                    </div>
                    <span>Design Patterns in Java</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                    </div>
                    <span>SOLID Principles of OOP</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 rounded-lg border border-border/10 bg-background/80">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-amber-500" />
                  <span>Related Topics</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-muted/50">
                    Design Patterns
                  </Badge>
                  <Badge variant="outline" className="bg-muted/50">
                    SOLID Principles
                  </Badge>
                  <Badge variant="outline" className="bg-muted/50">
                    Interfaces
                  </Badge>
                  <Badge variant="outline" className="bg-muted/50">
                    Abstract Classes
                  </Badge>
                </div>
              </div>

              <Button variant="outline" className="w-full rounded-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Ask AI for More Help
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">Exam Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/10">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-amber-500">
                      Writing Tips
                    </h4>
                    <ul className="mt-1 space-y-1 text-xs">
                      <li>Structure your answer with clear headings</li>
                      <li>Include practical examples with code snippets</li>
                      <li>
                        Explain how concepts contribute to software quality
                      </li>
                      <li>Summarize collective benefits of principles</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-border/10 bg-background/80">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Time Management</span>
                </h4>
                <p className="text-xs text-muted-foreground">
                  Allocate 18-20 minutes for 10-mark questions, 8-10 minutes for
                  5-mark questions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );

  const renderProgressSection = () => (
    <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">My Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 p-4 rounded-lg bg-primary/10">
            <h4 className="font-medium">Completion</h4>
            <Progress value={completion} className="h-2 mt-2" />
            <p className="text-sm mt-1">
              {answeredQuestions.size}/{totalQuestions} questions
            </p>
          </div>
          <div className="flex-1 p-4 rounded-lg bg-green-500/10">
            <h4 className="font-medium">Accuracy</h4>
            <div className="text-2xl font-bold mt-2 text-green-500">
              {accuracy}%
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 rounded-lg border border-border/10">
            <h4 className="font-medium flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Strengths
            </h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {strengths.map((strength, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-green-500/10"
                >
                  {strength}
                </Badge>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border/10">
            <h4 className="font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Weaknesses
            </h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {weaknesses.map((weakness, index) => (
                <Badge key={index} variant="outline" className="bg-red-500/10">
                  {weakness}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container py-8 space-y-8">
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Exam Preparation
            </h1>
            <p className="text-muted-foreground">
              Practice with AI-generated questions and improve your exam
              performance.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="outline" className="rounded-full">
                Dashboard
              </Button>
            </Link>
            <Link href="/past-questions">
              <Button variant="outline" className="rounded-full">
                Past Questions
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {/* <div className="space-y-2">
              <Label>University</Label>
              <Select value={university} onValueChange={setUniversity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select university" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tribhuvan University">TU</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
            <div className="space-y-2">
              <Label>Course</Label>
              <Select
                value={selectedCourse}
                onValueChange={(value) => {
                  setSelectedCourse(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Select
                disabled={!selectedCourse}
                onValueChange={setSelectedSubject}
              >
                <SelectTrigger>
                  <SelectValue placeholder={"Select Subject"} />
                </SelectTrigger>
                <SelectContent>
                  {selectedCourseData?.subjects.map((subject: string) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Search Questions</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mt-6">
            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select
                value={difficulty}
                onValueChange={(value) => setDifficulty(value as Difficulty)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {["EASY", "MEDIUM", "HARD", "MIXED"].map((level) => (
                    <SelectItem key={level} value={level}>
                      {level.charAt(0) + level.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Questions: {numQuestions}</Label>
              <Slider
                min={5}
                max={50}
                step={5}
                value={[numQuestions]}
                onValueChange={(val) => setNumQuestions(val[0])}
              />
            </div>
            <div className="flex items-end">
              <Button
                className="w-full rounded-full"
                onClick={handleGenerateQuestions}
                disabled={isGenerating}
              >
                <Zap className="mr-2 h-4 w-4" />{" "}
                {isGenerating ? "Generating..." : "Generate Questions"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {generatedQuestions.length > 0 && (
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value as QuestionType);
            setCurrentQuestionIndex(0);
          }}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="rounded-full">
              <TabsTrigger value="MCQ" className="rounded-full">
                Multiple Choice
              </TabsTrigger>
              <TabsTrigger value="SHORT_ANSWER" className="rounded-full">
                Short Answer
              </TabsTrigger>
              <TabsTrigger value="LONG_ANSWER" className="rounded-full">
                Long Answer
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="MCQ">
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                  <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-bold">
                          Multiple Choice Question
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          {renderQuestionCounter()}
                          <Badge variant="outline">
                            {currentQuestionData?.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {currentQuestionData &&
                        renderMCQContent(currentQuestionData)}
                      <div className="flex gap-2 mt-6">
                        <Button
                          variant="outline"
                          className="flex-1 rounded-full"
                          onClick={handlePreviousQuestion}
                          disabled={currentQuestionIndex === 0}
                        >
                          Previous Question
                        </Button>
                        <Button
                          className="flex-1 rounded-full"
                          onClick={handleNextQuestion}
                          disabled={
                            currentQuestionIndex ===
                            filteredQuestions.length - 1
                          }
                        >
                          Next Question
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  {renderProgressSection()}
                </div>
                <div>{renderReferenceSection()}</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="SHORT_ANSWER">
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                  <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-bold">
                          Short Answer Question
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          {renderQuestionCounter()}
                          <Badge variant="outline">
                            {currentQuestionData?.difficulty}
                          </Badge>
                          <Badge variant="outline">5 Marks</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {currentQuestionData &&
                        renderShortAnswerContent(currentQuestionData)}
                      <div className="flex gap-2 mt-6">
                        <Button
                          variant="outline"
                          className="flex-1 rounded-full"
                          onClick={handlePreviousQuestion}
                          disabled={currentQuestionIndex === 0}
                        >
                          Previous Question
                        </Button>
                        <Button
                          className="flex-1 rounded-full"
                          onClick={handleNextQuestion}
                          disabled={
                            currentQuestionIndex ===
                            filteredQuestions.length - 1
                          }
                        >
                          Next Question
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  {renderProgressSection()}
                </div>
                <div>{renderReferenceSection()}</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="LONG_ANSWER">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl font-bold">
                        Long Answer Question
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        {renderQuestionCounter()}
                        <Badge variant="outline">
                          {currentQuestionData?.difficulty}
                        </Badge>
                        <Badge variant="outline">10 Marks</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {currentQuestionData &&
                      renderLongAnswerContent(currentQuestionData)}
                    <div className="flex gap-2 mt-6">
                      <Button
                        variant="outline"
                        className="flex-1 rounded-full"
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                      >
                        Previous Question
                      </Button>
                      <Button
                        className="flex-1 rounded-full"
                        onClick={handleNextQuestion}
                        disabled={
                          currentQuestionIndex === filteredQuestions.length - 1
                        }
                      >
                        Next Question
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                {renderProgressSection()}
              </div>
              <div>{renderReferenceSection()}</div>
            </div>
          </TabsContent>
        </Tabs>
      )}

      {showAIAssistant && currentQuestion && (
        <AIAssistant
          initialQuestion={currentQuestion.question}
          initialAnswer={currentQuestion.answer}
          onClose={() => setShowAIAssistant(false)}
        />
      )}
    </div>
  );
}
