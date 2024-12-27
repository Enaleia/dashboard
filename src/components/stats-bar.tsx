import { useQuery } from "@tanstack/react-query"
import { statDescriptions } from "@/config/texts"

type PageId = 'home_page_statistics' | 'location_main_page_statistics'

interface StatCardProps {
  key: string;
  title: string;
  value: number;
  description?: string
}

const statEndpoints = {
  home_page_statistics: "352a7482-4a18-4484-a53b-78c381d4db61",
  location_main_page_statistics: "bb931cab-7d63-4287-9380-1fb87a5b6431"
}

const StatsBar = ({ pageId }: { pageId: PageId }) => {

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: [pageId],
    queryFn: async () => {
      const response = await fetch(
        `/api/flows/trigger/${statEndpoints[pageId]}`
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
    description: statDescriptions[pageId][stat.key] || 'No description available'
  }));

  return (
    <article className='flex flex-col md:flex-row justify-around gap-8 md:gap-0 items-center px-12 pb-12 md:py-8 md:px-2'>
      {pageStats.map((stat: StatCardProps, index: number) => (
        <div
          key={stat.key} 
          className={`flex flex-col w-full md:w-[20%] justify-center items-center text-center font-extralight ${index === pageStats.length - 1? "" : "border-b border-black pb-6"} md:border-none md:pb-0`}
        >
          <p className="text-xl md:text-lg font-medium">{stat.title}</p>
          <p className="text-4xl md:text-5xl font-bold pt-4 pb-1">{stat.value}</p>
          <p className="md:min-h-[30px] text-xs md:text-xs w-[80%] leading-tight md:leading-tight">{stat.description}</p>
        </div>
      ))}
    </article>
  )
}

export { StatsBar };