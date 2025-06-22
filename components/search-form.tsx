"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface SearchFormProps {
  placeholder?: string
  className?: string
}

const sampleQueries = [
  "How do I optimize React performance?",
  "What are the best practices for system design interviews?",
  "How to transition into machine learning career?",
  "What's the most effective way to raise startup funding?",
  "How do successful remote teams stay productive?",
  "What are proven cryptocurrency trading strategies?",
  "How to scale a web application to millions of users?",
  "What are the key principles of effective leadership?",
]

export function SearchForm({ placeholder, className = "" }: SearchFormProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  // Rotate placeholder text every 3 seconds
  useEffect(() => {
    if (placeholder) return // Don't rotate if custom placeholder is provided
    
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prev) => (prev + 1) % sampleQueries.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [placeholder])

  const currentPlaceholder = placeholder || sampleQueries[currentPlaceholderIndex]

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    
    try {
      // Call the Letta search API
      const response = await fetch('/api/orkes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (response.ok) {
        // Navigate to results page with the query
        const data = await response.json();
        router.push(`/search?q=${encodeURIComponent(searchQuery)}&result=${encodeURIComponent(JSON.stringify(data.responses.data))}`)
      } else {
        console.error('Search API failed');
        // Still navigate to results page (will show fallback data)
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      }
    } catch (error) {
      console.error('Search error:', error);
      // Navigate to results page (will show fallback data)
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSearch()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSearchQuery(e.target.value)
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  useEffect(() => {
    // Reset height when search query is cleared
    if (!searchQuery && textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }, [searchQuery])

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="relative group">
          <Search className="absolute left-4 top-4 text-muted-foreground w-5 h-5 group-focus-within:text-orange-500 transition-colors duration-200" />
          
          {/* Animated placeholder overlay */}
          {!searchQuery && (
            <div className="absolute left-12 top-4 text-base pointer-events-none overflow-hidden h-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPlaceholder}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ 
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                  className="text-muted-foreground"
                >
                  {currentPlaceholder}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
          
          <textarea
            ref={textareaRef}
            placeholder="" // We handle placeholder with overlay
            value={searchQuery}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={isSearching}
            rows={1}
            className="w-full pl-12 pr-12 py-4 text-base bg-background border border-border hover:border-orange-500/50 focus-visible:outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl shadow-sm hover:shadow-md transition-all duration-200 resize-none overflow-hidden min-h-[56px]"
          />
          {isSearching && (
            <div className="absolute right-4 top-4">
              <div className="w-5 h-5 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
            </div>
          )}
        </div>
      </form>
    </div>
  )
} 