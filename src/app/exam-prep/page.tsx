"use client"

import { useState } from "react"
import { motion } from "framer-motion"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { AIAssistant } from "@/components/shared/ai-assistant"
import { MediaSlider } from "@/components/shared/media-slider"
import { QuestionFilter } from "@/components/shared/question-filter"
import { useToast } from "@/hooks/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

export default function ExamPrepPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("mcq")
  const [course, setCourse] = useState("")
  const [university, setUniversity] = useState("")
  const [subject, setSubject] = useState("")
  const [difficulty, setDifficulty] = useState("medium")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<{
    question: string
    answer: string
  } | null>(null)
  const [numQuestions, setNumQuestions] = useState(10)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPastQuestions, setShowPastQuestions] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    difficulty: "all",
    popularity: "all",
    relevance: "all",
  })

  const handleFilterChange = (filters: { difficulty: string; popularity: string; relevance: string }) => {
    setActiveFilters(filters)
    toast({
      title: "Filters applied",
      description: "Questions have been filtered based on your criteria.",
    })
  }

  const handleShowExplanation = (question: string, answer: string) => {
    setCurrentQuestion({ question, answer })
    setShowAIAssistant(true)
  }

  const handleGenerateQuestions = () => {
    if (!course || !subject) {
      toast({
        title: "Missing information",
        description: "Please select a course and subject before generating questions.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate question generation
    setTimeout(() => {
      setIsGenerating(false)
      toast({
        title: "Questions generated",
        description: `${numQuestions} ${difficulty} questions for ${subject} have been generated.`,
      })
    }, 1500)
  }

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
  ]

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
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Exam Preparation</h1>
            <p className="text-muted-foreground">
              Practice with AI-generated questions for Nepali university courses and get instant feedback to improve
              your exam performance.
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
          <CardTitle className="text-xl font-bold">Question Generator Settings</CardTitle>
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
                  <SelectItem value="purbanchal">Purbanchal University</SelectItem>
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
                  <SelectItem value="data-structures">Data Structures</SelectItem>
                  <SelectItem value="database">Database Systems</SelectItem>
                  <SelectItem value="networks">Computer Networks</SelectItem>
                  <SelectItem value="web-tech">Web Technology</SelectItem>
                  <SelectItem value="os">Operating Systems</SelectItem>
                  <SelectItem value="software-engineering">Software Engineering</SelectItem>
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
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger id="difficulty" className="rounded-md">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="num-questions">Number of Questions ({numQuestions})</Label>
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
              <Button className="w-full rounded-full" onClick={handleGenerateQuestions} disabled={isGenerating}>
                <Zap className="mr-2 h-4 w-4" />
                {isGenerating ? "Generating..." : "Generate Questions"}
              </Button>
            </div>
          </div>

          <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <QuestionFilter onFilterChange={handleFilterChange} />

            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="past-questions" checked={showPastQuestions} onCheckedChange={setShowPastQuestions} />
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

          <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-3">
            {pastPapers.map((paper) => (
              <motion.div key={paper.id} variants={item}>
                <motion.div whileHover={{ y: -5, scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <Card className="h-full overflow-hidden border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div className="size-12 rounded-full" style={{ backgroundColor: `${paper.color}20` }}>
                          <div
                            className="w-full h-full flex items-center justify-center text-lg font-bold"
                            style={{ color: paper.color }}
                          >
                            {paper.title.charAt(0)}
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {paper.year} {paper.semester}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{paper.title}</h3>
                      <p className="text-muted-foreground mb-4 flex-grow">{paper.university}</p>
                      <div className="space-y-2 mt-auto">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Questions:</span>
                          <span className="font-medium">{paper.questions}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-medium">{paper.duration}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Downloads:</span>
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

      <Tabs defaultValue="mcq" value={activeTab} onValueChange={setActiveTab} className="w-full">
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
          <div className="space-y-8">
            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-bold">Multiple Choice Question</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      Question 1/{numQuestions}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg border border-border/10 bg-background/80">
                    <p className="font-medium">
                      Which of the following is a characteristic of polymorphism in object-oriented programming?
                    </p>
                  </div>

                  <RadioGroup defaultValue="b" className="space-y-3">
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-red-500 bg-red-500/10">
                      <RadioGroupItem value="a" id="option-a" disabled />
                      <Label htmlFor="option-a" className="flex-1 cursor-pointer">
                        It restricts a derived class from overriding methods of its base class.
                      </Label>
                      <X className="h-5 w-5 text-red-500" />
                    </div>

                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-green-500 bg-green-500/10">
                      <RadioGroupItem value="b" id="option-b" disabled />
                      <Label htmlFor="option-b" className="flex-1 cursor-pointer">
                        It allows objects of different classes to be treated as objects of a common superclass.
                      </Label>
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>

                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-red-500 bg-red-500/10">
                      <RadioGroupItem value="c" id="option-c" disabled />
                      <Label htmlFor="option-c" className="flex-1 cursor-pointer">
                        It ensures that all classes in a program must inherit from a single base class.
                      </Label>
                      <X className="h-5 w-5 text-red-500" />
                    </div>

                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-red-500 bg-red-500/10">
                      <RadioGroupItem value="d" id="option-d" disabled />
                      <Label htmlFor="option-d" className="flex-1 cursor-pointer">
                        It prevents a class from implementing multiple interfaces.
                      </Label>
                      <X className="h-5 w-5 text-red-500" />
                    </div>
                  </RadioGroup>

                  <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/10">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-green-500">Correct Answer: B</h4>
                        <p className="text-sm mt-1">
                          Polymorphism allows objects of different classes to be treated as objects of a common
                          superclass. This is a fundamental concept in object-oriented programming that enables method
                          overriding and dynamic binding.
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 text-primary"
                          onClick={() =>
                            handleShowExplanation(
                              "Which of the following is a characteristic of polymorphism in object-oriented programming?",
                              "Polymorphism allows objects of different classes to be treated as objects of a common superclass. This is a fundamental concept in object-oriented programming that enables method overriding and dynamic binding.",
                            )
                          }
                        >
                          <Brain className="mr-1 h-4 w-4" />
                          Explain Further
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 rounded-full">
                      Previous Question
                    </Button>
                    <Button className="flex-1 rounded-full">Next Question</Button>
                  </div>
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
              <Button variant="outline" size="sm" className="rounded-full ml-auto">
                Report Issue
              </Button>
            </div>

            {/* Reference Materials - Now below the question */}
            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold">Reference Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <MediaSlider items={mediaItems} className="mb-4" />

                <div className="space-y-4">
                  <div className="p-3 rounded-lg border border-border/10 bg-background/80">
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span>Key Concepts</span>
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="mt-0.5">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                        </div>
                        <span>Polymorphism is derived from Greek words: "poly" (many) and "morphs" (forms).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-0.5">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                        </div>
                        <span>Two main types: Compile-time (method overloading) and Runtime (method overriding).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-0.5">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                        </div>
                        <span>Enables code reusability and flexibility in object-oriented design.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg border border-border/10 bg-background/80">
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <Code className="h-4 w-4 text-amber-500" />
                      <span>Example Code</span>
                    </h4>
                    <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                      <code>
                        {`// Parent class
class Animal {
  public void makeSound() {
    System.out.println("Animal makes a sound");
  }
}

// Child classes
class Dog extends Animal {
  @Override
  public void makeSound() {
    System.out.println("Dog barks");
  }
}

class Cat extends Animal {
  @Override
  public void makeSound() {
    System.out.println("Cat meows");
  }
}

// Usage
public class Main {
  public static void main(String[] args) {
    Animal myDog = new Dog();
    Animal myCat = new Cat();
    
    myDog.makeSound();  // Outputs: "Dog barks"
    myCat.makeSound();  // Outputs: "Cat meows"
  }
}`}
                      </code>
                    </pre>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg border border-border/10 bg-background/80">
                      <h4 className="font-medium flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span>Related Topics</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-muted/50">
                          Method Overloading
                        </Badge>
                        <Badge variant="outline" className="bg-muted/50">
                          Inheritance
                        </Badge>
                        <Badge variant="outline" className="bg-muted/50">
                          Dynamic Binding
                        </Badge>
                        <Badge variant="outline" className="bg-muted/50">
                          Abstract Classes
                        </Badge>
                        <Badge variant="outline" className="bg-muted/50">
                          Interfaces
                        </Badge>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border border-border/10 bg-background/80">
                      <h4 className="font-medium flex items-center gap-2 mb-2">
                        <Building className="h-4 w-4 text-primary" />
                        <span>University Resources</span>
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="mt-0.5">
                            <ExternalLink className="h-3 w-3 text-primary" />
                          </div>
                          <a href="#" className="text-primary hover:underline">
                            TU CSIT Department Notes
                          </a>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-0.5">
                            <ExternalLink className="h-3 w-3 text-primary" />
                          </div>
                          <a href="#" className="text-primary hover:underline">
                            PU BCA Syllabus
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/10">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        <Lightbulb className="h-4 w-4 text-amber-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-amber-500">Study Tip</h4>
                        <p className="text-xs mt-1">
                          Focus on understanding the practical applications of polymorphism in real-world scenarios to
                          better grasp the concept. Try implementing a simple program that demonstrates polymorphism
                          with different classes.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" className="rounded-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Ask AI for More Help
                    </Button>

                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Time spent: 5 minutes</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Questions Completed</span>
                      <span className="font-medium">1/{numQuestions}</span>
                    </div>
                    <Progress value={100 / numQuestions} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Accuracy</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg border border-border/10 bg-background/80">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Difficulty</h4>
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                          Medium
                        </Badge>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border border-border/10 bg-background/80">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Estimated Time</h4>
                        <span className="text-sm">30 mins</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="short-answer">
          <div className="space-y-8">
            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-bold">Short Answer Question</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      5 Marks
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg border border-border/10 bg-background/80">
                    <p className="font-medium">
                      Explain the concept of method overriding in Java. Provide an example to illustrate your answer.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/10">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-green-500">Model Answer</h4>
                        <p className="text-sm mt-1">
                          Method overriding in Java is a feature of object-oriented programming that allows a subclass
                          to provide a specific implementation of a method that is already defined in its superclass.
                          The overridden method in the subclass should have the same name, return type, and parameter
                          list as the method in the superclass.
                        </p>
                        <p className="text-sm mt-2">
                          <strong>Example:</strong>
                        </p>
                        <pre className="bg-muted p-2 rounded-md text-xs mt-1 overflow-x-auto">
                          <code>
                            {`// Parent class
class Animal {
  public void makeSound() {
      System.out.println("Animal makes a sound");
  }
}

// Child class
class Dog extends Animal {
  @Override
  public void makeSound() {
      System.out.println("Dog barks");
  }
}

// Usage
public class Main {
  public static void main(String[] args) {
      Animal myDog = new Dog();
      myDog.makeSound();  // Outputs: "Dog barks"
  }
}`}
                          </code>
                        </pre>
                        <p className="text-sm mt-2">
                          In this example, the <code>Dog</code> class overrides the <code>makeSound()</code> method from
                          the <code>Animal</code> class. When we create a <code>Dog</code> object and assign it to an{" "}
                          <code>Animal</code> reference, the overridden method in the <code>Dog</code> class is called,
                          demonstrating polymorphic behavior.
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 text-primary"
                          onClick={() =>
                            handleShowExplanation(
                              "Explain the concept of method overriding in Java. Provide an example to illustrate your answer.",
                              "Method overriding in Java is a feature of object-oriented programming that allows a subclass to provide a specific implementation of a method that is already defined in its superclass. The overridden method in the subclass should have the same name, return type, and parameter list as the method in the superclass.",
                            )
                          }
                        >
                          <Brain className="mr-1 h-4 w-4" />
                          Explain Further
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 rounded-full">
                      Previous Question
                    </Button>
                    <Button className="flex-1 rounded-full">Next Question</Button>
                  </div>
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
              <Button variant="outline" size="sm" className="rounded-full ml-auto">
                Report Issue
              </Button>
            </div>

            {/* Reference Materials - Now below the question */}
            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold">Reference Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <MediaSlider items={mediaItems} className="mb-4" />

                <div className="space-y-4">
                  <div className="p-3 rounded-lg border border-border/10 bg-background/80">
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span>Key Points</span>
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="mt-0.5">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                        </div>
                        <span>Method overriding is a runtime polymorphism feature.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-0.5">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                        </div>
                        <span>The @Override annotation is recommended but not required.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-0.5">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                        </div>
                        <span>Private, static, and final methods cannot be overridden.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg border border-border/10 bg-background/80">
                      <h4 className="font-medium flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-amber-500" />
                        <span>Related Topics</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-muted/50">
                          Method Overloading
                        </Badge>
                        <Badge variant="outline" className="bg-muted/50">
                          Inheritance
                        </Badge>
                        <Badge variant="outline" className="bg-muted/50">
                          Polymorphism
                        </Badge>
                        <Badge variant="outline" className="bg-muted/50">
                          Dynamic Binding
                        </Badge>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border border-border/10 bg-background/80">
                      <h4 className="font-medium flex items-center gap-2 mb-2">
                        <GraduationCap className="h-4 w-4 text-amber-500" />
                        <span>Exam Tips</span>
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="mt-0.5">
                            <AlertTriangle className="h-3 w-3 text-amber-500" />
                          </div>
                          <span>Always mention access modifiers in your answer</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-0.5">
                            <AlertTriangle className="h-3 w-3 text-amber-500" />
                          </div>
                          <span>Explain the difference between overriding and overloading</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/10">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        <Lightbulb className="h-4 w-4 text-amber-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-amber-500">Writing Tips</h4>
                        <ul className="mt-1 space-y-1 text-xs">
                          <li>Start with a clear definition of the concept</li>
                          <li>Provide a practical example with code</li>
                          <li>Explain the output or behavior of your example</li>
                          <li>Mention any rules or restrictions</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full rounded-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Ask AI for More Help
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="long-answer">
          <div className="space-y-8">
            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-bold">Long Answer Question</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      10 Marks
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg border border-border/10 bg-background/80">
                    <p className="font-medium">
                      Discuss the principles of object-oriented programming (OOP) in Java. Explain each principle with
                      appropriate examples and describe how they contribute to building robust and maintainable
                      software.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/10">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-green-500">Model Answer</h4>
                        <p className="text-sm mt-1">
                          Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects"
                          that contain data and code. Java is a class-based, object-oriented programming language that
                          implements OOP concepts. The four main principles of OOP in Java are:
                        </p>

                        <Accordion type="single" collapsible className="w-full mt-2">
                          <AccordionItem value="encapsulation" className="border-b border-border/10">
                            <AccordionTrigger className="text-sm font-medium">1. Encapsulation</AccordionTrigger>
                            <AccordionContent>
                              <p className="text-sm">
                                Encapsulation is the mechanism of hiding the internal state and requiring all
                                interaction to be performed through an object's methods. It protects the integrity of an
                                object's data by preventing direct access from outside the class.
                              </p>
                              <pre className="bg-muted p-2 rounded-md text-xs mt-2 overflow-x-auto">
                                <code>
                                  {`public class BankAccount {
  private double balance; // private field
  
  public double getBalance() {
      return balance;
  }
  
  public void deposit(double amount) {
      if (amount > 0) {
          balance += amount;
      }
  }
  
  public boolean withdraw(double amount) {
      if (amount > 0 && balance >= amount) {
          balance -= amount;
          return true;
      }
      return false;
  }
}`}
                                </code>
                              </pre>
                              <p className="text-sm mt-2">
                                In this example, the <code>balance</code> field is private and can only be accessed
                                through the public methods <code>getBalance()</code>, <code>deposit()</code>, and{" "}
                                <code>withdraw()</code>. This ensures that the balance can never be set to an invalid
                                value.
                              </p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="inheritance" className="border-b border-border/10">
                            <AccordionTrigger className="text-sm font-medium">2. Inheritance</AccordionTrigger>
                            <AccordionContent>
                              <p className="text-sm">
                                Inheritance is the mechanism by which one class can inherit the fields and methods of
                                another class. It promotes code reuse and establishes a relationship between a parent
                                class and its child classes.
                              </p>
                              <pre className="bg-muted p-2 rounded-md text-xs mt-2 overflow-x-auto">
                                <code>
                                  {`// Parent class
public class Vehicle {
  protected String brand;
  
  public Vehicle(String brand) {
      this.brand = brand;
  }
  
  public void start() {
      System.out.println("Vehicle starting");
  }
}

// Child class
public class Car extends Vehicle {
  private int numDoors;
  
  public Car(String brand, int numDoors) {
      super(brand); // Call parent constructor
      this.numDoors = numDoors;
  }
  
  @Override
  public void start() {
      System.out.println(brand + " car starting with " + numDoors + " doors");
  }
}`}
                                </code>
                              </pre>
                              <p className="text-sm mt-2">
                                Here, <code>Car</code> inherits from <code>Vehicle</code> and reuses its{" "}
                                <code>brand</code> field while adding its own <code>numDoors</code> field. It also
                                overrides the <code>start()</code> method to provide specific behavior.
                              </p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="polymorphism" className="border-b border-border/10">
                            <AccordionTrigger className="text-sm font-medium">3. Polymorphism</AccordionTrigger>
                            <AccordionContent>
                              <p className="text-sm">
                                Polymorphism allows objects of different classes to be treated as objects of a common
                                superclass. It enables a single interface to represent different underlying forms (data
                                types).
                              </p>
                              <pre className="bg-muted p-2 rounded-md text-xs mt-2 overflow-x-auto">
                                <code>
                                  {`public class VehicleDemo {
  public static void main(String[] args) {
      // Array of Vehicle references
      Vehicle[] vehicles = new Vehicle[2];
      vehicles[0] = new Car("Toyota", 4);      // Car object
      vehicles[1] = new Motorcycle("Honda");   // Motorcycle object
      
      // Polymorphic behavior
      for (Vehicle vehicle : vehicles) {
          vehicle.start(); // Calls the appropriate start() method
      }
  }
}`}
                                </code>
                              </pre>
                              <p className="text-sm mt-2">
                                In this example, both <code>Car</code> and <code>Motorcycle</code> objects are treated
                                as <code>Vehicle</code> objects. When <code>start()</code> is called, the appropriate
                                method is executed based on the actual object type, demonstrating polymorphism.
                              </p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="abstraction" className="border-b border-border/10">
                            <AccordionTrigger className="text-sm font-medium">4. Abstraction</AccordionTrigger>
                            <AccordionContent>
                              <p className="text-sm">
                                Abstraction is the concept of hiding complex implementation details and showing only the
                                necessary features of an object. It helps in reducing programming complexity and effort.
                              </p>
                              <pre className="bg-muted p-2 rounded-md text-xs mt-2 overflow-x-auto">
                                <code>
                                  {`// Abstract class
public abstract class Shape {
  abstract double calculateArea(); // Abstract method
  
  public void display() {
      System.out.println("Area: " + calculateArea());
  }
}

// Concrete implementation
public class Circle extends Shape {
  private double radius;
  
  public Circle(double radius) {
      this.radius = radius;
  }
  
  @Override
  double calculateArea() {
      return Math.PI * radius * radius;
  }
}`}
                                </code>
                              </pre>
                              <p className="text-sm mt-2">
                                Here, <code>Shape</code> is an abstract class that defines a common interface for all
                                shapes. The <code>calculateArea()</code> method is abstract, forcing subclasses to
                                provide their own implementation. The <code>Circle</code> class extends{" "}
                                <code>Shape</code> and implements the abstract method.
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>

                        <h5 className="font-medium mt-4">Contribution to Robust and Maintainable Software</h5>
                        <p className="text-sm mt-1">
                          These OOP principles contribute to building robust and maintainable software in several ways:
                        </p>
                        <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                          <li>
                            <strong>Encapsulation</strong> improves data security and prevents unintended modifications,
                            making the code more robust.
                          </li>
                          <li>
                            <strong>Inheritance</strong> promotes code reuse, reducing duplication and making the
                            codebase easier to maintain.
                          </li>
                          <li>
                            <strong>Polymorphism</strong> enables flexibility and extensibility, allowing new classes to
                            be added with minimal changes to existing code.
                          </li>
                          <li>
                            <strong>Abstraction</strong> simplifies complex systems by hiding implementation details,
                            making the code more understandable and maintainable.
                          </li>
                        </ul>
                        <p className="text-sm mt-2">
                          Together, these principles help create modular, flexible, and scalable software systems that
                          are easier to debug, test, and extend over time.
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 text-primary"
                          onClick={() =>
                            handleShowExplanation(
                              "Discuss the principles of object-oriented programming (OOP) in Java.",
                              "Object-Oriented Programming (OOP) is a programming paradigm based on the concept of 'objects' that contain data and code. The four main principles are encapsulation, inheritance, polymorphism, and abstraction.",
                            )
                          }
                        >
                          <Brain className="mr-1 h-4 w-4" />
                          Explain Further
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 rounded-full">
                      Previous Question
                    </Button>
                    <Button className="flex-1 rounded-full">Next Question</Button>
                  </div>
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
              <Button variant="outline" size="sm" className="rounded-full ml-auto">
                Report Issue
              </Button>
            </div>

            {/* Reference Materials - Now below the question */}
            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold">Reference Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <MediaSlider items={mediaItems} className="mb-4" />

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
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
                  </div>

                  <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/10">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        <Lightbulb className="h-4 w-4 text-amber-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-amber-500">Writing Tips</h4>
                        <ul className="mt-1 space-y-1 text-xs">
                          <li>Structure your answer with clear headings for each principle</li>
                          <li>Include practical examples with code snippets</li>
                          <li>Explain how each principle contributes to software quality</li>
                          <li>Conclude by summarizing the collective benefits of all principles</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full rounded-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Ask AI for More Help
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {showAIAssistant && currentQuestion && (
        <AIAssistant
          initialQuestion={currentQuestion.question}
          initialAnswer={currentQuestion.answer}
          onClose={() => setShowAIAssistant(false)}
        />
      )}
    </div>
  )
}

