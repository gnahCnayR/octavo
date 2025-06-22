"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { DiscoveryCard } from "@/components/discovery-card"
import { Badge } from "@/components/ui/badge"

const categories = [
  { id: "top", label: "Top", active: true },
  { id: "technology", label: "Technology" },
  { id: "business", label: "Business" },
  { id: "science", label: "Science" },
  { id: "career", label: "Career" },
  { id: "productivity", label: "Productivity" },
  { id: "finance", label: "Finance" },
]

const featuredContent = {
  id: "featured",
  title: "The Complete Guide to Building AI-Powered Applications",
  description: "Comprehensive insights from 400+ developers who successfully deployed AI applications in production, covering everything from model selection to scaling challenges.",
  memories: 412,
  category: "Technology",
  image: "/placeholder.svg?height=400&width=800",
  confidence: 0.97,
  author: "Collective Intelligence",
  readTime: "8 min read",
  tags: ["AI", "Machine Learning", "Production", "Best Practices"]
}

const discoverContent = [
  {
    id: 1,
    title: "Startup Funding in 2024",
    description: "Latest trends and strategies from 150+ successful funding rounds",
    memories: 156,
    category: "Business",
    image: "/placeholder.svg?height=300&width=400",
    confidence: 0.94,
  },
  {
    id: 2,
    title: "Remote Team Management",
    description: "Best practices from 200+ remote team leaders worldwide",
    memories: 203,
    category: "Productivity",
    image: "/placeholder.svg?height=300&width=400",
    confidence: 0.91,
  },
  {
    id: 3,
    title: "Career Transition to Data Science",
    description: "Success stories from 89 professionals who made the switch",
    memories: 89,
    category: "Career",
    image: "/placeholder.svg?height=300&width=400",
    confidence: 0.89,
  },
  {
    id: 4,
    title: "Cryptocurrency Portfolio Strategy",
    description: "Risk management insights from 134 experienced traders",
    memories: 134,
    category: "Finance",
    image: "/placeholder.svg?height=300&width=400",
    confidence: 0.87,
  },
  {
    id: 5,
    title: "System Design Interview Prep",
    description: "Success patterns from 78 engineers at top tech companies",
    memories: 78,
    category: "Technology",
    image: "/placeholder.svg?height=300&width=400",
    confidence: 0.93,
  },
  {
    id: 6,
    title: "Scientific Research Methodology",
    description: "Proven research approaches from 120+ published scientists",
    memories: 125,
    category: "Science",
    image: "/placeholder.svg?height=300&width=400",
    confidence: 0.88,
  },
]

export default function DiscoverPage() {
  const [activeCategory, setActiveCategory] = useState("top")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">Discover</h1>
          <p className="text-muted-foreground">Explore trending insights from our collective memory</p>
        </div>
{/* 

        <div className="mb-8">
          <div className="flex items-center space-x-1 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category.id
                    ? "bg-orange-500 text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div> */}

        {/* Featured Content */}
        <div className="mb-12">
          <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-orange-500/30 transition-all duration-200 cursor-pointer group">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="aspect-[16/10] lg:aspect-auto relative overflow-hidden">
                <img
                  src={featuredContent.image}
                  alt={featuredContent.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-orange-500 text-background">Featured</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-foreground">
                    {featuredContent.memories} memories
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xs text-orange-500 font-medium uppercase tracking-wide">
                    {featuredContent.category}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{featuredContent.readTime}</span>
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-4 group-hover:text-orange-500 transition-colors">
                  {featuredContent.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {featuredContent.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredContent.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">by {featuredContent.author}</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(featuredContent.confidence * 100)}% confidence
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Discovery Grid */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-6">Trending Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {discoverContent.map((item) => (
              <DiscoveryCard
                key={item.id}
                {...item}
                onClick={() => console.log(`Navigate to discovery: ${item.title}`)}
              />
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center">
          <button className="px-6 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors">
            Load More Discoveries
          </button>
        </div>
      </main>
    </div>
  )
} 