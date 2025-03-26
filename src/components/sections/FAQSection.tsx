"use client";
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "../ui/accordion";

export const FAQSection = () => {
  const faqData = React.useMemo(
    () => [
      {
        question: "How does the 14-day free trial work?",
        answer:
          "Our 14-day free trial gives you full access to all features of your selected plan. No credit card is required to sign up, and you can cancel at any time during the trial period with no obligation.",
      },
      // ... rest of the FAQ items
    ],
    []
  );

  return (
    <section
      id="faq"
      className="w-full py-20 md:py-32 relative overflow-hidden"
      aria-labelledby="faq-heading"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.08),transparent_70%)]" aria-hidden="true"></div>
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
            FAQ
          </Badge>
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Find answers to common questions about our platform.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-lg">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, i) => (
                  <motion.div
                    key={`faq-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <AccordionItem
                      value={`item-${i}`}
                      className="border-b border-border/10 py-2"
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline">
                        <h3 className="text-lg">{faq.question}</h3>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

 