"use client"

import { useState } from "react"
import { Sparkles, ExternalLink, Eye, EyeOff } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface SynthesisCardProps {
  answer: string
  totalMemories: number
  onExploreReasoning?: () => void
  className?: string
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

export function SynthesisCard({
  answer,
  totalMemories,
  onExploreReasoning,
  className = ""
}: SynthesisCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded ? answer : getFirstParagraph(answer);
  const hasMoreContent = answer.length > getFirstParagraph(answer).length;

  return (
    <div className={`bg-card border border-border rounded-xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-orange-500" />
          <span className="font-semibold text-foreground">synthesis</span>
        </div>
        <Badge variant="secondary" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
          {totalMemories} memories
        </Badge>
      </div>
      <div className="mb-6">
        <p className="text-foreground leading-relaxed text-lg whitespace-pre-wrap">
          {displayText}
        </p>
        
        {hasMoreContent && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-blue-600 hover:text-blue-700 p-0 h-auto"
          >
            {isExpanded ? (
              <>
                <EyeOff className="w-4 h-4 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-1" />
                View More
              </>
            )}
          </Button>
        )}
      </div>
      
      {onExploreReasoning && (
        <Button onClick={onExploreReasoning} className="bg-orange-500 hover:bg-orange-600 text-background">
          <ExternalLink className="w-4 h-4 mr-2" />
          explore reasoning
        </Button>
      )}
    </div>
  )
} 