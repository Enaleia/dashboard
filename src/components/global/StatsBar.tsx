import { useStatsData } from "@/hooks/api/useStatsData"
import { PageName, StatItem } from "@/types"
import { statDescriptions } from "@/config/texts"

interface StatsBarProps {
  pageName: PageName
  partnerId?: string
}

const StatsBar = ({ pageName, partnerId }: StatsBarProps) => {
  const { isPending, error, data } = useStatsData({ pageName, partnerId })
  const records: StatItem[] = data?.data ?? []
  // add description to each stat object
  const pageStats = records.map((stat) => ({
    ...stat,
    description: statDescriptions[pageName] ? statDescriptions[pageName][stat.key] : null
  }))

  // determine number of grid columns based on stat items for each page
  const gridColumns = {
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
    6: 'lg:grid-cols-3'
  }[pageStats.length] || 'lg:grid-cols-4'

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

  return (
    <article className={`grid grid-cols-1 ${gridColumns} gap-8 px-16 md:px-32 lg:px-4 py-8 max-w-7xl mx-auto`}>
      {pageStats.map((stat: StatItem, index: number) => (
        <div
          key={stat.key}
          className={`flex flex-col items-center text-center pb-6 lg:pb-0 ${index !== pageStats.length - 1 ? 'border-b lg:border-b-0' : ''} border-darkSand`}
        >
          <p className="text-lg font-extralight">{stat.title}</p>
          <p className="text-4xl md:text-5xl font-bold pt-4 pb-1">
            {stat.value > 9999 ? `${Math.round(stat.value / 1000)}K` : stat.value}
          </p>
          {stat.description && (
            <p className="text-sm font-extralight leading-tight">{stat.description}</p>
          )}
        </div>
      ))}
    </article>
  )
}

export { StatsBar }