"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Building,
  BookMarked,
  Search,
  Edit,
  Save,
  Brain,
  ChevronRight,
  Lightbulb,
  FileText,
  CheckCircle2,
  X,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  ExternalLink,
  Download,
  Bookmark,
  ChevronLeft,
  Share2,
  PanelLeftClose,
  PanelLeftOpen,
  BarChart,
  Award,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { AIAnswerGenerator } from "@/components/ai-answer-generator";
import { KnowledgeGlobe } from "@/components/knowledge-globe";
import { AnimatedButton } from "@/components/animated-button";
import { PageHeader } from "@/components/page-header";
import { ProgressChart } from "@/components/progress-chart";
import Link from "next/link";

export default function ExamPreparationPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [subject, setSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [activeTab, setActiveTab] = useState("mcq");
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarked, setBookmarked] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [difficulty, setDifficulty] = useState(50);
  const [showHints, setShowHints] = useState(true);
  const [showExplanations, setShowExplanations] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Refs for scroll animations
  const progressRef = useRef(null);
  const isProgressInView = useInView(progressRef, { once: true });

  // Sample chapters data - would be fetched based on subject selection
  const [chapters, setChapters] = useState([]);

  // Sample questions data - would be fetched based on chapter selection
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle subject selection
  useEffect(() => {
    if (subject) {
      // Simulate fetching chapters for the selected subject
      const fetchedChapters = [
        {
          id: "ch1",
          name: "Chapter 1: Introduction to OOP",
          subject: "OOP in Java",
          progress: 85,
        },
        {
          id: "ch2",
          name: "Chapter 2: Classes and Objects",
          subject: "OOP in Java",
          progress: 70,
        },
        {
          id: "ch3",
          name: "Chapter 3: Inheritance",
          subject: "OOP in Java",
          progress: 60,
        },
        {
          id: "ch4",
          name: "Chapter 4: Polymorphism",
          subject: "OOP in Java",
          progress: 45,
        },
        {
          id: "ch5",
          name: "Chapter 5: Abstaractin",
          subject: "OOP in Java",
          progress: 30,
        },
        {
          id: "ch6",
          name: "Chapter 6: Encapsulation",
          subject: "OOP in Java",
          progress: 20,
        },
        {
          id: "ch7",
          name: "Chapter 7: Interfaces",
          subject: "OOP in Java",
          progress: 10,
        },
        {
          id: "ch8",
          name: "Chapter 8: Exception Handling",
          subject: "OOP in Java",
          progress: 5,
        },
      ];
      setChapters(fetchedChapters);
      setSelectedChapter(""); // Reset selected chapter
    } else {
      setChapters([]);
    }
  }, [subject]);

  // Handle chapter selection
  useEffect(() => {
    if (selectedChapter) {
      // Simulate fetching questions for the selected chapter
      const fetchedQuestions = [
        {
          id: "q1",
          type: "mcq",
          text: "Which of the following is a characteristic of polymorphism in object-oriented programming?",
          options: [
            {
              id: "a",
              text: "It restricts a derived class from overriding methods of its base class.",
              isCorrect: false,
            },
            {
              id: "b",
              text: "It allows objects of different classes to be treated as objects of a common superclass.",
              isCorrect: true,
            },
            {
              id: "c",
              text: "It ensures that all classes in a program must inherit from a single base class.",
              isCorrect: false,
            },
            {
              id: "d",
              text: "It prevents a class from implementing multiple interfaces.",
              isCorrect: false,
            },
          ],
          explanation:
            "Polymorphism allows objects of different classes to be treated as objects of a common superclass. This is a fundamental concept in object-oriented programming that enables method overriding and dynamic binding.",
        },
        {
          id: "q2",
          type: "short-answer",
          text: "Explain the concept of method overriding in Java. Provide an example to illustrate your answer.",
          modelAnswer:
            'Method overriding in Java is a feature of object-oriented programming that allows a subclass to provide a specific implementation of a method that is already defined in its superclass. The overridden method in the subclass should have the same name, return type, and parameter list as the method in the superclass.\n\nExample:\n```java\n// Parent class\nclass Animal {\n  public void makeSound() {\n    System.out.println("Animal makes a sound");\n  }\n}\n\n// Child class\nclass Dog extends Animal {\n  @Override\n  public void makeSound() {\n    System.out.println("Dog barks");\n  }\n}\n\n// Usage\npublic class Main {\n  public static void main(String[] args) {\n    Animal myDog = new Dog();\n    myDog.makeSound();  // Outputs: "Dog barks"\n  }\n}\n```\n\nIn this example, the `Dog` class overrides the `makeSound()` method from the `Animal` class. When we create a `Dog` object and assign it to an `Animal` reference, the overridden method in the `Dog` class is called, demonstrating polymorphic behavior.',
        },
        {
          id: "q3",
          type: "long-answer",
          text: "Discuss the principles of object-oriented programming (OOP) in Java. Explain each principle with appropriate examples and describe how they contribute to building robust and maintainable software.",
          modelAnswer:
            'Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects" that contain data and code. Java is a class-based, object-oriented programming language that implements OOP concepts. The four main principles of OOP in Java are:\n\n1. Encapsulation\nEncapsulation is the mechanism of hiding the internal state and requiring all interaction to be performed through an object\'s methods. It protects the integrity of an object\'s data by preventing direct access from outside the class.\n\nExample:\n```java\npublic class BankAccount {\n  private double balance; // private field\n\n  public double getBalance() {\n    return balance;\n  }\n\n  public void deposit(double amount) {\n    if (amount > 0) {\n      balance += amount;\n    }\n  }\n\n  public boolean withdraw(double amount) {\n    if (amount > 0 && balance >= amount) {\n      balance -= amount;\n      return true;\n    }\n    return false;\n  }\n}\n```\n\nIn this example, the `balance` field is private and can only be accessed through the public methods `getBalance()`, `deposit()`, and `withdraw()`. This ensures that the balance can never be set to an invalid value.\n\n2. Inheritance\nInheritance is the mechanism by which one class can inherit the fields and methods of another class. It promotes code reuse and establishes a relationship between a parent class and its child classes.\n\nExample:\n```java\n// Parent class\npublic class Vehicle {\n  protected String brand;\n\n  public Vehicle(String brand) {\n    this.brand = brand;\n  }\n\n  public void start() {\n    System.out.println("Vehicle starting");\n  }\n}\n\n// Child class\npublic class Car extends Vehicle {\n  private int numDoors;\n\n  public Car(String brand, int numDoors) {\n    super(brand); // Call parent constructor\n    this.numDoors = numDoors;\n  }\n\n  @Override\n  public void start() {\n    System.out.println(brand + " car starting with " + numDoors + " doors");\n  }\n}\n```\n\nHere, `Car` inherits from `Vehicle` and reuses its `brand` field while adding its own `numDoors` field. It also overrides the `start()` method to provide specific behavior.\n\n3. Polymorphism\nPolymorphism allows objects of different classes to be treated as objects of a common superclass. It enables a single interface to represent different underlying forms (data types).\n\nExample:\n```java\npublic class VehicleDemo {\n  public static void main(String[] args) {\n    // Array of Vehicle references\n    Vehicle[] vehicles = new Vehicle[2];\n    vehicles[0] = new Car("Toyota", 4);      // Car object\n    vehicles[1] = new Motorcycle("Honda");   // Motorcycle object\n    \n    // Polymorphic behavior\n    for (Vehicle vehicle : vehicles) {\n      vehicle.start(); // Calls the appropriate start() method\n    }\n  }\n}\n```\n\nIn this example, both `Car` and `Motorcycle` objects are treated as `Vehicle` objects. When `start()` is called, the appropriate method is executed based on the actual object type, demonstrating polymorphism.\n\n4. Abstraction\nAbstraction is the concept of hiding complex implementation details and showing only the necessary features of an object. It helps in reducing programming complexity and effort.\n\nExample:\n```java\n// Abstract class\npublic abstract class Shape {\n  abstract double calculateArea(); // Abstract method\n\n  public void display() {\n    System.out.println("Area: " + calculateArea());\n  }\n}\n\n// Concrete implementation\npublic class Circle extends Shape {\n  private double radius;\n\n  public Circle(double radius) {\n    this.radius = radius;\n  }\n\n  @Override\n  double calculateArea() {\n    return Math.PI * radius * radius;\n  }\n}\n```\n\nHere, `Shape` is an abstract class that defines a common interface for all shapes. The `calculateArea()` method is abstract, forcing subclasses to provide their own implementation. The `Circle` class extends `Shape` and implements the abstract method.\n\nContribution to Robust and Maintainable Software:\nThese OOP principles contribute to building robust and maintainable software in several ways:\n\n- Encapsulation improves data security and prevents unintended modifications, making the code more robust.\n- Inheritance promotes code reuse, reducing duplication and making the codebase easier to maintain.\n- Polymorphism enables flexibility and extensibility, allowing new classes to be added with minimal changes to existing code.\n- Abstraction simplifies complex systems by hiding implementation details, making the code more understandable and maintainable.\n\nTogether, these principles help create modular, flexible, and scalable software systems that are easier to debug, test, and extend over time.',
        },
      ];
      setQuestions(fetchedQuestions);
      setQuestionIndex(0);
      setSelectedAnswer("");
      setAnswerSubmitted(false);
    } else {
      setQuestions([]);
    }
  }, [selectedChapter]);

  const handleSelectChapter = (chapterId) => {
    setSelectedChapter(chapterId);
  };

  const handleGenerateAnswer = (questionText) => {
    setCurrentQuestion(questionText);
    setShowAIGenerator(true);
  };

  const handleEditQuestion = () => {
    if (editMode) {
      // Save edited question
      toast({
        title: "Question updated",
        description: "Your changes have been saved successfully.",
      });
      setEditMode(false);
    } else {
      // Enter edit mode
      setEditedQuestion(
        questions.find((q) => q.type === activeTab)?.text || ""
      );
      setEditMode(true);
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "Bookmark removed" : "Bookmark added",
      description: bookmarked
        ? "This question has been removed from your bookmarks."
        : "This question has been added to your bookmarks.",
    });
  };

  const handleNextQuestion = () => {
    if (
      questionIndex <
      questions.filter((q) => q.type === activeTab).length - 1
    ) {
      setQuestionIndex(questionIndex + 1);
      setSelectedAnswer("");
      setAnswerSubmitted(false);
    } else {
      toast({
        title: "End of questions",
        description:
          "You've reached the end of the questions for this chapter.",
      });
    }
  };

  const handlePreviousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      setSelectedAnswer("");
      setAnswerSubmitted(false);
    } else {
      toast({
        title: "First question",
        description: "You're already at the first question for this chapter.",
      });
    }
  };

  const handleAnswerSubmit = () => {
    if (!selectedAnswer && activeTab === "mcq") {
      toast({
        title: "No answer selected",
        description: "Please select an answer before submitting.",
        variant: "destructive",
      });
      return;
    }

    setAnswerSubmitted(true);

    // Check if answer is correct for MCQ
    if (activeTab === "mcq") {
      const currentQuestion = questions.filter((q) => q.type === activeTab)[
        questionIndex
      ];
      const isCorrect = currentQuestion.options.find(
        (o) => o.id === selectedAnswer
      )?.isCorrect;

      if (isCorrect) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);

        toast({
          title: "Correct!",
          description: "Great job! That's the right answer.",
        });
      } else {
        toast({
          title: "Incorrect",
          description:
            "That's not right. Review the explanation to learn more.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Answer submitted",
        description: "Your answer has been submitted for review.",
      });
    }
  };

  // Filter questions based on the active tab
  const filteredQuestions = questions.filter((q) => q.type === activeTab);
  const currentQuestionData = filteredQuestions[questionIndex] || null;

  // Media items for reference section
  const mediaItems = [
    {
      type: "video",
      title: "Understanding Object-Oriented Programming",
      src: "https://www.youtube.com/embed/PFmuCDHHpwk",
      thumbnail: "/placeholder.svg?height=200&width=320",
    },
    {
      type: "image",
      title: "Java Class Hierarchy Diagram",
      src: "/placeholder.svg?height=200&width=320",
    },
    {
      type: "video",
      title: "Inheritance vs Polymorphism",
      src: "https://www.youtube.com/embed/0xw06loTm1k",
      thumbnail: "/placeholder.svg?height=200&width=320",
    },
    {
      type: "image",
      title: "Method Overriding Example",
      src: "/placeholder.svg?height=200&width=320",
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

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  // Confetti component
  const Confetti = () => {
    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              top: "-10%",
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
              borderRadius: "50%",
            }}
            animate={{
              top: "100%",
              rotate: Math.random() * 360,
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              ease: "easeOut",
            }}
          />
        ))}
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
          <p className="text-muted-foreground">Loading exam preparation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      {showConfetti && <Confetti />}

      <PageHeader
        title="Exam Preparation"
        description="Practice with AI-generated questions for Nepali university courses and get instant feedback to improve your exam performance."
        icon={<GraduationCap className="h-6 w-6 text-primary" />}
      >
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
          <Link href="/interview-preparation">
            <Button className="rounded-full">
              <MessageSquare className="mr-2 h-4 w-4" />
              Interview Prep
            </Button>
          </Link>
        </div>
      </PageHeader>

      {/* Selection Section */}
      <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold flex items-center">
            <Building className="h-5 w-5 mr-2 text-primary" />
            Course Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
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
          </div>

          {/* Additional Options */}
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="difficulty">
                Difficulty Level: {difficulty}%
              </Label>
              <Slider
                id="difficulty"
                min={0}
                max={100}
                step={5}
                value={[difficulty]}
                onValueChange={(value) => setDifficulty(value[0])}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="show-hints"
                checked={showHints}
                onCheckedChange={setShowHints}
              />
              <Label htmlFor="show-hints">Show Hints</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="show-explanations"
                checked={showExplanations}
                onCheckedChange={setShowExplanations}
              />
              <Label htmlFor="show-explanations">Show Explanations</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Knowledge Globe */}
      {subject && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-[300px] rounded-xl overflow-hidden border border-border/10 bg-background/50 backdrop-blur-md shadow-md"
        >
          <KnowledgeGlobe subject={subject} />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-24"></div>
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <h3 className="text-lg font-bold text-primary">
              Knowledge Network
            </h3>
            <p className="text-sm text-muted-foreground">
              Explore how concepts in{" "}
              {subject
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}{" "}
              are interconnected
            </p>
          </div>
        </motion.div>
      )}

      {/* Main Content Area */}
      {subject && (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Chapter Sidebar - Collapsible */}
          <div
            className={`${
              sidebarCollapsed ? "lg:col-span-1" : "lg:col-span-3"
            } transition-all duration-300`}
          >
            {sidebarCollapsed ? (
              <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md sticky top-24">
                <CardContent className="p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full mb-4"
                    onClick={() => setSidebarCollapsed(false)}
                  >
                    <PanelLeftOpen className="h-5 w-5" />
                    <span className="sr-only">Expand sidebar</span>
                  </Button>
                  <div className="space-y-4">
                    {chapters.map((chapter) => (
                      <TooltipProvider key={chapter.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant={
                                selectedChapter === chapter.id
                                  ? "default"
                                  : "ghost"
                              }
                              size="icon"
                              className="rounded-full w-10 h-10"
                              onClick={() => handleSelectChapter(chapter.id)}
                            >
                              {chapter.id.replace("ch", "")}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{chapter.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md sticky top-24">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-bold flex items-center">
                      <BookMarked className="h-5 w-5 mr-2 text-primary" />
                      <span>Chapters</span>
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        {chapters.length} Chapters
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => setSidebarCollapsed(true)}
                      >
                        <PanelLeftClose className="h-4 w-4" />
                        <span className="sr-only">Collapse sidebar</span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search chapters..."
                        className="pl-10 pr-4"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <div className="p-3 rounded-lg border border-primary/20 bg-primary/5">
                      <div className="flex items-start gap-2">
                        <GraduationCap className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">
                            {subject
                              .split("-")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Your progress: 45% complete
                          </p>
                          <Progress value={45} className="h-1.5 mt-2" />
                        </div>
                      </div>
                    </div>

                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                      className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1"
                    >
                      {chapters
                        .filter((chapter) =>
                          chapter.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        )
                        .map((chapter) => (
                          <motion.div
                            key={chapter.id}
                            variants={itemVariants}
                            whileHover={{ x: 3 }}
                            className={`flex items-center justify-between p-2.5 rounded-md cursor-pointer transition-colors ${
                              selectedChapter === chapter.id
                                ? "bg-primary/15 text-primary font-medium"
                                : "hover:bg-muted/50"
                            }`}
                            onClick={() => handleSelectChapter(chapter.id)}
                          >
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4" />
                              <span className="text-sm">{chapter.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">
                                {chapter.progress}%
                              </span>
                              <Progress
                                value={chapter.progress}
                                className="w-16 h-1.5"
                              />
                              {selectedChapter === chapter.id && (
                                <ChevronRight className="h-4 w-4 text-primary" />
                              )}
                            </div>
                          </motion.div>
                        ))}

                      {chapters.filter((chapter) =>
                        chapter.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      ).length === 0 && (
                        <div className="text-center py-4 text-muted-foreground text-sm">
                          No chapters found matching "{searchQuery}"
                        </div>
                      )}
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Questions and References */}
          <div
            className={`${
              sidebarCollapsed ? "lg:col-span-11" : "lg:col-span-9"
            } space-y-6 transition-all duration-300`}
          >
            {selectedChapter ? (
              <>
                {/* Question Tabs */}
                <Tabs
                  defaultValue="mcq"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <div className="flex justify-center mb-6">
                    <TabsList className="rounded-full">
                      <TabsTrigger value="mcq" className="rounded-full">
                        Multiple Choice
                      </TabsTrigger>
                      <TabsTrigger
                        value="short-answer"
                        className="rounded-full"
                      >
                        Short Answer
                      </TabsTrigger>
                      <TabsTrigger value="long-answer" className="rounded-full">
                        Long Answer
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  {/* Question Content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab + questionIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="grid gap-6 lg:grid-cols-2">
                        {/* Question Section */}
                        <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-xl font-bold flex items-center">
                                {activeTab === "mcq" ? (
                                  <>
                                    <BarChart className="h-5 w-5 mr-2 text-blue-500" />{" "}
                                    Multiple Choice Question
                                  </>
                                ) : activeTab === "short-answer" ? (
                                  <>
                                    <FileText className="h-5 w-5 mr-2 text-green-500" />{" "}
                                    Short Answer Question
                                  </>
                                ) : (
                                  <>
                                    <BookOpen className="h-5 w-5 mr-2 text-amber-500" />{" "}
                                    Long Answer Question
                                  </>
                                )}
                              </CardTitle>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className={`h-8 w-8 rounded-full ${
                                    bookmarked ? "text-amber-500" : ""
                                  }`}
                                  onClick={handleBookmark}
                                >
                                  <Bookmark
                                    className={`h-4 w-4 ${
                                      bookmarked ? "fill-amber-500" : ""
                                    }`}
                                  />
                                  <span className="sr-only">Bookmark</span>
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-full"
                                  onClick={handleEditQuestion}
                                >
                                  {editMode ? (
                                    <>
                                      <Save className="mr-2 h-4 w-4" />
                                      Save
                                    </>
                                  ) : (
                                    <>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-6">
                              {/* Question Number */}
                              <div className="flex justify-between items-center">
                                <Badge
                                  variant="outline"
                                  className="bg-primary/10 text-primary border-primary/20"
                                >
                                  Question {questionIndex + 1} of{" "}
                                  {filteredQuestions.length}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className={`
                                  ${
                                    difficulty < 30
                                      ? "bg-green-500/10 text-green-500 border-green-500/20"
                                      : difficulty < 70
                                      ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                      : "bg-red-500/10 text-red-500 border-red-500/20"
                                  }
                                `}
                                >
                                  {difficulty < 30
                                    ? "Easy"
                                    : difficulty < 70
                                    ? "Medium"
                                    : "Hard"}
                                </Badge>
                              </div>

                              {/* Question Text */}
                              <div className="p-4 rounded-lg border border-border/10 bg-background/80">
                                {editMode ? (
                                  <Textarea
                                    value={editedQuestion}
                                    onChange={(e) =>
                                      setEditedQuestion(e.target.value)
                                    }
                                    className="min-h-[100px]"
                                  />
                                ) : (
                                  <p className="font-medium">
                                    {currentQuestionData?.text ||
                                      "No question available for this chapter."}
                                  </p>
                                )}
                              </div>

                              {/* Question Content Based on Type */}
                              {currentQuestionData && activeTab === "mcq" && (
                                <RadioGroup
                                  value={selectedAnswer}
                                  onValueChange={setSelectedAnswer}
                                  className="space-y-3"
                                  disabled={answerSubmitted}
                                >
                                  {currentQuestionData.options.map((option) => (
                                    <div
                                      key={option.id}
                                      className={`flex items-center space-x-2 p-3 rounded-lg border ${
                                        answerSubmitted
                                          ? option.isCorrect
                                            ? "border-green-500 bg-green-500/10"
                                            : option.id === selectedAnswer
                                            ? "border-red-500 bg-red-500/10"
                                            : "border-border/10 bg-background/80"
                                          : "border-border/10 bg-background/80 hover:border-primary/30 hover:bg-primary/5"
                                      }`}
                                    >
                                      <RadioGroupItem
                                        value={option.id}
                                        id={`option-${option.id}`}
                                      />
                                      <Label
                                        htmlFor={`option-${option.id}`}
                                        className="flex-1 cursor-pointer"
                                      >
                                        {option.text}
                                      </Label>
                                      {answerSubmitted &&
                                        (option.isCorrect ? (
                                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                                        ) : option.id === selectedAnswer ? (
                                          <X className="h-5 w-5 text-red-500" />
                                        ) : null)}
                                    </div>
                                  ))}
                                </RadioGroup>
                              )}

                              {currentQuestionData &&
                                activeTab === "short-answer" &&
                                !answerSubmitted && (
                                  <div className="space-y-2">
                                    <Label htmlFor="short-answer">
                                      Your Answer
                                    </Label>
                                    <Textarea
                                      id="short-answer"
                                      placeholder="Type your answer here..."
                                      className="min-h-[150px]"
                                      value={selectedAnswer}
                                      onChange={(e) =>
                                        setSelectedAnswer(e.target.value)
                                      }
                                    />
                                  </div>
                                )}

                              {currentQuestionData &&
                                activeTab === "long-answer" &&
                                !answerSubmitted && (
                                  <div className="space-y-2">
                                    <Label htmlFor="long-answer">
                                      Your Answer
                                    </Label>
                                    <Textarea
                                      id="long-answer"
                                      placeholder="Type your answer here..."
                                      className="min-h-[200px]"
                                      value={selectedAnswer}
                                      onChange={(e) =>
                                        setSelectedAnswer(e.target.value)
                                      }
                                    />
                                  </div>
                                )}

                              {/* Model Answer (after submission) */}
                              {currentQuestionData &&
                                answerSubmitted &&
                                (activeTab === "short-answer" ||
                                  activeTab === "long-answer") && (
                                  <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/10">
                                    <div className="flex items-start gap-2">
                                      <div className="mt-0.5">
                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                      </div>
                                      <div>
                                        <h4 className="font-medium text-green-500">
                                          Model Answer
                                        </h4>
                                        <div className="text-sm mt-1 whitespace-pre-wrap">
                                          {currentQuestionData.modelAnswer}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                              {/* Explanation */}
                              {currentQuestionData &&
                                answerSubmitted &&
                                activeTab === "mcq" &&
                                showExplanations && (
                                  <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/10">
                                    <div className="flex items-start gap-2">
                                      <div className="mt-0.5">
                                        <Lightbulb className="h-5 w-5 text-green-500" />
                                      </div>
                                      <div>
                                        <h4 className="font-medium text-green-500">
                                          Explanation
                                        </h4>
                                        <p className="text-sm mt-1">
                                          {currentQuestionData.explanation}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}

                              {/* Submit Button (if not submitted) */}
                              {currentQuestionData && !answerSubmitted && (
                                <AnimatedButton
                                  onClick={handleAnswerSubmit}
                                  className="w-full"
                                >
                                  <CheckCircle2 className="mr-2 h-4 w-4" />
                                  Submit Answer
                                </AnimatedButton>
                              )}

                              {/* AI Answer Generation Button (if submitted) */}
                              {currentQuestionData && answerSubmitted && (
                                <AnimatedButton
                                  onClick={() =>
                                    handleGenerateAnswer(
                                      currentQuestionData?.text || "No question available for this chapter."
                                    )
                                  }
                                  className="w-full"
                                >
                                  <Brain className="mr-2 h-4 w-4" />
                                  Generate AI Answer
                                </AnimatedButton>
                              )}

                              {/* Navigation Buttons */}
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  className="flex-1 rounded-full"
                                  onClick={handlePreviousQuestion}
                                  disabled={questionIndex === 0}
                                >
                                  <ChevronLeft className="mr-2 h-4 w-4" />
                                  Previous
                                </Button>
                                <Button
                                  className="flex-1 rounded-full"
                                  onClick={handleNextQuestion}
                                  disabled={
                                    questionIndex ===
                                    filteredQuestions.length - 1
                                  }
                                >
                                  Next
                                  <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex gap-2 pt-0">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full"
                            >
                              <ThumbsUp className="mr-2 h-4 w-4" />
                              Helpful
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full"
                            >
                              <ThumbsDown className="mr-2 h-4 w-4" />
                              Not Helpful
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full ml-auto"
                            >
                              <Share2 className="mr-2 h-4 w-4" />
                              Share
                            </Button>
                          </CardFooter>
                        </Card>

                        {/* Reference Section */}
                        <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-bold flex items-center">
                              <FileText className="h-5 w-5 mr-2 text-primary" />
                              Reference Materials
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {/* Media Items */}
                              <div className="grid grid-cols-2 gap-2">
                                {mediaItems.map((item, index) => (
                                  <div
                                    key={index}
                                    className="relative rounded-md overflow-hidden border border-border/10 aspect-video"
                                  >
                                    {item.type === "video" ? (
                                      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="rounded-full bg-primary/90 text-white"
                                        >
                                          <ExternalLink className="h-4 w-4" />
                                        </Button>
                                        <img
                                          src={
                                            item.thumbnail || "/placeholder.svg"
                                          }
                                          alt={item.title}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    ) : (
                                      <img
                                        src={item.src || "/placeholder.svg"}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                      />
                                    )}
                                  </div>
                                ))}
                              </div>

                              {/* Key Concepts */}
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
                                    <span>
                                      Polymorphism is derived from Greek words:
                                      "poly" (many) and "morphs" (forms).
                                    </span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <div className="mt-0.5">
                                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                                    </div>
                                    <span>
                                      Two main types: Compile-time (method
                                      overloading) and Runtime (method
                                      overriding).
                                    </span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <div className="mt-0.5">
                                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                                    </div>
                                    <span>
                                      Enables code reusability and flexibility
                                      in object-oriented design.
                                    </span>
                                  </li>
                                </ul>
                              </div>

                              {/* Example Code */}
                              <div className="p-3 rounded-lg border border-border/10 bg-background/80">
                                <h4 className="font-medium flex items-center gap-2 mb-2">
                                  <FileText className="h-4 w-4 text-amber-500" />
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

                              {/* Study Tip */}
                              <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/10">
                                <div className="flex items-start gap-2">
                                  <div className="mt-0.5">
                                    <Lightbulb className="h-4 w-4 text-amber-500" />
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium text-amber-500">
                                      Study Tip
                                    </h4>
                                    <p className="text-xs mt-1">
                                      Focus on understanding the practical
                                      applications of polymorphism in real-world
                                      scenarios to better grasp the concept. Try
                                      implementing a simple program that
                                      demonstrates polymorphism with different
                                      classes.
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Additional Resources */}
                              <div className="grid grid-cols-2 gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-full"
                                >
                                  <Download className="mr-2 h-4 w-4" />
                                  Download Notes
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-full"
                                >
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  Discuss Topic
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </Tabs>

                {/* Progress Section */}
                <motion.div
                  ref={progressRef}
                  initial="hidden"
                  animate={isProgressInView ? "visible" : "hidden"}
                  variants={fadeInVariants}
                  className="mt-8"
                >
                  <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl font-bold flex items-center">
                        <Award className="h-5 w-5 mr-2 text-primary" />
                        Your Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h3 className="text-lg font-medium mb-4">
                            Chapter Performance
                          </h3>
                          <div className="h-[250px]">
                            <ProgressChart />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">
                            Question Types Mastery
                          </h3>

                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Multiple Choice Questions</span>
                                <span className="font-medium">85%</span>
                              </div>
                              <div className="h-2 rounded-full bg-muted overflow-hidden">
                                <motion.div
                                  className="h-full bg-blue-500 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: "85%" }}
                                  transition={{ duration: 1, delay: 0.2 }}
                                />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Short Answer Questions</span>
                                <span className="font-medium">65%</span>
                              </div>
                              <div className="h-2 rounded-full bg-muted overflow-hidden">
                                <motion.div
                                  className="h-full bg-green-500 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: "65%" }}
                                  transition={{ duration: 1, delay: 0.4 }}
                                />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Long Answer Questions</span>
                                <span className="font-medium">45%</span>
                              </div>
                              <div className="h-2 rounded-full bg-muted overflow-hidden">
                                <motion.div
                                  className="h-full bg-amber-500 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: "45%" }}
                                  transition={{ duration: 1, delay: 0.6 }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 mt-4">
                            <h4 className="font-medium flex items-center gap-2 mb-2">
                              <Zap className="h-4 w-4 text-primary" />
                              <span>AI Recommendation</span>
                            </h4>
                            <p className="text-sm">
                              Focus on improving your long answer questions by
                              practicing more essay-type responses. Your
                              understanding of core concepts is strong, but you
                              need to work on articulating complex ideas in
                              longer formats.
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-3 rounded-full"
                            >
                              <Brain className="mr-2 h-4 w-4" />
                              Get Personalized Study Plan
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </>
            ) : (
              <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <BookMarked className="h-16 w-16 text-primary mb-4 opacity-50" />
                  <h3 className="text-xl font-bold mb-2">Select a Chapter</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Choose a chapter from the sidebar to view questions and
                    start your exam preparation.
                  </p>
                  <AnimatedButton>
                    <ChevronRight className="mr-2 h-4 w-4" />
                    Browse Chapters
                  </AnimatedButton>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* AI Answer Generator */}
      {showAIGenerator && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <AIAnswerGenerator
            question={currentQuestion}
            onClose={() => setShowAIGenerator(false)}
          />
        </motion.div>
      )}
    </div>
  );
}
