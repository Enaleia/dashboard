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
      <div className='flex flex-row justify-between items-start'>

        <div className='flex flex-col gap-0.5 md:gap-2 lg:gap-4 font-light'>
          <p className='text-xs md:text-sm font-extralight'>Location detail</p>
          <h1 className='font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight'>{name}</h1>

          <div className='flex flex-col lg:flex-row gap-0.5 lg:gap-4 font-light'>
            <div className='flex flex-row items-center gap-1'>
              <img src={`/CountryFlags/${country}.svg`} alt={`${country} flag`} className='h-7 w-7'/>
              <p>{country}</p>
            </div>
            <div className='hidden md:flex'>
              <Separator orientation='vertical' className='bg-gray-400 w-[1px]'/>
            </div>
            {coordinates &&
              <a href='' className='flex flex-row items-center gap-2 hover:font-semibold'>
                <img src='/DataIcons/pin.svg' alt='pin icon' className='h-6 w-6'/>
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
            {registered_port && 
              <div className='flex flex-row items-center gap-2 hover:font-semibold'>
                <img src='/DataIcons/pin.svg' alt='pin icon' className='h-6 w-6'/>
                <p><span className='font-extralight'>Registered port:</span> {registered_port}</p>
              </div>
            }
            <div className='hidden md:flex'>
              <Separator orientation='vertical' className='bg-gray-400 w-[1.5px]'/>
            </div>
            {addresses &&
              <a href='' className='flex flex-row items-center gap-2 hover:font-semibold'>
                <img src='/DataIcons/wallet.svg' alt='wallet icon' className='h-6 w-6'/>
                {addresses.length > 0 ?
                  addresses.map(address => (
                    <>
                      <p>{address}</p>
                      <ArrowUpRight strokeWidth={1}/>
                    </>
                  )) 
                :
                  <p>address not available</p>
                }
              </a>
            }
            {collector_id && 
              <div className='flex flex-row items-center gap-2 hover:font-semibold'>
                <img src='/DataIcons/id.svg' alt='ID card icon' className='h-6 w-6'/>
                <p><span className='font-extralight'>Collector ID:</span> {collector_id}</p>
              </div>
            }
          </div>
        </div>

        <div className='flex flex-col gap-1 items-center pl-2'>
          <img src={`/PartnerIcons/${type.replace(/ /g, '_')}.svg`} alt={`${type} icon`} className='h-16 w-16 md:h-28 md:w-28'/>
          <p className='text-center uppercase'>{type}</p>
        </div>
      </div>
    </section>
  )
}

export { DetailPageHeading };