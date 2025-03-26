"use client";

import { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  BarChart,
  Calendar,
  ArrowRight,
  Lightbulb,
  GraduationCap,
  Code,
  FileText,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function BCAPreparationPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const subjects = [
    {
      id: "programming",
      name: "Programming Fundamentals",
      progress: 75,
      topics: 12,
      completed: 9,
      icon: <Code className="h-5 w-5" />,
      color: "#3B82F6",
    },
    {
      id: "data-structures",
      name: "Data Structures & Algorithms",
      progress: 60,
      topics: 15,
      completed: 9,
      icon: <BarChart className="h-5 w-5" />,
      color: "#10B981",
    },
    {
      id: "database",
      name: "Database Management",
      progress: 45,
      topics: 10,
      completed: 4,
      icon: <FileText className="h-5 w-5" />,
      color: "#F59E0B",
    },
    {
      id: "networking",
      name: "Computer Networks",
      progress: 30,
      topics: 8,
      completed: 2,
      icon: <GraduationCap className="h-5 w-5" />,
      color: "#8B5CF6",
    },
  ];

  const upcomingExams = [
    {
      id: 1,
      name: "Programming Fundamentals Mid-Term",
      date: "2023-10-15T10:00:00Z",
      duration: "2 hours",
      topics: [
        "Variables & Data Types",
        "Control Structures",
        "Functions",
        "Arrays",
      ],
    },
    {
      id: 2,
      name: "Database Management Quiz",
      date: "2023-10-22T14:30:00Z",
      duration: "1 hour",
      topics: ["SQL Basics", "Normalization", "Entity-Relationship Diagrams"],
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
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
          title="BCA Preparation Dashboard"
          description="Track your progress, access study materials, and prepare for your Bachelor of Computer Application exams."
          className="text-center max-w-3xl mx-auto mb-12"
        />
      </div>

      <Tabs
        defaultValue="dashboard"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex justify-center mb-8">
          <TabsList className="rounded-full">
            <TabsTrigger value="dashboard" className="rounded-full">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="study-materials" className="rounded-full">
              Study Materials
            </TabsTrigger>
            <TabsTrigger value="practice-tests" className="rounded-full">
              Practice Tests
            </TabsTrigger>
            <TabsTrigger value="schedule" className="rounded-full">
              Schedule
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard">
          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-4">
              <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 pt-8">
                  <div className="size-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">4</h3>
                  <p className="text-muted-foreground">Subjects in Progress</p>
                </CardContent>
              </Card>

              <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 pt-8">
                  <div className="size-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-4">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">24</h3>
                  <p className="text-muted-foreground">Topics Completed</p>
                </CardContent>
              </Card>

              <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 pt-8">
                  <div className="size-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">42</h3>
                  <p className="text-muted-foreground">Study Hours</p>
                </CardContent>
              </Card>

              <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 pt-8">
                  <div className="size-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 mb-4">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">2</h3>
                  <p className="text-muted-foreground">Upcoming Exams</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold">Subject Progress</h2>
                <div className="space-y-6">
                  {subjects.map((subject) => (
                    <Card
                      key={subject.id}
                      className="border-border/10 bg-background/50 backdrop-blur-md shadow-md"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className="size-10 rounded-full flex items-center justify-center"
                            style={{
                              backgroundColor: `${subject.color}20`,
                              color: subject.color,
                            }}
                          >
                            {subject.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <h3 className="font-bold">{subject.name}</h3>
                              <span className="text-sm text-muted-foreground">
                                {subject.completed}/{subject.topics} topics
                              </span>
                            </div>
                            <div className="mt-2">
                              <Progress
                                value={subject.progress}
                                className="h-2"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button
                            variant="outline"
                            className="rounded-full text-sm"
                            size="sm"
                          >
                            Continue Learning
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Upcoming Exams</h2>
                <div className="space-y-4">
                  {upcomingExams.map((exam) => (
                    <Card
                      key={exam.id}
                      className="border-border/10 bg-background/50 backdrop-blur-md shadow-md"
                    >
                      <CardContent className="p-6">
                        <h3 className="font-bold mb-2">{exam.name}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(exam.date)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{exam.duration}</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <h4 className="text-xs font-medium text-muted-foreground mb-2">
                            Topics:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {exam.topics.map((topic, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-muted/50"
                              >
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-border/10 flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            {Math.ceil(
                              (new Date(exam.date).getTime() -
                                new Date().getTime()) /
                                (1000 * 60 * 60 * 24)
                            )}{" "}
                            days left
                          </span>
                          <Button
                            variant="outline"
                            className="rounded-full text-sm"
                            size="sm"
                          >
                            Prepare
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-muted/30 backdrop-blur-sm rounded-xl p-8 border border-border/10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Study Tips</h2>
                  <ul className="space-y-3">
                    <li className="flex gap-2">
                      <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Create a consistent study schedule</span>
                    </li>
                    <li className="flex gap-2">
                      <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Use active recall techniques instead of passive reading
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Take regular breaks using the Pomodoro technique
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Practice with past papers and sample questions
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Join study groups for collaborative learning</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Button
                      onClick={() => setActiveTab("study-materials")}
                      className="rounded-full"
                    >
                      Access Study Materials
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="bg-background/50 backdrop-blur-md rounded-xl p-6 border border-border/10 shadow-md">
                  <h3 className="text-lg font-bold mb-4">
                    Weekly Study Schedule
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-border/10">
                      <div className="flex items-center gap-2">
                        <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <span className="text-sm font-medium">M</span>
                        </div>
                        <span className="font-medium">Monday</span>
                      </div>
                      <span className="text-sm">
                        Programming Fundamentals (2h)
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-border/10">
                      <div className="flex items-center gap-2">
                        <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <span className="text-sm font-medium">T</span>
                        </div>
                        <span className="font-medium">Tuesday</span>
                      </div>
                      <span className="text-sm">Data Structures (2h)</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-border/10">
                      <div className="flex items-center gap-2">
                        <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <span className="text-sm font-medium">W</span>
                        </div>
                        <span className="font-medium">Wednesday</span>
                      </div>
                      <span className="text-sm">Database Management (2h)</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-border/10">
                      <div className="flex items-center gap-2">
                        <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <span className="text-sm font-medium">T</span>
                        </div>
                        <span className="font-medium">Thursday</span>
                      </div>
                      <span className="text-sm">Computer Networks (2h)</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-border/10">
                      <div className="flex items-center gap-2">
                        <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <span className="text-sm font-medium">F</span>
                        </div>
                        <span className="font-medium">Friday</span>
                      </div>
                      <span className="text-sm">Practice Problems (3h)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <span className="text-sm font-medium">S</span>
                        </div>
                        <span className="font-medium">Weekend</span>
                      </div>
                      <span className="text-sm">
                        Revision & Mock Tests (4h)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="study-materials">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Study Materials</h2>
              <Button variant="outline" className="rounded-full">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse All Resources
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {subjects.map((subject) => (
                <Card
                  key={subject.id}
                  className="border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-6 border-b border-border/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="size-10 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: `${subject.color}20`,
                          color: subject.color,
                        }}
                      >
                        {subject.icon}
                      </div>
                      <h3 className="font-bold">{subject.name}</h3>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Progress</span>
                      <span>{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                  <CardContent className="p-6">
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>Lecture Notes</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>Textbook References</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Code className="h-4 w-4 text-muted-foreground" />
                        <span>Practice Problems</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                        <span>Past Papers</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button
                      className="w-full rounded-full"
                      style={{
                        backgroundColor: subject.color,
                        color: "white",
                        borderColor: "transparent",
                      }}
                    >
                      View Materials
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">
                    Recommended Resources
                  </h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((resource) => (
                      <div
                        key={resource}
                        className="flex items-start gap-4 p-3 rounded-lg border border-border/10 bg-background/80"
                      >
                        <div className="size-12 rounded-lg bg-muted overflow-hidden">
                          <Image
                            src={`/placeholder.svg?height=48&width=48`}
                            alt={`Resource ${resource}`}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            Resource Title {resource}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Short description of the resource and its benefits
                            for BCA students.
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge
                              variant="outline"
                              className="text-xs bg-muted/50"
                            >
                              PDF
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              12 pages
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-auto rounded-full"
                        >
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Video Tutorials</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((video) => (
                      <div
                        key={video}
                        className="flex items-start gap-4 p-3 rounded-lg border border-border/10 bg-background/80"
                      >
                        <div className="size-12 aspect-video rounded-lg bg-muted overflow-hidden relative">
                          <Image
                            src={`/placeholder.svg?height=48&width=48`}
                            alt={`Video ${video}`}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className="size-6 rounded-full bg-white flex items-center justify-center">
                              <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-black ml-1"></div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium">
                            Video Tutorial {video}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Learn key concepts through this detailed video
                            explanation.
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-muted-foreground">
                              15:30 mins
                            </span>
                            <span className="text-xs text-muted-foreground">
                              •
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Beginner
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-auto rounded-full"
                        >
                          Watch
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="practice-tests">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Practice Tests</h2>
              <Button variant="outline" className="rounded-full">
                <BarChart className="mr-2 h-4 w-4" />
                View Test History
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {subjects.map((subject) => (
                <Card
                  key={subject.id}
                  className="border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300"
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
                        {subject.icon}
                      </div>
                      <h3 className="font-bold">{subject.name}</h3>
                    </div>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Quick Quiz
                        </span>
                        <span>10 questions • 15 mins</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Chapter Test
                        </span>
                        <span>25 questions • 45 mins</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Full Practice Exam
                        </span>
                        <span>50 questions • 90 mins</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        className="flex-1 rounded-full"
                        style={{
                          backgroundColor: subject.color,
                          color: "white",
                          borderColor: "transparent",
                        }}
                      >
                        Start Test
                      </Button>
                      <Button variant="outline" className="rounded-full">
                        Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-muted/30 backdrop-blur-sm rounded-xl p-8 border border-border/10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Test-Taking Strategies
                  </h2>
                  <ul className="space-y-3">
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Read each question carefully before answering</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Answer easy questions first to build confidence
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Eliminate obviously wrong answers in multiple choice
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Manage your time by allocating minutes per question
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Review your answers if time permits</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-background/50 backdrop-blur-md rounded-xl p-6 border border-border/10 shadow-md">
                  <h3 className="text-lg font-bold mb-4">
                    Your Test Performance
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Programming Fundamentals</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Data Structures & Algorithms</span>
                        <span className="font-medium">72%</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Database Management</span>
                        <span className="font-medium">68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Computer Networks</span>
                        <span className="font-medium">60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div className="pt-4 border-t border-border/10">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Overall Performance</span>
                        <span className="font-medium">71%</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <ArrowRight className="h-3 w-3" />
                        <span>15% improvement in the last month</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Study Schedule</h2>
              <Button variant="outline" className="rounded-full">
                <Calendar className="mr-2 h-4 w-4" />
                Customize Schedule
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-7">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day, index) => (
                <Card
                  key={day}
                  className="border-border/10 bg-background/50 backdrop-blur-md shadow-md"
                >
                  <div className="p-4 border-b border-border/10 text-center">
                    <h3 className="font-bold">{day}</h3>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {index < 5 ? (
                        <>
                          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 text-xs">
                            <div className="font-medium">9:00 - 11:00 AM</div>
                            <div>
                              {
                                [
                                  "Programming",
                                  "Data Structures",
                                  "Database",
                                  "Networks",
                                  "Revision",
                                ][index]
                              }
                            </div>
                          </div>
                          <div className="p-2 rounded-lg bg-green-500/10 text-green-500 text-xs">
                            <div className="font-medium">2:00 - 4:00 PM</div>
                            <div>Practice Problems</div>
                          </div>
                        </>
                      ) : (
                        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500 text-xs">
                          <div className="font-medium">10:00 AM - 2:00 PM</div>
                          <div>Mock Tests & Revision</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Upcoming Deadlines</h3>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Programming Assignment",
                        date: "2023-10-10",
                        subject: "Programming Fundamentals",
                      },
                      {
                        name: "Database Project",
                        date: "2023-10-18",
                        subject: "Database Management",
                      },
                      {
                        name: "Algorithm Analysis",
                        date: "2023-10-25",
                        subject: "Data Structures & Algorithms",
                      },
                    ].map((deadline, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border border-border/10 bg-background/80"
                      >
                        <div>
                          <h4 className="font-medium">{deadline.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {deadline.subject}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {new Date(deadline.date).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric" }
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {Math.ceil(
                              (new Date(deadline.date).getTime() -
                                new Date().getTime()) /
                                (1000 * 60 * 60 * 24)
                            )}{" "}
                            days left
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Study Groups</h3>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Programming Study Group",
                        members: 8,
                        nextMeeting: "2023-10-12T18:00:00Z",
                      },
                      {
                        name: "Database Discussion",
                        members: 6,
                        nextMeeting: "2023-10-14T16:30:00Z",
                      },
                      {
                        name: "Algorithms Practice",
                        members: 5,
                        nextMeeting: "2023-10-16T17:00:00Z",
                      },
                    ].map((group, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border border-border/10 bg-background/80"
                      >
                        <div>
                          <h4 className="font-medium">{group.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {group.members} members
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">Next Meeting</div>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(group.nextMeeting)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/10">
                    <Button className="w-full rounded-full">
                      Join or Create Study Group
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
