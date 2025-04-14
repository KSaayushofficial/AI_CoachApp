"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
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
  Globe,
  Search,
  PlusCircle,
  Bell,
  User,
  LayoutDashboard,
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
import { Input } from "@/components/ui/input";
import { AnimatedButton } from "@/components/shared/animated-button";
import { PageHeader } from "@/components/shared/page-header";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Sample data for dashboard
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Rotating Globe Component
  const RotatingGlobe = () => {
    return (
      <div className="relative size-16 md:size-20">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotateY: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Globe className="size-12 md:size-16 text-primary" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/80 to-transparent rounded-full blur-sm"></div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[80vh]">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <GraduationCap className="size-12 text-primary" />
          </motion.div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <PageHeader
        title="Student Dashboard"
        description="Welcome back, Aayush! Track your progress and continue your exam preparation."
        icon={<RotatingGlobe />}
      >
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full relative"
              >
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
                <span className="absolute -top-1 -right-1 size-3 bg-red-500 rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2 font-medium border-b">Notifications</div>
              <div className="py-2 px-3 text-sm">
                <div className="mb-2 pb-2 border-b">
                  <div className="font-medium">
                    New practice questions available
                  </div>
                  <div className="text-muted-foreground text-xs">
                    5 minutes ago
                  </div>
                </div>
                <div className="mb-2 pb-2 border-b">
                  <div className="font-medium">Your exam is in 3 days</div>
                  <div className="text-muted-foreground text-xs">
                    2 hours ago
                  </div>
                </div>
                <div>
                  <div className="font-medium">
                    AI has generated new study recommendations
                  </div>
                  <div className="text-muted-foreground text-xs">Yesterday</div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
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
      </PageHeader>

      {/* Quick Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/dashboard">
          <motion.div
            whileHover={{ y: -5 }}
            className="p-4 rounded-xl border border-border/10 bg-background/50 backdrop-blur-md shadow-md flex flex-col items-center justify-center text-center gap-2"
          >
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            <span className="font-medium">Dashboard</span>
          </motion.div>
        </Link>
        <Link href="/exam-preparation">
          <motion.div
            whileHover={{ y: -5 }}
            className="p-4 rounded-xl border border-border/10 bg-background/50 backdrop-blur-md shadow-md flex flex-col items-center justify-center text-center gap-2"
          >
            <div className="size-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
              <BookOpen className="h-6 w-6" />
            </div>
            <span className="font-medium">Exam Prep</span>
          </motion.div>
        </Link>
        <Link href="/past-questions">
          <motion.div
            whileHover={{ y: -5 }}
            className="p-4 rounded-xl border border-border/10 bg-background/50 backdrop-blur-md shadow-md flex flex-col items-center justify-center text-center gap-2"
          >
            <div className="size-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
              <FileText className="h-6 w-6" />
            </div>
            <span className="font-medium">Past Questions</span>
          </motion.div>
        </Link>
        <Link href="/profile">
          <motion.div
            whileHover={{ y: -5 }}
            className="p-4 rounded-xl border border-border/10 bg-background/50 backdrop-blur-md shadow-md flex flex-col items-center justify-center text-center gap-2"
          >
            <div className="size-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
              <User className="h-6 w-6" />
            </div>
            <span className="font-medium">Profile</span>
          </motion.div>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={itemVariants} initial="hidden" animate="show">
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
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.1 }}
        >
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
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
        >
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
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.3 }}
        >
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
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search courses, subjects, or questions..."
            className="pl-10 pr-4 rounded-full w-full md:w-80"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Link href="/course-selection">
            <AnimatedButton>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Course
            </AnimatedButton>
          </Link>
          <Link href="/exam-preparation">
            <AnimatedButton>
              <Zap className="mr-2 h-4 w-4" />
              Practice Now
            </AnimatedButton>
          </Link>
        </div>
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
                <CardTitle className="text-xl font-bold">
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {recentActivities.map((activity) => (
                    <motion.div
                      key={activity.id}
                      variants={itemVariants}
                      className="flex items-center justify-between p-3 rounded-lg border border-border/10 bg-background/80"
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: "rgba(var(--primary-rgb), 0.05)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
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
                    </motion.div>
                  ))}
                </motion.div>
                <div className="mt-4 text-center">
                  <AnimatedButton variant="outline">
                    View All Activity
                  </AnimatedButton>
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
                <motion.div
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {upcomingExams.map((exam) => (
                    <motion.div
                      key={exam.id}
                      variants={itemVariants}
                      className="p-3 rounded-lg border border-border/10 bg-background/80"
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: "rgba(var(--primary-rgb), 0.05)",
                      }}
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
                    </motion.div>
                  ))}
                </motion.div>
                <div className="mt-4 text-center">
                  <AnimatedButton variant="outline">
                    View Exam Schedule
                  </AnimatedButton>
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
                <motion.div
                  className="grid gap-4 md:grid-cols-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {aiRecommendations.map((recommendation) => (
                    <motion.div
                      key={recommendation.id}
                      variants={itemVariants}
                      className="p-4 rounded-lg border border-border/10 bg-background/80"
                      whileHover={{
                        scale: 1.03,
                        boxShadow:
                          "0 10px 30px -15px rgba(var(--primary-rgb), 0.2)",
                        borderColor: "rgba(var(--primary-rgb), 0.3)",
                      }}
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
                      <AnimatedButton
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        Take Action
                      </AnimatedButton>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress">
          <div className="space-y-6">
            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">Weak Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {weakAreas.map((area) => (
                    <motion.div
                      key={area.id}
                      className="p-3 rounded-lg border border-border/10 bg-background/80"
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: "rgba(var(--primary-rgb), 0.05)",
                      }}
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
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-insights">
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
                        <p className="text-sm font-medium">Recent questions:</p>
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
                        <AnimatedButton>Ask AI</AnimatedButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                { id: "bca", name: "BCA", color: "#3B82F6", current: true },
                { id: "bsccsit", name: "BSc.CSIT", color: "#10B981" },
                { id: "bim", name: "BIM", color: "#F59E0B" },
                { id: "bit", name: "BIT", color: "#8B5CF6" },
                { id: "be-computer", name: "BE Computer", color: "#6366F1" },
                { id: "mca", name: "MCA", color: "#F43F5E" },
              ].map((course) => (
                <motion.div key={course.id} variants={itemVariants}>
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
                            {course.current ? "Current" : "Available"}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          {course.name}
                        </h3>
                        <p className="text-muted-foreground mb-4 flex-grow">
                          {course.current
                            ? "Bachelor of Computer Application - 3rd Semester"
                            : `${course.name} program with comprehensive exam preparation`}
                        </p>
                        {course.current && (
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
                        <AnimatedButton
                          className="w-full"
                          style={{
                            backgroundColor: course.color,
                            color: "white",
                            borderColor: "transparent",
                          }}
                        >
                          {course.current
                            ? "Continue Learning"
                            : "Explore Course"}
                        </AnimatedButton>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
