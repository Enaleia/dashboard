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
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
    6: 'lg:grid-cols-3'
  }[pageStats.length] || 'lg:grid-cols-4'

  return (
    <article className={`min-h-[200px] grid grid-cols-1 ${gridColumns} gap-8 px-16 md:px-32 lg:px-4 py-8 max-w-7xl mx-auto`}>
      {isPending ? (
        <div className="h-full w-full text-center text-xl">Loading some statistics...</div>
      ) : error || pageStats.length < 1 ? (
        <div className="h-full w-full text-center text-xl">Sorry, we aren't able to load the statistics right now.</div>
      ) : (
        pageStats.map((stat: StatItem, index: number) => (
          <div
            key={stat.key}
            className={`flex flex-col items-center text-center pb-6 lg:pb-0 ${index !== pageStats.length - 1 ? 'border-b lg:border-b-0' : ''} border-black`}
          >
            <p className="text-xl md:text-lg font-medium">{stat.title}</p>
            <p className="text-4xl md:text-5xl font-bold pt-4 pb-1">
              {stat.value > 9999 ? `${Math.round(stat.value / 1000)}K` : stat.value}
            </p>
            {stat.description && (
              <p className="text-xs w-4/5 leading-tight min-h-[30px]">{stat.description}</p>
            )}
          </div>
        )))
      }
    </article>
  )
}

export { StatsBar };