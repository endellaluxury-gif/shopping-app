import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  className?: string
  filledColor?: string
  unfilledColor?: string
}

export function StarRating({ 
  rating, 
  maxRating = 5, 
  size = "md",
  className,
  filledColor = "#FF8A00",
  unfilledColor = "#CCCCCC"
}: StarRatingProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4", 
    lg: "h-5 w-5"
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[...Array(maxRating)].map((_, i) => (
        <Star
          key={i}
          className={sizeClasses[size]}
          style={{
            fill: i < Math.floor(rating) ? filledColor : "none",
            color: i < Math.floor(rating) ? filledColor : unfilledColor
          }}
        />
      ))}
    </div>
  )
}
