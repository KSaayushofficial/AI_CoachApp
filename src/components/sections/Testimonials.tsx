"use client";
import React from "react";
import {motion} from "framer-motion";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";

export const Testimonials = () => {

  const testimonials = [
    {
      quote:
        "This platform completely transformed my exam preparation. The AI-generated questions are incredibly relevant and helped me focus on my weak areas.",
      author: "Aayush Sharma",
      role: "BCA Student, Tribhuvan University",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "The interview preparation feature helped me land my first internship. The mock interviews were so realistic that the actual interview felt familiar.",
      author: "Priya Karki",
      role: "CSIT Student, Kathmandu University",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "As someone studying BIM, I found the subject-specific questions extremely helpful. The platform understands the Nepali curriculum perfectly.",
      author: "Rohan Maharjan",
      role: "BIM Student, Pokhara University",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ];

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
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            What Students Say
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Hear from students who have transformed their academic and
            professional journey with our platform.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
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
                  <div className="flex items-center gap-4 mb-4">
                    <div className="size-12 rounded-full overflow-hidden bg-muted">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.author}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.author}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground flex-grow italic">
                    "{testimonial.quote}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

 