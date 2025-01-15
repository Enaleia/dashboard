import { useQuery } from "@tanstack/react-query"
import { statDescriptions } from "@/config/texts"

const pageIds = [
  'home',
  'locations',
  'portDetail',
  'recyclerDetail',
  'manufacturerDetail',
  'vessels', 
  'vesselDetail' 
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
  description?: string | null
}

const statEndpoints = {
  home: "352a7482-4a18-4484-a53b-78c381d4db61",
  locations: "bb931cab-7d63-4287-9380-1fb87a5b6431",
  portDetail: "50637703-8870-45ca-828d-bbab78ec917a",
  recyclerDetail: "f6495f96-4105-46fa-a904-fcda705ba889",
  manufacturerDetail: "230ea17e-b2d2-4758-9cb6-383fe9574b28",
  vessels: "9cb714f0-4d0b-46d0-8454-110811ad4418",
  vesselDetail: "81947692-848c-4832-bc2d-dfe09bc577a1"
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

  // Ensure data is defined and is an array before mapping
  const pageStats = data['data'].map((stat: StatCardProps) => ({
    ...stat,
     // add description to each stat object
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