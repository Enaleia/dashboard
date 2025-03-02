import { useQuery } from "@tanstack/react-query"
import { MAP_ENDPOINTS } from "@/config/constants"
import { PageName } from "@/types"

/**
 * Parameters for fetching map data
 * @property {PageName} pageName - The page type determining the specific map endpoint
 * @property {string} [productId] - Optional identifier for product-specific map data
 */
interface MapDataParams {
  pageName: PageName
  productId?: string
}

/**
 * Custom hook for fetching map data across different pages
 * 
 * Features:
 * - Uses React Query for efficient data fetching and caching
 * - Supports page-specific and product-specific map data retrieval
 * - Dynamically constructs API endpoint based on page name and optional product ID
 * 
 * @param {MapDataParams} params - Configuration for map data retrieval
 * @returns {UseQueryResult} React Query result object with map data
 */
export function useMapData({ pageName, productId }: MapDataParams) {
  return useQuery({
    // Create a unique query key based on page name and product ID
    // Ensures proper caching and invalidation of different data sets
    queryKey: [`mapData-${pageName}-${productId || ''}`],
    
    // Async function to fetch map data from the API
    queryFn: async () => {
      // Construct optional query string for product-specific data
      const queryString = productId ? `?id=${productId}` : ''
      
      // Fetch data from the dynamically constructed endpoint
      const response = await fetch(
        `https://hq.enaleia-hub.com/flows/trigger/${MAP_ENDPOINTS[pageName]}${queryString}`
      )
      
      // Parse and return JSON response
      return response.json()
    },
  })
}