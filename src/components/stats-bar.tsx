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
  }));

  if (isPending || error) {
    return (
      <article className='flex justify-center gap-8 md:gap-20'>
        <div className="flex flex-col w-full md:w-[20%] justify-center items-center text-center font-extralight">
          <p className="text-xl md:text-lg font-medium">{isPending ? 'Loading...' : 'An error has occurred'}</p>
          <p className="text-4xl md:text-5xl font-bold pt-4 pb-1">{isPending ? '' : error.message}</p>
        </div>
      </article>
    );
  }

  return (
    <article className={`flex ${pageStats.length > 5 ? 'flex-wrap justify-center gap-8 md:gap-20' : 'flex-col md:flex-row gap-8 md:justify-around'} items-center px-12 pt-2 pb-12 md:py-8 md:px-2`}>
      {pageStats.map((stat: StatItem, index: number) => (
        <div
          key={stat.key} 
          className={`flex flex-col w-full md:w-[20%] justify-center items-center text-center font-extralight ${index === pageStats.length - 1? "" : "border-b border-black pb-6"} md:border-none md:pb-0`}
        >
          <p className="text-xl md:text-lg font-medium">{stat.title}</p>
          <p className="text-4xl md:text-5xl font-bold pt-4 pb-1">{stat.value > 9999 ? `${Math.round(stat.value / 1000)}K` : stat.value}</p>
          {stat.description && <p className="md:min-h-[30px] text-xs md:text-xs w-[80%] leading-tight md:leading-tight">{stat.description}</p>}
        </div>
      ))}
    </article>
  )
}

export { StatsBar };