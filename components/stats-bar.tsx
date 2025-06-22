import { Code, Database, Cpu } from "lucide-react"

interface StatItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string | number
}

interface StatsBarProps {
  stats?: StatItem[]
  className?: string
}

const defaultStats: StatItem[] = [
  { icon: Database, label: "memories", value: "2.4k" },
  { icon: Cpu, label: "agents", value: "847" },
]

export function StatsBar({ stats = defaultStats, className = "" }: StatsBarProps) {
  return (
    <div className={`flex items-center justify-center space-x-8 text-sm text-muted-foreground ${className}`}>
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center space-x-2">
          <stat.icon className="w-4 h-4" />
          <span>{stat.value && `${stat.value} `}{stat.label}</span>
        </div>
      ))}
    </div>
  )
} 