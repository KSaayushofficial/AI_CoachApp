"use client";
import React from 'react';
import {motion} from "framer-motion";
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Mail, Phone } from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { toast } from '@/hooks/use-toast';

export const ContactSection = () => {

       const handleContactSubmit = (e: React.FormEvent) => {
         e.preventDefault();
         toast({
           title: "Message sent!",
           description: "We'll get back to you as soon as possible.",
         });
       };

  return (
    <section className="w-full py-20 md:py-32 bg-muted/30 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid-pattern-subtle"></div>
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
              Get in Touch
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Let's Start a Conversation
            </h2>
            <p className="text-muted-foreground mb-6">
              Have questions about our platform? Want to learn more about how we
              can help your business? Reach out to us and we'll get back to you
              as soon as possible.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="size-5" />
                </div>
                <div>
                  <p className="font-medium">Email Us</p>
                  <p className="text-sm text-muted-foreground">
                    hello@saasify.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="size-5" />
                </div>
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-sm text-muted-foreground">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-lg">
              <CardContent className="p-6">
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        className="bg-background/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        className="bg-background/50"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help?"
                      className="bg-background/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      className="min-h-[120px] bg-background/50"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
