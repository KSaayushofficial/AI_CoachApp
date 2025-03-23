"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Check,
  ChevronRight,
  Menu,
  X,
  Moon,
  Sun,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Users,
  BarChart,
  Layers,
  Quote,
  ArrowLeft,
  ArrowUp,
  MessageSquare,
  Bell,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function LandingPage() {

  const { toast } = useToast();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [showNotification, setShowNotification] = useState(true);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [yearlyBilling, setYearlyBilling] = useState(false);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.98]);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const features = [
    {
      title: "Smart Automation",
      description:
        "Automate repetitive tasks and workflows to save time and reduce errors.",
      icon: <Zap className="size-5" />,
    },
    {
      title: "Advanced Analytics",
      description:
        "Gain valuable insights with real-time data visualization and reporting.",
      icon: <BarChart className="size-5" />,
    },
    {
      title: "Team Collaboration",
      description:
        "Work together seamlessly with integrated communication tools.",
      icon: <Users className="size-5" />,
    },
    {
      title: "Enterprise Security",
      description:
        "Keep your data safe with end-to-end encryption and compliance features.",
      icon: <Shield className="size-5" />,
    },
    {
      title: "Seamless Integration",
      description:
        "Connect with your favorite tools through our extensive API ecosystem.",
      icon: <Layers className="size-5" />,
    },
    {
      title: "24/7 Support",
      description:
        "Get help whenever you need it with our dedicated support team.",
      icon: <MessageSquare className="size-5" />,
    },
  ];

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
    setActiveTestimonialIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setActiveTestimonialIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToTestimonial = (index: number) => {
    setActiveTestimonialIndex(index);
  };

  return (
    <div className="flex bg-red-800 min-h-[100dvh] flex-col relative">
      {/* Notification Banner */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gradient-to-r from-primary/90 to-primary/70 text-primary-foreground relative z-50"
          >
            <div className="container py-2 px-4 md:px-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Bell className="size-4" />
                <span>
                  🎉 New feature alert: Team collaboration tools now available!
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary/20"
                onClick={() => setShowNotification(false)}
              >
                <X className="size-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header
        className={cn(
          "sticky  top-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "bg-background/60 backdrop-blur-xl border-b border-border/20 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
              S
            </div>
            <span>SaaSify</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              FAQ
            </Link>
          </nav>
          <div className="hidden md:flex gap-4 items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {mounted && theme === "dark" ? (
                <Sun className="size-[18px]" />
              ) : (
                <Moon className="size-[18px]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Log in
            </Link>
            <Button className="rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-md hover:shadow-lg">
              Get Started
              <ChevronRight className="ml-1 size-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {mounted && theme === "dark" ? (
                <Sun className="size-[18px]" />
              ) : (
                <Moon className="size-[18px]" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-xl border-b"
            >
              <div className="container py-4 flex flex-col gap-4">
                <Link
                  href="#features"
                  className="py-2 text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="#testimonials"
                  className="py-2 text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Testimonials
                </Link>
                <Link
                  href="#pricing"
                  className="py-2 text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="#faq"
                  className="py-2 text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
                <div className="flex flex-col gap-2 pt-2 border-t">
                  <Link
                    href="#"
                    className="py-2 text-sm font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Button
                    className="rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                    <ChevronRight className="ml-1 size-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 overflow-hidden relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 -z-10 bg-grid-pattern"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              style={{ opacity, scale }}
              className="absolute -top-[25%] -right-[25%] w-[50%] h-[50%] bg-primary/30 rounded-full blur-[120px] opacity-70 animate-blob"
            ></motion.div>
            <motion.div
              style={{ opacity, scale }}
              className="absolute -bottom-[25%] -left-[25%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] opacity-70 animate-blob animation-delay-2000"
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
                Launching Soon
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Elevate Your Workflow with SaaSify
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                The all-in-one platform that helps teams collaborate, automate,
                and deliver exceptional results. Streamline your processes and
                focus on what matters most.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="rounded-full h-12 px-8 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 text-base border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-background/80"
                >
                  Book a Demo
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Check className="size-4 text-primary" />
                  <span>No credit card</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="size-4 text-primary" />
                  <span>14-day trial</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="size-4 text-primary" />
                  <span>Cancel anytime</span>
                </div>
              </div>
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
                    alt="SaaSify dashboard"
                    className="w-full h-auto"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent"></div>
                </div>
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 dark:ring-white/10"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-primary/30 to-primary/10 blur-3xl opacity-70"></div>
              <div className="absolute -top-6 -left-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-3xl opacity-70"></div>
            </motion.div>
          </div>
        </section>

        {/* Logos Section */}
        <section className="w-full py-12 border-y border-border/10 bg-muted/30 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Trusted by innovative companies worldwide
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.5 }}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src={`/placeholder-logo.svg`}
                      alt={`Company logo ${i}`}
                      width={120}
                      height={60}
                      className="h-8 w-auto opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-20 md:py-32 relative overflow-hidden"
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
                Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Everything You Need to Succeed
              </h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Our comprehensive platform provides all the tools you need to
                streamline your workflow, boost productivity, and achieve your
                goals.
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {features.map((feature, i) => (
                <motion.div key={i} variants={item}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="h-full overflow-hidden border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="size-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
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
                Get started in minutes and see the difference our platform can
                make for your business.
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

        {/* Testimonials Section */}
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
                Don't just take our word for it. See what our customers have to
                say about their experience.
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
                                alt={
                                  testimonials[activeTestimonialIndex].author
                                }
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
                        <span className="sr-only">
                          Go to testimonial {i + 1}
                        </span>
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
                      <p className="text-lg mb-6 flex-grow">
                        {testimonial.quote}
                      </p>
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

        {/* Pricing Section */}
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
                Choose the plan that's right for your business. All plans
                include a 14-day free trial.
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
                          <span className="text-4xl font-bold">
                            {plan.price}
                          </span>
                          <span className="text-muted-foreground ml-1">
                            /month
                          </span>
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

        {/* FAQ Section */}
        <section
          id="faq"
          className="w-full py-20 md:py-32 relative overflow-hidden"
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
                FAQ
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
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
                    {[
                      {
                        question: "How does the 14-day free trial work?",
                        answer:
                          "Our 14-day free trial gives you full access to all features of your selected plan. No credit card is required to sign up, and you can cancel at any time during the trial period with no obligation.",
                      },
                      {
                        question: "Can I change plans later?",
                        answer:
                          "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the new pricing will be prorated for the remainder of your billing cycle. If you downgrade, the new pricing will take effect at the start of your next billing cycle.",
                      },
                      {
                        question:
                          "Is there a limit to how many users I can add?",
                        answer:
                          "The number of users depends on your plan. The Starter plan allows up to 5 team members, the Professional plan allows up to 20, and the Enterprise plan has no limit on team members.",
                      },
                      {
                        question:
                          "Do you offer discounts for nonprofits or educational institutions?",
                        answer:
                          "Yes, we offer special pricing for nonprofits, educational institutions, and open-source projects. Please contact our sales team for more information.",
                      },
                      {
                        question: "How secure is my data?",
                        answer:
                          "We take security very seriously. All data is encrypted both in transit and at rest. We use industry-standard security practices and regularly undergo security audits. Our platform is compliant with GDPR, CCPA, and other relevant regulations.",
                      },
                      {
                        question: "What kind of support do you offer?",
                        answer:
                          "Support varies by plan. All plans include email support, with the Professional plan offering priority email support. The Enterprise plan includes 24/7 phone and email support. We also have an extensive knowledge base and community forum available to all users.",
                      },
                    ].map((faq, i) => (
                      <motion.div
                        key={i}
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
                            {faq.question}
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

        {/* Contact Section */}
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
                  Have questions about our platform? Want to learn more about
                  how we can help your business? Reach out to us and we'll get
                  back to you as soon as possible.
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

        {/* CTA Section */}
        <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-6 text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Ready to Transform Your Workflow?
              </h2>
              <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
                Join thousands of satisfied customers who have streamlined their
                processes and boosted productivity with our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full h-12 px-8 text-base bg-white text-primary hover:bg-white/90 shadow-md hover:shadow-lg"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 text-base bg-transparent border-white text-white hover:bg-white/10"
                >
                  Schedule a Demo
                </Button>
              </div>
              <p className="text-sm text-primary-foreground/80 mt-4">
                No credit card required. 14-day free trial. Cancel anytime.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-border/10 bg-background/95 backdrop-blur-sm">
        <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold">
                <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
                  S
                </div>
                <span>SaaSify</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Streamline your workflow with our all-in-one SaaS platform.
                Boost productivity and scale your business.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#features"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row justify-between items-center border-t border-border/10 pt-8">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} SaaSify. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Consent Banner */}
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 inset-x-0 z-50 p-4"
          >
            <div className="container">
              <div className="bg-background/80 backdrop-blur-xl border border-border/10 rounded-xl p-4 shadow-lg flex flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm">
                    We use cookies to enhance your browsing experience, serve
                    personalized ads or content, and analyze our traffic. By
                    clicking "Accept All", you consent to our use of cookies.
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-border/20 bg-background/50"
                    onClick={() => setShowCookieBanner(false)}
                  >
                    Reject All
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    onClick={() => setShowCookieBanner(false)}
                  >
                    Accept All
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              variant="outline"
              size="icon"
              className="size-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/10 shadow-lg hover:shadow-xl"
              onClick={scrollToTop}
            >
              <ArrowUp className="size-5" />
              <span className="sr-only">Scroll to top</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
