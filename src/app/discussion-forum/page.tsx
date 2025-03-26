"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Search,
  Filter,
  ChevronDown,
  Plus,
  MessageCircle,
  Clock,
  User,
  Tag,
  ArrowUp,
  ArrowDown,
  Reply,
  CheckCircle2,
  Brain,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function DiscussionForumPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreatePost = () => {
    toast({
      title: "Create new post",
      description: "Opening post editor...",
    });
  };

  const handleUpvote = (postId: number) => {
    toast({
      title: "Post upvoted",
      description: "Your vote has been recorded.",
    });
  };

  const handleDownvote = (postId: number) => {
    toast({
      title: "Post downvoted",
      description: "Your vote has been recorded.",
    });
  };

  const handleReply = (postId: number) => {
    toast({
      title: "Reply to post",
      description: "Opening reply editor...",
    });
  };

  const discussions = [
    {
      id: 1,
      title: "Understanding polymorphism in Java - need help with examples",
      author: "aayush_sharma",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      date: "2023-11-28T14:30:00Z",
      content:
        "I'm struggling to understand polymorphism in Java, especially when it comes to practical examples. Can someone explain how method overriding works with a simple example? I've tried implementing it but keep getting errors.",
      tags: ["Java", "OOP", "BCA", "Polymorphism"],
      upvotes: 15,
      replies: 8,
      views: 124,
      isVerified: true,
      hasAIResponse: true,
    },
    {
      id: 2,
      title: "Database normalization forms - differences between 3NF and BCNF",
      author: "priya_k",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      date: "2023-11-27T09:15:00Z",
      content:
        "I'm preparing for my DBMS exam and I'm confused about the differences between 3NF and BCNF. Can someone explain with examples when a relation is in 3NF but not in BCNF? Also, how important is this concept for the exam?",
      tags: ["Database", "DBMS", "Normalization", "BCA"],
      upvotes: 12,
      replies: 6,
      views: 98,
      isVerified: false,
      hasAIResponse: true,
    },
    {
      id: 3,
      title: "TCP vs UDP protocols - key differences for networking exam",
      author: "rohan_m",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      date: "2023-11-25T16:45:00Z",
      content:
        "Can someone explain the key differences between TCP and UDP protocols? I need to understand when to use each one and their advantages/disadvantages. Also, what are some common exam questions related to these protocols?",
      tags: ["Computer Networks", "TCP/IP", "Protocols", "BCA"],
      upvotes: 9,
      replies: 4,
      views: 76,
      isVerified: true,
      hasAIResponse: false,
    },
    {
      id: 4,
      title: "Preparing for BCA 3rd semester exams - study strategy",
      author: "neha_g",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      date: "2023-11-23T11:20:00Z",
      content:
        "I'm starting to prepare for my BCA 3rd semester exams. What's the best strategy to cover all subjects effectively? How many hours should I dedicate to each subject? Any tips for time management during the exam period?",
      tags: ["BCA", "Exam Preparation", "Study Tips", "Time Management"],
      upvotes: 21,
      replies: 12,
      views: 187,
      isVerified: false,
      hasAIResponse: true,
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `${diffMinutes} minutes ago`;
      }
      return `${diffHours} hours ago`;
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  const filteredDiscussions = discussions.filter((discussion) => {
    if (activeTab === "verified" && !discussion.isVerified) {
      return false;
    }

    if (activeTab === "ai-responses" && !discussion.hasAIResponse) {
      return false;
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        discussion.title.toLowerCase().includes(query) ||
        discussion.content.toLowerCase().includes(query) ||
        discussion.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return true;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Discussion Forum
          </h1>
          <p className="text-muted-foreground">
            Connect with fellow students, ask questions, and share knowledge.
          </p>
        </div>
        <Button className="rounded-full" onClick={handleCreatePost}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Post
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search discussions..."
            className="pl-10 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full md:w-auto rounded-full"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Most Recent</DropdownMenuItem>
              <DropdownMenuItem>Most Upvoted</DropdownMenuItem>
              <DropdownMenuItem>Most Viewed</DropdownMenuItem>
              <DropdownMenuItem>Most Replies</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full md:w-auto rounded-full"
              >
                <Tag className="mr-2 h-4 w-4" />
                Topics
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Java</DropdownMenuItem>
              <DropdownMenuItem>Database</DropdownMenuItem>
              <DropdownMenuItem>Computer Networks</DropdownMenuItem>
              <DropdownMenuItem>Web Technology</DropdownMenuItem>
              <DropdownMenuItem>Data Structures</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex justify-center mb-8">
          <TabsList className="rounded-full">
            <TabsTrigger value="all" className="rounded-full">
              All Discussions
            </TabsTrigger>
            <TabsTrigger value="verified" className="rounded-full">
              Verified Answers
            </TabsTrigger>
            <TabsTrigger value="ai-responses" className="rounded-full">
              AI Responses
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {filteredDiscussions.length > 0 ? (
              filteredDiscussions.map((discussion) => (
                <motion.div key={discussion.id} variants={item}>
                  <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            onClick={() => handleUpvote(discussion.id)}
                          >
                            <ArrowUp className="h-5 w-5" />
                            <span className="sr-only">Upvote</span>
                          </Button>
                          <span className="font-medium">
                            {discussion.upvotes}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            onClick={() => handleDownvote(discussion.id)}
                          >
                            <ArrowDown className="h-5 w-5" />
                            <span className="sr-only">Downvote</span>
                          </Button>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Link
                              href={`/discussion-forum/${discussion.id}`}
                              className="text-xl font-bold hover:text-primary transition-colors"
                            >
                              {discussion.title}
                            </Link>
                            {discussion.isVerified && (
                              <Badge
                                variant="outline"
                                className="bg-green-500/10 text-green-500 border-green-500/20"
                              >
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                Verified
                              </Badge>
                            )}
                            {discussion.hasAIResponse && (
                              <Badge
                                variant="outline"
                                className="bg-purple-500/10 text-purple-500 border-purple-500/20"
                              >
                                <Brain className="mr-1 h-3 w-3" />
                                AI Response
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Avatar className="size-5">
                                <AvatarImage
                                  src={discussion.authorAvatar}
                                  alt={discussion.author}
                                />
                                <AvatarFallback>
                                  {discussion.author.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span>{discussion.author}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{formatDate(discussion.date)}</span>
                            </div>
                          </div>

                          <p className="text-muted-foreground line-clamp-2 mb-3">
                            {discussion.content}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {discussion.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-muted/50"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              <span>{discussion.replies} replies</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{discussion.views} views</span>
                            </div>
                            <div className="ml-auto">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-full"
                                onClick={() => handleReply(discussion.id)}
                              >
                                <Reply className="mr-1 h-4 w-4" />
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                  <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <MessageSquare className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    No discussions found
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    No discussions match your current filters. Try adjusting
                    your search criteria or create a new post.
                  </p>
                  <Button className="rounded-full" onClick={handleCreatePost}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Post
                  </Button>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </TabsContent>

        <TabsContent value="verified">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {filteredDiscussions.length > 0 ? (
              filteredDiscussions.map((discussion) => (
                <motion.div key={discussion.id} variants={item}>
                  <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            onClick={() => handleUpvote(discussion.id)}
                          >
                            <ArrowUp className="h-5 w-5" />
                            <span className="sr-only">Upvote</span>
                          </Button>
                          <span className="font-medium">
                            {discussion.upvotes}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            onClick={() => handleDownvote(discussion.id)}
                          >
                            <ArrowDown className="h-5 w-5" />
                            <span className="sr-only">Downvote</span>
                          </Button>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Link
                              href={`/discussion-forum/${discussion.id}`}
                              className="text-xl font-bold hover:text-primary transition-colors"
                            >
                              {discussion.title}
                            </Link>
                            <Badge
                              variant="outline"
                              className="bg-green-500/10 text-green-500 border-green-500/20"
                            >
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Verified
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Avatar className="size-5">
                                <AvatarImage
                                  src={discussion.authorAvatar}
                                  alt={discussion.author}
                                />
                                <AvatarFallback>
                                  {discussion.author.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span>{discussion.author}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{formatDate(discussion.date)}</span>
                            </div>
                          </div>

                          <p className="text-muted-foreground line-clamp-2 mb-3">
                            {discussion.content}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {discussion.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-muted/50"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              <span>{discussion.replies} replies</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{discussion.views} views</span>
                            </div>
                            <div className="ml-auto">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-full"
                                onClick={() => handleReply(discussion.id)}
                              >
                                <Reply className="mr-1 h-4 w-4" />
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                  <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    No verified discussions found
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    There are no discussions with verified answers matching your
                    criteria. Try adjusting your search or check back later.
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={() => setActiveTab("all")}
                  >
                    View All Discussions
                  </Button>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </TabsContent>

        <TabsContent value="ai-responses">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {filteredDiscussions.length > 0 ? (
              filteredDiscussions.map((discussion) => (
                <motion.div key={discussion.id} variants={item}>
                  <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            onClick={() => handleUpvote(discussion.id)}
                          >
                            <ArrowUp className="h-5 w-5" />
                            <span className="sr-only">Upvote</span>
                          </Button>
                          <span className="font-medium">
                            {discussion.upvotes}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            onClick={() => handleDownvote(discussion.id)}
                          >
                            <ArrowDown className="h-5 w-5" />
                            <span className="sr-only">Downvote</span>
                          </Button>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Link
                              href={`/discussion-forum/${discussion.id}`}
                              className="text-xl font-bold hover:text-primary transition-colors"
                            >
                              {discussion.title}
                            </Link>
                            <Badge
                              variant="outline"
                              className="bg-purple-500/10 text-purple-500 border-purple-500/20"
                            >
                              <Brain className="mr-1 h-3 w-3" />
                              AI Response
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Avatar className="size-5">
                                <AvatarImage
                                  src={discussion.authorAvatar}
                                  alt={discussion.author}
                                />
                                <AvatarFallback>
                                  {discussion.author.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span>{discussion.author}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{formatDate(discussion.date)}</span>
                            </div>
                          </div>

                          <p className="text-muted-foreground line-clamp-2 mb-3">
                            {discussion.content}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {discussion.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-muted/50"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              <span>{discussion.replies} replies</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{discussion.views} views</span>
                            </div>
                            <div className="ml-auto">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-full"
                                onClick={() => handleReply(discussion.id)}
                              >
                                <Reply className="mr-1 h-4 w-4" />
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
                <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                  <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Brain className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    No AI responses found
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    There are no discussions with AI responses matching your
                    criteria. Try adjusting your search or check back later.
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={() => setActiveTab("all")}
                  >
                    View All Discussions
                  </Button>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </TabsContent>
      </Tabs>

      <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
            <span>AI Discussion Assistant</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 backdrop-blur-sm rounded-xl p-6 border border-border/10">
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Brain className="h-6 w-6" />
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-lg font-bold">
                    Need help with your questions?
                  </h3>
                  <p className="text-muted-foreground">
                    I can help you formulate questions, find relevant
                    discussions, or provide answers to common academic queries.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Ask me anything about your courses..."
                    className="rounded-full"
                  />
                  <Button className="rounded-full">Ask AI</Button>
                </div>

                <div className="p-3 rounded-lg bg-background/80 border border-border/10">
                  <p className="text-sm font-medium">Try asking:</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 rounded-full text-xs"
                    >
                      How do I explain polymorphism clearly?
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 rounded-full text-xs"
                    >
                      Find discussions about database normalization
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 rounded-full text-xs"
                    >
                      Help me draft a question about TCP/IP
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
