"use client"

import { useState } from "react"
import { Brain, ToggleLeft, ToggleRight, ChevronRight, Lightbulb } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MemoryExplorerModalProps {
  isOpen: boolean
  onClose: () => void
  query: string
}

const mockLettaReasoning = {
  steps: [
    {
      step: 1,
      title: "query_analysis",
      description: "parsing user intent: react performance optimization techniques",
      confidence: 0.97,
      details: "identified: performance, optimization, react, frontend",
    },
    {
      step: 2,
      title: "memory_retrieval",
      description: "scanning 127 relevant memories across performance domain",
      confidence: 0.94,
      details: "filtered by: react, performance, production, optimization",
    },
    {
      step: 3,
      title: "pattern_recognition",
      description: "analyzing successful optimization patterns and methodologies",
      confidence: 0.91,
      details: "common patterns: memoization, profiling, code splitting",
    },
    {
      step: 4,
      title: "synthesis",
      description: "combining insights into actionable recommendations",
      confidence: 0.93,
      details: "prioritized by success rate and implementation difficulty",
    },
  ],
}

const mockMemoryBlocks = [
  {
    id: 1,
    title: "react_performance_meta_2024",
    type: "production_case",
    weight: 0.96,
    rawContent: `// Performance optimization at Meta scale
// Author: Senior Frontend Engineer
// Date: 2024-03-15

## Context
- React app serving 2.8B users
- Initial load time: 4.2s
- Target: <1.5s first contentful paint

## Optimization Strategy
1. Component memoization audit
   - React.memo for pure components
   - useMemo for expensive calculations
   - useCallback for event handlers

2. Bundle optimization
   - Code splitting with React.lazy
   - Dynamic imports for routes
   - Tree shaking optimization

3. State management efficiency
   - Context optimization
   - Reducer pattern for complex state
   - Local state vs global state decisions

## Results
- Load time: 4.2s → 1.3s (69% improvement)
- Bundle size: 2.1MB → 890KB (58% reduction)
- User engagement: +34% session duration

## Key Learnings
- Profile first, optimize second
- Memoization has diminishing returns
- Network optimization > code optimization`,
    summarizedContent:
      "Meta engineer's production optimization reducing load times by 69% through systematic memoization, bundle optimization, and state management improvements. Emphasizes profiling-first approach over premature optimization.",
  },
  {
    id: 2,
    title: "startup_performance_journey_2023",
    type: "transformation_story",
    weight: 0.92,
    rawContent: `# From 8s to 1.2s: A Performance Journey
## Background
- Early-stage fintech startup
- React SPA with complex dashboard
- User complaints about slow loading

## The Problem
- Massive bundle size (3.2MB)
- No code splitting
- Inefficient re-renders
- Heavy third-party libraries

## Solution Process
Week 1: Performance audit
- React DevTools Profiler
- Lighthouse analysis
- Bundle analyzer

Week 2-3: Quick wins
- React.memo on list components
- useMemo for filtered data
- Lazy loading for modals

Week 4-6: Deep optimization
- Route-based code splitting
- Third-party library audit
- Image optimization

## Impact
- Load time: 8s → 1.2s
- Bounce rate: 45% → 12%
- User satisfaction: +89%
- Revenue impact: +23% conversion

## Lessons
- Small changes, big impact
- User experience drives business metrics
- Performance is a feature, not afterthought`,
    summarizedContent:
      "Startup CTO's complete performance transformation achieving 85% load time reduction through systematic optimization, resulting in 89% user satisfaction improvement and 23% revenue increase.",
  },
]

export function MemoryExplorerModal({ isOpen, onClose, query }: MemoryExplorerModalProps) {
  const [viewMode, setViewMode] = useState<"summarized" | "raw">("summarized")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col bg-card border-border">
        <DialogHeader className="flex-shrink-0 border-b border-border pb-4">
          <DialogTitle className="flex items-center space-x-3">
            <Brain className="w-5 h-5 text-orange-500" />
            <span className="text-foreground">memory_explorer</span>
            <Badge variant="secondary" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
              {query}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 min-h-0">
          <Tabs defaultValue="reasoning" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2 flex-shrink-0 bg-muted mb-4">
              <TabsTrigger
                value="reasoning"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-background"
              >
                letta_reasoning
              </TabsTrigger>
              <TabsTrigger
                value="memories"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-background"
              >
                memory_blocks
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reasoning" className="flex-1 min-h-0 overflow-y-auto pr-2">
              <div className="space-y-4 pb-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">chain_of_thought</h3>
                  <Badge variant="outline">{mockLettaReasoning.steps.length} steps</Badge>
                </div>

                {mockLettaReasoning.steps.map((step, index) => (
                  <div key={step.step} className="bg-muted/50 border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-sm font-bold text-background">
                          {step.step}
                        </div>
                        <span className="font-mono text-orange-500">{step.title}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{Math.round(step.confidence * 100)}%</span>
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-orange-500 rounded-full"
                            style={{ width: `${step.confidence * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-2">{step.description}</p>
                    <p className="text-sm text-muted-foreground/70 font-mono">{step.details}</p>
                    {index < mockLettaReasoning.steps.length - 1 && (
                      <div className="flex justify-center mt-4">
                        <ChevronRight className="w-4 h-4 text-orange-500" />
                      </div>
                    )}
                  </div>
                ))}

                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-orange-500" />
                    <span className="font-semibold text-orange-500">final_synthesis</span>
                  </div>
                  <p className="text-foreground leading-relaxed">
                    analysis complete: 127 memories processed, 3 optimization patterns identified, confidence_score:
                    0.94. recommendation prioritizes profiling-first approach with systematic memoization and bundle
                    optimization strategies.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="memories" className="flex-1 min-h-0 overflow-y-auto pr-2">
              <div className="space-y-4 pb-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">source_memories</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">view:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode(viewMode === "summarized" ? "raw" : "summarized")}
                      className="flex items-center space-x-1 text-orange-500 hover:text-orange-400"
                    >
                      {viewMode === "summarized" ? (
                        <>
                          <ToggleLeft className="w-4 h-4" />
                          <span>summarized</span>
                        </>
                      ) : (
                        <>
                          <ToggleRight className="w-4 h-4" />
                          <span>raw</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {mockMemoryBlocks.map((memory) => (
                  <div key={memory.id} className="bg-muted/50 border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-mono text-orange-500">{memory.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs font-mono">
                          {memory.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          weight: {Math.round(memory.weight * 100)}%
                        </span>
                      </div>
                    </div>
                    <div className="text-sm">
                      {viewMode === "summarized" ? (
                        <p className="text-muted-foreground leading-relaxed">{memory.summarizedContent}</p>
                      ) : (
                        <pre className="whitespace-pre-wrap font-mono text-xs bg-background/50 p-4 rounded border border-border overflow-auto max-h-96 text-foreground">
                          {memory.rawContent}
                        </pre>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
