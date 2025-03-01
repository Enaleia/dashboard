import { ArrowUpRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

/**
 * Interface for the DetailPageHeading component props
 * @property {string} name - Name of the location or vessel
 * @property {string} country - Country where the location is situated or vessel is registered
 * @property {string} [coordinates] - Optional coordinates string for locations
 * @property {string} [registered_port] - Optional registered port for vessels
 * @property {string} type - Type of location (Port/Recycler/Manufacturer) or vessel (Trawler/Small vessel/etc.)
 * @property {string[]} [addresses] - Optional array of blockchain wallet addresses for locations
 * @property {string} [collector_id] - Optional collector identifier for vessels
 */
interface DetailPageHeadingProps {
  name: string,
  country: string,
  coordinates?: string,
  registered_port?: string,
  type: string,
  addresses?: string[]
  collector_id?: string
}

/**
 * DetailPageHeading - Header component for detail pages
 * 
 * Displays comprehensive information about a location or vessel at the top of detail pages
 * with different fields shown based on the entity type:
 * 
 * For locations:
 * - Location name, country, type, and coordinates
 * - Coordinates link to Google Maps
 * - Blockchain wallet addresses with links to blockchain explorer
 * 
 * For vessels (collectors):
 * - Vessel name, country, type, and registered port
 * - Collector ID reference
 * 
 * Features:
 * - Responsive layout that adapts to different screen sizes
 * - External links to maps and blockchain explorers
 * - Visual indicators with appropriate icons
 * - Type icon displayed prominently
 */
const DetailPageHeading = ({ name, country, coordinates, registered_port, type, addresses, collector_id}: DetailPageHeadingProps) => {
  return (
    <section className='w-full'>
      <div className='flex flex-row justify-between items-start'>
        {/* Left side: Main information */}
        <div className='flex flex-col gap-0.5 md:gap-2 lg:gap-4 font-light'>
          {/* Page type indicator */}
          <p className='text-xs md:text-sm font-extralight'>{coordinates ? 'Location detail' : 'Collector detail'}</p>
          {/* Location/Vessel name (main heading) */}
          <h1 className='font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight'>{name}</h1>

          {/* Details section with multiple data points */}
          <div className='flex flex-col lg:flex-row items-start gap-0.5 lg:gap-4 font-light'>
            {/* Country with flag */}
            <div className='flex flex-row items-center gap-1'>
              <img src={`/country-flags/${country}.svg`} alt={`${country} flag`} className='h-7 w-7'/>
              <p>{country}</p>
            </div>

            {/* Vertical separator (hidden on mobile) */}
            <div className='hidden md:flex'>
              <Separator orientation='vertical' className='bg-gray-400 w-[1px]'/>
            </div>

            {/* Coordinates with map link (only for locations) */}
            {coordinates &&
              <a 
                href={`https://www.google.com/maps?q={${coordinates[0]},${coordinates[1]}}`}
                target="_blank"
                rel="noopener noreferrer" 
                className='flex flex-row items-center gap-2'
              >
                <img src='/data-icons/pin.svg' alt='pin icon' className='h-6 w-6'/>
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

            {/* Registered port (only for vessels) */}
            {registered_port && 
              <div className='flex flex-row items-center gap-2'>
                <img src='/data-icons/pin.svg' alt='pin icon' className='h-6 w-6'/>
                <p><span className='font-extralight'>Registered port:</span> {registered_port}</p>
              </div>
            }

            {/* Vertical separator (hidden on mobile) */}
            <div className='hidden md:flex'>
              <Separator orientation='vertical' className='bg-gray-400 w-[1.5px]'/>
            </div>

            {/* Blockchain wallet addresses (only for locations) */}
            {addresses &&
              <div className='flex flex-row items-start gap-2'>       
                <img src='/data-icons/wallet.svg' alt='wallet icon' className='h-6 w-6'/>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-1'>
                  {addresses.length ?
                    addresses.map((address, index) => (
                      <a 
                        key={index}
                        href={`https://optimism.easscan.org/address/${address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='flex flex-row gap-2'>
                        <p>{address.slice(0, 6)}...{address.slice(-4)}</p>
                        <ArrowUpRight strokeWidth={1}/>
                      </a>
                    )) 
                  :
                    <p>address not available</p>
                  }
                </div>
              </div>
            }

            {/* Collector ID (only for vessels) */}
            {collector_id && 
              <div className='flex flex-row items-center gap-2'>
                <img src='/data-icons/id.svg' alt='ID card icon' className='h-6 w-6'/>
                <p><span className='font-extralight'>Collector ID:</span> {collector_id}</p>
              </div>
            }
          </div>
        </div>

        {/* Right side: Type indicator with icon */}
        <div className='flex flex-col gap-1 items-center pl-2'>
          {/* Type icon with responsive sizing */}
          <img 
            src={`/partner-icons/${type.replace(/ /g, '_')}.svg`} 
            alt={`${type} icon`} 
            className='h-16 w-16 md:h-28 md:w-28'
          />
          {/* Type label */}
          <p className='text-center uppercase'>{type}</p>
        </div>
      </div>
    </section>
  )
}

export { DetailPageHeading }