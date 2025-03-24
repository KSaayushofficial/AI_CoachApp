"use client";
import React from 'react';
import {motion} from "framer-motion";     
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from '../ui/card';
import { Switch } from '../ui/switch';


export const PricingSection = () => {

        const [yearlyBilling, setYearlyBilling] = useState(false);

  return (
    <section
      id="pricing"
      className="w-full py-20 md:py-32 bg-muted/30 backdrop-blur-sm relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-grid-pattern-subtle"></div>

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
            Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Choose the plan that's right for your business. All plans include a
            14-day free trial.
          </p>
        </motion.div>

        <div className="mx-auto max-w-5xl">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4 p-1 rounded-full bg-muted/50 backdrop-blur-sm border border-border/10">
              <span
                className={cn(
                  "text-sm",
                  !yearlyBilling && "text-primary font-medium"
                )}
              >
                Monthly
              </span>
              <Switch
                checked={yearlyBilling}
                onCheckedChange={setYearlyBilling}
                className="data-[state=checked]:bg-primary"
              />
              <span
                className={cn(
                  "text-sm",
                  yearlyBilling && "text-primary font-medium"
                )}
              >
                Yearly{" "}
                <Badge className="ml-1 bg-green-500/10 text-green-500 border-green-500/20">
                  Save 20%
                </Badge>
              </span>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {[
              {
                name: "Starter",
                price: yearlyBilling ? "$23" : "$29",
                description: "Perfect for small teams and startups.",
                features: [
                  "Up to 5 team members",
                  "Basic analytics",
                  "5GB storage",
                  "Email support",
                ],
                cta: "Start Free Trial",
              },
              {
                name: "Professional",
                price: yearlyBilling ? "$63" : "$79",
                description: "Ideal for growing businesses.",
                features: [
                  "Up to 20 team members",
                  "Advanced analytics",
                  "25GB storage",
                  "Priority email support",
                  "API access",
                ],
                cta: "Start Free Trial",
                popular: true,
              },
              {
                name: "Enterprise",
                price: yearlyBilling ? "$159" : "$199",
                description: "For large organizations with complex needs.",
                features: [
                  "Unlimited team members",
                  "Custom analytics",
                  "Unlimited storage",
                  "24/7 phone & email support",
                  "Advanced API access",
                  "Custom integrations",
                ],
                cta: "Contact Sales",
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.01 }}
              >
                <Card
                  className={cn(
                    "relative overflow-hidden h-full border-border/10 bg-background/50 backdrop-blur-md shadow-lg transition-all duration-300",
                    plan.popular && "border-primary shadow-xl"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                      Most Popular
                    </div>
                  )}
                  <CardContent className="p-6 flex flex-col h-full">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <div className="flex items-baseline mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-1">/month</span>
                    </div>
                    <p className="text-muted-foreground mt-2">
                      {plan.description}
                    </p>
                    <ul className="space-y-3 my-6 flex-grow">
                      {plan.features.map((feature, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: j * 0.05 }}
                          className="flex items-center"
                        >
                          <Check className="mr-2 size-4 text-primary" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <Button
                      className={cn(
                        "w-full mt-auto rounded-full transition-all duration-300",
                        plan.popular
                          ? "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md hover:shadow-lg"
                          : "bg-muted hover:bg-muted/80"
                      )}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
