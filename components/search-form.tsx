"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchFormProps {
  placeholder?: string
  className?: string
}

export function SearchForm({ placeholder = "Ask anything...", className = "" }: SearchFormProps) {
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
    <div className={`max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSearch}>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-orange-500 transition-colors" />
          <Input
            type="text"
            placeholder={placeholder}
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
  )
} 