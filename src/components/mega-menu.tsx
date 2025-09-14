"use client"

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { categories, Category, buildBreadcrumb, hasSubCategories } from "@/data/categories"

interface MegaMenuProps {
  isOpen: boolean
  onClose: () => void
  triggerRef?: React.RefObject<HTMLElement | null> | null
}

export function MegaMenu({ isOpen, onClose, triggerRef }: MegaMenuProps) {
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState<Category | null>(null)
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState<Category | null>(null)
  const [selectedSubSubSubCategory, setSelectedSubSubSubCategory] = useState<Category | null>(null)
  const [breadcrumb, setBreadcrumb] = useState<string[]>([])
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })

  const handleCategoryHover = (category: Category) => {
    setHoveredCategory(category)
    setSelectedSubCategory(null)
    setSelectedSubSubCategory(null)
    setSelectedSubSubSubCategory(null)
    setBreadcrumb([category.name])
  }

  const handleSubCategoryClick = (subCategory: Category) => {
    if (hasSubCategories(subCategory)) {
      setSelectedSubCategory(subCategory)
      setBreadcrumb([hoveredCategory?.name || '', subCategory.name])
    } else {
      // Navigate to the final category
      setBreadcrumb([hoveredCategory?.name || '', subCategory.name])
      console.log('Navigate to:', breadcrumb.join(' > '))
      onClose()
    }
  }

  const handleSubSubCategoryClick = (subSubCategory: Category) => {
    if (hasSubCategories(subSubCategory)) {
      setSelectedSubSubCategory(subSubCategory)
      setSelectedSubSubSubCategory(null)
      setBreadcrumb([hoveredCategory?.name || '', selectedSubCategory?.name || '', subSubCategory.name])
    } else {
      // Navigate to the final category
      setBreadcrumb([hoveredCategory?.name || '', selectedSubCategory?.name || '', subSubCategory.name])
      console.log('Navigate to:', breadcrumb.join(' > '))
      onClose()
    }
  }

  const handleSubSubSubCategoryClick = (subSubSubCategory: Category) => {
    if (hasSubCategories(subSubSubCategory)) {
      setSelectedSubSubSubCategory(subSubSubCategory)
      setBreadcrumb([hoveredCategory?.name || '', selectedSubCategory?.name || '', selectedSubSubCategory?.name || '', subSubSubCategory.name])
    } else {
      // Navigate to the final category
      setBreadcrumb([hoveredCategory?.name || '', selectedSubCategory?.name || '', selectedSubSubCategory?.name || '', subSubSubCategory.name])
      console.log('Navigate to:', breadcrumb.join(' > '))
      onClose()
    }
  }

  const resetMenu = () => {
    setHoveredCategory(null)
    setSelectedSubCategory(null)
    setSelectedSubSubCategory(null)
    setSelectedSubSubSubCategory(null)
    setBreadcrumb([])
  }

  // Calculate menu position based on trigger button
  useEffect(() => {
    if (isOpen && triggerRef?.current) {
      const buttonRect = triggerRef.current.getBoundingClientRect()
      setMenuPosition({
        top: buttonRect.bottom + window.scrollY,
        left: buttonRect.left + window.scrollX
      })
    }
  }, [isOpen, triggerRef])

  // Initialize with first category when menu opens
  useEffect(() => {
    if (isOpen) {
      // Initialize with the first category when the menu opens
      if (categories.length > 0 && !hoveredCategory) {
        setHoveredCategory(categories[0])
        setBreadcrumb([categories[0].name])
      }
    } else {
      // Reset menu state when closed
      resetMenu()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <motion.div 
      className="w-full h-[500px]"
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ 
        duration: 0.3, 
        ease: "easeOut",
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      <div className="flex h-[500px]">
          {/* Column 1: Main Categories */}
          <motion.div 
            className="w-1/2 border-r border-gray-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <div className="p-4 bg-gray-100 border-b">
              <h3 className="font-semibold text-gray-800">Shop by Category</h3>
            </div>
            <div className="overflow-y-auto max-h-[450px]">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onMouseEnter={() => handleCategoryHover(category)}
                  className={`flex items-center justify-between p-4 cursor-pointer border-r-4 transition-all ${hoveredCategory?.id === category.id
                      ? 'bg-[#C6F3C8] text-[#00B207] border-[#00B207]'
                      : 'hover:bg-gray-50 border-transparent text-gray-800'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  {hasSubCategories(category) && (
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Sub Categories */}
          <AnimatePresence>
            {hoveredCategory && (
              <motion.div 
                className="w-1/2 border-r border-gray-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
              <div className="p-4 bg-gray-100 border-b">
                <h3 className="font-semibold text-gray-800">
                  {selectedSubCategory ? selectedSubCategory.name : hoveredCategory.name}
                </h3>
              </div>
              <div className="overflow-y-auto max-h-[450px]">
                {(selectedSubCategory?.subCategories || hoveredCategory.subCategories)?.map((subCategory) => (
                  <div
                    key={subCategory.id}
                    onClick={() => {
                      if (selectedSubCategory) {
                        // We're already in a subcategory, so this is a deeper level
                        if (hasSubCategories(subCategory)) {
                          setSelectedSubCategory(subCategory)
                          setBreadcrumb([hoveredCategory?.name || '', selectedSubCategory.name, subCategory.name])
                        } else {
                          // Final category - navigate
                          setBreadcrumb([hoveredCategory?.name || '', selectedSubCategory.name, subCategory.name])
                          console.log('Navigate to:', breadcrumb.join(' > '))
                          onClose()
                        }
                      } else {
                        // First level subcategory
                        handleSubCategoryClick(subCategory)
                      }
                    }}
                    className={`flex items-center justify-between p-4 cursor-pointer border-r-4 transition-all ${selectedSubCategory?.id === subCategory.id
                        ? 'bg-[#C6F3C8] text-[#00B207] border-[#00B207]'
                        : 'hover:bg-gray-50 border-transparent text-gray-800'
                      }`}
                  >
                    <span className="font-medium">{subCategory.name}</span>
                    {hasSubCategories(subCategory) && (
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
            )}
          </AnimatePresence>

          {/* Column 3: Breadcrumb & Actions */}
          <motion.div 
            className="w-1/3 p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <div className="space-y-6">
              {/* Breadcrumb */}
              {breadcrumb.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Current Path</h4>
                  <div className="flex flex-wrap gap-1">
                    {breadcrumb.map((crumb, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-sm text-gray-600">{crumb}</span>
                        {index < breadcrumb.length - 1 && (
                          <ChevronRight className="h-3 w-3 text-gray-400 mx-1" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={resetMenu}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Reset Menu
                </button>
              </div>


            </div>
          </motion.div>
      </div>
    </motion.div>
  )
}
