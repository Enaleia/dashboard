import { useQuery } from "@tanstack/react-query"
import { PRODUCT_ENDPOINTS } from "@/config/constants"
import { ProductData } from "@/types"

interface HeadingDataParams {
  productId: string
  dataCategory: ProductData
}

export function useHeadingData({ productId, dataCategory }: HeadingDataParams) {
  return useQuery({
    queryKey: [`headingData-${productId}`],
    queryFn: async () => {
      const response = await fetch(
        `https://hq.enaleia-hub.com/flows/trigger/${PRODUCT_ENDPOINTS[dataCategory]}?id=${productId}`
      )
      return response.json()
    },
  })
}