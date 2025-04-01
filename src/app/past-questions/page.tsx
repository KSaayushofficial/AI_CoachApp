"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface Subject {
  code: string;
  name: string;
  subject: string;
}

interface Semester {
  [key: string]: Subject[];
}

interface Course {
  name: string;
  semesters: Semester;
}

interface Courses {
  [key: string]: Course;
}

interface Paper {
  id: string;
  title: string;
  university: string;
  year: string;
  semester: string;
  semesterNum: string;
  questions: number;
  duration: string;
  downloads: number;
  color: string;
  course: string;
  subject: string;
  code: string;
  previewLink: string;
  downloadLink: string;
}

interface DriveLinks {
  [course: string]: {
    [semester: string]: {
      [subject: string]: {
        [year: string]: {
          preview: string;
          download: string;
        };
      };
    };
  };
}

const courses: Courses = {
  bca: {
    name: "BCA",
    semesters: {
      "1": [
        {
          code: "CACS101",
          name: "Computer Fundamentals & Applications",
          subject: "cfa",
        },
        {
          code: "CASO102",
          name: "Society and Technology",
          subject: "society-tech",
        },
        { code: "CAEN103", name: "English", subject: "english" },
        { code: "CAMT104", name: "Mathematics I", subject: "math1" },
        { code: "CACS105", name: "Digital Logic", subject: "digital-logic" },
      ],
      "2": [
        { code: "CACS151", name: "C Programming", subject: "c-programming" },
        {
          code: "CAAC152",
          name: "Financial Accounting",
          subject: "accounting",
        },
        { code: "CAEN153", name: "English III", subject: "english3" },
        { code: "CAMT154", name: "Mathematics II", subject: "math2" },
        {
          code: "CACS155",
          name: "Microprocessor and Computer Architecture",
          subject: "microprocessor",
        },
      ],
      "3": [
        {
          code: "CACS201",
          name: "Data Structures and Algorithms",
          subject: "dsa",
        },
        { code: "CAAC202", name: "Business Statistics", subject: "statistics" },
        {
          code: "CAEN203",
          name: "Business Communication",
          subject: "business-com",
        },
        { code: "CAMT204", name: "Mathematics III", subject: "math3" },
        { code: "CACS205", name: "System Analysis and Design", subject: "sad" },
      ],
      "4": [
        {
          code: "CACS251",
          name: "Object Oriented Programming",
          subject: "oop-java",
        },
        { code: "CACS252", name: "Web Technology", subject: "web-tech" },
        { code: "CACS253", name: "Operating System", subject: "os" },
        {
          code: "CACS254",
          name: "Database Management System",
          subject: "dbms",
        },
        { code: "CACS255", name: "Numerical Methods", subject: "numerical" },
      ],
      "5": [
        { code: "CACS301", name: "Computer Networks", subject: "networks" },
        {
          code: "CACS302",
          name: "Software Engineering",
          subject: "software-eng",
        },
        { code: "CACS303", name: "Computer Graphics", subject: "graphics" },
        { code: "CACS304", name: "Artificial Intelligence", subject: "ai" },
        { code: "CACS305", name: "E-Commerce", subject: "ecommerce" },
      ],
      "6": [
        {
          code: "CACS351",
          name: "Internet Technology",
          subject: "internet-tech",
        },
        { code: "CACS352", name: "Computer Security", subject: "security" },
        { code: "CACS353", name: "Distributed System", subject: "distributed" },
        { code: "CACS354", name: "Cloud Computing", subject: "cloud" },
        { code: "CACS355", name: "Project Work", subject: "project" },
      ],
    },
  },
  csit: {
    name: "BSc.CSIT",
    semesters: {
      "1": [
        {
          code: "CSC101",
          name: "Introduction to Information Technology",
          subject: "intro-it",
        },
        { code: "CSC102", name: "C Programming", subject: "c-programming" },
        { code: "MTH104", name: "Mathematics I", subject: "math1" },
        { code: "PHY103", name: "Physics", subject: "physics" },
        { code: "STA103", name: "Statistics I", subject: "stats1" },
      ],
      "2": [
        { code: "CSC151", name: "Digital Logic", subject: "digital-logic" },
        { code: "CSC152", name: "Microprocessor", subject: "microprocessor" },
        { code: "MTH154", name: "Mathematics II", subject: "math2" },
        { code: "STA154", name: "Statistics II", subject: "stats2" },
        { code: "ENG153", name: "Technical Writing", subject: "writing" },
      ],
      "3": [
        {
          code: "CSC201",
          name: "Data Structures and Algorithms",
          subject: "dsa",
        },
        {
          code: "CSC202",
          name: "Computer Architecture",
          subject: "architecture",
        },
        { code: "CSC203", name: "Discrete Structure", subject: "discrete" },
        { code: "MTH204", name: "Mathematics III", subject: "math3" },
        {
          code: "STA204",
          name: "Probability and Queuing Theory",
          subject: "probability",
        },
      ],
      "4": [
        {
          code: "CSC251",
          name: "Object Oriented Programming",
          subject: "oop-java",
        },
        { code: "CSC252", name: "Operating System", subject: "os" },
        { code: "CSC253", name: "Numerical Methods", subject: "numerical" },
        { code: "CSC254", name: "Computer Graphics", subject: "graphics" },
        {
          code: "STA254",
          name: "Applied Statistics",
          subject: "applied-stats",
        },
      ],
      "5": [
        {
          code: "CSC301",
          name: "Theory of Computation",
          subject: "computation",
        },
        { code: "CSC302", name: "Computer Networks", subject: "networks" },
        { code: "CSC303", name: "Artificial Intelligence", subject: "ai" },
        { code: "CSC304", name: "Database Management System", subject: "dbms" },
        {
          code: "CSC305",
          name: "Simulation and Modeling",
          subject: "simulation",
        },
      ],
      "6": [
        {
          code: "CSC351",
          name: "Software Engineering",
          subject: "software-eng",
        },
        { code: "CSC352", name: "Web Technology", subject: "web-tech" },
        { code: "CSC353", name: "Compiler Design", subject: "compiler" },
        { code: "CSC354", name: "Data Mining", subject: "data-mining" },
        {
          code: "CSC355",
          name: "Principles of Management",
          subject: "management",
        },
      ],
      "7": [
        { code: "CSC401", name: "Cryptography", subject: "crypto" },
        { code: "CSC402", name: "Cloud Computing", subject: "cloud" },
        { code: "CSC403", name: "Advanced Java", subject: "adv-java" },
        { code: "CSC404", name: "Image Processing", subject: "image" },
        {
          code: "CSC405",
          name: "Network Programming",
          subject: "network-prog",
        },
      ],
      "8": [
        { code: "CSC451", name: "Advanced Database", subject: "adv-db" },
        { code: "CSC452", name: "Distributed System", subject: "distributed" },
        { code: "CSC453", name: "Internship", subject: "internship" },
        { code: "CSC454", name: "Project Work", subject: "project" },
      ],
    },
  },
};

const years = ["2024", "2023", "2022", "2021", "2020", "2019", "2018"];

const googleDriveLinks: DriveLinks = {
  bca: {
    "1": {
      cfa: {
        "2024": {
          preview:
            "https://drive.google.com/file/d/BCA_1_CFA_2024_PREVIEW_ID/view",
          download:
            "https://drive.google.com/uc?export=download&id=BCA_1_CFA_2024_DOWNLOAD_ID",
        },
        "2023": {
          preview:
            "https://drive.google.com/file/d/BCA_1_CFA_2023_PREVIEW_ID/view",
          download:
            "https://drive.google.com/uc?export=download&id=BCA_1_CFA_2023_DOWNLOAD_ID",
        },
      },
    },
  },
};

export default function PastQuestionsPage() {
  const [course, setCourse] = useState<string>("");
  const [semester, setSemester] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const semesters = course
    ? Object.keys(courses[course].semesters).map((num) => ({
        value: num,
        label: `${num}${getOrdinalSuffix(parseInt(num))} Semester`,
      }))
    : [];

  const subjects =
    course && semester ? courses[course].semesters[semester] : [];

  const pastPapers = useMemo<Paper[]>(() => {
    const papers: Paper[] = [];

    Object.entries(courses).forEach(([courseKey, courseData]) => {
      Object.entries(courseData.semesters).forEach(
        ([sem, semesterSubjects]) => {
          semesterSubjects.forEach((sub) => {
            years.forEach((year) => {
              const driveLinks = googleDriveLinks[courseKey]?.[sem]?.[
                sub.subject
              ]?.[year] || {
                preview: "#",
                download: "#",
              };

              papers.push({
                id: `${courseKey}-${sem}-${sub.subject}-${year}`,
                title: `${courseData.name} - ${sub.name} (${year})`,
                university: "Tribhuvan University",
                year,
                semester: `${sem}${getOrdinalSuffix(parseInt(sem))} Semester`,
                semesterNum: sem,
                questions: 7,
                duration: "3 hours",
                downloads: Math.floor(Math.random() * 1000) + 500,
                color: "#3B82F6",
                course: courseKey,
                subject: sub.subject,
                code: sub.code,
                previewLink: driveLinks.preview,
                downloadLink: driveLinks.download,
              });
            });
          });
        }
      );
    });

    return papers;
  }, []);

  const filteredPapers = useMemo(() => {
    return pastPapers.filter((paper) => {
      const semesterMatch = semester === "" || paper.semesterNum === semester;
      const yearMatch = year === "" || paper.year === year;

      return (
        (course === "" || paper.course === course) &&
        semesterMatch &&
        (subject === "" || paper.subject === subject) &&
        yearMatch
      );
    });
  }, [course, semester, subject, year, pastPapers]);

  function getOrdinalSuffix(num: number): string {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
  }

  return (
    <div className="container py-10 md:py-16 space-y-12">
      <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">
            Search Past Papers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select
                value={course}
                onValueChange={(value) => {
                  setCourse(value);
                  setSemester("");
                  setSubject("");
                }}
              >
                <SelectTrigger id="course" className="rounded-md">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bca">BCA</SelectItem>
                  <SelectItem value="csit">BSc.CSIT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select
                value={semester}
                onValueChange={(value) => {
                  setSemester(value);
                  setSubject("");
                }}
                disabled={!course}
              >
                <SelectTrigger id="semester" className="rounded-md">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((sem) => (
                    <SelectItem key={sem.value} value={sem.value}>
                      {sem.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select
                value={subject}
                onValueChange={setSubject}
                disabled={!semester}
              >
                <SelectTrigger id="subject" className="rounded-md">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((sub) => (
                    <SelectItem key={sub.subject} value={sub.subject}>
                      {sub.code} - {sub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 ml-[110px]">
              <Label htmlFor="year">Year</Label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger id="year" className="rounded-md">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((yr) => (
                    <SelectItem key={yr} value={yr}>
                      {yr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Filtered Exam Papers</h2>
        {filteredPapers.length > 0 ? (
          <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPapers.map((paper) => (
              <motion.div key={paper.id}>
                <Card className="h-full overflow-hidden border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                  <CardContent className="p-6 flex flex-col h-full">
                    <h3 className="text-xl font-bold mb-2">{paper.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-grow">
                      {paper.university}
                    </p>
                    <div className="space-y-2 mt-auto">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Code:</span>
                        <span className="font-medium">{paper.code}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Semester:</span>
                        <span className="font-medium">{paper.semester}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Year:</span>
                        <span className="font-medium">{paper.year}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Duration:</span>
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
                  <div className="p-6 pt-0 flex gap-2">
                    <Link
                      href={paper.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="flex-1 rounded-full">
                        Preview
                      </Button>
                    </Link>
                    <Link
                      href={paper.downloadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="flex-1 rounded-full">Download</Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-muted-foreground">No matching papers found.</p>
        )}
      </div>
    </div>
  );
}
