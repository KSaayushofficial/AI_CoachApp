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
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { generateAIQuestions } from "@/app/actions/generateQuestions"; // Adjust import path
import { QuestionType, Difficulty } from "@prisma/client";

export default function ExamPrepPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<
    "mcq" | "short-answer" | "long-answer"
  >("mcq");
  const [course, setCourse] = useState("");
  const [university, setUniversity] = useState("");
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("MEDIUM");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [numQuestions, setNumQuestions] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showPastQuestions, setShowPastQuestions] = useState(false);

  const handleGenerateQuestions = async () => {
    // Validate inputs
    if (!course || !subject || !university) {
      toast({
        title: "Missing information",
        description:
          "Please select a course, subject, and university before generating questions.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Map tab to QuestionType
      const questionTypeMap: Record<typeof activeTab, QuestionType> = {
        mcq: "MCQ",
        "short-answer": "SHORT_ANSWER",
        "long-answer": "LONG_ANSWER",
      };

      // Generate questions using AI
      const questions = await generateAIQuestions({
        course,
        university,
        subject,
        difficulty,
        numQuestions,
        type: questionTypeMap[activeTab],
      });

      setGeneratedQuestions(questions);
      setCurrentQuestionIndex(0);
      setCurrentQuestion(questions[0]);

      toast({
        title: "Questions Generated",
        description: `${numQuestions} ${difficulty} ${activeTab} questions for ${subject} have been generated.`,
      });
    } catch (error) {
      console.error("Error generating questions:", error);
      toast({
        title: "Error",
        description: "Failed to generate questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < generatedQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setCurrentQuestion(generatedQuestions[currentQuestionIndex + 1]);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setCurrentQuestion(generatedQuestions[currentQuestionIndex - 1]);
    }
  };

  const handleFilterChange = (filters: any) => {
    // Handle filter changes
    console.log(filters);
  };

  const renderQuestionContent = () => {
    if (!currentQuestion) return null;

    switch (activeTab) {
      case "mcq":
        return renderMCQQuestion();
      case "short-answer":
        return renderShortAnswerQuestion();
      case "long-answer":
        return renderLongAnswerQuestion();
      default:
        return null;
    }
  };

  const renderMCQQuestion = () => {
    const mcqData = currentQuestion.mcqData;
    if (!mcqData) return null;

    return (
      <div className="space-y-6">
        <div className="p-4 rounded-lg border border-border/10 bg-background/80">
          <p className="font-medium">{currentQuestion.text}</p>
        </div>

        <RadioGroup defaultValue="" className="space-y-3">
          {mcqData.options.map((option: string, index: number) => (
            <div
              key={index}
              className="flex items-center space-x-2 p-3 rounded-lg border"
            >
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label
                htmlFor={`option-${index}`}
                className="flex-1 cursor-pointer"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/10">
          <div className="flex items-start gap-2">
            <div className="mt-0.5">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h4 className="font-medium text-green-500">Correct Answer</h4>
              <p className="text-sm mt-1">{mcqData.correctAnswer}</p>
              <p className="text-sm mt-2">{mcqData.explanation}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderShortAnswerQuestion = () => {
    const shortAnswerData = currentQuestion.shortAnswerData;
    if (!shortAnswerData) return null;

    return (
      <div className="space-y-6">
        <div className="p-4 rounded-lg border border-border/10 bg-background/80">
          <p className="font-medium">{currentQuestion.text}</p>
        </div>

        <div className="p-4 rounded-lg border border-blue-500/20 bg-blue-500/10">
          <h4 className="font-medium text-blue-500">Sample Answer</h4>
          <p className="text-sm mt-1">{shortAnswerData.sampleAnswer}</p>

          <h4 className="font-medium text-blue-500 mt-4">Key Keywords</h4>
          <ul className="list-disc list-inside text-sm">
            {shortAnswerData.keywords.map((keyword: string, index: number) => (
              <li key={index}>{keyword}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/10">
          <h4 className="font-medium text-green-500">Explanation</h4>
          <p className="text-sm mt-1">{shortAnswerData.explanation}</p>
        </div>
      </div>
    );
  };

  const renderLongAnswerQuestion = () => {
    const longAnswerData = currentQuestion.longAnswerData;
    if (!longAnswerData) return null;

    return (
      <div className="space-y-6">
        <div className="p-4 rounded-lg border border-border/10 bg-background/80">
          <p className="font-medium">{currentQuestion.text}</p>
        </div>

        <div className="p-4 rounded-lg border border-blue-500/20 bg-blue-500/10">
          <h4 className="font-medium text-blue-500">Key Points to Address</h4>
          <ul className="list-disc list-inside text-sm">
            {longAnswerData.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/10">
          <h4 className="font-medium text-green-500">
            Sample Answer Structure
          </h4>
          <p className="text-sm mt-1">{longAnswerData.sampleAnswer}</p>
        </div>
      </div>
    );
  };

  const pastPapers = [
    {
      id: 1,
      title: "Data Structures",
      university: "Tribhuvan University",
      year: "2079",
      semester: "First",
      questions: 10,
      duration: "3 hours",
      downloads: 1245,
      color: "#3b82f6",
    },
    {
      id: 2,
      title: "Database Systems",
      university: "Pokhara University",
      year: "2078",
      semester: "Second",
      questions: 8,
      duration: "3 hours",
      downloads: 987,
      color: "#10b981",
    },
    {
      id: 3,
      title: "Computer Networks",
      university: "Kathmandu University",
      year: "2080",
      semester: "First",
      questions: 12,
      duration: "4 hours",
      downloads: 1567,
      color: "#8b5cf6",
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
                  <SelectItem value="bca">BCA</SelectItem>
                  <SelectItem value="bsccsit">BSc.CSIT</SelectItem>
                  <SelectItem value="bim">BIM</SelectItem>
                  <SelectItem value="bit">BIT</SelectItem>
                  <SelectItem value="be-computer">BE Computer</SelectItem>
                  <SelectItem value="mca">MCA</SelectItem>
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
                  <SelectItem value="tu">Tribhuvan University (TU)</SelectItem>
                  <SelectItem value="pu">Pokhara University (PU)</SelectItem>
                  <SelectItem value="ku">Kathmandu University (KU)</SelectItem>
                  <SelectItem value="purbanchal">
                    Purbanchal University
                  </SelectItem>
                  <SelectItem value="mwu">Mid-Western University</SelectItem>
                  <SelectItem value="fwu">Far-Western University</SelectItem>
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
                  <SelectItem value="oop-java">OOP in Java</SelectItem>
                  <SelectItem value="data-structures">
                    Data Structures
                  </SelectItem>
                  <SelectItem value="database">Database Systems</SelectItem>
                  <SelectItem value="networks">Computer Networks</SelectItem>
                  <SelectItem value="web-tech">Web Technology</SelectItem>
                  <SelectItem value="os">Operating Systems</SelectItem>
                  <SelectItem value="software-engineering">
                    Software Engineering
                  </SelectItem>
                  <SelectItem value="ai">Artificial Intelligence</SelectItem>
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
              <Select value={difficulty} onValueChange={(value) => setDifficulty(value as Difficulty)}>
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

      <Tabs
        defaultValue="mcq"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as typeof activeTab)}
        className="w-full"
      >
        <div className="flex justify-center mb-8">
          <TabsList className="rounded-full">
            <TabsTrigger value="mcq" className="rounded-full">
              Multiple Choice
            </TabsTrigger>
            <TabsTrigger value="short-answer" className="rounded-full">
              Short Answer
            </TabsTrigger>
            <TabsTrigger value="long-answer" className="rounded-full">
              Long Answer
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="mcq">
          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold">
                  {activeTab.replace("-", " ").toUpperCase()} Question
                </CardTitle>
                {generatedQuestions.length > 0 && (
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    Question {currentQuestionIndex + 1}/
                    {generatedQuestions.length}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {currentQuestion ? (
                <>
                  {renderQuestionContent()}
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
                        currentQuestionIndex === generatedQuestions.length - 1
                      }
                    >
                      Next Question
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    No questions generated yet. Click "Generate Questions" to
                    start.
                  </p>
                  <Button
                    className="rounded-full"
                    onClick={handleGenerateQuestions}
                    disabled={isGenerating}
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    {isGenerating ? "Generating..." : "Generate Questions"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="short-answer">
          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold">
                  {activeTab.replace("-", " ").toUpperCase()} Question
                </CardTitle>
                {generatedQuestions.length > 0 && (
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    Question {currentQuestionIndex + 1}/
                    {generatedQuestions.length}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {currentQuestion ? (
                <>
                  {renderQuestionContent()}
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
                        currentQuestionIndex === generatedQuestions.length - 1
                      }
                    >
                      Next Question
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    No questions generated yet. Click "Generate Questions" to
                    start.
                  </p>
                  <Button
                    className="rounded-full"
                    onClick={handleGenerateQuestions}
                    disabled={isGenerating}
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    {isGenerating ? "Generating..." : "Generate Questions"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="long-answer">
          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold">
                  {activeTab.replace("-", " ").toUpperCase()} Question
                </CardTitle>
                {generatedQuestions.length > 0 && (
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    Question {currentQuestionIndex + 1}/
                    {generatedQuestions.length}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {currentQuestion ? (
                <>
                  {renderQuestionContent()}
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
                        currentQuestionIndex === generatedQuestions.length - 1
                      }
                    >
                      Next Question
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    No questions generated yet. Click "Generate Questions" to
                    start.
                  </p>
                  <Button
                    className="rounded-full"
                    onClick={handleGenerateQuestions}
                    disabled={isGenerating}
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    {isGenerating ? "Generating..." : "Generate Questions"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showAIAssistant && currentQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">AI Assistant</h3>
              <button onClick={() => setShowAIAssistant(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Question</h4>
                <p>{currentQuestion.text}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">AI Feedback</h4>
                <p>This would be where the AI feedback appears...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function QuestionFilter({
  onFilterChange,
}: {
  onFilterChange: (filters: any) => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">Filters:</span>
      {/* Filter components would go here */}
    </div>
  );
}
