import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import { StatsBar } from '@/components/stats-bar'
import { CollectionsChart } from '@/components/collections-chart'
import { CustomChartLegend } from '@/components/custom-chart-legend'
import { AttestationsTable } from '@/components/attestations-table'
import { BackToTopButton } from '@/components/back-to-top'
import { dateChoices, partnerDetailInfo, attestationDescriptions } from '@/config/texts'
import data from '@/map_data.json'

export const Route = createFileRoute('/locations/$locationId')({
  component: LocationDetailComponent,
})

function LocationDetailComponent() {
  const { locationId } = Route.useParams()
  const locationData = data.filter(record => record.name === locationId)
  const { name, country, coordinates, type, actions } = locationData[0] as { 
    name: string; 
    country: string; 
    coordinates: number[]; 
    type: 'Port' | 'Recycler' | 'Manufacturer';
    actions: any; 
  }
  const [selectedChartDates, setSelectedChartDates] = useState('This year')

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
        <article className='flex flex-col md:flex-row justify-between border-b border-primary p-4 pb-8 md:p-12'>
          <div className=' w-full md:w-[65%]'>
            <h2 className='font-bold text-2xl md:text-4xl tracking-tight'>{partnerDetailInfo[type].heading}</h2>
            <p className='font-extralight text-sm md:text-lg tracking-tight leading-tight md:leading-tight'>{partnerDetailInfo[type].description}</p>
          </div>

          {type === "Port" &&  
            <div className='flex flex-col justify-end'>  
              <p className='text-xs md:text-base font-extralight md:text-right pt-4 pb-2 md:py-0'>Last update: mm/dd/yyyy</p>
              <div className='flex flex-row justify-between items-end gap-2 md:py-4'>
                {dateChoices.map((choice) => (
                  <Button 
                    key={choice}
                    variant={selectedChartDates === choice ? "default" : "outline"}
                    onClick={() => setSelectedChartDates(choice)}
                  >
                    {choice}
                  </Button>
                ))}
              </div>
            </div>
          }          
        </article>

        {type === "Port" ? (
          <div className='py-6 md:py-0 md:pb-16'>
            <StatsBar pageId='port'/>
            <CollectionsChart category='activities' timeRange={selectedChartDates}/>
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
        <p className='w-full md:w-[70%] font-extralight tracking-tight leading-tight md:leading-tight'>{attestationDescriptions[type]}</p>
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