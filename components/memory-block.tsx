import { Badge } from "@/components/ui/badge"

interface MemoryBlockProps {
  id: number
  title: string
  source: string
  year: number
  confidence: number
  summary: string
  category: string
  onClick?: () => void
  className?: string
}

export function MemoryBlock({
  title,
  source,
  year,
  confidence,
  summary,
  category,
  onClick,
  className = ""
}: MemoryBlockProps) {
  return (
    <div
      className={`bg-card border border-border rounded-xl p-6 hover:border-orange-500/50 transition-all cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-foreground flex-1">{title}</h4>
        <div className="flex items-center space-x-2 ml-4">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {year}
          </Badge>
        </div>
      </div>
      <p className="text-muted-foreground mb-3 leading-relaxed">{summary}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">by {source}</span>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {Math.round(confidence * 100)}% confidence
          </span>
          <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 rounded-full"
              style={{ width: `${confidence * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 