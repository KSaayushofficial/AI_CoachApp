"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Lightbulb,
  Copy,
  Check,
  RefreshCw,
  X,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AnimatedButton } from "@/components/shared/animated-button";

interface AIAnswerGeneratorProps {
  question: string;
  onClose: () => void;
}

export function AIAnswerGenerator({ question, onClose }: AIAnswerGeneratorProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAnswer, setGeneratedAnswer] = useState("");
  const [copied, setCopied] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");

  useEffect(() => {
    
    handleGenerateAnswer();
  }, []);

  const handleGenerateAnswer = () => {
    setIsGenerating(true);
    setGeneratedAnswer("");

    // Simulate AI generation
    setTimeout(() => {
      const answers = [
        "In JavaScript, the key differences between `let`, `const`, and `var` are:\n\n1. **Scope**:\n   - `var` is function-scoped\n   - `let` and `const` are block-scoped\n\n2. **Hoisting**:\n   - `var` declarations are hoisted and initialized with `undefined`\n   - `let` and `const` declarations are hoisted but not initialized (temporal dead zone)\n\n3. **Reassignment**:\n   - `var` and `let` variables can be reassigned\n   - `const` variables cannot be reassigned after initialization\n\n4. **Redeclaration**:\n   - `var` variables can be redeclared in the same scope\n   - `let` and `const` variables cannot be redeclared in the same scope\n\n5. **Global Object Property**:\n   - `var` declarations in the global scope become properties of the global object\n   - `let` and `const` declarations do not become properties of the global object\n\nExample:\n```javascript\n// var example\nvar x = 1;\nvar x = 2; // Valid redeclaration\nx = 3;     // Valid reassignment\n\n// let example\nlet y = 1;\n// let y = 2; // Invalid redeclaration\ny = 2;      // Valid reassignment\n\n// const example\nconst z = 1;\n// const z = 2; // Invalid redeclaration\n// z = 2;      // Invalid reassignment\nconst obj = { prop: 1 };\nobj.prop = 2;  // Valid property modification\n```",

        'Method overriding in Java is a feature that allows a subclass to provide a specific implementation of a method that is already defined in its superclass. This is a key aspect of runtime polymorphism.\n\nKey characteristics of method overriding:\n\n1. The method in the subclass must have the same name as in the superclass\n2. The method must have the same parameter list\n3. The return type must be the same or a subtype of the return type in the superclass\n4. The access level cannot be more restrictive than the overridden method\n5. The method can throw unchecked exceptions, regardless of whether the overridden method throws exceptions\n\nExample:\n```java\nclass Animal {\n  public void makeSound() {\n    System.out.println("Animal makes a sound");\n  }\n}\n\nclass Dog extends Animal {\n  @Override\n  public void makeSound() {\n    System.out.println("Dog barks");\n  }\n}\n\nclass Cat extends Animal {\n  @Override\n  public void makeSound() {\n    System.out.println("Cat meows");\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Animal myDog = new Dog();\n    Animal myCat = new Cat();\n    \n    myDog.makeSound();  // Outputs: "Dog barks"\n    myCat.makeSound();  // Outputs: "Cat meows"\n  }\n}\n```\n\nIn this example, the `Dog` class overrides the `makeSound()` method from the `Animal` class. When we create a `Dog` object and assign it to an `Animal` reference, the overridden method in the `Dog` class is called, demonstrating polymorphic behavior.',

        "Object-Oriented Programming (OOP) is a programming paradigm based on the concept of 'objects' that contain data and code. The four main principles of OOP are:\n\n1. Encapsulation: The bundling of data and methods that operate on that data within a single unit (class). It restricts direct access to some of an object's components, which prevents unintended interference and misuse.\n\n2. Inheritance: The mechanism by which one class can inherit the fields and methods of another class. It promotes code reuse and establishes a relationship between a parent class and its child classes.\n\n3. Polymorphism: The ability of different classes to be treated as instances of the same class through inheritance. It allows objects to be processed differently based on their data type or class.\n\n4. Abstraction: The concept of hiding complex implementation details and showing only the necessary features of an object. It helps in reducing programming complexity and effort.\n\nThese principles help in creating modular, flexible, and maintainable code by promoting better organization and reuse of code components.",
      ];

      // Choose a random answer based on the question
      let answer = "";
      if (
        question.toLowerCase().includes("let") &&
        question.toLowerCase().includes("const") &&
        question.toLowerCase().includes("var")
      ) {
        answer = answers[0];
      } else if (question.toLowerCase().includes("method overriding")) {
        answer = answers[1];
      } else {
        answer = answers[2];
      }

      setGeneratedAnswer(answer);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedAnswer);
    setCopied(true);

    toast({
      title: "Copied to clipboard",
      description: "The generated answer has been copied to your clipboard.",
    });

    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerateAnswer = () => {
    setGeneratedAnswer("");
    handleGenerateAnswer();
  };

  const handleCustomPrompt = () => {
    if (!userPrompt.trim()) return;

    setIsGenerating(true);

    // Simulate AI generation with custom prompt
    setTimeout(() => {
      const customAnswer = `Based on your request to "${userPrompt}":\n\n${generatedAnswer}\n\nI've tailored this explanation to address your specific needs. If you need further clarification or have additional questions, feel free to ask.`;
      setGeneratedAnswer(customAnswer);
      setUserPrompt("");
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold flex items-center">
            <Brain className="h-5 w-5 mr-2 text-primary" />
            <span>AI Answer Generator</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-border/10 bg-background/80">
            <h4 className="font-medium mb-2">Question:</h4>
            <p>{question}</p>
          </div>

          {!generatedAnswer ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              {isGenerating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <Brain className="size-12 text-primary" />
                  </motion.div>
                  <p className="text-muted-foreground">Generating answer...</p>
                </>
              ) : (
                <>
                  <Sparkles className="size-12 text-primary mb-2" />
                  <p className="text-center text-muted-foreground mb-4">
                    Click the button below to generate an AI-powered answer to
                    this question.
                  </p>
                  <AnimatedButton onClick={handleGenerateAnswer} className="">
                    <Brain className="mr-2 h-4 w-4" />
                    Generate Answer
                  </AnimatedButton>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 relative">
                <div className="absolute top-2 right-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={handleCopyToClipboard}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span className="sr-only">Copy to clipboard</span>
                  </Button>
                </div>
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-primary mb-2">
                      AI-Generated Answer:
                    </h4>
                    <div className="whitespace-pre-wrap text-sm">
                      {generatedAnswer}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={handleRegenerateAnswer}
                >
                  <RefreshCw className="mr-2 h-3 w-3" />
                  Regenerate
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <MessageSquare className="mr-2 h-3 w-3" />
                  Ask Follow-up
                </Button>
              </div>

              <div className="p-3 rounded-lg border border-border/10 bg-muted/30">
                <p className="text-xs text-muted-foreground mb-2">
                  Customize your answer:
                </p>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="e.g., Explain in simpler terms, Provide more examples, etc."
                    className="text-sm min-h-[60px]"
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                  />
                </div>
                <div className="mt-2 flex justify-end">
                  <Button
                    size="sm"
                    onClick={handleCustomPrompt}
                    disabled={isGenerating || !userPrompt.trim()}
                  >
                    {isGenerating ? "Processing..." : "Apply"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        AI-generated answers may not always be accurate. Verify important
        information.
      </CardFooter>
    </Card>
  );
}
