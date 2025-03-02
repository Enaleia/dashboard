import { useQuery } from "@tanstack/react-query"
import { PRODUCT_ENDPOINTS } from "@/config/constants"
import { ProductData } from "@/types"

/**
 * Parameters for fetching product-specific data
 * @property {string} productId - Unique identifier for the product
 * @property {ProductData} dataCategory - Specific type of product data to retrieve
 */
interface ProductDataParams {
  productId: string
  dataCategory: ProductData
}

/**
 * Custom hook for fetching detailed product data
 * 
 * Features:
 * - Uses React Query for efficient data fetching and caching
 * - Supports retrieval of different product data categories
 * - Dynamically constructs API endpoint based on data category
 * 
 * @param {ProductDataParams} params - Configuration for product data retrieval
 * @returns {UseQueryResult} React Query result object with product-specific data
 */
export function useProductData({ productId, dataCategory }: ProductDataParams) {
  return useQuery({
    // Create a unique query key based on data category and product ID
    // Ensures proper caching and invalidation of different data sets
    queryKey: [`product${dataCategory}-${productId}`],
    
    // Async function to fetch product data from the API
    queryFn: async () => {
      // Fetch data from the dynamically constructed endpoint
      const response = await fetch(
        `https://hq.enaleia-hub.com/flows/trigger/${PRODUCT_ENDPOINTS[dataCategory]}?id=${productId}`
      )
      
      // Parse and return JSON response
      return response.json()
    },
  })
}