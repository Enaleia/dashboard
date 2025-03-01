import { useStatsData } from "@/hooks/api/useStatsData"
import { PageName, StatItem } from "@/types"
import { statDescriptions } from "@/config/texts"

/**
 * Interface for the StatsBar component props
 * @property {PageName} pageName - The page type where the stats are displayed
 * @property {string} [partnerId] - Optional ID for partner-specific stats (used on detail pages)
 */
interface StatsBarProps {
  pageName: PageName
  partnerId?: string
}

/**
 * StatsBar - Displays key statistical information for different pages
 * 
 * Renders a responsive grid of statistical items with:
 * - Dynamic layout based on number of stats
 * - Adaptive formatting for large numbers (K notation)
 * - Optional descriptive text for each statistic
 * 
 * Features:
 * - Responsive grid layout (1 column on mobile, multiple columns on larger screens)
 * - Loading and error states
 * - Automatic number formatting
 * - Descriptive text pulled from configuration
 * 
 * The component adapts its visualization based on the page context,
 * showing different stats and layouts accordingly.
 */
const StatsBar = ({ pageName, partnerId }: StatsBarProps) => {
  // Fetch stats data based on page type and optional partner ID
  const { isPending, error, data } = useStatsData({ pageName, partnerId })
  // Ensure records are an array, defaulting to empty array if no data
  const records: StatItem[] = data?.data ?? []
  // Enrich stat objects with descriptive text from configuration
  const pageStats = records.map((stat) => ({
    ...stat,
    // Add description if available for the current page and stat key
    description: statDescriptions[pageName] ? statDescriptions[pageName][stat.key] : null
  }))

  // Determine grid column layout based on number of stats
  // Provides different column configurations for various stat counts
  const gridColumns = {
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
    6: 'lg:grid-cols-3'
  }[pageStats.length] || 'lg:grid-cols-4'

  // Render loading or error state if data is not available
  if (isPending || error || !pageStats.length) {
    return (
      <article className="w-full min-h-[200px] flex justify-center items-center text-center text-xl px-16">
        {isPending ? (
          <div>Loading some statistics...</div>
        ) : (
          <div>Sorry, we aren't able to load the statistics right now.</div>
        )}
      </article>
    )
  }

  // Render grid of statistics with responsive layout
  return (
    <article className={`grid grid-cols-1 ${gridColumns} gap-8 px-16 md:px-32 lg:px-4 py-8 max-w-7xl mx-auto`}>
      {pageStats.map((stat: StatItem, index: number) => (
        <div
          key={stat.key}
          // Add bottom border for mobile, remove for larger screens except last item
          className={`flex flex-col items-center text-center pb-6 lg:pb-0 ${index !== pageStats.length - 1 ? 'border-b lg:border-b-0' : ''} border-darkSand`}
        >
          {/* Stat title */}
          <p className="text-lg font-extralight">{stat.title}</p>
          {/* Stat value with formatting for large numbers */}
          <p className="text-4xl md:text-5xl font-bold pt-4 pb-1">
            {stat.value > 9999 ? `${Math.round(stat.value / 1000)}K` : stat.value}
          </p>
          {/* Optional descriptive text for the statistic */}
          {stat.description && (
            <p className="text-sm font-extralight leading-tight">{stat.description}</p>
          )}
        </div>
      ))}
    </article>
  )
}

export { StatsBar }