"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const LogosSection = () => {
  return (
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
  );
};
