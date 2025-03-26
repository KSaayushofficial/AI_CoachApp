"use client";

import { useState } from "react";
import { Check, Filter, SortAsc, Star, Zap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface QuestionFilterProps {
  onFilterChange: (filters: {
    difficulty: string;
    popularity: string;
    relevance: string;
  }) => void;
  className?: string;
}

export function QuestionFilter({
  onFilterChange,
  className,
}: QuestionFilterProps) {
  const [difficulty, setDifficulty] = useState("all");
  const [popularity, setPopularity] = useState("all");
  const [relevance, setRelevance] = useState("all");

  const handleDifficultyChange = (value: string) => {
    setDifficulty(value);
    onFilterChange({ difficulty: value, popularity, relevance });
  };

  const handlePopularityChange = (value: string) => {
    setPopularity(value);
    onFilterChange({ difficulty, popularity: value, relevance });
  };

  const handleRelevanceChange = (value: string) => {
    setRelevance(value);
    onFilterChange({ difficulty, popularity, relevance: value });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (difficulty !== "all") count++;
    if (popularity !== "all") count++;
    if (relevance !== "all") count++;
    return count;
  };

  const resetFilters = () => {
    setDifficulty("all");
    setPopularity("all");
    setRelevance("all");
    onFilterChange({ difficulty: "all", popularity: "all", relevance: "all" });
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 rounded-full">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {getActiveFiltersCount() > 0 && (
              <Badge className="ml-1 size-5 rounded-full p-0 flex items-center justify-center bg-primary text-primary-foreground">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filter Questions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Difficulty
            </DropdownMenuLabel>
            {[
              { value: "all", label: "All Difficulties" },
              {
                value: "easy",
                label: "Easy",
                icon: <Zap className="h-4 w-4 text-green-500" />,
              },
              {
                value: "medium",
                label: "Medium",
                icon: <Zap className="h-4 w-4 text-amber-500" />,
              },
              {
                value: "hard",
                label: "Hard",
                icon: <Zap className="h-4 w-4 text-red-500" />,
              },
            ].map((item) => (
              <DropdownMenuItem
                key={item.value}
                className="flex items-center justify-between"
                onClick={() => handleDifficultyChange(item.value)}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {difficulty === item.value && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Popularity
            </DropdownMenuLabel>
            {[
              { value: "all", label: "All Questions" },
              {
                value: "most",
                label: "Most Popular",
                icon: <Star className="h-4 w-4 text-amber-500" />,
              },
              {
                value: "trending",
                label: "Trending Now",
                icon: <Star className="h-4 w-4 text-blue-500" />,
              },
            ].map((item) => (
              <DropdownMenuItem
                key={item.value}
                className="flex items-center justify-between"
                onClick={() => handlePopularityChange(item.value)}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {popularity === item.value && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Exam Relevance
            </DropdownMenuLabel>
            {[
              { value: "all", label: "All Questions" },
              {
                value: "high",
                label: "High Relevance",
                icon: <SortAsc className="h-4 w-4 text-green-500" />,
              },
              {
                value: "medium",
                label: "Medium Relevance",
                icon: <SortAsc className="h-4 w-4 text-amber-500" />,
              },
              {
                value: "low",
                label: "Low Relevance",
                icon: <SortAsc className="h-4 w-4 text-red-500" />,
              },
            ].map((item) => (
              <DropdownMenuItem
                key={item.value}
                className="flex items-center justify-between"
                onClick={() => handleRelevanceChange(item.value)}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {relevance === item.value && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center"
            onClick={resetFilters}
          >
            Reset Filters
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>

      {getActiveFiltersCount() > 0 && (
        <div className="flex flex-wrap gap-1">
          {difficulty !== "all" && (
            <Badge
              variant="outline"
              className="rounded-full bg-primary/10 text-primary border-primary/20"
            >
              {difficulty === "easy"
                ? "Easy"
                : difficulty === "medium"
                ? "Medium"
                : "Hard"}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 p-0 hover:bg-transparent"
                onClick={() => handleDifficultyChange("all")}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove</span>
              </Button>
            </Badge>
          )}

          {popularity !== "all" && (
            <Badge
              variant="outline"
              className="rounded-full bg-primary/10 text-primary border-primary/20"
            >
              {popularity === "most" ? "Most Popular" : "Trending"}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 p-0 hover:bg-transparent"
                onClick={() => handlePopularityChange("all")}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove</span>
              </Button>
            </Badge>
          )}

          {relevance !== "all" && (
            <Badge
              variant="outline"
              className="rounded-full bg-primary/10 text-primary border-primary/20"
            >
              {relevance === "high"
                ? "High Relevance"
                : relevance === "medium"
                ? "Medium Relevance"
                : "Low Relevance"}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 p-0 hover:bg-transparent"
                onClick={() => handleRelevanceChange("all")}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove</span>
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
