"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { VariantProps } from "class-variance-authority"

interface DynamicButtonProps extends VariantProps<typeof Button> {
  children: ReactNode
  bgColor?: string
  textColor?: string
  icon?: ReactNode
  iconPosition?: 'before' | 'after'
  hoverBgColor?: string
  hoverTextColor?: string
  className?: string
  asChild?: boolean
}

export function DynamicButton({
  children,
  bgColor = 'bg-[var(--primary)]',
  textColor = 'text-white',
  icon,
  iconPosition = 'after',
  hoverBgColor,
  hoverTextColor,
  className,
  size = 'default',
  variant = 'default',
  ...props
}: DynamicButtonProps) {
  // Generate hover classes based on provided colors or defaults
  const getHoverClasses = () => {
    if (hoverBgColor && hoverTextColor) {
      return `${hoverBgColor} ${hoverTextColor}`
    }
    
    // Default hover behavior based on current colors
    if (bgColor === 'bg-white' && textColor === 'text-[var(--primary)]') {
      return 'hover:bg-[var(--primary)] hover:text-white'
    }
    
    if (bgColor === 'bg-transparent') {
      if (textColor === 'text-[var(--primary)]') {
        return 'hover:bg-white hover:text-[var(--primary)]'
      }
      if (textColor === 'text-white') {
        return 'hover:bg-[var(--primary)] hover:text-white'
      }
    }
    
    return 'hover:opacity-90'
  }

  const buttonClasses = cn(
    bgColor,
    textColor,
    getHoverClasses(),
    'transition-all duration-300 rounded-3xl cursor-pointer',
    className
  )

  const renderIcon = () => {
    if (!icon) return null
    
    return (
      <span className={cn(
        "transition-transform duration-300",
        iconPosition === 'after' ? 'ml-2' : 'mr-2',
        iconPosition === 'after' && 'group-hover:translate-x-1'
      )}>
        {icon}
      </span>
    )
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={buttonClasses}
      {...props}
    >
      {iconPosition === 'before' && renderIcon()}
      {children}
      {iconPosition === 'after' && renderIcon()}
    </Button>
  )
}
