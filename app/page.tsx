"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Brain, Sparkles, Code, Database, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Mock discovery data
const discoveryBlocks = [
  {
    id: 1,
    title: "React Performance Optimization",
    description: "Memory insights from 127 developers on React optimization techniques",
    memories: 127,
    category: "Development",
    image: "/placeholder.svg?height=200&width=300",
    confidence: 0.94,
  },
  {
    id: 2,
    title: "Machine Learning Career Transition",
    description: "Shared experiences from 89 professionals who switched to ML",
    memories: 89,
    category: "Career",
    image: "/placeholder.svg?height=250&width=300",
    confidence: 0.91,
  },
  {
    id: 3,
    title: "Startup Funding Strategies",
    description: "Collective wisdom from 156 founders on raising capital",
    memories: 156,
    category: "Business",
    image: "/placeholder.svg?height=180&width=300",
    confidence: 0.88,
  },
  {
    id: 4,
    title: "Remote Work Productivity",
    description: "Best practices from 203 remote workers worldwide",
    memories: 203,
    category: "Productivity",
    image: "/placeholder.svg?height=220&width=300",
    confidence: 0.92,
  },
  {
    id: 5,
    title: "System Design Interviews",
    description: "Success patterns from 78 engineers at top tech companies",
    memories: 78,
    category: "Interview",
    image: "/placeholder.svg?height=190&width=300",
    confidence: 0.89,
  },
  {
    id: 6,
    title: "Cryptocurrency Trading",
    description: "Risk management insights from 134 experienced traders",
    memories: 134,
    category: "Finance",
    image: "/placeholder.svg?height=240&width=300",
    confidence: 0.85,
  },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                <Brain className="w-5 h-5 text-background" />
              </div>
              <span className="text-xl font-bold text-foreground">octopus</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-muted-foreground hover:text-orange-500 transition-colors text-sm">
                discover
              </a>
              <a href="#" className="text-muted-foreground hover:text-orange-500 transition-colors text-sm">
                memories
              </a>
              <a href="#" className="text-muted-foreground hover:text-orange-500 transition-colors text-sm">
                about
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            search with <span className="text-orange-500">memory</span>
          </h1>
          <p className="text-muted-foreground mb-8 text-lg">discover what actually worked</p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="ask anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-32 py-6 text-lg bg-card border-border focus:border-orange-500 focus:ring-orange-500/20 rounded-lg"
                disabled={isSearching}
              />
              <Button
                type="submit"
                disabled={!searchQuery.trim() || isSearching}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-background rounded-md"
              >
                {isSearching ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    <span>searching...</span>
                  </div>
                ) : (
                  <span>search</span>
                )}
              </Button>
            </div>
          </form>

          {/* Stats */}
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>2.4k memories</span>
            </div>
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4" />
              <span>847 agents</span>
            </div>
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4" />
              <span>live processing</span>
            </div>
          </div>
        </div>

        {/* Discovery Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">discover</h2>
            <Button variant="ghost" className="text-muted-foreground hover:text-orange-500">
              view all
            </Button>
          </div>

          {/* Pinterest-style Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {discoveryBlocks.map((block) => (
              <div
                key={block.id}
                className="break-inside-avoid bg-card border border-border rounded-lg overflow-hidden hover:border-orange-500/50 transition-all duration-300 cursor-pointer group"
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img
                    src={block.image || "/placeholder.svg"}
                    alt={block.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <div className="bg-background/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-foreground">
                      {block.memories} memories
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-orange-500 font-medium uppercase tracking-wider">
                      {block.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{Math.round(block.confidence * 100)}%</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-orange-500 transition-colors">
                    {block.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{block.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-muted-foreground text-sm">
            <p>powered by letta agent memory • octopus v0.1</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
