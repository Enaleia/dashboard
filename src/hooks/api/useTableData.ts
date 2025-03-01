import { useQuery } from "@tanstack/react-query"
import { TABLE_ENDPOINTS } from "@/config/constants"
import { PageName } from "@/types"

/**
 * Parameters for fetching table data
 * @property {PageName} pageName - The page type determining the specific table endpoint
 */
interface TableDataParams {
  pageName: PageName
}

/**
 * Custom hook for fetching tabular data across different pages
 * 
 * Features:
 * - Uses React Query for efficient data fetching and caching
 * - Supports page-specific table data retrieval
 * - Dynamically constructs API endpoint based on page name
 * 
 * @param {TableDataParams} params - Configuration for table data retrieval
 * @returns {UseQueryResult} React Query result object with table data
 */
export function useTableData({ pageName }: TableDataParams) {
  return useQuery({
    // Create a unique query key based on page name
    // Ensures proper caching and invalidation of different data sets
    queryKey: [`tableData-${pageName}`],
    
    // Async function to fetch table data from the API
    queryFn: async () => {
      // Fetch data from the dynamically constructed endpoint
      const response = await fetch(
        `https://hq.enaleia-hub.com/flows/trigger/${TABLE_ENDPOINTS[pageName]}`
      )
      
      // Parse and return JSON response
      return response.json()
    },
  })
}