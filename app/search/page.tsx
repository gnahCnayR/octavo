"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Brain, ArrowLeft, Sparkles, Clock, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MemoryExplorerModal } from "@/components/memory-explorer-modal"

const mockSearchResults = {
  query: "React performance optimization",
  totalMemories: 127,
  processingTime: "0.34s",
  answer:
    "Based on 127 shared memories, React performance optimization follows three critical patterns: memoization strategies (React.memo, useMemo, useCallback), virtual DOM optimization through proper key usage, and state management efficiency. The most successful developers implement performance monitoring first, then optimize based on actual bottlenecks rather than premature optimization.",
  insights: [
    "React.memo prevents unnecessary re-renders in 89% of optimization cases",
    "useCallback and useMemo reduce computation overhead by average 67%",
    "Proper key props in lists improve rendering performance by 45%",
    "Code splitting with React.lazy reduces initial bundle size by 60%",
    "Performance profiling tools identify bottlenecks in 94% of cases",
  ],
  memoryBlocks: [
    {
      id: 1,
      title: "React Performance at Scale - Meta Engineer",
      source: "Senior Frontend Engineer",
      year: 2024,
      confidence: 0.96,
      summary: "Production optimization techniques for React apps serving millions of users",
      category: "Production",
    },
    {
      id: 2,
      title: "Optimization Journey - Startup CTO",
      source: "Technical Founder",
      year: 2023,
      confidence: 0.92,
      summary: "Complete performance overhaul reducing load times from 8s to 1.2s",
      category: "Case Study",
    },
    {
      id: 3,
      title: "React Profiling Deep Dive",
      source: "Performance Consultant",
      year: 2024,
      confidence: 0.89,
      summary: "Systematic approach to identifying and fixing React performance issues",
      category: "Methodology",
    },
  ],
}

function SearchResultsContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">processing memories...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-40 bg-background/80">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                  <Brain className="w-5 h-5 text-background" />
                </div>
                <span className="text-xl font-bold text-foreground">octopus</span>
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="text-orange-500">{mockSearchResults.processingTime}</span> •{" "}
              {mockSearchResults.totalMemories} memories
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Query Display */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">"{query}"</h1>
          <p className="text-muted-foreground">searched through {mockSearchResults.totalMemories} shared memories</p>
        </div>

        {/* AI Answer */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <span className="font-semibold text-foreground">synthesis</span>
            </div>
            <Badge variant="secondary" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
              {mockSearchResults.totalMemories} memories
            </Badge>
          </div>
          <p className="text-foreground leading-relaxed mb-6 text-lg">{mockSearchResults.answer}</p>
          <Button onClick={() => setIsModalOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-background">
            <ExternalLink className="w-4 h-4 mr-2" />
            explore reasoning
          </Button>
        </div>

        {/* Key Insights */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Clock className="w-5 h-5 text-orange-500" />
            <span>key insights</span>
          </h3>
          <ul className="space-y-3">
            {mockSearchResults.insights.map((insight, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2.5 flex-shrink-0" />
                <span className="text-muted-foreground leading-relaxed">{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Memory Blocks */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground mb-4">source memories</h3>
          {mockSearchResults.memoryBlocks.map((memory) => (
            <div
              key={memory.id}
              className="bg-card border border-border rounded-lg p-6 hover:border-orange-500/50 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-foreground flex-1">{memory.title}</h4>
                <div className="flex items-center space-x-2 ml-4">
                  <Badge variant="outline" className="text-xs">
                    {memory.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {memory.year}
                  </Badge>
                </div>
              </div>
              <p className="text-muted-foreground mb-3 leading-relaxed">{memory.summary}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">by {memory.source}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {Math.round(memory.confidence * 100)}% confidence
                  </span>
                  <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${memory.confidence * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <MemoryExplorerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} query={query} />
    </div>
  )
}

export default function SearchResults() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        </div>
      }
    >
      <SearchResultsContent />
    </Suspense>
  )
}
