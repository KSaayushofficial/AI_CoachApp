"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

export default function ExamPrepPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<QuestionType>("MCQ");
  const [course, setCourse] = useState("");
  const [university, setUniversity] = useState("");
  const [subject, setSubject] = useState("");
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
  const [generatedQuestions, setGeneratedQuestions] = useState<
    QuestionWithExtras[]
  >([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userSelections, setUserSelections] = useState<Record<string, string>>(
    {}
  );
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});

  const handleFilterChange = (filters: {
    difficulty: string;
    popularity: string;
    relevance: string;
  }) => {
    setActiveFilters(filters);
    toast({
      title: "Filters applied",
      description: "Questions have been filtered based on your criteria.",
    });
  };

  const handleShowExplanation = (question: string, answer: string) => {
    setCurrentQuestion({ question, answer });
    setShowAIAssistant(true);
  };

  const handleGenerateQuestions = async () => {
    if (!course || !subject || !university) {
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

    try {
      const questions = await generateAIQuestions({
        course,
        university,
        subject,
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
        description: `${questions.length} questions for ${subject} have been generated.`,
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

  const mediaItems = [
    {
      type: "video" as const,
      title: "Understanding Object-Oriented Programming",
      src: "https://www.youtube.com/embed/PFmuCDHHpwk",
      thumbnail: "/placeholder.svg?height=200&width=320",
    },
    {
      type: "image" as const,
      title: "Java Class Hierarchy Diagram",
      src: "/placeholder.svg?height=200&width=320",
    },
    {
      type: "video" as const,
      title: "Inheritance vs Polymorphism",
      src: "https://www.youtube.com/embed/0xw06loTm1k",
      thumbnail: "/placeholder.svg?height=200&width=320",
    },
    {
      type: "image" as const,
      title: "Method Overriding Example",
      src: "/placeholder.svg?height=200&width=320",
    },
  ];

  const pastPapers = [
    {
      id: 1,
      title: "BCA 3rd Semester - Object-Oriented Programming",
      university: "Tribhuvan University",
      year: "2022",
      semester: "Spring",
      questions: 7,
      duration: "3 hours",
      downloads: 1245,
      color: "#3B82F6",
    },
    {
      id: 2,
      title: "BSc.CSIT 4th Semester - Database Management Systems",
      university: "Tribhuvan University",
      year: "2022",
      semester: "Fall",
      questions: 8,
      duration: "3 hours",
      downloads: 987,
      color: "#10B981",
    },
    {
      id: 3,
      title: "BIM 3rd Semester - Web Technology",
      university: "Pokhara University",
      year: "2022",
      semester: "Spring",
      questions: 6,
      duration: "3 hours",
      downloads: 756,
      color: "#F59E0B",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const renderMCQContent = (question: QuestionWithExtras) => {
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
              if (isCorrect) {
                borderColor = "border-green-500";
                bgColor = "bg-green-500/10";
              } else if (isSelected) {
                borderColor = "border-red-500";
                bgColor = "bg-red-500/10";
              }
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
            onClick={() => setShowAnswers((prev) => ({ ...prev, [id]: true }))}
          >
            Check Answer
          </Button>
        )}
      </div>
    );
  };

  const renderShortAnswerContent = (question: QuestionWithExtras) => {
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
    <div className="space-y-6">
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
                    <li>Explain how concepts contribute to software quality</li>
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

  return (
    <div className="container py-8 space-y-8">
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Exam Preparation
            </h1>
            <p className="text-muted-foreground">
              Practice with AI-generated questions for Nepali university courses
              and get instant feedback to improve your exam performance.
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
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">
            Question Generator Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger id="course" className="rounded-md">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BCA">BCA</SelectItem>
                  <SelectItem value="BSc.CSIT">BSc.CSIT</SelectItem>
                  <SelectItem value="BIM">BIM</SelectItem>
                  <SelectItem value="BIT">BIT</SelectItem>
                  <SelectItem value="BE Computer">BE Computer</SelectItem>
                  <SelectItem value="MCA">MCA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="university">University</Label>
              <Select value={university} onValueChange={setUniversity}>
                <SelectTrigger id="university" className="rounded-md">
                  <SelectValue placeholder="Select university" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tribhuvan University">
                    Tribhuvan University (TU)
                  </SelectItem>
                  <SelectItem value="Pokhara University">
                    Pokhara University (PU)
                  </SelectItem>
                  <SelectItem value="Kathmandu University">
                    Kathmandu University (KU)
                  </SelectItem>
                  <SelectItem value="Purbanchal University">
                    Purbanchal University
                  </SelectItem>
                  <SelectItem value="Mid-Western University">
                    Mid-Western University
                  </SelectItem>
                  <SelectItem value="Far-Western University">
                    Far-Western University
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger id="subject" className="rounded-md">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Object-Oriented Programming">
                    OOP in Java
                  </SelectItem>
                  <SelectItem value="Data Structures">
                    Data Structures
                  </SelectItem>
                  <SelectItem value="Database Systems">
                    Database Systems
                  </SelectItem>
                  <SelectItem value="Computer Networks">
                    Computer Networks
                  </SelectItem>
                  <SelectItem value="Web Technology">Web Technology</SelectItem>
                  <SelectItem value="Operating Systems">
                    Operating Systems
                  </SelectItem>
                  <SelectItem value="Software Engineering">
                    Software Engineering
                  </SelectItem>
                  <SelectItem value="Artificial Intelligence">
                    Artificial Intelligence
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="search">Search Questions</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="search"
                  placeholder="Search by keyword or topic..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mt-6">
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select
                value={difficulty}
                onValueChange={(value) => setDifficulty(value as Difficulty)}
              >
                <SelectTrigger id="difficulty" className="rounded-md">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EASY">Easy</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HARD">Hard</SelectItem>
                  <SelectItem value="MIXED">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="num-questions">
                Number of Questions ({numQuestions})
              </Label>
              <Slider
                id="num-questions"
                min={5}
                max={50}
                step={5}
                value={[numQuestions]}
                onValueChange={(value) => setNumQuestions(value[0])}
                className="py-2"
              />
            </div>

            <div className="flex items-end">
              <Button
                className="w-full rounded-full"
                onClick={handleGenerateQuestions}
                disabled={isGenerating}
              >
                <Zap className="mr-2 h-4 w-4" />
                {isGenerating ? "Generating..." : "Generate Questions"}
              </Button>
            </div>
          </div>

          <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <QuestionFilter onFilterChange={handleFilterChange} />
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="past-questions"
                  checked={showPastQuestions}
                  onCheckedChange={setShowPastQuestions}
                />
                <Label htmlFor="past-questions">Show Past Questions</Label>
              </div>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => setShowPastQuestions(!showPastQuestions)}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Past Papers
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showPastQuestions && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Recent Exam Papers</h2>
            <Link href="/past-questions">
              <Button variant="outline" className="rounded-full">
                View All Papers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-3"
          >
            {pastPapers.map((paper) => (
              <motion.div key={paper.id} variants={item}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-full overflow-hidden border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div
                          className="size-12 rounded-full"
                          style={{ backgroundColor: `${paper.color}20` }}
                        >
                          <div
                            className="w-full h-full flex items-center justify-center text-lg font-bold"
                            style={{ color: paper.color }}
                          >
                            {paper.title.charAt(0)}
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-primary/10 text-primary border-primary/20"
                        >
                          {paper.year} {paper.semester}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{paper.title}</h3>
                      <p className="text-muted-foreground mb-4 flex-grow">
                        {paper.university}
                      </p>
                      <div className="space-y-2 mt-auto">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Questions:
                          </span>
                          <span className="font-medium">{paper.questions}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Duration:
                          </span>
                          <span className="font-medium">{paper.duration}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Downloads:
                          </span>
                          <span className="font-medium">{paper.downloads}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0 flex gap-2">
                      <Button variant="outline" className="flex-1 rounded-full">
                        Preview
                      </Button>
                      <Button className="flex-1 rounded-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}

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
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl font-bold">
                        Multiple Choice Question
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-primary/10 text-primary border-primary/20"
                        >
                          Question {currentQuestionIndex + 1}/
                          {filteredQuestions.length}
                        </Badge>
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
                          currentQuestionIndex === filteredQuestions.length - 1
                        }
                      >
                        Next Question
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Helpful
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <ThumbsDown className="mr-2 h-4 w-4" />
                    Not Helpful
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full ml-auto"
                  >
                    Report Issue
                  </Button>
                </div>
              </div>
              {renderReferenceSection()}
            </div>
          </TabsContent>

          <TabsContent value="SHORT_ANSWER">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl font-bold">
                        Short Answer Question
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-primary/10 text-primary border-primary/20"
                        >
                          Question {currentQuestionIndex + 1}/
                          {filteredQuestions.length}
                        </Badge>
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
                          currentQuestionIndex === filteredQuestions.length - 1
                        }
                      >
                        Next Question
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Helpful
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <ThumbsDown className="mr-2 h-4 w-4" />
                    Not Helpful
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full ml-auto"
                  >
                    Report Issue
                  </Button>
                </div>
              </div>
              {renderReferenceSection()}
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
                        <Badge
                          variant="outline"
                          className="bg-primary/10 text-primary border-primary/20"
                        >
                          Question {currentQuestionIndex + 1}/
                          {filteredQuestions.length}
                        </Badge>
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
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Helpful
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <ThumbsDown className="mr-2 h-4 w-4" />
                    Not Helpful
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full ml-auto"
                  >
                    Report Issue
                  </Button>
                </div>
              </div>
              {renderReferenceSection()}
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
