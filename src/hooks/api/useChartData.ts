import { useQuery } from "@tanstack/react-query"
import { CHART_ENDPOINTS } from "@/config/constants"
import { PageName } from "@/types"

/**
 * Parameters for fetching chart data
 * @property {PageName} pageName - The page type determining the specific chart endpoint
 * @property {string} [partnerId] - Optional identifier for partner-specific chart data
 * @property {string} timeRange - Selected time range for filtering chart data
 */
interface ChartDataParams {
  pageName: PageName
  partnerId?: string
  timeRange: string
}

/**
 * Builds a query string for chart data API requests
 * 
 * Features:
 * - Dynamically generates query parameters based on partner ID and time range
 * - Calculates start and end dates for specific time ranges
 * - Supports 'All time', 'Last 6 months', and 'Last 12 months' time range options
 * 
 * @param {string} [partnerId] - Optional partner identifier
 * @param {string} [timeRange] - Selected time range for data filtering
 * @returns {string} Constructed query string for API request
 */
function buildQueryString(partnerId?: string, timeRange?: string): string {
  // Create URL parameters object for flexible query string construction
  const params = new URLSearchParams()
  
  // Add partner ID if provided
  if (partnerId) {
    params.set('id', partnerId)
  }
  
  // Add date range parameters for non-'All time' selections
  if (timeRange !== 'All time') {
    // Create date range based on selected time range
    const endDate = new Date()
    const startDate = new Date()
    
    // Reset to first day of the current month
    startDate.setDate(1)
    
    // Set start date based on time range selection
    startDate.setMonth(startDate.getMonth() - (timeRange === 'Last 12 months' ? 11 : 5))
    
    // Add start and end dates to query parameters
    params.set('start_date', startDate.toISOString().split('T')[0])
    params.set('end_date', endDate.toISOString().split('T')[0])
  }
  
  // Convert parameters to query string
  const queryString = params.toString()
  
  // Log query string for debugging
  console.log('query string:', queryString)
  
  // Return formatted query string (with leading '?' if parameters exist)
  return queryString ? `?${queryString}` : ''
}

/**
 * Custom hook for fetching chart data across different pages
 * 
 * Features:
 * - Uses React Query for efficient data fetching and caching
 * - Supports page-specific and partner-specific chart data retrieval
 * - Dynamically constructs API endpoint based on page name, partner ID, and time range
 * 
 * @param {ChartDataParams} params - Configuration for chart data retrieval
 * @returns {UseQueryResult} React Query result object with chart data
 */
export function useChartData({ pageName, partnerId, timeRange }: ChartDataParams) {
  return useQuery({
    // Create a unique query key based on page name, partner ID, and time range
    // Ensures proper caching and invalidation of different data sets
    queryKey: [`chartData-${pageName}-${partnerId || ''}`, timeRange],
    
    // Async function to fetch chart data from the API
    queryFn: async () => {
      // Construct query string using helper function
      const queryString = buildQueryString(partnerId, timeRange)
      
      // Fetch data from the dynamically constructed endpoint
      const response = await fetch(
        `https://hq.enaleia-hub.com/flows/trigger/${CHART_ENDPOINTS[pageName]}${queryString}`
      )
      
      // Parse and return JSON response
      return response.json()
    },
  })
}