"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, Filter, ChevronDown } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function IndustrialInsightsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("trending");

  const industries = [
    {
      id: 1,
      name: "Technology",
      description:
        "Explore the latest trends in technology, including AI, cloud computing, and cybersecurity.",
      trends: [
        { name: "Artificial Intelligence", growth: 78 },
        { name: "Cloud Computing", growth: 65 },
        { name: "Cybersecurity", growth: 82 },
      ],
      marketSize: "$5.2T",
      keyPlayers: ["Apple", "Microsoft", "Google", "Amazon", "Meta"],
      growthRate: 12.5,
      color: "#3B82F6",
    },
    {
      id: 2,
      name: "Healthcare",
      description:
        "Discover innovations in healthcare, from telemedicine to personalized medicine and health tech.",
      trends: [
        { name: "Telemedicine", growth: 71 },
        { name: "Personalized Medicine", growth: 58 },
        { name: "Health Tech", growth: 63 },
      ],
      marketSize: "$8.3T",
      keyPlayers: [
        "Johnson & Johnson",
        "UnitedHealth Group",
        "Pfizer",
        "Roche",
        "Novartis",
      ],
      growthRate: 8.2,
      color: "#10B981",
    },
    {
      id: 3,
      name: "Finance",
      description:
        "Stay updated on financial industry trends, including fintech, blockchain, and digital banking.",
      trends: [
        { name: "Fintech", growth: 68 },
        { name: "Blockchain", growth: 54 },
        { name: "Digital Banking", growth: 76 },
      ],
      marketSize: "$22.5T",
      keyPlayers: [
        "JPMorgan Chase",
        "Bank of America",
        "Goldman Sachs",
        "Visa",
        "PayPal",
      ],
      growthRate: 6.7,
      color: "#F59E0B",
    },
    {
      id: 4,
      name: "Renewable Energy",
      description:
        "Learn about sustainable energy solutions, including solar, wind, and green hydrogen technologies.",
      trends: [
        { name: "Solar Energy", growth: 85 },
        { name: "Wind Power", growth: 72 },
        { name: "Green Hydrogen", growth: 61 },
      ],
      marketSize: "$1.5T",
      keyPlayers: [
        "NextEra Energy",
        "Vestas",
        "First Solar",
        "Tesla",
        "Orsted",
      ],
      growthRate: 15.3,
      color: "#34D399",
    },
    {
      id: 5,
      name: "E-commerce",
      description:
        "Explore the evolving landscape of online retail, from marketplaces to direct-to-consumer brands.",
      trends: [
        { name: "Social Commerce", growth: 79 },
        { name: "Voice Shopping", growth: 52 },
        { name: "Subscription Models", growth: 67 },
      ],
      marketSize: "$4.9T",
      keyPlayers: ["Amazon", "Alibaba", "Shopify", "eBay", "Walmart"],
      growthRate: 14.7,
      color: "#EC4899",
    },
    {
      id: 6,
      name: "Manufacturing",
      description:
        "Discover how Industry 4.0 is transforming manufacturing with automation and smart factories.",
      trends: [
        { name: "Industry 4.0", growth: 64 },
        { name: "3D Printing", growth: 58 },
        { name: "Smart Factories", growth: 71 },
      ],
      marketSize: "$13.8T",
      keyPlayers: [
        "Siemens",
        "General Electric",
        "ABB",
        "Honeywell",
        "Schneider Electric",
      ],
      growthRate: 5.3,
      color: "#8B5CF6",
    },
  ];

  const filteredIndustries = industries.filter((industry) => {
    if (
      activeFilter !== "all" &&
      industry.name.toLowerCase() !== activeFilter.toLowerCase()
    ) {
      return false;
    }

    if (searchQuery) {
      return (
        industry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        industry.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return true;
  });

  const sortedIndustries = [...filteredIndustries].sort((a, b) => {
    if (sortBy === "trending") {
      return b.growthRate - a.growthRate;
    } else if (sortBy === "alphabetical") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "marketSize") {
      return (
        Number.parseFloat(b.marketSize.substring(1)) -
        Number.parseFloat(a.marketSize.substring(1))
      );
    }
    return 0;
  });

  const marketShareData = industries.map((industry) => ({
    name: industry.name,
    value: Number.parseFloat(industry.marketSize.substring(1)),
    color: industry.color,
  }));

  const growthData = industries.map((industry) => ({
    name: industry.name,
    growth: industry.growthRate,
    color: industry.color,
  }));

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
    <div className="container py-10 md:py-16 space-y-12">
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]"></div>
        <PageHeader
          title="Industrial Insights"
          description="Explore in-depth analysis of various industries, market trends, key players, and emerging technologies."
          className="text-center max-w-3xl mx-auto mb-12"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search industries, trends, companies..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setActiveFilter("all")}>
                All Industries
              </DropdownMenuItem>
              {industries.map((industry) => (
                <DropdownMenuItem
                  key={industry.id}
                  onClick={() => setActiveFilter(industry.name.toLowerCase())}
                >
                  {industry.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <TrendingUp className="mr-2 h-4 w-4" />
                Sort By
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortBy("trending")}>
                Trending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("alphabetical")}>
                Alphabetical
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("marketSize")}>
                Market Size
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Market Size by Industry</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketShareData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {marketShareData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value}T`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/10 bg-background/50 backdrop-blur-md shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Growth Rate by Industry</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis unit="%" />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar dataKey="growth" radius={[4, 4, 0, 0]}>
                    {growthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="rounded-full">
            <TabsTrigger value="grid" className="rounded-full">
              Grid View
            </TabsTrigger>
            <TabsTrigger value="detailed" className="rounded-full">
              Detailed View
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {sortedIndustries.map((industry) => (
              <motion.div key={industry.id} variants={item}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-full overflow-hidden border-border/10 bg-background/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div
                          className="size-12 rounded-full"
                          style={{ backgroundColor: `${industry.color}20` }}
                        >
                          <div
                            className="w-full h-full flex items-center justify-center text-lg font-bold"
                            style={{ color: industry.color }}
                          >
                            {industry.name.charAt(0)}
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-primary/10 text-primary border-primary/20"
                        >
                          {industry.growthRate}% Growth
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {industry.name}
                      </h3>
                      <p className="text-muted-foreground mb-4 flex-grow">
                        {industry.description}
                      </p>
                      <div className="space-y-2 mt-auto">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Market Size:
                          </span>
                          <span className="font-medium">
                            {industry.marketSize}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Key Players:
                          </span>
                          <span className="font-medium">
                            {industry.keyPlayers.slice(0, 2).join(", ")}...
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="detailed">
          <div className="space-y-6">
            {sortedIndustries.map((industry) => (
              <Card
                key={industry.id}
                className="border-border/10 bg-background/50 backdrop-blur-md shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="size-10 rounded-full"
                          style={{ backgroundColor: `${industry.color}20` }}
                        >
                          <div
                            className="w-full h-full flex items-center justify-center text-lg font-bold"
                            style={{ color: industry.color }}
                          >
                            {industry.name.charAt(0)}
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold">{industry.name}</h3>
                        <Badge
                          variant="outline"
                          className="bg-primary/10 text-primary border-primary/20"
                        >
                          {industry.growthRate}% Growth
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-6">
                        {industry.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">
                            Market Size
                          </h4>
                          <p className="text-2xl font-bold">
                            {industry.marketSize}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">
                            Growth Rate
                          </h4>
                          <p className="text-2xl font-bold">
                            {industry.growthRate}%
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          Key Players
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {industry.keyPlayers.map((player, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-muted/50"
                            >
                              {player}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/3">
                      <h4 className="text-sm font-medium text-muted-foreground mb-4">
                        Top Trends
                      </h4>
                      <div className="space-y-4">
                        {industry.trends.map((trend, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{trend.name}</span>
                              <span className="font-medium">
                                {trend.growth}%
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="h-2 rounded-full"
                                style={{
                                  width: `${trend.growth}%`,
                                  backgroundColor: industry.color,
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
