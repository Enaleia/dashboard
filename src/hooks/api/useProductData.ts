import { useQuery } from "@tanstack/react-query"
import { PRODUCT_ENDPOINTS } from "@/config/constants"
import { ProductData } from "@/types"

interface ProductDataParams {
  productId: string
  dataCategory: ProductData
}

export function useProductData({ productId, dataCategory }: ProductDataParams) {
  return useQuery({
    queryKey: [`product${dataCategory}-${productId}`],
    queryFn: async () => {
      const response = await fetch(
        `https://hq.enaleia-hub.com/flows/trigger/${PRODUCT_ENDPOINTS[dataCategory]}?id=${productId}`
      )
      return response.json()
    },
  })
}