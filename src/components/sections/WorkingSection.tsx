"use client";
import React from 'react';
import {motion} from "framer-motion";
import { Badge } from '../ui/badge';

export const WorkingSection = () => {
  return (
    <section className="w-full py-20 md:py-32 bg-muted/30 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid-pattern-subtle"></div>

      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
        >
          <Badge
            className="rounded-full px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-primary/20 backdrop-blur-sm"
            variant="outline"
          >
            How It Works
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Simple Process, Powerful Results
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Get started in minutes and see the difference our platform can make
            for your business.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 z-0"></div>

          {[
            {
              step: "01",
              title: "Create Account",
              description:
                "Sign up in seconds with just your email. No credit card required to get started.",
            },
            {
              step: "02",
              title: "Configure Workspace",
              description:
                "Customize your workspace to match your team's unique workflow and requirements.",
            },
            {
              step: "03",
              title: "Boost Productivity",
              description:
                "Start using our powerful features to streamline processes and achieve your goals.",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center space-y-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-xl font-bold shadow-lg"
              >
                {step.step}
              </motion.div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
