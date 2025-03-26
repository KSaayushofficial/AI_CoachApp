"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QuestionType, Difficulty } from "@prisma/client";
import { createQuestion } from "@/app/services/question-service"

export default function QuestionManagementPage() {
  const [type, setType] = useState<QuestionType>("MCQ");
  const [text, setText] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("MEDIUM");
  const [topic, setTopic] = useState("");
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const questionData = {
        type,
        text,
        subjectId,
        difficulty,
        topic: topic || undefined,
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : undefined,
      };
      await createQuestion(questionData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-2xl font-bold">Create New Question</h1>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Question Type</Label>
          <Select
            value={type}
            onValueChange={(value) => setType(value as QuestionType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MCQ">Multiple Choice</SelectItem>
              <SelectItem value="SHORT_ANSWER">Short Answer</SelectItem>
              <SelectItem value="LONG_ANSWER">Long Answer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Question Text</Label>
          <Input value={text} onChange={(e) => setText(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Subject ID</Label>
          <Input
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Difficulty</Label>
          <Select
            value={difficulty}
            onValueChange={(value) => setDifficulty(value as Difficulty)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EASY">Easy</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HARD">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Topic (Optional)</Label>
          <Input value={topic} onChange={(e) => setTopic(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Tags (Comma separated, Optional)</Label>
          <Input value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>

        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Question"}
        </Button>
      </div>
    </div>
  );
}
