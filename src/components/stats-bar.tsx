import { useQuery } from "@tanstack/react-query"
import { statDescriptions } from "@/config/texts"

const pageIds = [
  'home_page_statistics',
  'location_main_page_statistics',
  'location_detail_port_statistics',
  'location_detail_recycler_statistics',
  'location_detail_manufacturer_statistics',
  'vessel_main_page_statistics', 
  'vessel_detail_page_statistics' 
] as const

type PageId = typeof pageIds[number]

interface StatsBarProps {
  pageId: PageId;
  portId?: string;
  recyclerId?: string;
  manufacturerId?: string;
  vesselId?: string
}

interface StatCardProps {
  key: string;
  title: string;
  value: number;
  description?: string
}

const statEndpoints = {
  home_page_statistics: "352a7482-4a18-4484-a53b-78c381d4db61",
  location_main_page_statistics: "bb931cab-7d63-4287-9380-1fb87a5b6431",
  location_detail_port_statistics: "50637703-8870-45ca-828d-bbab78ec917a",
  location_detail_recycler_statistics: "f6495f96-4105-46fa-a904-fcda705ba889",
  location_detail_manufacturer_statistics: "230ea17e-b2d2-4758-9cb6-383fe9574b28",
  vessel_main_page_statistics: "9cb714f0-4d0b-46d0-8454-110811ad4418",
  vessel_detail_page_statistics: "81947692-848c-4832-bc2d-dfe09bc577a1"
}

const StatsBar = ({ pageId, portId, recyclerId, manufacturerId, vesselId }: StatsBarProps) => {

  const { isPending, error, data } = useQuery({
    queryKey: [pageId],
    queryFn: async () => {
      const queryString = [
        portId ? `port_id=${portId}` : '',
        recyclerId? `recycler_id=${recyclerId}`: '',
        manufacturerId? `manufacturer_id=${manufacturerId}`: '',
        vesselId ? `vessel_id=${vesselId}` : ''
      ].filter(Boolean).join('&')
      const response = await fetch(
        `/api/flows/trigger/${statEndpoints[pageId]}${queryString ? '?' + queryString : ''}`
        // `https://hq.enaleia-hub.com/flows/trigger/${statEndpoints[pageId]}`,
      )
      return await response.json()
    },
  })
  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  // add description to each stat object
  const pageStats = data[pageId].map((stat: StatCardProps) => ({
    ...stat,
    description: statDescriptions[pageId] ? statDescriptions[pageId][stat.key] : null
  }));

  return (
    <article className='flex flex-col md:flex-row justify-around gap-8 md:gap-0 items-center px-12 pb-12 md:py-8 md:px-2'>
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