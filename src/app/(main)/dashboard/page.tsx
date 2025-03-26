"use client";

import { Input } from "@/components/ui/input";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  BarChart,
  Clock,
  Bookmark,
  Settings,
  Sparkles,
  FileText,
  ArrowUpRight,
  Brain,
  Zap,
  Filter,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BarChart as BarChartComponent,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as PieChartComponent,
  Pie,
  Cell,
} from "recharts";
import Link from "next/link";
import { getUserOnboardingStatus } from "../../actions/user";
import { redirect } from "next/navigation";

export const DashBoard = async () => {
  const { isOnboarded } = await getUserOnboardingStatus();
  if (!isOnboarded) {
    redirect("/onboarding");
  }

  const [activeTab, setActiveTab] = useState("overview");
  const [showPastAttempts, setShowPastAttempts] = useState(false);

  const subjectPerformanceData = [
    { name: "OOP in Java", score: 85 },
    { name: "Data Structures", score: 72 },
    { name: "Database Systems", score: 78 },
    { name: "Web Technology", score: 65 },
    { name: "Computer Networks", score: 58 },
  ];

  const questionTypeData = [
    { name: "MCQs", value: 65, color: "#3B82F6" },
    { name: "Short Answers", value: 25, color: "#10B981" },
    { name: "Long Answers", value: 10, color: "#F59E0B" },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "practice",
      subject: "OOP in Java",
      details: "Completed 25 MCQs",
      score: "85%",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "bookmark",
      subject: "Data Structures",
      details: "Saved 5 important questions",
      time: "Yesterday",
    },
    {
      id: 3,
      type: "practice",
      subject: "Database Systems",
      details: "Completed 10 short answer questions",
      score: "78%",
      time: "2 days ago",
    },
  ];

  const upcomingExams = [
    {
      id: 1,
      subject: "OOP in Java",
      date: "2023-12-15",
      timeRemaining: "15 days",
      preparedness: 85,
    },
    {
      id: 2,
      subject: "Data Structures",
      date: "2023-12-20",
      timeRemaining: "20 days",
      preparedness: 72,
    },
    {
      id: 3,
      subject: "Database Systems",
      date: "2023-12-25",
      timeRemaining: "25 days",
      preparedness: 65,
    },
  ];

  const weakAreas = [
    {
      id: 1,
      subject: "Computer Networks",
      topic: "OSI Model",
      accuracy: 45,
      recommendation: "Review the 7 layers and their functions",
    },
    {
      id: 2,
      subject: "Data Structures",
      topic: "AVL Trees",
      accuracy: 52,
      recommendation: "Practice rotation operations",
    },
    {
      id: 3,
      subject: "Database Systems",
      topic: "Normalization",
      accuracy: 58,
      recommendation: "Focus on 3NF and BCNF concepts",
    },
  ];

  const aiRecommendations = [
    {
      id: 1,
      title: "Focus on Computer Networks",
      description:
        "Based on your performance, we recommend spending more time on OSI Model and TCP/IP concepts.",
      type: "focus",
    },
    {
      id: 2,
      title: "Daily Practice: Data Structures",
      description:
        "Try solving 10 MCQs on AVL Trees and Balanced Trees daily to improve your understanding.",
      type: "practice",
    },
    {
      id: 3,
      title: "Revision Needed: Database Normalization",
      description:
        "Your recent attempts show confusion between 3NF and BCNF. Review these concepts with our guided resources.",
      type: "revision",
    },
  ];

  const courses = [
    { id: "bca", name: "BCA", color: "#3B82F6" },
    { id: "bsccsit", name: "BSc.CSIT", color: "#10B981" },
    { id: "bim", name: "BIM", color: "#F59E0B" },
    { id: "bba", name: "BBA", color: "#8B5CF6" },
    { id: "bbm", name: "BBM", color: "#EC4899" },
    { id: "be-computer", name: "BE Computer", color: "#6366F1" },
    { id: "bit", name: "BIT", color: "#14B8A6" },
    { id: "mca", name: "MCA", color: "#F43F5E" },
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Aayush! Track your progress and continue your exam
            preparation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/settings">
            <Button variant="outline" size="icon" className="rounded-full">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>
          <Link href="/dashboard/profile">
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="font-bold">A</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">
                Total Practice Sessions
              </p>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">127</p>
                <p className="text-xs text-muted-foreground">+12 this week</p>
              </div>
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <ArrowUpRight className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">
                Average Score
              </p>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">76%</p>
                <p className="text-xs text-green-500">+5% improvement</p>
              </div>
              <div className="size-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                <ArrowUpRight className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">
                Study Time
              </p>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">42h</p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
              <div className="size-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">
                Bookmarked Questions
              </p>
              <Bookmark className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">53</p>
                <p className="text-xs text-muted-foreground">
                  Across 8 subjects
                </p>
              </div>
              <div className="size-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Bookmark className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex justify-center mb-8">
          <TabsList className="rounded-full">
            <TabsTrigger value="overview" className="rounded-full">
              Overview
            </TabsTrigger>
            <TabsTrigger value="progress" className="rounded-full">
              Progress
            </TabsTrigger>
            <TabsTrigger value="ai-insights" className="rounded-full">
              AI Insights
            </TabsTrigger>
            <TabsTrigger value="courses" className="rounded-full">
              My Courses
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md col-span-1 lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold flex items-center justify-between">
                  <span>Recent Activity</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPastAttempts(!showPastAttempts)}
                  >
                    {showPastAttempts ? "Show Recent" : "Show Past"}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border/10 bg-background/80"
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {activity.type === "practice" ? (
                            <FileText className="h-5 w-5" />
                          ) : (
                            <Bookmark className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{activity.subject}</h4>
                          <p className="text-sm text-muted-foreground">
                            {activity.details}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {activity.score && (
                          <p className="font-medium">{activity.score}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" className="rounded-full">
                    View All Activity
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">
                  Upcoming Exams
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingExams.map((exam) => (
                    <div
                      key={exam.id}
                      className="p-3 rounded-lg border border-border/10 bg-background/80"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{exam.subject}</h4>
                        <Badge
                          variant="outline"
                          className="bg-primary/10 text-primary border-primary/20"
                        >
                          {exam.timeRemaining}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Date:</span>
                          <span>
                            {new Date(exam.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Preparedness:
                            </span>
                            <span>{exam.preparedness}%</span>
                          </div>
                          <Progress value={exam.preparedness} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" className="rounded-full">
                    View Exam Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">
                  Subject Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChartComponent
                      data={subjectPerformanceData}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip formatter={(value) => [`${value}%`, "Score"]} />
                      <Bar
                        dataKey="score"
                        fill="#3B82F6"
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChartComponent>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">
                  Question Type Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChartComponent>
                      <Pie
                        data={questionTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {questionTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Percentage"]}
                      />
                    </PieChartComponent>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
                  <span>AI-Powered Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {aiRecommendations.map((recommendation) => (
                    <div
                      key={recommendation.id}
                      className="p-4 rounded-lg border border-border/10 bg-background/80"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {recommendation.type === "focus" ? (
                          <Brain className="h-5 w-5 text-purple-500" />
                        ) : recommendation.type === "practice" ? (
                          <FileText className="h-5 w-5 text-blue-500" />
                        ) : (
                          <BookOpen className="h-5 w-5 text-amber-500" />
                        )}
                        <h4 className="font-medium">{recommendation.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {recommendation.description}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full rounded-full"
                      >
                        Take Action
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold">
                    Weekly Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChartComponent
                        data={[
                          { day: "Mon", hours: 2.5, questions: 45 },
                          { day: "Tue", hours: 1.8, questions: 32 },
                          { day: "Wed", hours: 3.2, questions: 58 },
                          { day: "Thu", hours: 2.1, questions: 40 },
                          { day: "Fri", hours: 2.8, questions: 52 },
                          { day: "Sat", hours: 4.5, questions: 75 },
                          { day: "Sun", hours: 3.7, questions: 65 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis
                          yAxisId="left"
                          orientation="left"
                          stroke="#3B82F6"
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          stroke="#10B981"
                        />
                        <Tooltip />
                        <Bar
                          yAxisId="left"
                          dataKey="hours"
                          name="Study Hours"
                          fill="#3B82F6"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          yAxisId="right"
                          dataKey="questions"
                          name="Questions Solved"
                          fill="#10B981"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChartComponent>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">Weak Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weakAreas.map((area) => (
                    <div
                      key={area.id}
                      className="p-3 rounded-lg border border-border/10 bg-background/80"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-medium">{area.subject}</h4>
                        <Badge
                          variant="outline"
                          className={`${
                            area.accuracy < 50
                              ? "bg-red-500/10 text-red-500 border-red-500/20"
                              : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                          }`}
                        >
                          {area.accuracy}%
                        </Badge>
                      </div>
                      <p className="text-sm mb-2">{area.topic}</p>
                      <div className="space-y-1">
                        <div className="flex items-start gap-1">
                          <Zap className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-muted-foreground">
                            {area.recommendation}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full rounded-full text-xs"
                        >
                          Practice Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">
                  Completion Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { subject: "OOP in Java", completed: 85, total: 120 },
                    { subject: "Data Structures", completed: 72, total: 100 },
                    { subject: "Database Systems", completed: 65, total: 90 },
                    { subject: "Web Technology", completed: 45, total: 80 },
                    { subject: "Computer Networks", completed: 30, total: 100 },
                  ].map((subject, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{subject.subject}</span>
                        <span className="text-muted-foreground">
                          {subject.completed}/{subject.total} questions
                        </span>
                      </div>
                      <Progress
                        value={(subject.completed / subject.total) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">
                  Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChartComponent
                      data={[
                        { month: "Aug", score: 65 },
                        { month: "Sep", score: 68 },
                        { month: "Oct", score: 72 },
                        { month: "Nov", score: 76 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Average Score"]}
                      />
                      <Bar
                        dataKey="score"
                        fill="#8B5CF6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChartComponent>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">
                  Bookmarked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      subject: "OOP in Java",
                      question:
                        "Explain the concept of polymorphism with an example.",
                      type: "Long Answer",
                      date: "2023-11-15",
                    },
                    {
                      id: 2,
                      subject: "Data Structures",
                      question:
                        "What is the time complexity of heapify operation in a heap?",
                      type: "Short Answer",
                      date: "2023-11-10",
                    },
                    {
                      id: 3,
                      subject: "Database Systems",
                      question:
                        "Differentiate between 3NF and BCNF with examples.",
                      type: "Long Answer",
                      date: "2023-11-05",
                    },
                  ].map((bookmark, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg border border-border/10 bg-background/80"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="bg-primary/10 text-primary border-primary/20"
                            >
                              {bookmark.subject}
                            </Badge>
                            <Badge variant="outline" className="bg-muted/50">
                              {bookmark.type}
                            </Badge>
                          </div>
                          <p className="mt-2">{bookmark.question}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                        >
                          <Bookmark className="h-4 w-4 fill-amber-500 text-amber-500" />
                          <span className="sr-only">Bookmarked</span>
                        </Button>
                      </div>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>
                          Bookmarked on{" "}
                          {new Date(bookmark.date).toLocaleDateString()}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 rounded-full"
                        >
                          Practice Similar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" className="rounded-full">
                    View All Bookmarks
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-insights">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-purple-500" />
                  <span>AI Learning Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-border/10 bg-background/80">
                    <h4 className="font-medium mb-2">
                      Learning Style Analysis
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Based on your interaction patterns, our AI has identified
                      your primary learning style:
                    </p>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="p-3 rounded-lg bg-blue-500/10 text-center">
                        <div className="text-blue-500 font-bold text-lg">
                          65%
                        </div>
                        <div className="text-xs">Visual</div>
                      </div>
                      <div className="p-3 rounded-lg bg-green-500/10 text-center">
                        <div className="text-green-500 font-bold text-lg">
                          25%
                        </div>
                        <div className="text-xs">Auditory</div>
                      </div>
                      <div className="p-3 rounded-lg bg-amber-500/10 text-center">
                        <div className="text-amber-500 font-bold text-lg">
                          10%
                        </div>
                        <div className="text-xs">Kinesthetic</div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Recommendation: We've adjusted your content to include
                      more diagrams, charts, and visual explanations.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-border/10 bg-background/80">
                    <h4 className="font-medium mb-2">Knowledge Gaps</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <div className="size-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mt-0.5">
                          <span className="text-xs font-bold">1</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            OSI Model (Computer Networks)
                          </p>
                          <p className="text-xs text-muted-foreground">
                            You consistently miss questions about the Transport
                            and Session layers.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="size-6 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mt-0.5">
                          <span className="text-xs font-bold">2</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Database Normalization (DBMS)
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Your answers show confusion between 3NF and BCNF
                            concepts.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full rounded-full">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Personalized Study Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-amber-500" />
                  <span>AI Question Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-border/10 bg-background/80">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Today's Focus Questions</h4>
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        5 Questions
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      These questions are tailored to address your specific
                      knowledge gaps:
                    </p>
                    <div className="space-y-2">
                      <div className="p-2 rounded-lg bg-muted/50">
                        <p className="text-sm">
                          Explain the functions of the Transport layer in the
                          OSI model.
                        </p>
                      </div>
                      <div className="p-2 rounded-lg bg-muted/50">
                        <p className="text-sm">
                          What is the difference between TCP and UDP protocols?
                        </p>
                      </div>
                      <div className="p-2 rounded-lg bg-muted/50">
                        <p className="text-sm">
                          Provide an example of a relation that is in 3NF but
                          not in BCNF.
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-3 rounded-full"
                    >
                      Start Practice Session
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border border-border/10 bg-background/80">
                    <h4 className="font-medium mb-2">Performance Prediction</h4>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>OOP in Java</span>
                          <span className="text-green-500">
                            85% predicted score
                          </span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Data Structures</span>
                          <span className="text-green-500">
                            78% predicted score
                          </span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Computer Networks</span>
                          <span className="text-amber-500">
                            62% predicted score
                          </span>
                        </div>
                        <Progress value={62} className="h-2" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Predictions based on your current performance and study
                      patterns.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">
                  AI Study Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 backdrop-blur-sm rounded-xl p-6 border border-border/10">
                  <div className="flex items-start gap-4">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Brain className="h-6 w-6" />
                    </div>
                    <div className="space-y-4 flex-1">
                      <div>
                        <h3 className="text-lg font-bold">
                          Ask me anything about your courses
                        </h3>
                        <p className="text-muted-foreground">
                          I can explain concepts, provide examples, or help you
                          solve practice problems.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="p-3 rounded-lg bg-background/80 border border-border/10">
                          <p className="text-sm font-medium">
                            Recent questions:
                          </p>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 rounded-full text-xs"
                              >
                                Explain polymorphism in OOP
                              </Button>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 rounded-full text-xs"
                              >
                                What is normalization in DBMS?
                              </Button>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 rounded-full text-xs"
                              >
                                How does TCP ensure reliable delivery?
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Input
                            placeholder="Ask a question about your courses..."
                            className="rounded-full"
                          />
                          <Button className="rounded-full">Ask AI</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Courses</h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter Courses
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>All Courses</DropdownMenuItem>
                  <DropdownMenuItem>In Progress</DropdownMenuItem>
                  <DropdownMenuItem>Completed</DropdownMenuItem>
                  <DropdownMenuItem>Not Started</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {courses.map((course) => (
                <motion.div key={course.id} variants={item}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="h-full overflow-hidden border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                          <div
                            className="size-12 rounded-full"
                            style={{ backgroundColor: `${course.color}20` }}
                          >
                            <div
                              className="w-full h-full flex items-center justify-center text-lg font-bold"
                              style={{ color: course.color }}
                            >
                              {course.name.charAt(0)}
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-primary/10 text-primary border-primary/20"
                          >
                            {course.id === "bca" ? "Current" : "Available"}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          {course.name}
                        </h3>
                        <p className="text-muted-foreground mb-4 flex-grow">
                          {course.id === "bca"
                            ? "Bachelor of Computer Application - 3rd Semester"
                            : `${course.name} program with comprehensive exam preparation`}
                        </p>
                        {course.id === "bca" && (
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Progress:
                              </span>
                              <span>68% Complete</span>
                            </div>
                            <Progress value={68} className="h-2" />
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Button
                          className="w-full rounded-full"
                          style={{
                            backgroundColor: course.color,
                            color: "white",
                            borderColor: "transparent",
                          }}
                        >
                          {course.id === "bca"
                            ? "Continue Learning"
                            : "Explore Course"}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="mt-6">
            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">
                  Current Semester Subjects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      name: "Object-Oriented Programming in Java",
                      code: "BCA301",
                      progress: 85,
                      resources: 45,
                      color: "#3B82F6",
                    },
                    {
                      name: "Data Structures and Algorithms",
                      code: "BCA302",
                      progress: 72,
                      resources: 38,
                      color: "#10B981",
                    },
                    {
                      name: "Database Management Systems",
                      code: "BCA303",
                      progress: 65,
                      resources: 42,
                      color: "#F59E0B",
                    },
                    {
                      name: "Computer Networks",
                      code: "BCA304",
                      progress: 58,
                      resources: 36,
                      color: "#8B5CF6",
                    },
                    {
                      name: "Web Technology",
                      code: "BCA305",
                      progress: 45,
                      resources: 30,
                      color: "#EC4899",
                    },
                  ].map((subject, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-border/10 bg-background/80"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="size-10 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: `${subject.color}20`,
                            color: subject.color,
                          }}
                        >
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{subject.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {subject.code}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Progress:
                          </span>
                          <span>{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-3">
                        <span>{subject.resources} learning resources</span>
                        <span>Updated 2 days ago</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 rounded-full text-xs"
                        >
                          Practice MCQs
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 rounded-full text-xs"
                        >
                          Study Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
