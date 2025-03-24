"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CookieConsent = () => {
  const [showCookieBanner, setShowCookieBanner] = useState(true);

  return (
    <AnimatePresence>
      {showCookieBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 inset-x-0 z-50 p-4"
        >
          <div className="container">
            <div className="bg-background/80 backdrop-blur-xl border border-border/10 rounded-xl p-4 shadow-lg flex items-center justify-between gap-4">
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
  );
};

export default CookieConsent;
