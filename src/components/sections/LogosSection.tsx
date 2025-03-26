"use client";
import React from "react";
import { motion } from "framer-motion";


export const LogosSection = () => {
  const courses = React.useMemo(
    () => [
      { name: "BSc. CSIT", students: "12,500+", color: "#3B82F6" },
      { name: "BCA", students: "10,200+", color: "#10B981" },
      { name: "BIM", students: "8,700+", color: "#F59E0B" },
      { name: "BIT", students: "5,300+", color: "#8B5CF6" },
      { name: "BE Computer", students: "7,800+", color: "#EC4899" },
      { name: "MCA", students: "3,200+", color: "#6366F1" },
    ],
    []
  );

  return (
    <section className="w-full py-12 border-y border-border/10 bg-muted/30 backdrop-blur-sm">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Trusted by students from top universities in Nepal
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {courses.map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.5 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                <div
                  className="text-lg font-bold"
                  style={{ color: course.color }}
                >
                  {course.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {course.students} students
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
