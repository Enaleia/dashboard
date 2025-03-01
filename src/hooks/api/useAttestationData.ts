import { useQuery } from "@tanstack/react-query"
import { ATTESTATION_ENDPOINTS } from "@/config/constants"
import { PageName } from "@/types"


/**
 * Parameters for fetching attestation data
 * @property {PageName} pageName - The page type determining the specific attestation endpoint
 * @property {string} partnerId - Identifier for partner-specific attestation data
 */
interface AttestationDataParams {
  pageName: PageName
  partnerId: string
}

/**
 * Custom hook for fetching attestation data across different pages
 * 
 * Features:
 * - Uses React Query for efficient data fetching and caching
 * - Supports page-specific and partner-specific data retrieval
 * - Dynamically constructs API endpoint based on page name and optional partner ID
 * 
 * @param {AttestationDataParams} params - Configuration for data retrieval
 * @returns {UseQueryResult} React Query result object with attestation data
 */

export function useAttestationData({ pageName, partnerId }: AttestationDataParams) {
  return useQuery({
    // Create a unique query key based on page name and partner ID
    // Ensures proper caching and invalidation of different data sets
    queryKey: [`attestationData-${pageName}-${partnerId || ''}`],
    queryFn: async () => {
      // Construct optional query string for partner-specific data
      const queryString = partnerId ? `?id=${partnerId}` : ''
      // Fetch data from the dynamically constructed endpoint
      const response = await fetch(
        `https://hq.enaleia-hub.com/flows/trigger/${ATTESTATION_ENDPOINTS[pageName]}${queryString}`
      )
      // Parse and return JSON response
      return response.json()
    },
  })
}