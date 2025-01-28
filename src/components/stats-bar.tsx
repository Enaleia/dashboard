import { useQuery } from "@tanstack/react-query"
import { STATS_ENDPOINTS } from "@/config/api"
import { StatItem } from "@/types"
import { statDescriptions } from "@/config/texts"

const pageIds = [
  'Home',
  'Locations',
  'PortDetail',
  'RecyclerDetail',
  'ManufacturerDetail',
  'Vessels', 
  'VesselDetail' 
] as const

type PageId = typeof pageIds[number]

interface StatsBarProps {
  pageId: PageId
  partnerId?: string
}

const StatsBar = ({ pageId, partnerId }: StatsBarProps) => {

  const { isPending, error, data } = useQuery({
    queryKey: [`stats-${pageId}`],
    queryFn: async () => {
      const queryString = partnerId ? `?id=${partnerId}` : ''
      const response = await fetch(
        `https://hq.enaleia-hub.com/flows/trigger/${STATS_ENDPOINTS[pageId]}${queryString}`
      )
      return await response.json()
    },
  })
  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  // add description to each stat object
  const pageStats = data['data'].map((stat: StatItem) => ({
    ...stat,
    description: statDescriptions[pageId] ? statDescriptions[pageId][stat.key] : null
  }));

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