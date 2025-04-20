"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AnimatedButton({
  children,
  className,
  variant = "default",
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-full"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Button
        className={cn("relative z-10 rounded-full", className)}
        variant={variant}
        {...props}
      >
        {children}
      </Button>

      {/* Animated light effect */}
      <motion.div
        className="absolute top-0 left-0 size-10 bg-white/20 rounded-full blur-xl"
        animate={{
          x: isHovered ? ["0%", "100%", "0%"] : "0%",
          y: isHovered ? ["0%", "100%", "0%"] : "0%",
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
