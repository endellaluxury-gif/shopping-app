import { cn } from "@/lib/utils"
import { ElementType } from "react"

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  as?: ElementType
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl" | "1440" | "full"
  padding?: "none" | "sm" | "md" | "lg" | "xl"
}

export function SectionContainer({
  children,
  className,
  as: Component = "section",
  maxWidth = "1440",
  padding = "lg"
}: SectionContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md", 
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    "8xl": "max-w-8xl",
    "9xl": "max-w-9xl",
    "1440": "max-w-[1440px]",
    full: "max-w-full"
  }

  const paddingClasses = {
    none: "",
    sm: "px-4 py-1",
    md: "px-6 py-2", 
    lg: "px-4 sm:px-8 lg:px-12 py-4 lg:py-8",
    xl: "px-4 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-20 xl:py-24"
  }

  return (
    <Component
      className={cn(
        "w-full mx-auto",
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </Component>
  )
}
