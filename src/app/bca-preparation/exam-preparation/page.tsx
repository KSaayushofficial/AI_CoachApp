"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  Download,
  Search,
  Filter,
  ChevronDown,
  ArrowRight,
  Calendar,
  Lightbulb,
  GraduationCap,
  AlertTriangle,
  Star,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

type Question = {
  id: string;
  text: string;
  type: "MCQ" | "SHORT_ANSWER" | "LONG_ANSWER";
  subject: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
};

export default function BCAExamPrepPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const generateMockQuestions = (subject: string, count: number) => {
    const questions: Question[] = [];
    const questionTypes: ("MCQ" | "SHORT_ANSWER" | "LONG_ANSWER")[] = [
      "MCQ",
      "SHORT_ANSWER",
      "LONG_ANSWER",
    ];

    for (let i = 0; i < count; i++) {
      const type =
        questionTypes[Math.floor(Math.random() * questionTypes.length)];
      const baseQuestion = {
        id: `q-${subject}-${i}`,
        text: `Sample ${type} question about ${subject} (${i + 1})`,
        type,
        subject,
        difficulty: ["EASY", "MEDIUM", "HARD"][
          Math.floor(Math.random() * 3)
        ] as "EASY" | "MEDIUM" | "HARD",
      };

      if (type === "MCQ") {
        questions.push({
          ...baseQuestion,
          options: ["Option A", "Option B", "Option C", "Option D"],
          correctAnswer: ["Option A", "Option B", "Option C", "Option D"][
            Math.floor(Math.random() * 4)
          ],
          explanation: `This is the explanation for question ${i + 1}`,
        });
      } else {
        questions.push({
          ...baseQuestion,
          correctAnswer: `Sample answer for ${type} question`,
          explanation: `This is the explanation for ${type} question ${i + 1}`,
        });
      }
    }

    return questions;
  };

  const handleGenerateQuestions = (subject: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedQuestions(generateMockQuestions(subject, 5));
      setUserAnswers({});
      setIsGenerating(false);
    }, 1000);
  };

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const QuestionRenderer = ({ question }: { question: Question }) => {
    if (question.type === "MCQ") {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{question.text}</h3>
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border cursor-pointer ${
                  userAnswers[question.id] === option
                    ? "border-primary bg-primary/10"
                    : "border-border hover:bg-muted/50"
                }`}
                onClick={() => handleAnswerSelect(question.id, option)}
              >
                {option}
              </div>
            ))}
          </div>
          {userAnswers[question.id] && (
            <div className="p-4 rounded-lg bg-muted">
              <p className="font-medium">
                {userAnswers[question.id] === question.correctAnswer
                  ? "Correct!"
                  : "Incorrect"}
              </p>
              <p>{question.explanation}</p>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{question.text}</h3>
          <textarea
            className="w-full p-3 border rounded-lg min-h-[100px]"
            placeholder="Your answer..."
            value={userAnswers[question.id] || ""}
            onChange={(e) => handleAnswerSelect(question.id, e.target.value)}
          />
          {userAnswers[question.id] && (
            <div className="p-4 rounded-lg bg-muted">
              <p className="font-medium">Sample Answer:</p>
              <p>{question.correctAnswer}</p>
              <p className="mt-2 font-medium">Explanation:</p>
              <p>{question.explanation}</p>
            </div>
          )}
        </div>
      );
    }
  };

  const subjects = [
    {
      id: "programming",
      name: "Programming Fundamentals",
      description:
        "Core concepts of programming including variables, control structures, functions, and arrays.",
      exams: 3,
      resources: 12,
      icon: <FileText className="h-5 w-5" />,
      color: "#3B82F6",
    },
    {
      id: "data-structures",
      name: "Data Structures & Algorithms",
      description:
        "Study of data organization, management, and storage formats for efficient access and modification.",
      exams: 4,
      resources: 15,
      icon: <FileText className="h-5 w-5" />,
      color: "#10B981",
    },
    {
      id: "database",
      name: "Database Management",
      description:
        "Principles and techniques for designing, implementing, and managing database systems.",
      exams: 2,
      resources: 10,
      icon: <FileText className="h-5 w-5" />,
      color: "#F59E0B",
    },
    {
      id: "networking",
      name: "Computer Networks",
      description:
        "Study of how computers and other devices communicate and share resources.",
      exams: 3,
      resources: 8,
      icon: <FileText className="h-5 w-5" />,
      color: "#8B5CF6",
    },
    {
      id: "os",
      name: "Operating Systems",
      description:
        "Study of system software that manages computer hardware and software resources.",
      exams: 2,
      resources: 9,
      icon: <FileText className="h-5 w-5" />,
      color: "#EC4899",
    },
    {
      id: "software-engineering",
      name: "Software Engineering",
      description:
        "Application of engineering principles to software development in a systematic approach.",
      exams: 2,
      resources: 7,
      icon: <FileText className="h-5 w-5" />,
      color: "#6B7280",
    },
  ];

  const pastPapers = [
    {
      id: 1,
      subject: "Programming Fundamentals",
      year: "2022",
      semester: "Spring",
      difficulty: "Medium",
      questions: 50,
      duration: "3 hours",
      color: "#3B82F6",
    },
    {
      id: 2,
      subject: "Data Structures & Algorithms",
      year: "2022",
      semester: "Fall",
      difficulty: "Hard",
      questions: 40,
      duration: "3 hours",
      color: "#10B981",
    },
    {
      id: 3,
      subject: "Database Management",
      year: "2022",
      semester: "Spring",
      difficulty: "Medium",
      questions: 45,
      duration: "3 hours",
      color: "#F59E0B",
    },
    {
      id: 4,
      subject: "Computer Networks",
      year: "2021",
      semester: "Fall",
      difficulty: "Medium",
      questions: 50,
      duration: "3 hours",
      color: "#8B5CF6",
    },
    {
      id: 5,
      subject: "Operating Systems",
      year: "2021",
      semester: "Spring",
      difficulty: "Hard",
      questions: 40,
      duration: "3 hours",
      color: "#EC4899",
    },
    {
      id: 6,
      subject: "Software Engineering",
      year: "2021",
      semester: "Fall",
      difficulty: "Easy",
      questions: 60,
      duration: "3 hours",
      color: "#6B7280",
    },
  ];

  const importantTopics = [
    {
      id: 1,
      subject: "Programming Fundamentals",
      topics: [
        "Variables and Data Types",
        "Control Structures",
        "Functions and Methods",
        "Arrays and Collections",
        "Object-Oriented Programming Concepts",
      ],
      color: "#3B82F6",
    },
    {
      id: 2,
      subject: "Data Structures & Algorithms",
      topics: [
        "Time and Space Complexity",
        "Arrays and Linked Lists",
        "Stacks and Queues",
        "Trees and Graphs",
        "Sorting and Searching Algorithms",
      ],
      color: "#10B981",
    },
    {
      id: 3,
      subject: "Database Management",
      topics: [
        "ER Diagrams",
        "Normalization",
        "SQL Queries",
        "Transaction Management",
        "Database Security",
      ],
      color: "#F59E0B",
    },
  ];

  const filteredSubjects = subjects.filter((subject) => {
    if (activeFilter !== "all" && subject.id !== activeFilter) {
      return false;
    }
    if (searchQuery) {
      return (
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "medium":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "hard":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

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

  return (
    <div className="container py-10 md:py-16 space-y-12">
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]"></div>
        <PageHeader
          title="BCA Exam Preparation"
          description="Comprehensive resources to help you prepare for your BCA exams, including past papers, important topics, and study strategies."
          className="text-center max-w-3xl mx-auto mb-12"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="size-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Past Papers</h3>
            <p className="text-muted-foreground mb-4">
              Access previous years' exam papers to understand the format and
              types of questions.
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
              <span>16 papers available</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="size-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4">
              <Lightbulb className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Important Topics</h3>
            <p className="text-muted-foreground mb-4">
              Focus on key topics that are frequently tested in BCA exams.
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
              <span>Curated by top educators</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="size-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-4">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Mock Exams</h3>
            <p className="text-muted-foreground mb-4">
              Test your knowledge with simulated exams that mimic the real
              testing environment.
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1 text-amber-500" />
              <span>Timed practice sessions</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <h2 className="text-2xl font-bold">Exam Resources by Subject</h2>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search subjects..."
                className="pl-10 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full md:w-auto rounded-full"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setActiveFilter("all")}>
                  All Subjects
                </DropdownMenuItem>
                {subjects.map((subject) => (
                  <DropdownMenuItem
                    key={subject.id}
                    onClick={() => setActiveFilter(subject.id)}
                  >
                    {subject.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredSubjects.map((subject) => (
            <motion.div key={subject.id} variants={item}>
              <motion.div
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full overflow-hidden border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className="size-12 rounded-full"
                        style={{ backgroundColor: `${subject.color}20` }}
                      >
                        <div
                          className="w-full h-full flex items-center justify-center text-lg font-bold"
                          style={{ color: subject.color }}
                        >
                          {subject.name.charAt(0)}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        {subject.exams} Exams
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{subject.name}</h3>
                    <p className="text-muted-foreground mb-4 flex-grow">
                      {subject.description}
                    </p>
                    <div className="space-y-2 mt-auto">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Past Papers:
                        </span>
                        <span className="font-medium">{subject.exams}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Study Resources:
                        </span>
                        <span className="font-medium">{subject.resources}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button
                      className="w-full rounded-full"
                      style={{
                        backgroundColor: subject.color,
                        color: "white",
                        borderColor: "transparent",
                      }}
                      onClick={() => handleGenerateQuestions(subject.name)}
                      disabled={isGenerating}
                    >
                      {isGenerating ? "Generating..." : "Practice Questions"}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {generatedQuestions.length > 0 && (
          <div className="space-y-6 mt-8">
            <h2 className="text-2xl font-bold">Practice Questions</h2>
            <div className="space-y-4">
              {generatedQuestions.map((question) => (
                <Card
                  key={question.id}
                  className="border-border/10 bg-background/50 backdrop-blur-md shadow-md"
                >
                  <CardContent className="p-6">
                    <QuestionRenderer question={question} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <Tabs defaultValue="past-papers" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="rounded-full">
            <TabsTrigger value="past-papers" className="rounded-full">
              Past Papers
            </TabsTrigger>
            <TabsTrigger value="important-topics" className="rounded-full">
              Important Topics
            </TabsTrigger>
            <TabsTrigger value="exam-tips" className="rounded-full">
              Exam Tips
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="past-papers">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Past Examination Papers</h2>
              <Button variant="outline" className="rounded-full">
                <Calendar className="mr-2 h-4 w-4" />
                View All Years
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pastPapers.map((paper) => (
                <Card
                  key={paper.id}
                  className="border-border/10 bg-background/50 backdrop-blur-md shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="size-10 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: `${paper.color}20`,
                          color: paper.color,
                        }}
                      >
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold">{paper.subject}</h3>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="bg-muted/50 text-xs"
                          >
                            {paper.year}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="bg-muted/50 text-xs"
                          >
                            {paper.semester}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Difficulty:
                        </span>
                        <Badge
                          variant="outline"
                          className={getDifficultyColor(paper.difficulty)}
                        >
                          {paper.difficulty}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Questions:
                        </span>
                        <span>{paper.questions}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Duration:</span>
                        <span>{paper.duration}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 rounded-full">
                        Preview
                      </Button>
                      <Button className="flex-1 rounded-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="important-topics">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                Important Topics to Focus On
              </h2>
              <Button variant="outline" className="rounded-full">
                <Lightbulb className="mr-2 h-4 w-4" />
                Study Strategies
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {importantTopics.map((subject) => (
                <Card
                  key={subject.id}
                  className="border-border/10 bg-background/50 backdrop-blur-md shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="size-10 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: `${subject.color}20`,
                          color: subject.color,
                        }}
                      >
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <h3 className="font-bold">{subject.subject}</h3>
                    </div>
                    <div className="space-y-3 mb-4">
                      {subject.topics.map((topic, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="mt-0.5">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          </div>
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className="w-full rounded-full"
                      style={{ backgroundColor: subject.color, color: "white" }}
                    >
                      Study Materials
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Exam Weightage Analysis
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Based on analysis of past papers, these topics have the
                      highest probability of appearing in your exams. Focus your
                      study time on these areas for maximum efficiency.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Programming Concepts</span>
                          <span className="font-medium">35%</span>
                        </div>
                        <Progress value={35} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Data Structures</span>
                          <span className="font-medium">25%</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Database Management</span>
                          <span className="font-medium">20%</span>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Computer Networks</span>
                          <span className="font-medium">15%</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="exam-tips">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Exam Preparation Tips</h2>
              <Button variant="outline" className="rounded-full">
                <Download className="mr-2 h-4 w-4" />
                Download Study Plan
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Before the Exam</h3>
                  <Accordion type="single" collapsible className="w-full">
                    {[
                      {
                        title: "Create a Study Schedule",
                        content:
                          "Plan your study time effectively by creating a schedule that allocates sufficient time for each subject. Break down complex topics into smaller, manageable chunks and distribute them across your schedule.",
                      },
                      {
                        title: "Practice with Past Papers",
                        content:
                          "Familiarize yourself with the exam format and types of questions by practicing with past papers. Time yourself to simulate exam conditions and identify areas where you need more practice.",
                      },
                      {
                        title: "Form Study Groups",
                        content:
                          "Collaborate with peers to discuss difficult concepts and share knowledge. Teaching others is one of the most effective ways to reinforce your own understanding.",
                      },
                      {
                        title: "Take Care of Your Health",
                        content:
                          "Ensure you get adequate sleep, exercise, and nutrition in the weeks leading up to the exam. A healthy body supports a healthy mind and improves cognitive function.",
                      },
                    ].map((tip, index) => (
                      <AccordionItem
                        key={index}
                        value={`before-${index}`}
                        className="border-b border-border/10"
                      >
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-2">
                            <div className="size-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                              <span className="text-xs font-bold">
                                {index + 1}
                              </span>
                            </div>
                            <span>{tip.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-8 text-muted-foreground">
                          {tip.content}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">During the Exam</h3>
                  <Accordion type="single" collapsible className="w-full">
                    {[
                      {
                        title: "Read Instructions Carefully",
                        content:
                          "Take time to read all instructions thoroughly before starting. Pay attention to the marking scheme, time allocation, and any specific requirements for each question.",
                      },
                      {
                        title: "Manage Your Time",
                        content:
                          "Allocate time for each question based on its marks. If you're stuck on a difficult question, move on and come back to it later if time permits.",
                      },
                      {
                        title: "Answer Easy Questions First",
                        content:
                          "Start with questions you're confident about to build momentum and reduce anxiety. This strategy ensures you secure marks for questions you know well.",
                      },
                      {
                        title: "Review Your Answers",
                        content:
                          "If time allows, review your answers to catch any errors or omissions. Pay special attention to calculations, formulas, and key points in your responses.",
                      },
                    ].map((tip, index) => (
                      <AccordionItem
                        key={index}
                        value={`during-${index}`}
                        className="border-b border-border/10"
                      >
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-2">
                            <div className="size-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                              <span className="text-xs font-bold">
                                {index + 1}
                              </span>
                            </div>
                            <span>{tip.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-8 text-muted-foreground">
                          {tip.content}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">
                    Subject-Specific Strategies
                  </h3>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      subject: "Programming",
                      tips: [
                        "Practice coding by hand to prepare for written exams",
                        "Focus on algorithm logic rather than syntax perfection",
                        "Review common programming patterns and their applications",
                      ],
                      color: "#3B82F6",
                    },
                    {
                      subject: "Data Structures",
                      tips: [
                        "Visualize data structures to understand their operations",
                        "Practice tracing algorithms with different inputs",
                        "Compare time and space complexity of different approaches",
                      ],
                      color: "#10B981",
                    },
                    {
                      subject: "Database Management",
                      tips: [
                        "Practice drawing ER diagrams for different scenarios",
                        "Write and optimize SQL queries for various requirements",
                        "Understand normalization principles and their applications",
                      ],
                      color: "#F59E0B",
                    },
                  ].map((strategy, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-border/10 bg-background/80"
                    >
                      <h4
                        className="font-bold mb-3"
                        style={{ color: strategy.color }}
                      >
                        {strategy.subject}
                      </h4>
                      <ul className="space-y-2">
                        {strategy.tips.map((tip, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-muted/30 backdrop-blur-sm rounded-xl p-8 border border-border/10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Ready to Ace Your BCA Exams?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our comprehensive resources and structured approach will help you
              prepare effectively for your BCA exams. Start your preparation
              journey today!
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/bca-preparation" className="w-full">
                <Button variant="outline" className="w-full rounded-full">
                  Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button className="w-full rounded-full">
                Start Mock Exam
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="bg-background/50 backdrop-blur-md rounded-xl p-6 border border-border/10 shadow-md">
            <h3 className="text-lg font-bold mb-4">Upcoming Exam Dates</h3>
            <div className="space-y-4">
              {[
                {
                  subject: "Programming Fundamentals",
                  date: "2023-12-10",
                  time: "10:00 AM",
                  venue: "Hall A",
                },
                {
                  subject: "Data Structures & Algorithms",
                  date: "2023-12-15",
                  time: "2:00 PM",
                  venue: "Hall B",
                },
                {
                  subject: "Database Management",
                  date: "2023-12-20",
                  time: "10:00 AM",
                  venue: "Hall C",
                },
              ].map((exam, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-border/10 bg-background/80"
                >
                  <div>
                    <h4 className="font-medium">{exam.subject}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(exam.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      {" • "}
                      {exam.time}
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-muted/50">
                    {exam.venue}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border/10 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                View your complete exam schedule
              </span>
              <Button variant="outline" size="sm" className="rounded-full">
                <Calendar className="mr-2 h-4 w-4" />
                Calendar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
