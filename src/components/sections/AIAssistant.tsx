"use client";
import React from 'react';
import { motion } from "framer-motion"
import { ArrowRight, Badge, Brain, CheckCircle2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';

export const AIAssistant = () => {
  return (
    <section className="w-full py-20 md:py-32 bg-muted/30 backdrop-blur-sm relative overflow-hidden">
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
            >
              New Feature
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              AI-Powered Explanations
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our advanced AI assistant provides detailed explanations for
                every question and answer, helping you understand complex
                concepts more easily.
              </p>
              <p>
                When you don't understand something, simply click "Explain
                Further" and our AI will generate a more detailed explanation
                tailored to your needs.
              </p>
              <p>
                The AI assistant can break down complex topics, provide
                examples, and explain concepts in multiple ways to ensure you
                fully grasp the material.
              </p>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Brain className="h-4 w-4" />
                </div>
                <span>Personalized explanations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span>Multiple explanation styles</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span>Interactive learning experience</span>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/exam-prep">
                <Button className="rounded-full">
                  Try AI Explanations
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
                alt="AI Assistant explanation"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

