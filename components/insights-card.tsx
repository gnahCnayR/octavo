import { Clock } from "lucide-react"

interface InsightsCardProps {
  insights: string[]
  className?: string
}

export function InsightsCard({ insights, className = "" }: InsightsCardProps) {
  return (
    <div className={`bg-card border border-border rounded-xl p-6 ${className}`}>
      <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
        <Clock className="w-5 h-5 text-orange-500" />
        <span>key insights</span>
      </h3>
      <ul className="space-y-3">
        {insights.map((insight, index) => (
          <li key={index} className="flex items-start space-x-3">
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2.5 flex-shrink-0" />
            <span className="text-muted-foreground leading-relaxed">{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  )
} 