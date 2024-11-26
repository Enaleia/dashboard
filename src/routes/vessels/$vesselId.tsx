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
import data from '@/vessel_data.json'

export const Route = createFileRoute('/vessels/$vesselId')({
  component: VesselDetailComponent,
})

function VesselDetailComponent() {
  const { vesselId } = Route.useParams()
  const locationData = data.filter(record => record.name === vesselId)
  const { name, country, port, type, actions } = locationData[0]
  const [selectedChartDates, setSelectedChartDates] = useState('This year')
  const dateChoices = ["All time", "Last year", "This year"]

  return (
    <main className='flex flex-col justify-center items-center gap-10 md:gap-16 m-auto px-6 md:px-16 pt-0 pb-16 md:pb-32 md:pt-16 max-w-[1500px]'>
      <section className='flex flex-row justify-between w-full'>
        <div>
          <p className='font-extralight'>Vessel detail</p>
          <h1 className='font-bold text-3xl md:text-6xl tracking-tight'>{name}</h1>
          <div className='flex flex-col md:flex-row gap-0.5 md:gap-4 font-light'>
            <div className='flex flex-row items-center gap-1'>
              <img src={`/flag_${country}.svg`} alt={`country} flag`} className='h-7 w-7'/>
              <p>{country}</p>
            </div>
            <div className='hidden md:flex'>
              <Separator orientation='vertical' className='bg-gray-400 w-[1px]'/>
            </div>
            <a href='' className='flex flex-row items-center gap-1 hover:font-semibold'>
              <p>Registered port:</p>
              <p>{port}</p>
            </a>
            <div className='hidden md:flex'>
              <Separator orientation='vertical' className='bg-gray-400 w-[1.5px]'/>
            </div>
            <a href='' className='flex flex-row items-center gap-1 hover:font-semibold'>
              <p>0x123d...1234</p>
              <ArrowUpRight strokeWidth={1}/>
            </a>
          </div>
        </div>
        <img src={`/${type}_icon.svg`} alt={`${locationData[0].type} icon`} className='h-16 w-16 md:h-28 md:w-28'/>
      </section>

      <section className='border border-primary rounded-3xl overflow-hidden'>
        <article className='flex flex-col md:flex-row justify-between border-b border-primary p-4 pb-8 md:p-12'>
          <h2 className='font-bold text-2xl md:text-4xl tracking-tight'>Waste removed by this vessel</h2>
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

        </article>
  
        <div className='py-6 md:py-0 md:pb-16'>
          <StatsBar pageId='port'/>
          <CollectionsChart category='activities' timeRange='All time'/>
          <article className='text-center tracking-tight p-6 md:px-40'>
            <p className='text-xl md:text-2xl font-bold leading-none md:leading-none pb-1'>What are the actions, and why do they matter?</p>
            <p className='text-sm md:text-lg font-extralight leading-tight md:leading-tight'>While fishing for litter is most common, sponsors also request ad-hoc clean-ups in neglected areas like abandoned fish farms. Tracking waste per action helps evaluate performance, allocate resources, and ensure transparency in combating marine pollution.</p>
          </article>
          <CustomChartLegend category='activities' />
        </div>
      </section>

      <section className='flex flex-col gap-3 my-6 md:my-20 w-full md:w-[85%]'>
        <h2 className='font-bold text-3xl md:text-5xl tracking-tight'>Attestations</h2>
        <p className='w-full md:w-[70%] font-extralight tracking-tight leading-tight md:leading-tight'>Each time a fisherman delivers waste, the port coordinator weighs it, records the data via a mobile app, and submits it to a blockchain for secure, transparent tracking.</p>
        <Separator className='bg-black my-3'/>
        <AttestationsTable />
      </section>
      
      <section className='relative w-full rounded-3xl overflow-hidden'>
        <img src='/vessel_img.jpg' alt="fishing vessel helm" className='object-cover bg-center h-[120px] md:h-auto w-full'/>
        <Link 
          to='/vessels' 
          className='absolute inset-0 flex flex-col items-center justify-center text-center text-sand text-2xl font-semibold'
        >
          Go back to all vessels
        </Link>
      </section>

      <BackToTopButton />
    </main>
  )
}