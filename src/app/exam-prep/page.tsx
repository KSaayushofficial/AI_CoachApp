"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  CheckCircle2,
  Clock,
  ThumbsDown,
  ThumbsUp,
  Zap,
  X,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import Link from "next/link";
import { generateAIQuestions } from "@/app/actions/generateQuestions";
import { Question, QuestionType, Difficulty } from "@prisma/client";

type MCQData = {
  options: string[];
  correctAnswer: string;
  explanation: string;
};

type ShortAnswerData = {
  sampleAnswer: string;
  keywords: string[];
  explanation: string;
};

type LongAnswerData = {
  sampleAnswer: string;
  keyPoints: string[];
  rubric: Record<string, string>;
  explanation: string;
};

type QuestionWithExtras = Question & {
  mcqData?: MCQData | null;
  shortAnswerData?: ShortAnswerData | null;
  longAnswerData?: LongAnswerData | null;
};

type ProgressMetrics = {
  completed: number;
  score: number;
  averageDifficulty: number;
  estimatedTime: number;
};

export default function ExamPrepPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<QuestionType>("MCQ");
  const [course, setCourse] = useState("");
  const [university, setUniversity] = useState("");
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("MEDIUM");
  const [numQuestions, setNumQuestions] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<
    QuestionWithExtras[]
  >([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userSelections, setUserSelections] = useState<Record<string, string>>(
    {}
  );
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});
  const [progressMetrics, setProgressMetrics] = useState<ProgressMetrics>({
    completed: 0,
    score: 0,
    averageDifficulty: 0,
    estimatedTime: 0,
  });

  useEffect(() => {
    const completed = currentQuestionIndex + 1;
    const score = generatedQuestions.reduce((acc, q) => {
      if (
        q.type === "MCQ" &&
        q.mcqData &&
        showAnswers[q.id] &&
        userSelections[q.id] === q.mcqData.correctAnswer
      ) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const difficulties = generatedQuestions.map((q) =>
      q.difficulty === "HARD" ? 3 : q.difficulty === "MEDIUM" ? 2 : 1
    );
    const averageDifficulty =
      difficulties.length > 0
        ? difficulties.reduce((a, b) => a + b, 0) / difficulties.length
        : 0;

    const timeEstimates = generatedQuestions.map((q) => {
      if (q.type === "MCQ") return 2;
      if (q.type === "SHORT_ANSWER") return 5;
      return 10;
    });
    const estimatedTime = timeEstimates.reduce((a, b) => a + b, 0);

    setProgressMetrics({
      completed,
      score,
      averageDifficulty,
      estimatedTime,
    });
  }, [currentQuestionIndex, generatedQuestions, userSelections, showAnswers]);

  const handleGenerateQuestions = async () => {
    if (!course || !subject || !university) {
      toast({
        title: "Missing information",
        description: "Please select course, university, and subject",
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
        type: activeTab,
      });

      setGeneratedQuestions(
          questions.map((q) => ({
              ...q,
              mcqData: q.mcqData
                  ? {
                      ...q.mcqData,
                      options: Array.isArray(q.mcqData.options)
                          ? q.mcqData.options.filter((option): option is string => typeof option === "string")
                          : [],
                  }
                  : null,
              longAnswerData: q.longAnswerData
                  ? {
                      ...q.longAnswerData,
                      rubric: typeof q.longAnswerData.rubric === "object" && q.longAnswerData.rubric !== null
                          ? (q.longAnswerData.rubric as Record<string, string>)
                          : {},
                      explanation: q.longAnswerData.explanation ?? "", // Ensure explanation is always a string
                  }
                  : null,
          }))
      );
      setCurrentQuestionIndex(0);
      toast({
        title: "Questions generated",
        description: `${questions.length} ${activeTab} questions created`,
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const renderQuestionContent = (question: QuestionWithExtras) => {
    switch (question.type) {
      case "MCQ":
        return (
          <div className="space-y-6">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="font-medium">{question.text}</p>
            </div>
            <RadioGroup
              value={userSelections[question.id] || ""}
              onValueChange={(value) =>
                setUserSelections((prev) => ({ ...prev, [question.id]: value }))
              }
            >
              {question.mcqData?.options.map((option, i) => (
                <div
                  key={i}
                  className={`flex items-center p-3 rounded-lg border 
                    ${
                      showAnswers[question.id]
                        ? option === question.mcqData?.correctAnswer
                          ? "border-green-500 bg-green-500/10"
                          : userSelections[question.id] === option
                          ? "border-red-500 bg-red-500/10"
                          : "border-border/10"
                        : "border-border/10"
                    }`}
                >
                  <RadioGroupItem value={option} id={`${question.id}-${i}`} />
                  <Label
                    htmlFor={`${question.id}-${i}`}
                    className="flex-1 ml-2"
                  >
                    {option}
                  </Label>
                  {showAnswers[question.id] &&
                    option === question.mcqData?.correctAnswer && (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                </div>
              ))}
            </RadioGroup>
            {showAnswers[question.id] && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-500">Explanation</h4>
                    <p className="text-sm mt-1">
                      {question.mcqData?.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {!showAnswers[question.id] && userSelections[question.id] && (
              <Button
                onClick={() =>
                  setShowAnswers((prev) => ({ ...prev, [question.id]: true }))
                }
              >
                Check Answer
              </Button>
            )}
          </div>
        );

      case "SHORT_ANSWER":
        return (
          <div className="space-y-6">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="font-medium">{question.text}</p>
            </div>
            {showAnswers[question.id] ? (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-500">Model Answer</h4>
                    <p className="text-sm mt-1 whitespace-pre-line">
                      {question.shortAnswerData?.sampleAnswer}
                    </p>
                    <div className="mt-3">
                      <h5 className="text-sm font-medium">Key Keywords:</h5>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {question.shortAnswerData?.keywords.map((kw, i) => (
                          <Badge key={i} variant="outline">
                            {kw}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Button
                onClick={() =>
                  setShowAnswers((prev) => ({ ...prev, [question.id]: true }))
                }
              >
                Reveal Answer
              </Button>
            )}
          </div>
        );

      case "LONG_ANSWER":
        return (
          <div className="space-y-6">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="font-medium">{question.text}</p>
            </div>
            {showAnswers[question.id] && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-green-500">
                        Model Answer
                      </h4>
                      <p className="text-sm mt-1 whitespace-pre-line">
                        {question.longAnswerData?.sampleAnswer}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Key Points</h4>
                      <ul className="list-disc pl-5 text-sm space-y-2">
                        {question.longAnswerData?.keyPoints.map((kp, i) => (
                          <li key={i}>{kp}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium">Grading Rubric</h4>
                      <div className="text-sm space-y-2">
                        {question.longAnswerData?.rubric &&
                          Object.entries(question.longAnswerData.rubric).map(
                            ([criteria, desc]) => (
                              <div key={criteria}>
                                <strong>{criteria}:</strong> {desc}
                              </div>
                            )
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <Button
              onClick={() =>
                setShowAnswers((prev) => ({ ...prev, [question.id]: true }))
              }
            >
              {showAnswers[question.id] ? "Hide Answer" : "View Model Answer"}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Exam Preparation</h1>
          <p className="text-muted-foreground">
            Generate practice questions for Nepali university courses
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
          <Link href="/past-questions">
            <Button variant="outline">Past Papers</Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Course</Label>
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {["BCA", "BSc.CSIT", "BIM", "BIT", "BE Computer", "MCA"].map(
                    (c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>University</Label>
              <Select value={university} onValueChange={setUniversity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select university" />
                </SelectTrigger>
                <SelectContent>
                  {["Tribhuvan", "Pokhara", "Kathmandu", "Purbanchal"].map(
                    (u) => (
                      <SelectItem key={u} value={u}>
                        {u} University
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Subject</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "OOP",
                    "Data Structures",
                    "Database Systems",
                    "Web Technology",
                  ].map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select
                value={difficulty}
                onValueChange={(v: string) => setDifficulty(v as Difficulty)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {["EASY", "MEDIUM", "HARD", "MIXED"].map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Questions: {numQuestions}</Label>
              <Slider
                min={5}
                max={50}
                step={5}
                value={[numQuestions]}
                onValueChange={([v]) => setNumQuestions(v)}
              />
            </div>

            <div className="flex items-end">
              <Button
                className="w-full"
                onClick={handleGenerateQuestions}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Generate Questions
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {generatedQuestions.length > 0 && (
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as QuestionType)}
        >
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="MCQ">Multiple Choice</TabsTrigger>
              <TabsTrigger value="SHORT_ANSWER">Short Answer</TabsTrigger>
              <TabsTrigger value="LONG_ANSWER">Long Answer</TabsTrigger>
            </TabsList>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                  <Badge variant="secondary">
                    Question {currentQuestionIndex + 1} of{" "}
                    {generatedQuestions.length}
                  </Badge>
                  <Badge variant="secondary">
                    {generatedQuestions[currentQuestionIndex]?.difficulty}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    disabled={currentQuestionIndex === 0}
                    onClick={() =>
                      setCurrentQuestionIndex((i) => Math.max(0, i - 1))
                    }
                  >
                    Previous
                  </Button>
                  <Button
                    disabled={
                      currentQuestionIndex === generatedQuestions.length - 1
                    }
                    onClick={() =>
                      setCurrentQuestionIndex((i) =>
                        Math.min(generatedQuestions.length - 1, i + 1)
                      )
                    }
                  >
                    Next
                  </Button>
                </div>
              </div>

              {renderQuestionContent(generatedQuestions[currentQuestionIndex]!)}

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Progress Overview</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4" />
                      Completed
                    </div>
                    <div className="text-2xl font-bold">
                      {progressMetrics.completed}/{generatedQuestions.length}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm">
                      <Zap className="h-4 w-4" />
                      Score
                    </div>
                    <div className="text-2xl font-bold">
                      {progressMetrics.score}/{generatedQuestions.length}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4" />
                      Difficulty
                    </div>
                    <div className="text-2xl font-bold">
                      {progressMetrics.averageDifficulty.toFixed(1)}/3
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4" />
                      Est. Time
                    </div>
                    <div className="text-2xl font-bold">
                      {progressMetrics.estimatedTime}m
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </Tabs>
      )}
    </div>
  );
}
