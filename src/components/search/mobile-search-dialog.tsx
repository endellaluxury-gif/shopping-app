"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Clock, TrendingUp, X, ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { SearchResult, getSuggestions, searchProducts } from "@/data/search-data"
import { getRecentSearches, removeRecentSearch } from "@/lib/search-storage"
import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface MobileSearchDialogProps {
  isOpen: boolean
  onClose: () => void
  onSearch: (query: string) => void
}

export function MobileSearchDialog({ isOpen, onClose, onSearch }: MobileSearchDialogProps) {
  const [query, setQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [recentSearches, setRecentSearches] = useState(getRecentSearches())
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Debounce the search query
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (debouncedQuery.trim()) {
      setIsLoading(true)
      
      // Simulate API call delay
      const timer = setTimeout(() => {
        const results = searchProducts(debouncedQuery)
        const suggestionResults = getSuggestions(debouncedQuery)
        setSearchResults(results)
        setSuggestions(suggestionResults)
        setIsLoading(false)
      }, 300) // Simulate network delay
      
      return () => clearTimeout(timer)
    } else {
      setSearchResults([])
      // Show popular searches when no query
      setSuggestions(getSuggestions(''))
      setIsLoading(false)
    }
  }, [debouncedQuery])

  useEffect(() => {
    setRecentSearches(getRecentSearches())
  }, [isOpen])

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setIsLoading(true) // Show loading immediately
    onSearch(suggestion)
    // Refresh recent searches after search
    setTimeout(() => setRecentSearches(getRecentSearches()), 100)
    onClose()
  }

  const handleRecentSearchClick = (recentQuery: string) => {
    setQuery(recentQuery)
    setIsLoading(true) // Show loading immediately
    onSearch(recentQuery)
    // Refresh recent searches after search
    setTimeout(() => setRecentSearches(getRecentSearches()), 100)
    onClose()
  }

  const handleRemoveRecentSearch = (e: React.MouseEvent, searchId: string) => {
    e.stopPropagation()
    removeRecentSearch(searchId)
    setRecentSearches(getRecentSearches())
  }

  const handleResultClick = (result: SearchResult) => {
    setIsLoading(true) // Show loading immediately
    onSearch(result.title)
    // Refresh recent searches after search
    setTimeout(() => setRecentSearches(getRecentSearches()), 100)
    onClose()
  }

  const handleSearch = () => {
    if (query.trim()) {
      setIsLoading(true) // Show loading immediately
      onSearch(query)
      // Refresh recent searches after search
      setTimeout(() => setRecentSearches(getRecentSearches()), 100)
      onClose()
    }
  }

  const handleClose = () => {
    setQuery("")
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleClose}
          />
          
          {/* Dialog */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 top-0 bg-white z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center p-4 border-b border-gray-200">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="mr-3"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    ref={inputRef}
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10 pr-4 focus:ring-0 focus-visible:ring-0 focus:border-0"
                  />
                </div>
                
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Recent Searches */}
              {!query.trim() && recentSearches.length > 0 && (
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-800 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Recent Searches
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {recentSearches.slice(0, 3).map((search) => (
                      <div
                        key={search.id}
                        onClick={() => handleRecentSearchClick(search.query)}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded cursor-pointer group"
                      >
                        <div className="flex items-center">
                          <Search className="h-4 w-4 text-gray-400 mr-3" />
                          <span className="text-sm text-gray-700">{search.query}</span>
                        </div>
                        <button
                          onClick={(e) => handleRemoveRecentSearch(e, search.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded"
                        >
                          <X className="h-3 w-3 text-gray-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Suggestions */}
              {!query.trim() && (
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-800 flex items-center mb-3">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Popular Searches
                  </h3>
                  <div className="space-y-2">
                    {suggestions.slice(0, 3).map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="flex items-center p-3 hover:bg-gray-50 rounded cursor-pointer"
                      >
                        <Search className="h-4 w-4 text-gray-400 mr-3" />
                        <span className="text-sm text-gray-700">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Results */}
              {query.trim() && (
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">
                    {isLoading ? 'Searching...' : `Search Results (${searchResults.length})`}
                  </h3>
                  {isLoading ? (
                    <div className="space-y-3">
                      {[...Array(4)].map((_, index) => (
                        <div key={index} className="flex items-center p-3">
                          <div className="w-16 h-16 mr-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3 mb-1"></div>
                            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3"></div>
                          </div>
                          <div className="w-12 h-3 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="space-y-3">
                      {searchResults.map((result) => (
                        <div
                          key={result.id}
                          onClick={() => handleResultClick(result)}
                          className="flex items-center p-3 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          {result.image && (
                            <div className="w-16 h-16 mr-4 flex-shrink-0">
                              <Image
                                src={result.image}
                                alt={result.title}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{result.title}</h4>
                            <p className="text-sm text-gray-500">{result.category}</p>
                            {result.price && (
                              <p className="text-sm font-semibold text-green-600">${result.price}</p>
                            )}
                          </div>
                          <div className="text-xs text-gray-400 capitalize">
                            {result.type}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-sm text-gray-500">No results found for "{query}"</p>
                      <p className="text-xs text-gray-400 mt-2">Try a different search term</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
