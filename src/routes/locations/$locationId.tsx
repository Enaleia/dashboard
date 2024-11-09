import { createFileRoute, Link } from '@tanstack/react-router'
import { Separator } from '@/components/ui/separator'
import { ArrowUpRight } from 'lucide-react'
import data from '@/map_data.json'

export const Route = createFileRoute('/locations/$locationId')({
  component: LocationDetailComponent,
})

function LocationDetailComponent() {
  const { locationId } = Route.useParams()
  const locationData = data.filter(record => record.name === locationId)
  const { name, country, latitude, longitude, actions } = locationData[0]

  return (
    <main className='flex flex-col justify-center items-center gap-10 md:gap-16 m-auto px-6 md:px-28 pt-0 pb-32 md:pt-16 max-w-[1500px]'>
      <section className='flex flex-row justify-between w-full'>
        <div>
          <p className='font-extralight'>Location detail</p>
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
              <p>{String(latitude).slice(0, 9)}, {String(longitude).slice(0, 9)}</p>
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
        </div>
        <img src={`/${locationData[0].type}_icon.svg`} alt={`${locationData[0].type} icon`} className='h-16 w-16 md:h-28 md:w-28'/>
      </section>
    </main>
  )
}