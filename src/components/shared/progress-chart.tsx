"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export function ProgressChart() {
  const [chartType, setChartType] = useState("bar");

  // Sample data
  const data = [
    { name: "Ch 1", score: 85, average: 70 },
    { name: "Ch 2", score: 70, average: 65 },
    { name: "Ch 3", score: 60, average: 60 },
    { name: "Ch 4", score: 45, average: 55 },
    { name: "Ch 5", score: 30, average: 50 },
    { name: "Ch 6", score: 20, average: 45 },
    { name: "Ch 7", score: 10, average: 40 },
    { name: "Ch 8", score: 5, average: 35 },
  ];

  const pieData = [
    { name: "Completed", value: 45 },
    { name: "In Progress", value: 15 },
    { name: "Not Started", value: 40 },
  ];

  const COLORS = ["#10B981", "#3B82F6", "#6B7280"];

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip
                formatter={(value) => [`${value}%`, "Score"]}
                contentStyle={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  borderRadius: "0.5rem",
                }}
              />
              <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="average" fill="#6B7280" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip
                formatter={(value) => [`${value}%`, "Score"]}
                contentStyle={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  borderRadius: "0.5rem",
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="average"
                stroke="#6B7280"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, "Percentage"]}
                contentStyle={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  borderRadius: "0.5rem",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full">
      <div className="flex justify-center mb-4 space-x-2">
        <button
          className={`px-3 py-1 text-xs rounded-full ${
            chartType === "bar"
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          }`}
          onClick={() => setChartType("bar")}
        >
          Bar
        </button>
        <button
          className={`px-3 py-1 text-xs rounded-full ${
            chartType === "line"
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          }`}
          onClick={() => setChartType("line")}
        >
          Line
        </button>
        <button
          className={`px-3 py-1 text-xs rounded-full ${
            chartType === "pie"
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          }`}
          onClick={() => setChartType("pie")}
        >
          Pie
        </button>
      </div>
      <motion.div
        key={chartType}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="h-[200px]"
      >
        {renderChart()}
      </motion.div>
    </div>
  );
}
