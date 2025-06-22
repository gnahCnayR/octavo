"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"
import { Header } from "@/components/header"
import { SynthesisCard } from "@/components/synthesis-card"
import { InsightsCard } from "@/components/insights-card"
import { MemoryBlock } from "@/components/memory-block"
import { LoadingSpinner } from "@/components/loading-spinner"
import { MemoryExplorerModal } from "@/components/memory-explorer-modal"

const mockSearchResults = {
  query: "React performance optimization",
  totalMemories: 7,
  processingTime: "0.11s",
  answer:
    "Based on 7 shared memories, React performance optimization follows three critical patterns: memoization strategies (React.memo, useMemo, useCallback), virtual DOM optimization through proper key usage, and state management efficiency. The most successful developers implement performance monitoring first, then optimize based on actual bottlenecks rather than premature optimization.",
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

const processingSteps = [
  {
    id: 1,
    title: "Letta: analyzing query intent",
    subtitle: "Understanding what you're looking for",
    duration: 3000,
  },
  {
    id: 2,
    title: "Memory retrieval across domains",
    subtitle: "Searching through collective knowledge",
    duration: 3500,
  },
  {
    id: 3,
    title: "Orkes: orchestrating workflows",
    subtitle: "Coordinating parallel processing",
    duration: 2500,
  },
  {
    id: 4,
    title: "Groq: generating synthesis",
    subtitle: "Creating your personalized response",
    duration: 2000,
  },
]

function ProcessingVisualization({ query }: { query: string }) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const processSteps = async () => {
      for (let i = 0; i < processingSteps.length; i++) {
        setCurrentStep(i)
        await new Promise(resolve => setTimeout(resolve, processingSteps[i].duration))
        setCompletedSteps(prev => [...prev, i])
      }
    }
    
    processSteps()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Subtle background animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-md w-full px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-xl font-medium text-white mb-2">
            Processing your query
          </h1>
          <p className="text-slate-400 text-sm">
            "{query}"
          </p>
        </motion.div>

        <div className="relative min-h-[400px] flex flex-col items-center justify-center">
          {processingSteps.map((step, index) => {
            const isCompleted = completedSteps.includes(index)
            const isActive = currentStep === index && !isCompleted
            const isPending = index > currentStep

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: isCompleted ? 0.3 : isActive ? 1 : 0.6,
                  y: isCompleted ? -20 * (completedSteps.length - completedSteps.indexOf(index)) : 
                     isActive ? 0 : 
                     isPending ? 40 * (index - currentStep) : 0,
                  scale: isActive ? 1.05 : isCompleted ? 0.9 : 0.95,
                  filter: isCompleted ? 'blur(1px)' : 'blur(0px)',
                }}
                transition={{ 
                  duration: 0.6,
                  ease: "easeInOut",
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
                className={`flex items-center space-x-4 absolute w-full ${
                  isActive ? 'z-20' : isCompleted ? 'z-10' : 'z-0'
                }`}
                style={{
                  position: index === 0 ? 'relative' : 'absolute',
                }}
              >
                <div className="relative">
                  <motion.div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-white border-white' 
                        : isActive
                          ? 'border-orange-500 bg-orange-500/20'
                          : 'border-slate-600 bg-slate-800'
                    }`}
                    animate={isActive ? { 
                      scale: [1, 1.2, 1],
                      borderColor: ['#f97316', '#fb923c', '#f97316']
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 500, 
                          damping: 30,
                          delay: 0.1 
                        }}
                      >
                        <Check className="w-3 h-3 text-slate-900" />
                      </motion.div>
                    )}
                    {isActive && (
                      <motion.div
                        className="w-2 h-2 bg-orange-500 rounded-full"
                        animate={{ 
                          opacity: [0.5, 1, 0.5],
                          scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  
                  {/* Glowing ring for active step */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 w-6 h-6 rounded-full border border-orange-500/50"
                      animate={{ 
                        scale: [1, 1.8, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>

                <div className="flex-1">
                  <motion.h3 
                    className={`font-medium transition-colors duration-300 ${
                      isCompleted 
                        ? 'text-white/60' 
                        : isActive
                          ? 'text-orange-400'
                          : 'text-slate-500'
                    }`}
                    animate={isActive ? { 
                      opacity: [0.8, 1, 0.8],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p 
                    className={`text-sm mt-0.5 transition-colors duration-300 ${
                      isCompleted 
                        ? 'text-slate-500/60' 
                        : isActive
                          ? 'text-slate-300'
                          : 'text-slate-400'
                    }`}
                  >
                    {step.subtitle}
                  </motion.p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center mt-16"
        >
          <p className="text-slate-500 text-xs">
            Powered by Letta • Orkes • Groq • Claude
          </p>
        </motion.div>
      </div>
    </div>
  )
}

// Function to parse streaming response
function parseStreamingResponse(text: string): string {
  console.log('Raw streaming response:', text);
  
  // First, try to extract the actual content from the streaming format
  let cleanText = '';
  
  // Look for the actual text content in the streaming response
  const textMatches = text.match(/0:"([^"]*)"/g);
  if (textMatches && textMatches.length > 0) {
    // Extract all text chunks and join them
    const textChunks = textMatches.map(match => {
      const content = match.match(/0:"([^"]*)"/);
      return content ? content[1] : '';
    });
    
    // Join all chunks to get the complete response
    cleanText = textChunks.join('');
  } else {
    // Fallback: try to extract any readable text
    cleanText = text.replace(/[0-9]+:"([^"]*)"/g, '$1');
  }
  
  console.log('Extracted text before cleaning:', cleanText);
  
  // Clean the text thoroughly
  cleanText = cleanAndFormatText(cleanText);
  
  console.log('Final cleaned text:', cleanText);
  return cleanText;
}

// Function to clean and format the text
function cleanAndFormatText(text: string): string {
  if (!text) return '';
  
  // Remove all newline escape sequences and replace with actual newlines
  let cleaned = text.replace(/\\n/g, '\n');
  
  // Remove duplicate content by splitting into lines and keeping only unique ones
  const lines = cleaned.split('\n');
  const uniqueLines: string[] = [];
  const seen = new Set<string>();
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !seen.has(trimmed)) {
      seen.add(trimmed);
      uniqueLines.push(trimmed);
    }
  }
  
  // Join back together
  cleaned = uniqueLines.join('\n\n');
  
  // Remove any remaining escape sequences
  cleaned = cleaned
    .replace(/\\"/g, '"')
    .replace(/\\t/g, ' ')
    .replace(/\\r/g, '')
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  return cleaned;
}

// Function to get first paragraph (around 50 words)
function getFirstParagraph(text: string): string {
  const paragraphs = text.split('\n\n').filter(p => p.trim());
  if (paragraphs.length === 0) return text;
  
  const firstParagraph = paragraphs[0];
  const words = firstParagraph.split(' ');
  
  // If first paragraph is longer than 50 words, truncate it
  if (words.length > 50) {
    return words.slice(0, 50).join(' ') + '...';
  }
  
  return firstParagraph;
}

function SearchResultsContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [searchResults, setSearchResults] = useState<any>(null)
  const [useFallback, setUseFallback] = useState(false)

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setIsLoading(false)
        return
      }

      // Set initial loading state with "Loading..." text
      setSearchResults({
        query,
        totalMemories: 7,
        processingTime: "0.11s",
        answer: "Loading...",
        insights: [
          "Loading insights...",
          "Loading recommendations...",
          "Loading suggestions...",
        ],
        memoryBlocks: [
          {
            id: 1,
            title: "Loading...",
            source: "Loading...",
            year: 2024,
            confidence: 0.96,
            summary: "Loading...",
            category: "Loading...",
          },
        ],
      })

      try {
        // Call the Letta search API to get real response
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        if (response.ok) {
          const data = await response.text()
          console.log('Raw Letta response:', data);
          
          // Parse the streaming response
          const parsedAnswer = parseStreamingResponse(data);
          console.log('Parsed answer:', parsedAnswer);
          
          // Update with real Letta data
          setSearchResults({
            query,
            totalMemories: 7, // Placeholder - would come from Letta
            processingTime: "0.11s", // Placeholder - would be calculated
            answer: parsedAnswer || "No response available",
            insights: [
              "Real insights from Letta agent memory",
              "Personalized recommendations based on your query",
              "Context-aware suggestions from collective experience",
            ],
            memoryBlocks: [
              {
                id: 1,
                title: "Letta Agent Memory",
                source: "AI Agent",
                year: 2024,
                confidence: 0.96,
                summary: "Real memory from your Letta agent",
                category: "AI Generated",
              },
            ],
          })
        } else {
          throw new Error('Search API failed')
        }
      } catch (error) {
        console.error('Error fetching Letta results:', error)
        setUseFallback(true)
        setSearchResults({
          ...mockSearchResults,
          query: query
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [query])

  useEffect(() => {
    // Total processing time: sum of all step durations
    const totalDuration = processingSteps.reduce((sum, step) => sum + step.duration, 0)
    const timer = setTimeout(() => setIsLoading(false), totalDuration + 500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <ProcessingVisualization query={query} />
  }

  // Use real results or fallback
  const results = searchResults || {
    query,
    totalMemories: 7,
    processingTime: "0.11s",
    answer: "Loading...",
    insights: ["Loading...", "Loading...", "Loading..."],
    memoryBlocks: [{
      id: 1,
      title: "Loading...",
      source: "Loading...",
      year: 2024,
      confidence: 0.96,
      summary: "Loading...",
      category: "Loading...",
    }],
  }

  // Search metadata for the header
  const searchMetadata = (
    <div className="text-sm text-muted-foreground">
      <span className="text-orange-500">{results.processingTime}</span> •{" "}
      {results.totalMemories} memories
      {useFallback && <span className="text-orange-500 ml-2">(Example Data)</span>}
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header showBackButton={true} showNavigation={false} rightContent={searchMetadata} />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Query Display */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">"{query}"</h1>
          <p className="text-muted-foreground">searched through {results.totalMemories} shared memories</p>
        </div>

        {/* AI Answer */}
        <SynthesisCard
          answer={results.answer}
          totalMemories={results.totalMemories}
          onExploreReasoning={() => setIsModalOpen(true)}
          className="mb-8"
        />

        {/* Key Insights */}
        <InsightsCard insights={results.insights} className="mb-8" />

        {/* Memory Blocks */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground mb-4">source memories</h3>
          {results.memoryBlocks.map((memory: any) => (
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
          <LoadingSpinner />
        </div>
      }
    >
      <SearchResultsContent />
    </Suspense>
  )
}
