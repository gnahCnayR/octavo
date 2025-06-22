"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

interface SearchFormProps {
  placeholder?: string
  className?: string
}

export function SearchForm({ placeholder = "Ask anything...", className = "" }: SearchFormProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
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
          <textarea
            ref={textareaRef}
            placeholder={placeholder}
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