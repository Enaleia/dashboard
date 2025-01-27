import { useQuery } from "@tanstack/react-query"
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

interface StatCardProps {
  key: string;
  title: string;
  value: number;
  description?: string | null
}

const statEndpoints = {
  Home: "352a7482-4a18-4484-a53b-78c381d4db61",
  Locations: "bb931cab-7d63-4287-9380-1fb87a5b6431",
  PortDetail: "50637703-8870-45ca-828d-bbab78ec917a",
  RecyclerDetail: "f6495f96-4105-46fa-a904-fcda705ba889",
  ManufacturerDetail: "230ea17e-b2d2-4758-9cb6-383fe9574b28",
  Vessels: "9cb714f0-4d0b-46d0-8454-110811ad4418",
  VesselDetail: "81947692-848c-4832-bc2d-dfe09bc577a1"
}

const StatsBar = ({ pageId, partnerId }: StatsBarProps) => {

  const { isPending, error, data } = useQuery({
    queryKey: [`stats-${pageId}`],
    queryFn: async () => {
      const queryString = partnerId ? `?id=${partnerId}` : ''
      const response = await fetch(
        // proxy for access
        // `/api/flows/trigger/${statEndpoints[pageId]}${queryString}`
        `https://hq.enaleia-hub.com/flows/trigger/${statEndpoints[pageId]}${queryString}`
      )
      return await response.json()
    },
  })
  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  // add description to each stat object
  const pageStats = data['data'].map((stat: StatCardProps) => ({
    ...stat,
    description: statDescriptions[pageId] ? statDescriptions[pageId][stat.key] : null
  }));

  return (
    <article className={`flex ${pageStats.length > 5 ? 'flex-wrap justify-center gap-8 md:gap-20' : 'flex-col md:flex-row gap-8 md:justify-around'} items-center px-12 pt-2 pb-12 md:py-8 md:px-2`}>
      {pageStats.map((stat: StatCardProps, index: number) => (
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