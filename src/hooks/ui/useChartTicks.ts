import { useMemo } from 'react'

interface ChartRecord {
  date: string
  [key: string]: any
}

export function useChartTicks(records: ChartRecord[], timeRange: string) {
  return useMemo(() => {
    if (!records.length) {
      return { ticks: [], tickFormatter: (value: string) => value }
    }

    if (timeRange === 'All time') {
      const yearGroups = new Map<string, ChartRecord[]>()
      
      // Group records by year
      records.forEach(record => {
        const year = record.date.substring(0, 4)
        if (!yearGroups.has(year)) {
          yearGroups.set(year, [])
        }
        yearGroups.get(year)!.push(record)
      })

      // Get first record of each year for ticks
      const yearTicks = Array.from(yearGroups.values())
        .map(yearRecords => yearRecords[0].date)
        .sort()

      return {
        ticks: yearTicks,
        tickFormatter: (value: string) => value.substring(0, 4)
      }
    }
    
    return {
      ticks: records.map(record => record.date),
      tickFormatter: (value: string) => {
        const date = new Date(value)
        return date.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
          timeZone: "UTC"
        })
      }
    }
  }, [records, timeRange])
}