"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Sparkles, Code, Database, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"

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
      <Header />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6">
        {/* Search Section */}
        <div className="pt-16 pb-12 text-center">
          <h1 className="text-4xl font-semibold text-foreground mb-3 tracking-tight">
            Search with <span className="text-orange-500">Memory</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Discover what actually worked through collective intelligence
          </p>

          {/* Search Form */}
          <div className="max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSearch}>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-orange-500 transition-colors" />
                <Input
                  type="text"
                  placeholder="Ask anything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-28 py-4 text-base bg-background border-2 border-border focus:border-orange-500 focus:ring-0 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  disabled={isSearching}
                />
                <Button
                  type="submit"
                  disabled={!searchQuery.trim() || isSearching}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-background rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50"
                >
                  {isSearching ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-2 border-2 border-background border-t-transparent rounded-full animate-spin" />
                      <span>searching...</span>
                    </div>
                  ) : (
                    <span>Search</span>
                  )}
                </Button>
              </div>
            </form>
          </div>

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
          </div>
        </div>

        {/* Discovery Section */}
        <div className="pb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-foreground">Discover</h2>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground text-sm">
              View all
            </Button>
          </div>

          {/* Clean Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {discoveryBlocks.map((block) => (
              <div
                key={block.id}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-orange-500/30 transition-all duration-200 cursor-pointer"
              >
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  <img
                    src={block.image || "/placeholder.svg"}
                    alt={block.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <div className="bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-foreground">
                      {block.memories}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-orange-500 font-medium uppercase tracking-wide">
                      {block.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{Math.round(block.confidence * 100)}%</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                    {block.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{block.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/20">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>Powered by Letta agent memory • Octavo v0.1</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
