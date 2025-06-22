import { Sparkles, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface SynthesisCardProps {
  answer: string
  totalMemories: number
  onExploreReasoning?: () => void
  className?: string
}

export function SynthesisCard({
  answer,
  totalMemories,
  onExploreReasoning,
  className = ""
}: SynthesisCardProps) {
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
      <p className="text-foreground leading-relaxed mb-6 text-lg">{answer}</p>
      {onExploreReasoning && (
        <Button onClick={onExploreReasoning} className="bg-orange-500 hover:bg-orange-600 text-background">
          <ExternalLink className="w-4 h-4 mr-2" />
          explore reasoning
        </Button>
      )}
    </div>
  )
} 