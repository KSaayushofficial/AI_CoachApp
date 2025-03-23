import Link from "next/link";
import { Facebook, Twitter, Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
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
              Streamline your workflow with our all-in-one SaaS platform. Boost
              productivity and scale your business.
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
            <h4 className="text-sm font-bold">Product</h4>
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
                  href="/industrial-insights"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Industrial Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/bca-preparation"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  BCA Preparation
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/resume-builder"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Resume Builder
                </Link>
              </li>
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
                  href="/cover-letters"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cover Letters
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about-dev"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Dev
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
  );
}
