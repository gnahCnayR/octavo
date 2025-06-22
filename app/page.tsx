"use client"

import type React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { SearchForm } from "@/components/search-form"
import { StatsBar } from "@/components/stats-bar"
import { DiscoveryCard } from "@/components/discovery-card"

// Mock discovery data
const discoveryBlocks = [
  {
    id: 1,
    title: "React Performance Optimization",
    description: "Memory insights from 127 developers on React optimization techniques",
    memories: 127,
    category: "Development",
    image: "/placeholder.jpg?height=200&width=300",
    confidence: 0.94,
  },
  {
    id: 2,
    title: "Machine Learning Career Transition",
    description: "Shared experiences from 89 professionals who switched to ML",
    memories: 89,
    category: "Career",
    image: "/placeholder.jpg?height=250&width=300",
    confidence: 0.91,
  },
  {
    id: 3,
    title: "Startup Funding Strategies",
    description: "Collective wisdom from 156 founders on raising capital",
    memories: 156,
    category: "Business",
    image: "/placeholder.jpg?height=180&width=300",
    confidence: 0.88,
  },
  {
    id: 4,
    title: "Remote Work Productivity",
    description: "Best practices from 203 remote workers worldwide",
    memories: 203,
    category: "Productivity",
    image: "/placeholder.jpg?height=220&width=300",
    confidence: 0.92,
  },
  {
    id: 5,
    title: "System Design Interviews",
    description: "Success patterns from 78 engineers at top tech companies",
    memories: 78,
    category: "Interview",
    image: "/placeholder.jpg?height=190&width=300",
    confidence: 0.89,
  },
  {
    id: 6,
    title: "Cryptocurrency Trading",
    description: "Risk management insights from 134 experienced traders",
    memories: 134,
    category: "Finance",
    image: "/placeholder.jpg?height=240&width=300",
    confidence: 0.85,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6">
        {/* Search Section */}
        <div className="pt-16 pb-12 text-center">
          <h1 className="text-4xl font-semibold text-foreground mb-3 tracking-tight">
            Search the <span className="text-orange-500">Collective Mind</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Real wisdom from real people who've been there
          </p>

          {/* Search Form */}
          <SearchForm className="mb-8" />

          {/* Stats */}
          <StatsBar />
        </div>

        {/* Discovery Section */}
        <div className="pb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-foreground">Discover</h2>
            <Link href="/discover">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground text-sm">
                View all
              </Button>
            </Link>
          </div>

          {/* Clean Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {discoveryBlocks.map((block) => (
              <DiscoveryCard
                key={block.id}
                {...block}
                onClick={() => console.log(`Clicked discovery block: ${block.title}`)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/20">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>Made with ❤️ by DG, SY, and RC </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
