import { ArrowUpRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface DetailPageHeadingProps {
  name: string,
  country: string,
  coordinates?: string,
  registered_port?: string,
  type: string,
  addresses?: string[]
  collector_id?: string
}

const DetailPageHeading = ({ name, country, coordinates, registered_port, type, addresses, collector_id}: DetailPageHeadingProps) => {
  return (
    <section className='w-full'>
      <div className='flex flex-row justify-between items-center'>
        <div>
          <p className='text-xs md:text-sm font-extralight'>Location detail</p>
          <h1 className='font-bold text-4xl md:text-7xl tracking-tight'>{name}</h1>
        </div>
        <img src={`/${type.replace(/ /g, '_')}_icon.svg`} alt={`${type} icon`} className='h-16 w-16 md:h-28 md:w-28'/>
      </div>

      <div className='flex flex-col md:flex-row gap-0.5 md:gap-4 font-light'>
        <div className='flex flex-row items-center gap-1'>
          <img src={`/flag_${country}.svg`} alt={`country} flag`} className='h-7 w-7'/>
          <p>{country}</p>
        </div>
        <div className='hidden md:flex'>
          <Separator orientation='vertical' className='bg-gray-400 w-[1px]'/>
        </div>
        {coordinates &&
          <a href='' className='flex flex-row items-center gap-1 hover:font-semibold'>
            {coordinates.length === 2 ?
              <>
                <p>{coordinates[0]}, {coordinates[1]}</p>
                <ArrowUpRight strokeWidth={1}/>
              </>
            :
              <p>coordinates not available</p>
            }
          </a>
        }
        {registered_port && <p>Registered port: {registered_port}</p>}
        <div className='hidden md:flex'>
          <Separator orientation='vertical' className='bg-gray-400 w-[1.5px]'/>
        </div>
        {addresses &&
          <a href='' className='flex flex-row items-center gap-1 hover:font-semibold'>
            <p>{addresses[0]}</p>
            <ArrowUpRight strokeWidth={1}/>
          </a>
        }
        {collector_id && <p>Collector Identity: {collector_id}</p>}
      </div>
    </section>
  )
}

export { DetailPageHeading };