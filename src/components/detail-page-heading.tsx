import { ArrowUpRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface DetailPageHeadingProps {
  name: string,
  country: string,
  coordinates?: number[],
  port?: string,
  type: string
}

const DetailPageHeading = ({ name, country, coordinates, port, type}: DetailPageHeadingProps) => {
  return (
    <section className='w-full'>
      <div className='flex flex-row justify-between items-center'>
        <div>
          <p className='text-xs md:text-sm font-extralight'>Location detail</p>
          <h1 className='font-bold text-4xl md:text-7xl tracking-tight'>{name}</h1>
        </div>
        <img src={`/${type}_icon.svg`} alt={`${type} icon`} className='h-16 w-16 md:h-28 md:w-28'/>
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
            <p>{String(coordinates[0]).slice(0, 9)}, {String(coordinates[1]).slice(0, 9)}</p>
            <ArrowUpRight strokeWidth={1}/>
          </a>
        }
        {port && <p>Registered port: {port}</p>}
        <div className='hidden md:flex'>
          <Separator orientation='vertical' className='bg-gray-400 w-[1.5px]'/>
        </div>
        <a href='' className='flex flex-row items-center gap-1 hover:font-semibold'>
          <p>0x123d...1234</p>
          <ArrowUpRight strokeWidth={1}/>
        </a>
      </div>
    </section>
  )
}

export { DetailPageHeading };