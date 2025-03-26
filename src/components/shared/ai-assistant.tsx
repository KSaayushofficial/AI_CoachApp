"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, ChevronDown, ChevronUp, Lightbulb, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AIAssistantProps {
  initialQuestion?: string;
  initialAnswer?: string;
  className?: string;
  onClose?: () => void;
  isFullScreen?: boolean;
}

export function AIAssistant({
  initialQuestion,
  initialAnswer,
  className,
  onClose,
  isFullScreen = false,
}: AIAssistantProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [explanations, setExplanations] = useState<
    { prompt: string; explanation: string }[]
  >([]);

  const handleGenerateExplanation = () => {
    if (!userPrompt.trim()) return;

    setIsGenerating(true);

    // Simulate AI response generation
    setTimeout(() => {
      const newExplanation = {
        prompt: userPrompt,
        explanation: generateExplanation(userPrompt),
      };

      setExplanations([...explanations, newExplanation]);
      setUserPrompt("");
      setIsGenerating(false);
    }, 1500);
  };

  // Function to generate a simulated explanation based on the prompt
  const generateExplanation = (prompt: string) => {
    const explanationTemplates = [
      `To explain this further: ${prompt} involves understanding the core concepts first. The key point here is that we need to consider multiple factors. First, the theoretical foundation which establishes the principles. Second, the practical application which demonstrates how these principles work in real-world scenarios. This creates a comprehensive understanding of the topic.`,
      `Let me break this down more simply: ${prompt} can be thought of as a step-by-step process. Imagine you're building a structure - you need a solid foundation (the basic concepts), the framework (the methodology), and then the details (specific applications). Each part builds on the previous one, creating a complete understanding.`,
      `From another perspective: ${prompt} can be understood by looking at its components individually. Each component serves a specific purpose and contributes to the overall functionality. By examining how these components interact, we can gain deeper insights into the underlying mechanisms and principles.`,
    ];

    return explanationTemplates[
      Math.floor(Math.random() * explanationTemplates.length)
    ];
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={cn(
          "fixed bottom-4 right-4 z-50 w-full max-w-md",
          isFullScreen && "inset-0 max-w-none m-4",
          className
        )}
      >
        <Card className="border-border/10 bg-background/95 backdrop-blur-xl shadow-xl">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold flex items-center">
                <Brain className="h-5 w-5 mr-2 text-primary" />
                <span>AI Assistant</span>
              </CardTitle>
              <div className="flex items-center gap-1">
                {!isFullScreen && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronUp className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {isExpanded ? "Collapse" : "Expand"}
                    </span>
                  </Button>
                )}
                {onClose && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={onClose}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent
            className={cn(
              "space-y-4",
              !isExpanded && !isFullScreen && "hidden"
            )}
          >
            {initialQuestion && (
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-sm font-medium">{initialQuestion}</p>
              </div>
            )}

            {initialAnswer && (
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm">{initialAnswer}</p>
                  </div>
                </div>
              </div>
            )}

            {explanations.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm font-medium">{item.prompt}</p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm">{item.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="p-3 rounded-lg bg-muted/30 border border-border/10">
              <p className="text-xs text-muted-foreground mb-2">
                Ask for further explanation or clarification:
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Explain this in simpler terms..."
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  className="text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleGenerateExplanation();
                    }
                  }}
                />
                <Button
                  size="sm"
                  onClick={handleGenerateExplanation}
                  disabled={isGenerating || !userPrompt.trim()}
                >
                  {isGenerating ? "..." : "Ask"}
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs rounded-full"
                onClick={() => {
                  setUserPrompt("Explain this in simpler terms");
                  handleGenerateExplanation();
                }}
              >
                Explain simpler
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs rounded-full"
                onClick={() => {
                  setUserPrompt("Give me an example");
                  handleGenerateExplanation();
                }}
              >
                Give example
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs rounded-full"
                onClick={() => {
                  setUserPrompt("Why is this important?");
                  handleGenerateExplanation();
                }}
              >
                Why important?
              </Button>
            </div>
          </CardContent>
          <CardFooter
            className={cn("pt-0", !isExpanded && !isFullScreen && "hidden")}
          >
            <div className="text-xs text-muted-foreground">
              AI-generated explanations may not always be accurate. Verify
              important information.
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
