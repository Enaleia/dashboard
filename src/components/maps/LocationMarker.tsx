import { Marker, Popup } from 'react-leaflet'
import { Link } from '@tanstack/react-router'
import { Icon } from "leaflet"
import { MoveRight } from 'lucide-react'
import { MapItem } from '@/types'
import { MAP_CONSTANTS } from '@/config/constants'
import { useEffect } from 'react'

/**
 * Interface for the LocationMarker component props
 * @property {MapItem} record - Location data to be displayed as a map marker
 */
interface LocationMarkerProps {
  record: MapItem
}

/**
 * LocationMarker - Component for rendering interactive location markers on the map
 * 
 * Creates a map marker with a popup that displays:
 * - Location name with link to detail page
 * - Location type with appropriate icon
 * - Activity metrics (for product page maps)
 * 
 * Features:
 * - Custom icons based on location type (Port, Recycler, Manufacturer)
 * - Interactive popups with location details
 * - Direct navigation to location detail pages
 * - Activity metrics visualization (when available)
 * - Validation to prevent rendering markers with invalid coordinates
 */
export const LocationMarker = ({ record }: LocationMarkerProps) => {
  // Add styles for Leaflet popup shadow
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .leaflet-popup-content-wrapper {
        box-shadow: 10px 10px 45px -10px rgb(0 0 0 / 0.2) !important;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Destructure location data from the record
  const { id, name, country, coordinates, type, wallet_addresses, events } = record

  // Don't render marker if coordinates are invalid
  // This prevents map errors and ensures only valid locations are displayed
  if (!coordinates?.length || coordinates.length !== 2 || typeof coordinates[0] !== 'number' || typeof coordinates[1] !== 'number' ) {
    console.warn(`LocationMarker: Invalid coordinates for location ID ${id}, Name: ${name}:`, coordinates);
    return null
  }

  // Map the type to the correct icon filenames
  const getIconFilename = (type: string) => {
    const pinIcon = {
      manufacturer: 'map-pin-factory.svg',
      port: 'map-pin-port.svg',
      recycler: 'map-pin-recycler.svg'
    }[type.toLowerCase()] || 'map-pin-factory.svg';

    const popupIcon = {
      manufacturer: 'Manufacturer.svg',
      port: 'Port.svg',
      recycler: 'Recycler.svg'
    }[type.toLowerCase()] || 'Manufacturer.svg';

    return { pinIcon, popupIcon };
  }

  const files = getIconFilename(type || '')

  // Create custom marker icon based on location type
  const markerIcon = new Icon({
    iconUrl: `/partner-icons/${files.pinIcon}`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -24],
    className: 'hover:scale-110 transition-transform duration-200'
  })

  return (
    <Marker 
      key={id} 
      position={coordinates as [number, number]} // Use original coordinates
      icon={markerIcon} // Keep custom icon
    >
      <Popup className="rounded-5xl px-2 py-2" closeButton={false}>
        {/* Location name with link to detail page */}
        <div className="min-w-[140px] max-w-[240px] flex-col justify-start items-start inline-flex">
          <div className="self-stretch flex-col justify-start items-start flex mb-1">
            {/* Type indicator with icon */}
            <div className="h-8 self-stretch justify-start items-center inline-flex gap-2 mb-1">
              <img 
                src={`/partner-icons/${files.popupIcon}`} 
                className='h-8 w-8' 
                alt={`${type} icon`}
                loading="lazy"
              />
              <p className='ml-1 text-base text-light'>{type}</p>
            </div>
            
            {/* Location name and arrow */}
            <Link 
              to="/locations/$id"
              params={{ id }}
              search={{ 
                name,
                country,
                coordinates,
                type,
                addresses: wallet_addresses 
              }}
              className="w-full group"
            >
              <div className="h-10 flex items-center justify-between">
                <p className='text-[hsl(var(--foreground))] text-2xl font-bold leading-none'>{name}</p>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 transition-transform group-hover:translate-x-0.5 ">
                  <path d="M21.3265 12.0001C21.3265 11.749 21.2261 11.5179 21.0251 11.3271L14.3756 4.68756C14.1546 4.46659 13.9336 4.38623 13.6925 4.38623C13.2004 4.38623 12.8187 4.74782 12.8187 5.25006C12.8187 5.49113 12.899 5.72213 13.0598 5.88289L15.3098 8.17304L18.6948 11.2567L16.264 11.1061H3.55751C3.04524 11.1061 2.67358 11.4777 2.67358 12.0001C2.67358 12.5224 3.04524 12.894 3.55751 12.894H16.264L18.7048 12.7434L15.3098 15.8271L13.0598 18.1172C12.899 18.2679 12.8187 18.509 12.8187 18.7501C12.8187 19.2523 13.2004 19.6139 13.6925 19.6139C13.9336 19.6139 14.1446 19.5235 14.3455 19.3327L21.0251 12.673C21.2261 12.4822 21.3265 12.2512 21.3265 12.0001Z" fill="#0D0D0D"/>
                </svg>
              </div>
            </Link>
          </div>

          {/* Activity metrics section - only rendered if events data exists */}
          {events && (
            <div className="self-stretch flex-col justify-start items-start flex mb-2">
              <p className='text-[hsl(var(--foreground))] text-sm font-light leading-none mt-0'>Actions performed</p>
              <div className="self-stretch flex-col justify-start items-start flex space-y-0.5">
                {Object.entries(events).map(([action, value]) => {
                  const actionColors: Record<string, string> = {
                    batch: 'bg-[hsl(var(--batch))]',
                    sorting: 'bg-[hsl(var(--sorting))]',
                    pelletizing: 'bg-[hsl(var(--pelletizing))]',
                    shredding: 'bg-[hsl(var(--shredding))]',
                    manufacturing: 'bg-[hsl(var(--manufacturing))]'
                  };
                  
                  return (
                    <div key={action} className="h-4 self-stretch rounded-xl justify-between items-center inline-flex">
                      <div className="flex items-center gap-1">
                        <div className={`w-3 h-3 rounded-full gap-2 ${actionColors[action.toLowerCase()] || 'bg-gray-200'}`} />
                        <p className='text-[hsl(var(--foreground))] text-base capitalize'>{action}</p>
                      </div>
                      <p className='text-right text-[hsl(var(--foreground))] text-base font-bold'>{value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        {/* Custom popup arrow */}
        <div className="relative">
          <svg className="absolute left-1/2 -translate-x-1/2 -bottom-4" width="20" height="8" viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 8L0 0H20L10 8Z" fill="white"/>
            <path d="M10 7L1 0H19L10 7Z" fill="#F7F5F2"/>
          </svg>
        </div>
      </Popup>
    </Marker>
  )
}