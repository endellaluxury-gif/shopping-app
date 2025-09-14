export interface SearchResult {
  id: string
  title: string
  category: string
  price?: number
  image?: string
  type: 'product' | 'category' | 'brand'
}

export interface RecentSearch {
  id: string
  query: string
  timestamp: number
  resultCount?: number
}

// Mock search results data
export const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    title: 'Tropical Sun Jerk Seasoning',
    category: 'Seasonings & Spices',
    price: 4.99,
    image: '/red-palm-oil-bottle.png',
    type: 'product'
  },
  {
    id: '2',
    title: 'Tilda Basmati Rice',
    category: 'Rice & Grains',
    price: 8.99,
    image: '/ripe-caribbean-plantains.png',
    type: 'product'
  },
  {
    id: '3',
    title: 'KTC Coconut Oil',
    category: 'Cooking Oils',
    price: 6.99,
    image: '/ripe-caribbean-plantains.png',
    type: 'product'
  },
  {
    id: '4',
    title: 'African Rice Brands',
    category: 'Rice & Grains',
    type: 'category'
  },
  {
    id: '5',
    title: 'Tropical Sun',
    category: 'Brands',
    type: 'brand'
  }
]

// Popular search suggestions
export const popularSearches = [
  'Tropical Sun seasonings',
  'African rice brands',
  'KTC coconut oil',
  'Caribbean spices',
  'Plantain chips',
  'Red palm oil',
  'Scotch bonnet peppers',
  'Jamaican jerk seasoning'
]

// Search utility functions
export const searchProducts = (query: string): SearchResult[] => {
  if (!query.trim()) return []
  
  const lowercaseQuery = query.toLowerCase()
  return mockSearchResults.filter(result => 
    result.title.toLowerCase().includes(lowercaseQuery) ||
    result.category.toLowerCase().includes(lowercaseQuery)
  )
}

export const getSuggestions = (query: string): string[] => {
  if (!query.trim()) return popularSearches.slice(0, 5)
  
  const lowercaseQuery = query.toLowerCase()
  return popularSearches.filter(suggestion => 
    suggestion.toLowerCase().includes(lowercaseQuery)
  ).slice(0, 5)
}
