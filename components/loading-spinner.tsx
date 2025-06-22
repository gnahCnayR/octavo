interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
  className?: string
}

export function LoadingSpinner({ size = "md", text, className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        className={`border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin ${sizeClasses[size]} mb-4`}
      />
      {text && (
        <p className="text-muted-foreground text-sm">{text}</p>
      )}
    </div>
  )
} 