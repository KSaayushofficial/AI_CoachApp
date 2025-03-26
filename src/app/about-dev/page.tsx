"use client";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutDevPage() {
  const skills = [
    { name: "React", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "UI/UX Design", level: 70 },
    { name: "Database Design", level: 65 },
  ];

  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      period: "2021 - Present",
      description:
        "Leading the frontend development team, implementing modern web applications using React, Next.js, and TypeScript. Mentoring junior developers and establishing best practices.",
    },
    {
      title: "Frontend Developer",
      company: "Digital Solutions Ltd.",
      period: "2018 - 2021",
      description:
        "Developed responsive web applications, collaborated with designers and backend developers to implement features, and optimized application performance.",
    },
    {
      title: "Web Developer Intern",
      company: "StartUp Hub",
      period: "2017 - 2018",
      description:
        "Assisted in developing website features, learned modern web development practices, and participated in code reviews and team meetings.",
    },
  ];

  const projects = [
    {
      title: "E-commerce Platform",
      description:
        "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates and team collaboration features.",
      technologies: ["Next.js", "Firebase", "Tailwind CSS", "TypeScript"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Learning Management System",
      description:
        "An educational platform for creating and managing courses, assignments, and student progress.",
      technologies: ["React", "Express", "PostgreSQL", "Redux"],
      image: "/placeholder.svg?height=200&width=300",
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
    <div className="container py-10 md:py-16 space-y-12">
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]"></div>
        <PageHeader
          title="About the Developer"
          description="Learn more about the team behind this platform, our mission, and the technologies we use."
          className="text-center max-w-3xl mx-auto mb-12"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md sticky top-24">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="size-32 rounded-full overflow-hidden mb-4 bg-muted">
                  <Image
                    src="/placeholder.svg?height=128&width=128"
                    alt="Developer Profile"
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-1">John Doe</h2>
                <p className="text-muted-foreground mb-4">
                  Full Stack Developer
                </p>
                <div className="flex gap-3 mb-6">
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="size-5" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin className="size-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="size-5" />
                    <span className="sr-only">Email</span>
                  </Link>
                </div>
                <div className="w-full space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Skills</h3>
                    <div className="space-y-3">
                      {skills.map((skill) => (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{skill.name}</span>
                            <span className="text-muted-foreground">
                              {skill.level}%
                            </span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Contact</h3>
                    <Button className="w-full rounded-full">
                      <Mail className="mr-2 h-4 w-4" />
                      Get in Touch
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-8">
          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">About Me</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a passionate full-stack developer with over 5 years of
                  experience building modern web applications. I specialize in
                  React, Next.js, and Node.js, with a strong focus on creating
                  intuitive user experiences and scalable backend solutions.
                </p>
                <p>
                  My journey in web development began during my computer science
                  studies, where I discovered my passion for creating digital
                  experiences that solve real-world problems. Since then, I've
                  worked with startups and established companies to deliver
                  high-quality software solutions.
                </p>
                <p>
                  I'm constantly learning and exploring new technologies to stay
                  at the forefront of web development. When I'm not coding, you
                  can find me hiking, reading tech blogs, or contributing to
                  open-source projects.
                </p>
              </div>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl font-bold mb-4">Experience</h2>
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <Card
                  key={index}
                  className="border-border/10 bg-background/50 backdrop-blur-md shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                      <Badge variant="outline" className="mt-1 md:mt-0 w-fit">
                        {exp.period}
                      </Badge>
                    </div>
                    <p className="text-primary font-medium mb-3">
                      {exp.company}
                    </p>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {projects.map((project, index) => (
                <motion.div key={index} variants={item}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="h-full overflow-hidden border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="aspect-video relative overflow-hidden bg-muted">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold mb-2">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="bg-muted/50"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full rounded-full"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Project
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                Technologies I Work With
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "JavaScript",
                  "TypeScript",
                  "React",
                  "Next.js",
                  "Node.js",
                  "Express",
                  "MongoDB",
                  "PostgreSQL",
                  "GraphQL",
                  "REST API",
                  "Tailwind CSS",
                  "Framer Motion",
                  "Git",
                  "Docker",
                  "AWS",
                  "Vercel",
                ].map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 rounded-lg border border-border/10 bg-background/80"
                  >
                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <span className="font-bold text-sm">
                        {tech.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
