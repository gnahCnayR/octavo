"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { SynthesisCard } from "@/components/synthesis-card"
import { InsightsCard } from "@/components/insights-card"
import { MemoryBlock } from "@/components/memory-block"
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

  // Search metadata for the header
  const searchMetadata = (
    <div className="text-sm text-muted-foreground">
      <span className="text-orange-500">{mockSearchResults.processingTime}</span> •{" "}
      {mockSearchResults.totalMemories} memories
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header showBackButton={true} showNavigation={false} rightContent={searchMetadata} />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Query Display */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">"{query}"</h1>
          <p className="text-muted-foreground">searched through {mockSearchResults.totalMemories} shared memories</p>
        </div>

        {/* AI Answer */}
        <SynthesisCard
          answer={mockSearchResults.answer}
          totalMemories={mockSearchResults.totalMemories}
          onExploreReasoning={() => setIsModalOpen(true)}
          className="mb-8"
        />

        {/* Key Insights */}
        <InsightsCard insights={mockSearchResults.insights} className="mb-8" />

        {/* Memory Blocks */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground mb-4">source memories</h3>
          {mockSearchResults.memoryBlocks.map((memory) => (
            <MemoryBlock
              key={memory.id}
              {...memory}
              onClick={() => console.log(`Clicked memory block: ${memory.title}`)}
            />
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
