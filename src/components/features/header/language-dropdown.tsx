"use client"

import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { CustomDropdown, DropdownItem } from "@/components/ui/dropdown"

interface LanguageOption {
  code: string
  name: string
  flag?: string
}

interface LanguageDropdownProps {
  languages: LanguageOption[]
  currentLanguage: string
  onLanguageChange: (language: string) => void
  triggerClassName?: string
}

export function LanguageDropdown({
  languages,
  currentLanguage,
  onLanguageChange,
  triggerClassName
}: LanguageDropdownProps) {
  const currentLang = languages.find(lang => lang.code === currentLanguage)

  return (
    <CustomDropdown
      trigger={
        <button
          className={cn(
            "flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#666666] hover:text-gray-900 transition-colors focus:outline-none focus:ring-0 border-0 cursor-pointer",
            triggerClassName
          )}
        >
          <span>{currentLang?.code.toUpperCase()}</span>
          <ChevronRight className="h-4 w-4 rotate-90" />
        </button>
      }
    >
      {languages.map((language) => (
        <DropdownItem
          key={language.code}
          onClick={() => onLanguageChange(language.code)}
          className={cn(
            language.code === currentLanguage && "bg-primary/10 text-primary"
          )}
        >
          {language.name}
        </DropdownItem>
      ))}
    </CustomDropdown>
  )
}
