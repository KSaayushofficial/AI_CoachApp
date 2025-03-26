"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Filter,
  GraduationCap,
  Search,
  Sparkles,
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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Image from "next/image";

export default function CourseSelectionPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  const handleCourseSelect = (course: string) => {
    setSelectedCourse(course);
    toast({
      title: "Course selected",
      description: `You've selected ${course}. Now choose a semester.`,
    });
  };

  const handleSemesterSelect = (semester: string) => {
    setSelectedSemester(semester);
    toast({
      title: "Semester selected",
      description: `You've selected Semester ${semester}. Now you can explore subjects.`,
    });
  };

  const courses = [
    {
      id: "bca",
      name: "BCA",
      fullName: "Bachelor of Computer Application",
      semesters: 8,
      subjects: 48,
      universities: [
        "Tribhuvan University",
        "Pokhara University",
        "Purbanchal University",
      ],
      color: "#3B82F6",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "bsccsit",
      name: "BSc. CSIT",
      fullName:
        "Bachelor of Science in Computer Science and Information Technology",
      semesters: 8,
      subjects: 52,
      universities: ["Tribhuvan University", "Kathmandu University"],
      color: "#10B981",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "bim",
      name: "BIM",
      fullName: "Bachelor of Information Management",
      semesters: 8,
      subjects: 45,
      universities: ["Tribhuvan University", "Pokhara University"],
      color: "#F59E0B",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "bit",
      name: "BIT",
      fullName: "Bachelor of Information Technology",
      semesters: 8,
      subjects: 46,
      universities: ["Purbanchal University", "Mid-Western University"],
      color: "#8B5CF6",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "be-computer",
      name: "BE Computer",
      fullName: "Bachelor of Engineering in Computer Engineering",
      semesters: 8,
      subjects: 56,
      universities: [
        "Tribhuvan University",
        "Kathmandu University",
        "Pokhara University",
      ],
      color: "#EC4899",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "mca",
      name: "MCA",
      fullName: "Master of Computer Application",
      semesters: 4,
      subjects: 24,
      universities: ["Tribhuvan University", "Pokhara University"],
      color: "#6366F1",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  const filteredCourses = courses.filter((course) => {
    if (searchQuery) {
      return (
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  const subjects = {
    bca: {
      "1": [
        { id: "c-programming", name: "C Programming", code: "BCA101" },
        { id: "digital-logic", name: "Digital Logic", code: "BCA102" },
        { id: "mathematics", name: "Mathematics I", code: "BCA103" },
        { id: "english", name: "English I", code: "BCA104" },
      ],
      "2": [
        {
          id: "data-structures",
          name: "Data Structures and Algorithms",
          code: "BCA201",
        },
        { id: "mathematics-ii", name: "Mathematics II", code: "BCA202" },
        { id: "microprocessor", name: "Microprocessor", code: "BCA203" },
        { id: "english-ii", name: "English II", code: "BCA204" },
      ],
      "3": [
        {
          id: "oop-java",
          name: "Object-Oriented Programming in Java",
          code: "BCA301",
        },
        {
          id: "computer-architecture",
          name: "Computer Architecture",
          code: "BCA302",
        },
        { id: "operating-systems", name: "Operating Systems", code: "BCA303" },
        { id: "numerical-methods", name: "Numerical Methods", code: "BCA304" },
      ],
      "4": [
        { id: "database", name: "Database Management Systems", code: "BCA401" },
        { id: "computer-networks", name: "Computer Networks", code: "BCA402" },
        { id: "computer-graphics", name: "Computer Graphics", code: "BCA403" },
        { id: "web-technology", name: "Web Technology", code: "BCA404" },
      ],
    },
    bsccsit: {
      "1": [
        { id: "c-programming", name: "Computer Programming", code: "CSC101" },
        { id: "digital-logic", name: "Digital Logic", code: "CSC102" },
        { id: "mathematics-i", name: "Mathematics I", code: "CSC103" },
        { id: "physics", name: "Physics", code: "CSC104" },
      ],
      "2": [
        {
          id: "discrete-structures",
          name: "Discrete Structures",
          code: "CSC201",
        },
        { id: "oop-cpp", name: "Object-Oriented Programming", code: "CSC202" },
        { id: "microprocessor", name: "Microprocessor", code: "CSC203" },
        { id: "mathematics-ii", name: "Mathematics II", code: "CSC204" },
      ],
    },
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
          <h1 className="text-3xl font-bold tracking-tight">
            Course Selection
          </h1>
          <p className="text-muted-foreground">
            Choose your course, semester, and subject to start your exam
            preparation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="outline" className="rounded-full">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search courses..."
            className="pl-10 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full md:w-auto rounded-full"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setActiveTab("all")}>
                All Courses
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("undergraduate")}>
                Undergraduate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("postgraduate")}>
                Postgraduate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex justify-center mb-8">
          <TabsList className="rounded-full">
            <TabsTrigger value="all" className="rounded-full">
              All Courses
            </TabsTrigger>
            <TabsTrigger value="undergraduate" className="rounded-full">
              Undergraduate
            </TabsTrigger>
            <TabsTrigger value="postgraduate" className="rounded-full">
              Postgraduate
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredCourses.map((course) => (
              <motion.div key={course.id} variants={item}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className={`h-full overflow-hidden border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 ${
                      selectedCourse === course.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handleCourseSelect(course.id)}
                  >
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge
                          className="bg-primary/10 text-primary border-primary/20"
                          style={{
                            backgroundColor: `${course.color}20`,
                            color: course.color,
                            borderColor: `${course.color}30`,
                          }}
                        >
                          {course.name}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6 flex flex-col h-full">
                      <h3 className="text-xl font-bold mb-2">
                        {course.fullName}
                      </h3>
                      <p className="text-muted-foreground mb-4 flex-grow">
                        {course.semesters} semesters • {course.subjects}{" "}
                        subjects
                      </p>
                      <div className="space-y-2 mt-auto">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Universities:
                          </span>
                          <span className="font-medium">
                            {course.universities.length}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {course.universities.map((university, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-muted/50 text-xs"
                            >
                              {university}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button
                        className="w-full rounded-full"
                        style={{
                          backgroundColor: course.color,
                          color: "white",
                          borderColor: "transparent",
                        }}
                        onClick={() => handleCourseSelect(course.id)}
                      >
                        Select Course
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="undergraduate">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredCourses
              .filter((course) => course.id !== "mca")
              .map((course) => (
                <motion.div key={course.id} variants={item}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      className={`h-full overflow-hidden border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 ${
                        selectedCourse === course.id
                          ? "ring-2 ring-primary"
                          : ""
                      }`}
                      onClick={() => handleCourseSelect(course.id)}
                    >
                      <div className="relative aspect-video overflow-hidden bg-muted">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <Badge
                            className="bg-primary/10 text-primary border-primary/20"
                            style={{
                              backgroundColor: `${course.color}20`,
                              color: course.color,
                              borderColor: `${course.color}30`,
                            }}
                          >
                            {course.name}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6 flex flex-col h-full">
                        <h3 className="text-xl font-bold mb-2">
                          {course.fullName}
                        </h3>
                        <p className="text-muted-foreground mb-4 flex-grow">
                          {course.semesters} semesters • {course.subjects}{" "}
                          subjects
                        </p>
                        <div className="space-y-2 mt-auto">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Universities:
                            </span>
                            <span className="font-medium">
                              {course.universities.length}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {course.universities.map((university, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-muted/50 text-xs"
                              >
                                {university}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Button
                          className="w-full rounded-full"
                          style={{
                            backgroundColor: course.color,
                            color: "white",
                            borderColor: "transparent",
                          }}
                          onClick={() => handleCourseSelect(course.id)}
                        >
                          Select Course
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="postgraduate">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredCourses
              .filter((course) => course.id === "mca")
              .map((course) => (
                <motion.div key={course.id} variants={item}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      className={`h-full overflow-hidden border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 ${
                        selectedCourse === course.id
                          ? "ring-2 ring-primary"
                          : ""
                      }`}
                      onClick={() => handleCourseSelect(course.id)}
                    >
                      <div className="relative aspect-video overflow-hidden bg-muted">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <Badge
                            className="bg-primary/10 text-primary border-primary/20"
                            style={{
                              backgroundColor: `${course.color}20`,
                              color: course.color,
                              borderColor: `${course.color}30`,
                            }}
                          >
                            {course.name}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6 flex flex-col h-full">
                        <h3 className="text-xl font-bold mb-2">
                          {course.fullName}
                        </h3>
                        <p className="text-muted-foreground mb-4 flex-grow">
                          {course.semesters} semesters • {course.subjects}{" "}
                          subjects
                        </p>
                        <div className="space-y-2 mt-auto">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Universities:
                            </span>
                            <span className="font-medium">
                              {course.universities.length}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {course.universities.map((university, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-muted/50 text-xs"
                              >
                                {university}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Button
                          className="w-full rounded-full"
                          style={{
                            backgroundColor: course.color,
                            color: "white",
                            borderColor: "transparent",
                          }}
                          onClick={() => handleCourseSelect(course.id)}
                        >
                          Select Course
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
          </motion.div>
        </TabsContent>
      </Tabs>

      {selectedCourse && (
        <div className="mt-8">
          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Select Semester
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Array.from({
                  length:
                    courses.find((c) => c.id === selectedCourse)?.semesters ||
                    8,
                }).map((_, i) => (
                  <Card
                    key={i}
                    className={`cursor-pointer border-border/10 bg-background/80 hover:bg-background transition-all ${
                      selectedSemester === String(i + 1)
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                    onClick={() => handleSemesterSelect(String(i + 1))}
                  >
                    <CardContent className="p-4 text-center">
                      <h3 className="text-lg font-bold">Semester {i + 1}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedCourse &&
        selectedSemester &&
        subjects[selectedCourse as keyof typeof subjects]?.[
          selectedSemester as keyof (typeof subjects)[keyof typeof subjects]
        ] && (
          <div className="mt-8">
            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Select Subject
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subjects[selectedCourse as keyof typeof subjects][
                    selectedSemester as keyof (typeof subjects)[keyof typeof subjects]
                  ].map((subject) => (
                    <Link
                      key={subject.id}
                      href={`/exam-prep?course=${selectedCourse}&semester=${selectedSemester}&subject=${subject.id}`}
                    >
                      <Card className="cursor-pointer border-border/10 bg-background/80 hover:bg-background transition-all hover:shadow-md">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                              <BookOpen className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-bold">{subject.name}</h3>
                              <p className="text-xs text-muted-foreground">
                                {subject.code}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full flex justify-end">
                  <Link
                    href={`/exam-prep?course=${selectedCourse}&semester=${selectedSemester}`}
                  >
                    <Button className="rounded-full">
                      Continue to Exam Prep
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        )}

      <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
            <span>AI Course Recommendation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 backdrop-blur-sm rounded-xl p-6 border border-border/10">
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-lg font-bold">
                    Not sure which course to choose?
                  </h3>
                  <p className="text-muted-foreground">
                    Let our AI recommend the best course based on your
                    interests, goals, and academic background.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Tell us about your interests and goals..."
                    className="rounded-full"
                  />
                  <Button className="rounded-full">Get Recommendation</Button>
                </div>

                <div className="p-3 rounded-lg bg-background/80 border border-border/10">
                  <p className="text-sm font-medium">Popular choices:</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 rounded-full text-xs"
                    >
                      I want to become a web developer
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 rounded-full text-xs"
                    >
                      I'm interested in data science
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 rounded-full text-xs"
                    >
                      I want to learn mobile app development
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
