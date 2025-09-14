import { RecentSearch } from '@/data/search-data'

const RECENT_SEARCHES_KEY = 'recent-searches'
const MAX_RECENT_SEARCHES = 10

export const getRecentSearches = (): RecentSearch[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading recent searches:', error)
    return []
  }
}

export const addRecentSearch = (query: string, resultCount?: number): void => {
  if (typeof window === 'undefined' || !query.trim()) return
  
  try {
    const recentSearches = getRecentSearches()
    
    // Remove existing search with same query
    const filteredSearches = recentSearches.filter(search => search.query !== query)
    
    // Add new search to the beginning
    const newSearch: RecentSearch = {
      id: Date.now().toString(),
      query: query.trim(),
      timestamp: Date.now(),
      resultCount
    }
    
    const updatedSearches = [newSearch, ...filteredSearches].slice(0, MAX_RECENT_SEARCHES)
    
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches))
  } catch (error) {
    console.error('Error saving recent search:', error)
  }
}

export const clearRecentSearches = (): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY)
  } catch (error) {
    console.error('Error clearing recent searches:', error)
  }
}

export const removeRecentSearch = (searchId: string): void => {
  if (typeof window === 'undefined') return
  
  try {
    const recentSearches = getRecentSearches()
    const filteredSearches = recentSearches.filter(search => search.id !== searchId)
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(filteredSearches))
  } catch (error) {
    console.error('Error removing recent search:', error)
  }
}
