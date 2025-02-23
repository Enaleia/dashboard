import { useQuery } from "@tanstack/react-query"
import { MAP_ENDPOINTS } from "@/config/constants"
import { PageName } from "@/types"

interface MapDataParams {
  pageName: PageName
  productId?: string
}

export function useMapData({ pageName, productId }: MapDataParams) {
  return useQuery({
    queryKey: [`mapData-${pageName}-${productId || ''}`],
    queryFn: async () => {
      const queryString = productId ? `?id=${productId}` : ''
      const response = await fetch(
        `https://hq.enaleia-hub.com/flows/trigger/${MAP_ENDPOINTS[pageName]}${queryString}`
      )
      return response.json()
    },
  })
}