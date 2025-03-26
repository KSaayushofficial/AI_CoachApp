"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Code,
  Layers,
  MessageSquare,
  Sparkles,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  const team = [
    {
      name: "Aayush Sharma",
      role: "Founder & CEO",
      bio: "Former software engineer with a passion for education technology. Graduate of Tribhuvan University.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Priya Karki",
      role: "CTO",
      bio: "AI specialist with experience at leading tech companies. Passionate about making education accessible.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Rohan Maharjan",
      role: "Head of Content",
      bio: "Former professor with expertise in computer science curriculum development and educational content.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ];

  const values = [
    {
      title: "Accessibility",
      description:
        "Making quality education accessible to all students across Nepal, regardless of location or background.",
      icon: <Users className="size-5" />,
    },
    {
      title: "Innovation",
      description:
        "Leveraging cutting-edge AI technology to create personalized learning experiences.",
      icon: <Sparkles className="size-5" />,
    },
    {
      title: "Quality",
      description:
        "Ensuring all content is accurate, up-to-date, and aligned with Nepali university curricula.",
      icon: <CheckCircle2 className="size-5" />,
    },
    {
      title: "Community",
      description:
        "Building a supportive community of learners and educators to foster collaboration.",
      icon: <MessageSquare className="size-5" />,
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
    <div className="flex min-h-[100dvh] flex-col">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 overflow-hidden relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]"></div>

        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12 relative z-10"
          >
            <Badge
              className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-primary/20 backdrop-blur-sm"
              variant="outline"
            >
              Our Mission
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Empowering Nepali Students Through AI
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're on a mission to revolutionize exam and interview preparation
              for students across Nepal, making quality education accessible to
              all.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="w-full py-20 bg-muted/30 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        <div className="container px-4 md:px-6 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-primary/20 backdrop-blur-sm"
                variant="outline"
              >
                Our Story
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                From Classroom to Cloud
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our journey began in a small classroom in Kathmandu, where our
                  founder, Aayush, witnessed firsthand the challenges students
                  faced when preparing for exams and interviews.
                </p>
                <p>
                  With limited resources and outdated materials, students
                  struggled to keep up with the evolving curriculum and industry
                  demands. Aayush envisioned a platform that would leverage AI
                  to provide personalized, up-to-date learning experiences for
                  every student.
                </p>
                <p>
                  In 2022, we assembled a team of educators, engineers, and AI
                  specialists with a shared vision: to democratize education in
                  Nepal through technology. What started as a small project has
                  now grown into a comprehensive platform serving thousands of
                  students across the country.
                </p>
                <p>
                  Today, our AI-powered platform helps students prepare for
                  exams and interviews with personalized questions, real-time
                  feedback, and a supportive community of peers and mentors.
                </p>
              </div>
              <div className="mt-6">
                <Link href="/dashboard">
                  <Button className="rounded-full">
                    Join Our Community
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Our team working together"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="w-full py-20 relative overflow-hidden">
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
              Our Values
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              What Drives Us
            </h2>
            <p className="max-w-[800px] text-muted-foreground md:text-lg">
              Our core values guide everything we do, from product development
              to customer support.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value, i) => (
              <motion.div key={i} variants={item}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-full overflow-hidden border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-20 bg-muted/30 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        <div className="container px-4 md:px-6 relative">
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
              Our Team
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Meet the Minds Behind the Platform
            </h2>
            <p className="max-w-[800px] text-muted-foreground md:text-lg">
              Our diverse team of educators, engineers, and AI specialists is
              dedicated to transforming education in Nepal.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full overflow-hidden border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">
                      {member.role}
                    </p>
                    <p className="text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="w-full py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.08),transparent_70%)]"></div>
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-primary/20 backdrop-blur-sm"
                variant="outline"
              >
                Our Technology
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Powered by Advanced AI
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our platform leverages state-of-the-art artificial
                  intelligence to provide personalized learning experiences for
                  every student.
                </p>
                <p>
                  We use natural language processing to generate relevant
                  questions, computer vision to analyze interview performance,
                  and machine learning to adapt to each student's learning style
                  and pace.
                </p>
                <p>
                  All of our technology is designed with privacy and security in
                  mind, ensuring that student data is protected at all times.
                </p>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Brain className="h-4 w-4" />
                  </div>
                  <span>Natural Language Processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Code className="h-4 w-4" />
                  </div>
                  <span>Machine Learning Algorithms</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Layers className="h-4 w-4" />
                  </div>
                  <span>Computer Vision Analysis</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="AI technology visualization"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-6 text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Join Us in Transforming Education
            </h2>
            <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
              Whether you're a student preparing for exams, a professional
              looking to advance your career, or an educator wanting to make a
              difference, we invite you to join our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full h-12 px-8 text-base bg-white text-primary hover:bg-white/90 shadow-md hover:shadow-lg"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 text-base bg-transparent border-white text-white hover:bg-white/10"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
