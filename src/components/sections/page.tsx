import React from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const notificationBanner = () => {
        const [showNotification, setShowNotification] = useState(true);
  return (
    <div>
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
    </div>
  );
}

export default notificationBanner