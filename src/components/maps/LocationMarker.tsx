import { Marker, Popup } from 'react-leaflet'
import { Link } from '@tanstack/react-router'
import { Icon } from "leaflet"
import { MapItem } from '@/types'
import { MAP_CONSTANTS } from '@/config/constants'

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
  // Destructure location data from the record
  const { id, name, country, coordinates, type, wallet_addresses, events } = record

  // Don't render marker if coordinates are invalid
  // This prevents map errors and ensures only valid locations are displayed
  if (!coordinates?.length || coordinates.length !== 2) {
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

  const files = getIconFilename(type)

  // Create custom marker icon based on location type
  const markerIcon = new Icon({
    iconUrl: `/partner-icons/${files.pinIcon}`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -42],
    className: 'hover:scale-110 transition-transform duration-200'
  })

  return (
    <Marker 
      key={name} 
      position={coordinates as [number, number]} 
      icon={markerIcon}
    >
      <Popup className="rounded-xl">
        {/* Location name with link to detail page */}
        <Link 
          to={`/locations/${id}`}
          search={{ 
            name,
            country,
            coordinates,
            type,
            addresses: wallet_addresses 
          }}
        >
          <div className='flex items-center gap-4 mt-6 h-[24px] mx-2'>
            <p className='text-softBlack text-xl'>{name}</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </Link>

        {/* Location type indicator with matching icon */}
        <div className='flex items-center gap-1 text-sm mt-2 mb-4 h-[16px] mx-1'>
          <img 
            src={`/partner-icons/${files.popupIcon}`} 
            className='h-6 w-6' 
            alt={`${type} icon`}
            loading="lazy"
          />
          <p className='uppercase'>{type}</p> 
        </div>

        {/* Activity metrics section - only rendered if events data exists */}
        {/* This section shows action types and counts for product page maps */}
        {events &&
          <div className='text-base mx-1 pb-4'>
            <p className='h-[14px] font-light'>Actions performed</p>
            {/* Map through each action type and its count */}
            {Object.entries(events).map(([action, value]) => (
              <div key={action} className='h-[14px] flex justify-between items-center mb-2'>
                <div className='flex gap-1 items-center'>
                  {/* Colored dot indicator for action type */}
                  <div className={`rounded-full bg-${action} h-3 w-3`}></div>
                  <p>{action}</p>
                </div>
                {/* Count of actions performed */}
                <p className='font-light'>{value}</p>
              </div>
            ))}
          </div>
        }
      </Popup>
    </Marker>
  )
}