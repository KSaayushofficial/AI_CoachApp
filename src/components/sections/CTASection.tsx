"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export const CTASection = () => {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-black/50 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/50 rounded-full blur-3xl"></div>

      {/* Glassmorphism effect - Centered */}
      <div className="container bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.08),transparent_70%)] dark:bg-gray-800/50  backdrop-blur-md rounded-lg px-4 md:px-6 relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-6 text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900/50 dark:text-gray-100">
            Ready to Transform Your Workflow?
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-900/80 dark:text-gray-300 md:text-xl">
            Join thousands of satisfied customers who have streamlined their
            processes and boosted productivity with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full h-12 px-8 text-gray-900 bg-transparent  hover:bg-white/20 hover:text-primary-foreground shadow-md hover:shadow-lg animate-bounce dark:border-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Start Your Journey
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-900/50 dark:text-gray-400 mt-4">
            No credit card required. 14-day free trial. Cancel anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
