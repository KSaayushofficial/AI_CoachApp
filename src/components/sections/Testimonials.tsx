"use client";
import React from "react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "../ui/badge";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

export const Testimonials = () => {
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      quote:
        "SaaSify has transformed how we manage our projects. The automation features have saved us countless hours of manual work.",
      author: "Sarah Johnson",
      role: "Project Manager, TechCorp",
      avatar: "/placeholder.svg?height=80&width=80",
      logo: "/placeholder-logo.svg",
      rating: 5,
    },
    {
      quote:
        "The analytics dashboard provides insights we never had access to before. It's helped us make data-driven decisions that have improved our ROI.",
      author: "Michael Chen",
      role: "Marketing Director, GrowthLabs",
      avatar: "/placeholder.svg?height=80&width=80",
      logo: "/placeholder-logo.svg",
      rating: 5,
    },
    {
      quote:
        "Customer support is exceptional. Any time we've had an issue, the team has been quick to respond and resolve it. Couldn't ask for better service.",
      author: "Emily Rodriguez",
      role: "Operations Lead, StartupX",
      avatar: "/placeholder.svg?height=80&width=80",
      logo: "/placeholder-logo.svg",
      rating: 5,
    },
    {
      quote:
        "We've tried several similar solutions, but none compare to the ease of use and comprehensive features of SaaSify. It's been a game-changer.",
      author: "David Kim",
      role: "CEO, InnovateNow",
      avatar: "/placeholder.svg?height=80&width=80",
      logo: "/placeholder-logo.svg",
      rating: 5,
    },
    {
      quote:
        "The collaboration tools have made remote work so much easier for our team. We're more productive than ever despite being spread across different time zones.",
      author: "Lisa Patel",
      role: "HR Director, RemoteFirst",
      avatar: "/placeholder.svg?height=80&width=80",
      logo: "/placeholder-logo.svg",
      rating: 5,
    },
    {
      quote:
        "Implementation was seamless, and the ROI was almost immediate. We've reduced our operational costs by 30% since switching to SaaSify.",
      author: "James Wilson",
      role: "COO, ScaleUp Inc",
      avatar: "/placeholder.svg?height=80&width=80",
      logo: "/placeholder-logo.svg",
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setActiveTestimonialIndex((prev: any) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setActiveTestimonialIndex((prev: any) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToTestimonial = (index: number) => {
    setActiveTestimonialIndex(index);
  };
  return (
    <section
      id="testimonials"
      className="w-full py-20 md:py-32 relative overflow-hidden"
      ref={testimonialsRef}
    >
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
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Loved by Teams Worldwide
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Don't just take our word for it. See what our customers have to say
            about their experience.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute -top-10 -left-10 text-primary/10 dark:text-primary/20">
            <Quote className="size-20" />
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-background/50 backdrop-blur-md border border-border/10 shadow-xl">
            <div className="p-8 md:p-12">
              <div className="relative h-[300px] md:h-[250px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonialIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex mb-4">
                        {Array(testimonials[activeTestimonialIndex].rating)
                          .fill(0)
                          .map((_, j) => (
                            <Star
                              key={j}
                              className="size-5 text-yellow-500 fill-yellow-500"
                            />
                          ))}
                      </div>
                      <p className="text-xl mb-6 flex-grow italic">
                        "{testimonials[activeTestimonialIndex].quote}"
                      </p>
                      <div className="flex items-center gap-4 mt-auto">
                        <div className="size-12 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                          <Image
                            src={
                              testimonials[activeTestimonialIndex].avatar ||
                              "/placeholder.svg"
                            }
                            alt={testimonials[activeTestimonialIndex].author}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">
                            {testimonials[activeTestimonialIndex].author}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {testimonials[activeTestimonialIndex].role}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <Image
                            src={
                              testimonials[activeTestimonialIndex].logo ||
                              "/placeholder.svg"
                            }
                            alt="Company logo"
                            width={80}
                            height={40}
                            className="h-8 w-auto opacity-70"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/50 border-t border-border/10">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={prevTestimonial}
                >
                  <ArrowLeft className="size-4" />
                  <span className="sr-only">Previous</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={nextTestimonial}
                >
                  <ArrowRight className="size-4" />
                  <span className="sr-only">Next</span>
                </Button>
              </div>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "size-2 rounded-full p-0",
                      i === activeTestimonialIndex
                        ? "bg-primary"
                        : "bg-muted-foreground/30"
                    )}
                    onClick={() => goToTestimonial(i)}
                  >
                    <span className="sr-only">Go to testimonial {i + 1}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full overflow-hidden border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex mb-4">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, j) => (
                        <Star
                          key={j}
                          className="size-4 text-yellow-500 fill-yellow-500"
                        />
                      ))}
                  </div>
                  <p className="text-lg mb-6 flex-grow">{testimonial.quote}</p>
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/10">
                    <div className="size-10 rounded-full bg-muted flex items-center justify-center text-foreground font-medium">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
