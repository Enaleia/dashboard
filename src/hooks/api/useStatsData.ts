import { useQuery } from "@tanstack/react-query"
import { STATS_ENDPOINTS } from "@/config/constants"
import { PageName } from "@/types"

interface StatsDataParams {
  pageName: PageName
  partnerId?: string
}

export function useStatsData({ pageName, partnerId }: StatsDataParams) {
  return useQuery({
    queryKey: [`stats-${pageName}`],
    queryFn: async () => {
      const queryString = partnerId ? `?id=${partnerId}` : ''
      const response = await fetch(
        `https://hq.enaleia-hub.com/flows/trigger/${STATS_ENDPOINTS[pageName]}${queryString}`
      )
      return response.json()
    },
  })
}