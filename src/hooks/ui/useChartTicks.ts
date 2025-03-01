import { useMemo } from 'react'

/**
 * Interface for chart data records
 * @property {string} date - Date string in ISO format (YYYY-MM-DD or YYYY-MM)
 * @property {any} [key: string] - Any additional data fields for the chart
 */
interface ChartRecord {
  date: string
  [key: string]: any
}

/**
 * useChartTicks - Custom hook for generating chart x-axis ticks based on time range
 * 
 * This hook generates appropriate x-axis ticks and formatting for time-series charts.
 * It handles different time range selections by adapting the tick density and format:
 * - "All time": Shows yearly ticks only to avoid overcrowding (e.g., "2022", "2023")
 * - Shorter ranges: Shows monthly ticks with month and year format (e.g., "Jan 2023")
 * 
 * The hook memoizes its output to prevent unnecessary recalculations on re-renders.
 * 
 * @param {ChartRecord[]} records - Array of data records containing date values
 * @param {string} timeRange - Selected time range (e.g., "All time", "Last 12 months")
 * @returns {Object} Object containing:
 *   - ticks: Array of date strings to use as x-axis ticks
 *   - tickFormatter: Function to format tick labels for display
 */
export function useChartTicks(records: ChartRecord[], timeRange: string) {
  return useMemo(() => {
    // Handle empty data case
    if (!records.length) {
      return { ticks: [], tickFormatter: (value: string) => value }
    }

    // For "All time" range, use yearly ticks to avoid overcrowding
    if (timeRange === 'All time') {
      // Create a Map to group records by year
      const yearGroups = new Map<string, ChartRecord[]>()
      
      // Group records by year extracted from date string
      records.forEach(record => {
        const year = record.date.substring(0, 4)  // Extract year from ISO date
        if (!yearGroups.has(year)) {
          yearGroups.set(year, [])
        }
        yearGroups.get(year)!.push(record)
      })

      // Get the first record of each year to use as tick points
      const yearTicks = Array.from(yearGroups.values())
        .map(yearRecords => yearRecords[0].date)
        .sort() // Ensure chronological order

      return {
        ticks: yearTicks,
        // Format tick labels to show only the year
        tickFormatter: (value: string) => value.substring(0, 4)
      }
    }
    
    // For shorter time ranges, use all data points with month-year formatting
    return {
      // Use all record dates as ticks
      ticks: records.map(record => record.date),
      // Format ticks as "Month Year" (e.g., "Jan 2023")
      tickFormatter: (value: string) => {
        const date = new Date(value)
        return date.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
          timeZone: "UTC" // Ensure consistent timezone handling
        })
      }
    }
  }, [records, timeRange])  // Recalculate only when records or timeRange changes
}