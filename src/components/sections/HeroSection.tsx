"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.98]);

  return (
    <section className="w-full py-20 md:py-32 lg:py-40 overflow-hidden relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 -z-10 bg-grid-pattern"></div>

      <div className="container px-4 md:px-6 relative">
        <motion.div
          style={{ opacity, scale }}
          className="absolute -top-[25%] -right-[25%] w-[50%] h-[50%] bg-primary/30 rounded-full blur-[120px] opacity-70 animate-blob"
          aria-hidden="true"
        ></motion.div>
        <motion.div
          style={{ opacity, scale }}
          className="absolute -bottom-[25%] -left-[25%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] opacity-70 animate-blob animation-delay-2000"
          aria-hidden="true"
        ></motion.div>

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
            AI-Powered Learning
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Ace Your Exams & Interviews
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The ultimate AI-powered platform for Nepali students to prepare for
            exams and interviews with personalized questions, mock interviews,
            and comprehensive resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/exam-prep" passHref legacyBehavior>
              <Button
                size="lg"
                className="cursor-crosshair rounded-full h-12 px-8 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Start Exam Prep
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
            <Link href="/interview-prep">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full h-12 px-8 text-base border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-background/80"
              >
                Try Interview Prep
              </Button>
            </Link>
          </div>
          <ul className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-muted-foreground list-none">
            <li className="flex items-center gap-1">
              <Check className="size-4 text-primary" />
              <span>Smart Prep</span>
            </li>
            <li className="flex items-center gap-1">
              <Check className="size-4 text-primary" />
              <span>Confidence Boost</span>
            </li>
            <li className="flex items-center gap-1">
              <Check className="size-4 text-primary" />
              <span>Stress-Free</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="rounded-xl overflow-hidden shadow-2xl border border-border/10 bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-md">
            <div className="relative">
              <Image
                src="https://cdn.dribbble.com/userupload/12302729/file/original-fa372845e394ee85bebe0389b9d86871.png?resize=1504x1128&vertical=center"
                width={1280}
                height={720}
                alt="SaaSify dashboard interface showing analytics and workflow management"
                className="w-full h-auto"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent"></div>
            </div>
            <div
              className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 dark:ring-white/10"
              aria-hidden="true"
            ></div>
          </div>
          <div
            className="absolute -bottom-6 -right-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-primary/30 to-primary/10 blur-3xl opacity-70"
            aria-hidden="true"
          ></div>
          <div
            className="absolute -top-6 -left-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-3xl opacity-70"
            aria-hidden="true"
          ></div>
        </motion.div>
      </div>
    </section>
  );
};
