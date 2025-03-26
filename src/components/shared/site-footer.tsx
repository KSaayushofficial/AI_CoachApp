import Link from "next/link";
import { Facebook, Twitter, Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border/10 bg-background/95 backdrop-blur-sm">
      <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16 mx-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold ">
              <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
                S
              </div>
              <span>StudyNepal</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered exam and interview preparation platform for Nepali
              students. Ace your exams and interviews with personalized
              practice.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Facebook className="size-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="size-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="size-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/exam-prep"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Exam Preparation
                </Link>
              </li>
              <li>
                <Link
                  href="/past-questions"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Past Questions
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/interview-prep"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Interview Preparation
                </Link>
              </li>
              <li>
                <Link
                  href="/mock-interview"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Mock Interviews
                </Link>
              </li>
              <li>
                <Link
                  href="/discussion-forum"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Discussion Forum
                </Link>
              </li>
              <li>
                <Link
                  href="/course-selection"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Course Selection
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
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
            &copy; {new Date().getFullYear()} StudyNepal. All rights reserved.
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
  );
}
