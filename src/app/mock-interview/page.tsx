"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock,
  Download,
  Mic,
  MicOff,
  Pause,
  Play,
  Sparkles,
  Video,
  VideoOff,
  Lightbulb,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Image from "next/image";

export default function MockInterviewPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("ai-interview");
  const [interviewType, setInterviewType] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isInterviewPaused, setIsInterviewPaused] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(5);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [response, setResponse] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isInterviewStarted && !isInterviewPaused && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleEndInterview();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isInterviewStarted, isInterviewPaused, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleStartInterview = () => {
    if (!interviewType) {
      toast({
        title: "Missing information",
        description: "Please select an interview type before starting.",
        variant: "destructive",
      });
      return;
    }

    setIsInterviewStarted(true);
    toast({
      title: "Interview started",
      description: `Your ${interviewType} interview has begun. Good luck!`,
    });
  };

  const handleToggleCamera = async () => {
    if (!isCameraOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraOn(true);
        toast({
          title: "Camera turned on",
          description: "Your camera is now active.",
        });
      } catch (error) {
        toast({
          title: "Camera error",
          description:
            "Could not access your camera. Please check permissions.",
          variant: "destructive",
        });
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsCameraOn(false);
      toast({
        title: "Camera turned off",
        description: "Your camera is now inactive.",
      });
    }
  };

  const handleToggleMic = async () => {
    if (!isMicOn) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsMicOn(true);
        toast({
          title: "Microphone turned on",
          description: "Your microphone is now active.",
        });
      } catch (error) {
        toast({
          title: "Microphone error",
          description:
            "Could not access your microphone. Please check permissions.",
          variant: "destructive",
        });
      }
    } else {
      setIsMicOn(false);
      toast({
        title: "Microphone turned off",
        description: "Your microphone is now inactive.",
      });
    }
  };

  const handlePauseInterview = () => {
    setIsInterviewPaused(!isInterviewPaused);
    if (timerRef.current && !isInterviewPaused) {
      clearInterval(timerRef.current);
    }
    toast({
      title: isInterviewPaused ? "Interview resumed" : "Interview paused",
      description: isInterviewPaused
        ? "The timer has resumed."
        : "The timer has been paused.",
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setResponse("");
      toast({
        title: "Next question",
        description: `Moving to question ${
          currentQuestion + 1
        } of ${totalQuestions}.`,
      });
    } else {
      handleEndInterview();
    }
  };

  const handleEndInterview = () => {
    setIsInterviewStarted(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    toast({
      title: "Interview completed",
      description: "Your interview has ended. You can now view your feedback.",
    });
  };

  const handleSubmitResponse = () => {
    if (!response.trim()) {
      toast({
        title: "Empty response",
        description: "Please provide an answer before submitting.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Response submitted",
      description: "Your answer has been recorded.",
    });
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
    <div className="container py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mock Interview</h1>
          <p className="text-muted-foreground">
            Practice with realistic interview simulations and receive detailed
            feedback.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="outline" className="rounded-full">
              Dashboard
            </Button>
          </Link>
          <Link href="/interview-prep">
            <Button variant="outline" className="rounded-full">
              Interview Prep
            </Button>
          </Link>
        </div>
      </div>

      <Tabs
        defaultValue="ai-interview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex justify-center mb-8">
          <TabsList className="rounded-full">
            <TabsTrigger value="ai-interview" className="rounded-full">
              AI Interview
            </TabsTrigger>
            <TabsTrigger value="peer-interview" className="rounded-full">
              Peer Interview
            </TabsTrigger>
            <TabsTrigger value="feedback" className="rounded-full">
              Past Interviews
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="ai-interview">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              {!isInterviewStarted ? (
                <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold">
                      Interview Setup
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="interview-type">Interview Type</Label>
                        <Select
                          value={interviewType}
                          onValueChange={setInterviewType}
                        >
                          <SelectTrigger
                            id="interview-type"
                            className="rounded-md"
                          >
                            <SelectValue placeholder="Select interview type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="frontend">
                              Frontend Developer
                            </SelectItem>
                            <SelectItem value="backend">
                              Backend Developer
                            </SelectItem>
                            <SelectItem value="fullstack">
                              Full Stack Developer
                            </SelectItem>
                            <SelectItem value="data-science">
                              Data Scientist
                            </SelectItem>
                            <SelectItem value="devops">
                              DevOps Engineer
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="difficulty">Experience Level</Label>
                        <Select
                          value={difficulty}
                          onValueChange={setDifficulty}
                        >
                          <SelectTrigger id="difficulty" className="rounded-md">
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entry">
                              Entry Level (0-2 years)
                            </SelectItem>
                            <SelectItem value="medium">
                              Mid Level (2-5 years)
                            </SelectItem>
                            <SelectItem value="senior">
                              Senior Level (5+ years)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="camera"
                            checked={isCameraOn}
                            onCheckedChange={handleToggleCamera}
                          />
                          <Label htmlFor="camera">Enable Camera</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id="microphone"
                            checked={isMicOn}
                            onCheckedChange={handleToggleMic}
                          />
                          <Label htmlFor="microphone">Enable Microphone</Label>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <Button
                          className="w-full md:w-auto rounded-full"
                          onClick={handleStartInterview}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Start Interview
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl font-bold">
                        {interviewType} Interview - Question {currentQuestion}/
                        {totalQuestions}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-primary/10 text-primary border-primary/20"
                        >
                          <Clock className="mr-1 h-3 w-3" />
                          {formatTime(timeRemaining)}
                        </Badge>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full"
                          onClick={handlePauseInterview}
                        >
                          {isInterviewPaused ? (
                            <Play className="h-4 w-4" />
                          ) : (
                            <Pause className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            {isInterviewPaused ? "Resume" : "Pause"}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                          {isCameraOn ? (
                            <video
                              ref={videoRef}
                              autoPlay
                              muted
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <VideoOff className="h-12 w-12 text-muted-foreground" />
                            </div>
                          )}
                          <div className="absolute bottom-2 right-2 flex gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="size-8 rounded-full bg-background/80 backdrop-blur-sm"
                              onClick={handleToggleCamera}
                            >
                              {isCameraOn ? (
                                <VideoOff className="h-4 w-4" />
                              ) : (
                                <Video className="h-4 w-4" />
                              )}
                              <span className="sr-only">
                                {isCameraOn
                                  ? "Turn off camera"
                                  : "Turn on camera"}
                              </span>
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="size-8 rounded-full bg-background/80 backdrop-blur-sm"
                              onClick={handleToggleMic}
                            >
                              {isMicOn ? (
                                <MicOff className="h-4 w-4" />
                              ) : (
                                <Mic className="h-4 w-4" />
                              )}
                              <span className="sr-only">
                                {isMicOn
                                  ? "Turn off microphone"
                                  : "Turn on microphone"}
                              </span>
                            </Button>
                          </div>
                        </div>

                        <div className="bg-muted/30 backdrop-blur-sm rounded-lg p-4 border border-border/10">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                              <Brain className="h-4 w-4" />
                            </div>
                            <h3 className="font-medium">AI Interviewer</h3>
                          </div>
                          <p className="mb-3">
                            {currentQuestion === 1
                              ? "Can you explain the difference between REST and GraphQL APIs, and when you might choose one over the other?"
                              : "Tell me about a challenging project you worked on and how you overcame the obstacles you faced."}
                          </p>
                          <div className="text-xs text-muted-foreground">
                            {isMicOn
                              ? "Listening... You can speak your answer or type below."
                              : "Microphone is off. Please type your answer below."}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="interview-response">
                          Your Response
                        </Label>
                        <Textarea
                          id="interview-response"
                          placeholder="Type your answer here..."
                          className="min-h-[150px]"
                          value={response}
                          onChange={(e) => setResponse(e.target.value)}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1 rounded-full"
                          onClick={handleEndInterview}
                        >
                          End Interview
                        </Button>
                        <Button
                          className="flex-1 rounded-full"
                          onClick={handleSubmitResponse}
                        >
                          Submit Response
                        </Button>
                        <Button
                          className="flex-1 rounded-full"
                          onClick={handleNextQuestion}
                        >
                          Next Question
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold">
                    Interview Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-3 rounded-lg border border-border/10 bg-background/80">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="size-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                          <Video className="h-3 w-3" />
                        </div>
                        <h4 className="font-medium text-sm">Body Language</h4>
                      </div>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>Maintain good posture</li>
                        <li>Make appropriate eye contact</li>
                        <li>Use hand gestures naturally</li>
                      </ul>
                    </div>

                    <div className="p-3 rounded-lg border border-border/10 bg-background/80">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="size-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                          <Mic className="h-3 w-3" />
                        </div>
                        <h4 className="font-medium text-sm">Voice & Tone</h4>
                      </div>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>Speak clearly and confidently</li>
                        <li>Vary your tone to show enthusiasm</li>
                        <li>Avoid filler words (um, like)</li>
                      </ul>
                    </div>

                    <div className="p-3 rounded-lg border border-border/10 bg-background/80">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="size-6 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                          <Brain className="h-3 w-3" />
                        </div>
                        <h4 className="font-medium text-sm">Content</h4>
                      </div>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>Structure answers with STAR method</li>
                        <li>Provide specific examples</li>
                        <li>Keep responses concise (1-2 minutes)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold">
                    Interview Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Questions Completed</span>
                        <span className="font-medium">
                          {currentQuestion - 1}/{totalQuestions}
                        </span>
                      </div>
                      <Progress
                        value={((currentQuestion - 1) / totalQuestions) * 100}
                        className="h-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Time Remaining</span>
                        <span className="font-medium">
                          {formatTime(timeRemaining)}
                        </span>
                      </div>
                      <Progress
                        value={(timeRemaining / 300) * 100}
                        className="h-2"
                      />
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Question Types</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 rounded-lg bg-muted/50 text-center">
                          <div className="text-sm font-medium">Technical</div>
                          <div className="text-xs text-muted-foreground">
                            3 questions
                          </div>
                        </div>
                        <div className="p-2 rounded-lg bg-muted/50 text-center">
                          <div className="text-sm font-medium">Behavioral</div>
                          <div className="text-xs text-muted-foreground">
                            2 questions
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold">
                    Real-Time Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg border border-green-500/20 bg-green-500/10">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-green-500">
                            Strengths
                          </h4>
                          <ul className="mt-1 space-y-1 text-xs">
                            <li>Good technical knowledge</li>
                            <li>Clear communication</li>
                            <li>Structured responses</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/10">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5">
                          <Lightbulb className="h-4 w-4 text-amber-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-amber-500">
                            Areas to Improve
                          </h4>
                          <ul className="mt-1 space-y-1 text-xs">
                            <li>Provide more specific examples</li>
                            <li>Be more concise in responses</li>
                            <li>Maintain better eye contact</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="peer-interview">
          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold">
                Peer Interview Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Schedule a Peer Interview
                  </h3>
                  <p className="text-muted-foreground">
                    Practice with fellow students or industry professionals. Get
                    real feedback from peers in your field.
                  </p>

                  <div className="grid grid-cols-3 gap-2">
                    {[15, 16, 17, 18, 19, 20].map((day) => (
                      <Button key={day} variant="outline" className="h-12">
                        {day} May
                      </Button>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      "10:00 AM",
                      "1:00 PM",
                      "3:00 PM",
                      "5:00 PM",
                      "7:00 PM",
                      "9:00 PM",
                    ].map((time) => (
                      <Button key={time} variant="outline" className="h-10">
                        {time}
                      </Button>
                    ))}
                  </div>

                  <Button className="w-full rounded-full">
                    Schedule Session
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Available Interviewers
                  </h3>

                  <div className="space-y-3">
                    {[1, 2, 3].map((interviewer) => (
                      <div
                        key={interviewer}
                        className="flex items-center gap-3 p-3 rounded-lg border border-border/10 bg-background/80"
                      >
                        <div className="size-10 rounded-full bg-muted overflow-hidden">
                          <Image
                            src={`/placeholder.svg?height=40&width=40`}
                            alt={`Interviewer ${interviewer}`}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            Interviewer {interviewer}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {interviewer === 1
                              ? "Frontend Developer • 4 years experience"
                              : interviewer === 2
                              ? "Backend Developer • 6 years experience"
                              : "Full Stack Developer • 3 years experience"}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-auto rounded-full"
                        >
                          View Profile
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/10">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        <Lightbulb className="h-4 w-4 text-amber-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-amber-500">
                          Peer Interview Benefits
                        </h4>
                        <ul className="mt-1 space-y-1 text-xs">
                          <li>Get feedback from real industry professionals</li>
                          <li>Practice with someone in your specific field</li>
                          <li>Build your professional network</li>
                          <li>
                            Gain insights into company-specific interview
                            processes
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <div className="space-y-6">
            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">
                  Past Interview Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      id: 1,
                      type: "Frontend Developer",
                      date: "2023-05-10T14:30:00Z",
                      score: 85,
                      strengths: [
                        "Technical knowledge",
                        "Problem-solving",
                        "Communication",
                      ],
                      improvements: [
                        "Provide more examples",
                        "Be more concise",
                      ],
                    },
                    {
                      id: 2,
                      type: "Full Stack Developer",
                      date: "2023-04-28T10:15:00Z",
                      score: 72,
                      strengths: ["System design", "Coding skills"],
                      improvements: [
                        "Explain thought process",
                        "Time management",
                      ],
                    },
                  ].map((interview) => (
                    <div
                      key={interview.id}
                      className="p-4 rounded-lg border border-border/10 bg-background/80"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          <div className="bg-muted/50 rounded-lg p-6 text-center">
                            <div
                              className="size-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold"
                              style={{
                                color:
                                  interview.score >= 80
                                    ? "#10B981"
                                    : interview.score >= 60
                                    ? "#F59E0B"
                                    : "#EF4444",
                                backgroundColor:
                                  interview.score >= 80
                                    ? "#10B98120"
                                    : interview.score >= 60
                                    ? "#F59E0B20"
                                    : "#EF444420",
                              }}
                            >
                              {interview.score}
                            </div>
                            <h3 className="text-lg font-bold">
                              {interview.type}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(interview.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="md:w-2/3 space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-2">
                              Strengths
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {interview.strengths.map((strength, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="bg-green-500/10 text-green-500 border-green-500/20"
                                >
                                  <CheckCircle2 className="mr-1 h-3 w-3" />
                                  {strength}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-2">
                              Areas for Improvement
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {interview.improvements.map(
                                (improvement, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="bg-amber-500/10 text-amber-500 border-amber-500/20"
                                  >
                                    <Lightbulb className="mr-1 h-3 w-3" />
                                    {improvement}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>

                          <div className="pt-2 flex gap-3">
                            <Button variant="outline" className="rounded-full">
                              <Video className="mr-2 h-4 w-4" />
                              Watch Recording
                            </Button>
                            <Button variant="outline" className="rounded-full">
                              <Download className="mr-2 h-4 w-4" />
                              Download Feedback
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">
                  Performance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="p-4 rounded-lg border border-border/10 bg-background/80">
                    <h3 className="text-lg font-medium mb-4">
                      Skill Breakdown
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Technical Knowledge</span>
                          <span className="font-medium">85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Communication</span>
                          <span className="font-medium">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Problem Solving</span>
                          <span className="font-medium">72%</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>System Design</span>
                          <span className="font-medium">65%</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-border/10 bg-background/80">
                    <h3 className="text-lg font-medium mb-4">
                      Improvement Over Time
                    </h3>
                    <div className="h-[250px] flex items-center justify-center">
                      <Image
                        src="/placeholder.svg?height=250&width=400"
                        alt="Performance chart"
                        width={400}
                        height={250}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
            <span>AI Interview Coach</span>
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
                    Personalized Interview Coaching
                  </h3>
                  <p className="text-muted-foreground">
                    Get tailored advice to improve your interview performance
                    based on your past sessions.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-3 rounded-lg bg-background/80 border border-border/10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="size-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <Video className="h-3 w-3" />
                      </div>
                      <h4 className="font-medium text-sm">Video Analysis</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      AI analysis of your body language, facial expressions, and
                      eye contact.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-background/80 border border-border/10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="size-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                        <Mic className="h-3 w-3" />
                      </div>
                      <h4 className="font-medium text-sm">Speech Analysis</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Feedback on your tone, pace, clarity, and use of filler
                      words.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-background/80 border border-border/10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="size-6 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                        <Brain className="h-3 w-3" />
                      </div>
                      <h4 className="font-medium text-sm">Content Analysis</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Evaluation of your answers' structure, relevance, and
                      depth.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button className="rounded-full">
                    Get Personalized Coaching
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
