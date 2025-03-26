"use client";
import {
  BarChart,
  BookOpen,
  Code,
  Layers,
  MessageSquare,
  Shield,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import React from "react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";

export const FeaturesSection = () => {
  const features = [
    {
      title: "AI-Powered Question Generation",
      description:
        "Generate custom questions based on your course, subject, and difficulty level.",
      icon: <Sparkles className="size-5" />,
    },
    {
      title: "Comprehensive Course Coverage",
      description:
        "Prepare for CSIT, BCA, BIM, and other popular courses in Nepal.",
      icon: <BookOpen className="size-5" />,
    },
    {
      title: "Interview Preparation",
      description:
        "Practice with realistic interview questions and receive AI feedback.",
      icon: <MessageSquare className="size-5" />,
    },
    {
      title: "Mock Interviews",
      description:
        "Simulate real interview conditions with our AI-powered mock interview system.",
      icon: <Users className="size-5" />,
    },
    {
      title: "Progress Tracking",
      description:
        "Monitor your improvement with detailed analytics and performance insights.",
      icon: <Layers className="size-5" />,
    },
    {
      title: "Coding Practice",
      description:
        "Enhance your programming skills with interactive coding challenges.",
      icon: <Code className="size-5" />,
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
    <section className="w-full py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.08),transparent_70%)]"></div>
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <Badge
            className="rounded-full px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-primary/20 backdrop-blur-sm"
            variant="outline"
          >
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Everything You Need to Succeed
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Our comprehensive platform provides all the tools you need to excel
            in your exams and interviews.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={item}>
              <motion.div
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full overflow-hidden border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

