"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

export const CTASection = () => {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"
        aria-hidden="true"
      ></div>
      <div
        className="absolute -top-24 -left-24 w-64 h-64 bg-black/50 rounded-full blur-3xl"
        aria-hidden="true"
      ></div>
      <div
        className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/50 rounded-full blur-3xl"
        aria-hidden="true"
      ></div>

      <div className="container bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.08),transparent_70%)] dark:bg-gray-800/50 backdrop-blur-md rounded-lg px-4 md:px-6 relative mx-auto max-w-7xl">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-6 text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900/50 dark:text-gray-100">
            Ready to Transform Your Learning?
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-900/80 dark:text-gray-300 md:text-xl">
            Join thousands of Nepali students who are acing their exams and
            interviews with our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/dashboard" passHref legacyBehavior>
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full h-12 px-8 text-gray-900 bg-transparent hover:bg-white/20 hover:text-primary-foreground shadow-md hover:shadow-lg animate-bounce dark:border-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Get Started Now
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full h-12 px-8 text-base bg-transparent border-white text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};
