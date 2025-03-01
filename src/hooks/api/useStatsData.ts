import { useQuery } from "@tanstack/react-query"
import { STATS_ENDPOINTS } from "@/config/constants"
import { PageName } from "@/types"

/**
 * Parameters for fetching statistics data
 * @property {PageName} pageName - The page type determining the specific stats endpoint
 * @property {string} [partnerId] - Optional identifier for partner-specific statistics
 */
interface StatsDataParams {
  pageName: PageName
  partnerId?: string
}

/**
 * Custom hook for fetching statistical data across different pages
 * 
 * Features:
 * - Uses React Query for efficient data fetching and caching
 * - Supports page-specific and partner-specific statistics retrieval
 * - Dynamically constructs API endpoint based on page name and optional partner ID
 * 
 * @param {StatsDataParams} params - Configuration for statistics data retrieval
 * @returns {UseQueryResult} React Query result object with statistical data
 */
export function useStatsData({ pageName, partnerId }: StatsDataParams) {
  return useQuery({
    // Create a unique query key based on page name and partner ID
    // Ensures proper caching and invalidation of different data sets
    queryKey: [`stats-${pageName}-${partnerId || ''}`],
    
    // Async function to fetch statistics data from the API
    queryFn: async () => {
      // Construct optional query string for partner-specific data
      const queryString = partnerId ? `?id=${partnerId}` : ''
      
      // Fetch data from the dynamically constructed endpoint
      const response = await fetch(
        `https://hq.enaleia-hub.com/flows/trigger/${STATS_ENDPOINTS[pageName]}${queryString}`
      )
      
      // Parse and return JSON response
      return response.json()
    },
  })
}