"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Clock, TrendingUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  SearchResult,
  getSuggestions,
  searchProducts,
} from "@/data/search-data";
import { getRecentSearches, removeRecentSearch } from "@/lib/search-storage";
import { useDebounce } from "@/hooks/use-debounce";

interface SearchDropdownProps {
  isOpen: boolean;
  query: string;
  onClose: () => void;
  onQueryChange: (query: string) => void;
  onSearch: (query: string) => void;
}

export function SearchDropdown({
  isOpen,
  query,
  onClose,
  onQueryChange,
  onSearch,
}: SearchDropdownProps) {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState(getRecentSearches());
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounce the search query
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      setIsLoading(true);

      // Simulate API call delay
      const timer = setTimeout(() => {
        const results = searchProducts(debouncedQuery);
        const suggestionResults = getSuggestions(debouncedQuery);
        setSearchResults(results);
        setSuggestions(suggestionResults);
        setIsLoading(false);
      }, 300); // Simulate network delay

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      // Show popular searches when no query
      setSuggestions(getSuggestions(""));
      setIsLoading(false);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, [isOpen]);

  const handleSuggestionClick = (suggestion: string) => {
    onQueryChange(suggestion);
    setIsLoading(true); // Show loading immediately
    onSearch(suggestion);
    // Refresh recent searches after search
    setTimeout(() => setRecentSearches(getRecentSearches()), 100);
    onClose();
  };

  const handleRecentSearchClick = (recentQuery: string) => {
    onQueryChange(recentQuery);
    setIsLoading(true); // Show loading immediately
    onSearch(recentQuery);
    // Refresh recent searches after search
    setTimeout(() => setRecentSearches(getRecentSearches()), 100);
    onClose();
  };

  const handleRemoveRecentSearch = (e: React.MouseEvent, searchId: string) => {
    e.stopPropagation();
    removeRecentSearch(searchId);
    setRecentSearches(getRecentSearches());
  };

  const handleResultClick = (result: SearchResult) => {
    setIsLoading(true); // Show loading immediately
    onSearch(result.title);
    // Refresh recent searches after search
    setTimeout(() => setRecentSearches(getRecentSearches()), 100);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      ref={dropdownRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-96 overflow-hidden"
    >
      <div className="max-h-96 overflow-y-auto">
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
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer group"
                >
                  <div className="flex items-center">
                    <Search className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-700">
                      {search.query}
                    </span>
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
              {suggestions.slice(0, 5).map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
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
              {isLoading
                ? "Searching..."
                : `Search Results (${searchResults.length})`}
            </h3>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-center p-3">
                    <div className="w-12 h-12 mr-3 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
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
                      <div className="w-12 h-12 mr-3 flex-shrink-0">
                        <Image
                          src={result.image}
                          alt={result.title}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {result.title}
                      </h4>
                      <p className="text-sm text-gray-500">{result.category}</p>
                      {result.price && (
                        <p className="text-sm font-semibold text-green-600">
                          ${result.price}
                        </p>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 capitalize">
                      {result.type}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Search className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  No results found for &quot;{query}&quot;
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Try a different search term
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
