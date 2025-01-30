import { useQuery } from "@tanstack/react-query"
import { CHART_ENDPOINTS } from "@/config/constants"
import { PageName } from "@/types"

interface ChartDataParams {
  pageName: PageName
  partnerId?: string
  timeRange: string
}

export function useChartData({ pageName, partnerId, timeRange }: ChartDataParams) {
  return useQuery({
    queryKey: [`chartData-${pageName}-${partnerId || ''}`, timeRange],
    queryFn: async () => {
      const queryString = buildQueryString(partnerId, timeRange)
      const response = await fetch(
        `https://hq.enaleia-hub.com/flows/trigger/${CHART_ENDPOINTS[pageName]}${queryString}`
      )
      return response.json()
    },
  })
}

function buildQueryString(partnerId?: string, timeRange?: string): string {
  const params = new URLSearchParams()
  
  if (partnerId) {
    params.set('id', partnerId)
  }
  
  if (timeRange !== 'All time') {
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(1)
    startDate.setMonth(startDate.getMonth() - (timeRange === 'Last 12 months' ? 11 : 5))
    
    params.set('start_date', startDate.toISOString().split('T')[0])
    params.set('end_date', endDate.toISOString().split('T')[0])
  }
  
  const queryString = params.toString()
  console.log('query string:', queryString)
  return queryString ? `?${queryString}` : ''
}