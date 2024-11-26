import { createFileRoute, Link } from '@tanstack/react-router'
import { Separator } from '@/components/ui/separator'
import { ArrowUpRight } from 'lucide-react'
import { StatsBar } from '@/components/stats-bar'
import { CollectionsChart } from '@/components/collections-chart'
import { CustomChartLegend } from '@/components/custom-chart-legend'
import { AttestationsTable } from '@/components/attestations-table'
import { BackToTopButton } from '@/components/back-to-top'
import data from '@/map_data.json'

export const Route = createFileRoute('/locations/$locationId')({
  component: LocationDetailComponent,
})

function LocationDetailComponent() {
  const { locationId } = Route.useParams()
  const locationData = data.filter(record => record.name === locationId)
  const { name, country, coordinates, type, actions } = locationData[0]

  return (
    <main className='flex flex-col justify-center items-center gap-12 md:gap-16 m-auto px-6 md:px-16 pt-0 pb-16 md:pb-32 md:pt-16 max-w-[1500px]'>
      <section className='w-full'>
        <div className='flex flex-row justify-between items-center'>
          <div>
            <p className='text-xs md:text-sm font-extralight'>Location detail</p>
            <h1 className='font-bold text-4xl md:text-7xl tracking-tight'>{name}</h1>
          </div>
          <img src={`/${type}_icon.svg`} alt={`${locationData[0].type} icon`} className='h-16 w-16 md:h-28 md:w-28'/>
        </div>

        <div className='flex flex-col md:flex-row gap-0.5 md:gap-4 font-light'>
          <div className='flex flex-row items-center gap-1'>
            <img src={`/flag_${country}.svg`} alt={`country} flag`} className='h-7 w-7'/>
            <p>{country}</p>
          </div>
          <div className='hidden md:flex'>
            <Separator orientation='vertical' className='bg-gray-400 w-[1px]'/>
          </div>
          <a href='' className='flex flex-row items-center gap-1 hover:font-semibold'>
            <p>{String(coordinates[0]).slice(0, 9)}, {String(coordinates[1]).slice(0, 9)}</p>
            <ArrowUpRight strokeWidth={1}/>
          </a>
          <div className='hidden md:flex'>
            <Separator orientation='vertical' className='bg-gray-400 w-[1.5px]'/>
          </div>
          <a href='' className='flex flex-row items-center gap-1 hover:font-semibold'>
            <p>0x123d...1234</p>
            <ArrowUpRight strokeWidth={1}/>
          </a>
        </div>
      </section>

      <section className='border border-primary rounded-3xl overflow-hidden'>
        <article className='flex flex-col gap-3 border-b border-primary p-4 md:p-12'>
          <h2 className='font-bold text-2xl md:text-4xl tracking-tight'>
            {type === "Port" ? "Waste removed by actions at this location" : "Action performed at this location"}
          </h2>
          <div className='flex flex-col md:flex-row md:gap-60 justify-between'>
            <p className='font-extralight text-sm md:text-lg tracking-tight leading-tight md:leading-tight'>
              {type === "Port" && "As one of our coordinated ports, it is responsible for receiving the waste collected by fishers during their harvest trips. A designated coordinator weighs the amount of waste brought back by each fisherman, ensuring accurate tracking. There are several different actions conducted per location."}
              {type === "Recycler" && "As a key recycling facility, it receives and weighs waste from ocean clean-ups, sorting materials like PET, HDPE, and PP to ensure proper processing and repurposing."} 
              {type === "Manufacturer" && "As a sustainable manufacturer, it receives sorted ocean plastic, weighed and categorized by type (PET, HDPE, PP), to transform into high-quality consumer products, supporting a sustainable future."}
            </p> 
            {type === "Port" &&         
              <p className='text-xs md:text-base font-extralight py-8 md:py-0'>Last update: mm/dd/yyyy</p>
            }
              </div> 
        </article>
        {type === "Port" ? (
          <div className='py-6 md:py-0 md:pb-16'>
            <StatsBar pageId='port'/>
            <CollectionsChart category='activities' timeRange='All time'/>
            <article className='text-center tracking-tight p-6 md:px-40'>
              <p className='text-xl md:text-2xl font-bold leading-none md:leading-none pb-1'>What are the actions, and why do they matter?</p>
              <p className='text-sm md:text-lg font-extralight leading-tight md:leading-tight'>While fishing for litter is most common, sponsors also request ad-hoc clean-ups in neglected areas like abandoned fish farms. Tracking waste per action helps evaluate performance, allocate resources, and ensure transparency in combating marine pollution.</p>
            </article>
            <CustomChartLegend category='activities' />
          </div>
        ):(
          <div className='flex flex-col items-center md:p-16'>
            <img src='/turtles.svg' alt='illustration of turtles' className='object-cover bg-center h-[150px] md:h-auto w-full mt-10 md:mt-0'/>
            <p className='md:w-[60%] text-center text-xs md:text-lg p-8 md:p-0'>We are currently exploring the best ways to represent data from this partner. If you’re a data scientist and would like to contribute, we’d love to hear from you!</p>
          </div>
        )}
      </section>

      <section className='flex flex-col gap-3 my-6 md:my-20 w-full md:w-[85%]'>
        <h2 className='font-bold text-3xl md:text-5xl tracking-tight'>Attestations</h2>
        <p className='w-full md:w-[70%] font-extralight tracking-tight leading-tight md:leading-tight'>
          {type === "Port" && "Each time a fisherman delivers waste, the port coordinator weighs it, records the data via a mobile app, and submits it to a blockchain for secure, transparent tracking."}
          {type === "Recycler" && "Each time the recycling company receives a container, it is weighed on a bridge, issued a proof of weight slip, and then sorted for repurposing."}
          {type === "Manufacturer" && "Production may not be as frequent as desired, which is normal since not all waste can be repurposed into new products. As a result, there are often long intervals between production cycles."}        
        </p>
        <Separator className='bg-black my-3'/>
        <AttestationsTable />
      </section>
      
      <section className='relative w-full rounded-3xl overflow-hidden'>
        <img src='/location_img.jpg' alt="underwater scene" className='object-cover bg-center h-[120px] md:h-auto w-full'/>
        <Link 
          to='/locations' 
          className='absolute inset-0 flex flex-col items-center justify-center text-center text-sand text-xl md:text-2xl font-semibold'
        >
          Go back to all locations
        </Link>
      </section>

      <BackToTopButton />
    </main>
  )
}