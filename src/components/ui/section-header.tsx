"use client"

import { ReactNode } from "react"
import { DynamicButton } from "@/components/ui/dynamic-button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface SectionHeaderProps {
  title: string
  buttonText?: string
  buttonLink?: string
  titleSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  mobileTitleSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  className?: string
  onButtonClick?: () => void
}

export function SectionHeader({ 
  title, 
  buttonText = "View All", 
  buttonLink, 
  titleSize = '4xl',
  mobileTitleSize,
  className = "",
  onButtonClick 
}: SectionHeaderProps) {
  
  const titleSizeClasses = {
    'sm': 'text-sm',
    'md': 'text-base',
    'lg': 'text-lg',
    'xl': 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
  }

  // Use mobile size if provided, otherwise fall back to desktop size
  const mobileSize = mobileTitleSize || titleSize

  const button = (
    <DynamicButton
      size="sm"
      bgColor="bg-transparent"
      textColor="text-[var(--primary)]"
      icon={<ArrowRight className="h-4 w-4" />}
      iconPosition="after"
      hoverBgColor="hover:bg-[var(--primary)]"
      hoverTextColor="hover:text-white"
      className="group text-xs lg:text-sm"
      onClick={onButtonClick}
    >
      {buttonText}
    </DynamicButton>
  )

  return (
    <div className={`flex justify-between gap-4 ${className} w-full`}>
      <h2 className={`font-semibold text-[#1A1A1A] ${titleSizeClasses[mobileSize]} lg:text-${titleSize}`}>
        {title}
      </h2>
      
      {buttonLink ? (
        <Link href={buttonLink}>
          {button}
        </Link>
      ) : (
        button
      )}
    </div>
  )
}
