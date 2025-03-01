import { Marker, Popup } from 'react-leaflet'
import { Link } from '@tanstack/react-router'
import { Icon } from "leaflet"
import { MoveRight } from 'lucide-react'
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

  // Create custom marker icon based on location type (Port, Recycler, Manufacturer)
  // Uses SVG icons with consistent sizing from constants
  const markerIcon = new Icon({
    iconUrl: `/partner-icons/${type}.svg`,
    iconSize: MAP_CONSTANTS.ICON_SIZE,
  })

  return (
    <Marker 
      key={name} 
      position={coordinates as [number, number]} 
      icon={markerIcon}
    >
      <Popup>
        {/* Location name with link to detail page */}
        {/* Includes all relevant data as search parameters for the detail page */}
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
            <MoveRight color='black'/>
          </div>
        </Link>

        {/* Location type indicator with matching icon */}
        <div className='flex items-center gap-2 text-sm mt-3 mb-8 h-[16px] mx-2'>
          <img 
            src={`/partner-icons/${type}.svg`} 
            className='h-6 w-6' 
            alt={`${type} icon`}
          />
          <p className='uppercase'>{type}</p> 
        </div>

        {/* Activity metrics section - only rendered if events data exists */}
        {/* This section shows action types and counts for product page maps */}
        {events &&
          <div className='text-sm mx-2 pb-4'>
            <p className='h-[14px] font-extralight'>Actions performed</p>
            {/* Map through each action type and its count */}
            {Object.entries(events).map(([action, value]) => (
              <div key={action} className='h-[14px] flex justify-between items-center mb-2'>
                <div className='flex gap-1 items-center'>
                  {/* Colored dot indicator for action type */}
                  <div className={`rounded-full bg-${action} h-3 w-3`}></div>
                  <p>{action}</p>
                </div>
                {/* Count of actions performed */}
                <p className='font-extralight'>{value}</p>
              </div>
            ))}
          </div>
        }
      </Popup>
    </Marker>
  )
}