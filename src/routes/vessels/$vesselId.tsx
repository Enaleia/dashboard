import { createFileRoute, Link } from '@tanstack/react-router'
import { Separator } from '@/components/ui/separator'
import { ArrowUpRight } from 'lucide-react'
import { StatsBar } from '@/components/stats-bar'
import { MaterialsChart } from '@/components/materials-chart'
import data from '@/vessel_data.json'

export const Route = createFileRoute('/vessels/$vesselId')({
  component: VesselDetailComponent,
})

function VesselDetailComponent() {
  const { vesselId } = Route.useParams()
  const locationData = data.filter(record => record.name === vesselId)
  const { name, country, port, type, actions } = locationData[0]

  return (
    <main className='flex flex-col justify-center items-center gap-10 md:gap-16 m-auto px-6 md:px-16 pt-0 pb-32 md:pt-16 max-w-[1500px]'>
      <section className='flex flex-row justify-between w-full'>
        <div>
          <p className='font-extralight'>Vessel detail</p>
          <h1 className='font-bold text-3xl md:text-6xl tracking-tight pt-1 pb-2 md:pt-4 md:pb-6'>{name}</h1>
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
        <article className='flex flex-row justify-between items-center border-b border-primary p-4 md:p-12'>
          <h2 className='font-bold text-3xl tracking-tight'>Actions performed at this location</h2>
          <p className='font-extralight'>Last update: mm/dd/yyyy</p>
        </article>
        <StatsBar pageId='port'/>
        <div className='p-5'>
          <MaterialsChart timeRange='All time'/>
        </div>
      </section>

      <section className='flex flex-col gap-3 md:my-20 md:px-48'>
        <h2 className='font-bold text-2xl md:text-4xl'>Attestations</h2>
        <p className='font-extralight'>Each time a fisherman delivers collected waste, our port coordinator weighs the haul using a digital scale. The data is then recorded via a mobile application, verifying the amount of waste collected by the fisherman. This information is securely submitted to a blockchain, ensuring that the data is stored immutably, promoting transparency and accountability in our efforts to track waste collection.</p>
        <Separator className='bg-black'/>
        <p>Total attestations: 321</p>
        <div className='flex flex-row justify-between items-center border border-black rounded-3xl text-sm'>
          <div className='p-4'>0xa8a31029cc2bd3cff5c7624fb30246bd024b39ece791ed5b5f4e83868dd3d5dc</div>
          <div className='p-4 border-x border-black'>10/28/2024 2:48:28 pm</div>
          <a href='' className='p-4'><ArrowUpRight strokeWidth={1}/></a>
        </div>
        <div className='flex flex-row justify-between items-center border border-black rounded-3xl text-sm'>
          <div className='p-4'>0xa8a31029cc2bd3cff5c7624fb30246bd024b39ece791ed5b5f4e83868dd3d5dc</div>
          <div className='p-4 border-x border-black'>10/28/2024 2:48:28 pm</div>
          <a href='' className='p-4'><ArrowUpRight strokeWidth={1}/></a>
        </div>
        <div className='flex flex-row justify-between items-center border border-black rounded-3xl text-sm'>
          <div className='p-4'>0xa8a31029cc2bd3cff5c7624fb30246bd024b39ece791ed5b5f4e83868dd3d5dc</div>
          <div className='p-4 border-x border-black'>10/28/2024 2:48:28 pm</div>
          <a href='' className='p-4'><ArrowUpRight strokeWidth={1}/></a>
        </div>
        <div className='flex flex-row justify-between items-center border border-black rounded-3xl text-sm'>
          <div className='p-4'>0xa8a31029cc2bd3cff5c7624fb30246bd024b39ece791ed5b5f4e83868dd3d5dc</div>
          <div className='p-4 border-x border-black'>10/28/2024 2:48:28 pm</div>
          <a href='' className='p-4'><ArrowUpRight strokeWidth={1}/></a>
        </div>
        <div className='flex flex-row justify-between items-center border border-black rounded-3xl text-sm'>
          <div className='p-4'>0xa8a31029cc2bd3cff5c7624fb30246bd024b39ece791ed5b5f4e83868dd3d5dc</div>
          <div className='p-4 border-x border-black'>10/28/2024 2:48:28 pm</div>
          <a href='' className='p-4'><ArrowUpRight strokeWidth={1}/></a>
        </div>
      </section>
      
      <section className='relative w-full'>
        <img src='/vessel_img.jpg' alt="fishing vessel helm" className='object-cover bg-center'/>
        <Link 
          to='/vessels' 
          className='absolute inset-0 flex flex-col items-center justify-center text-center text-sand text-2xl font-semibold'
        >
          Go back to all vessels
        </Link>
      </section>
    </main>
  )
}