import { Sparkles } from "lucide-react"

interface DiscoveryCardProps {
  id: number
  title: string
  description: string
  memories: number
  category: string
  image?: string
  confidence: number
  onClick?: () => void
  className?: string
}

export function DiscoveryCard({
  title,
  description,
  memories,
  category,
  image,
  confidence,
  onClick,
  className = ""
}: DiscoveryCardProps) {
  return (
    <div
      className={`group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-orange-500/30 transition-all duration-200 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <div className="bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-foreground">
            {memories} memories
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-orange-500 font-medium uppercase tracking-wide">
            {category}
          </span>
          <div className="flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{Math.round(confidence * 100)}%</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{description}</p>
      </div>
    </div>
  )
} 