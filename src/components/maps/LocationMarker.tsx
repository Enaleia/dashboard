import { Marker, Popup } from 'react-leaflet'
import { Link } from '@tanstack/react-router'
import { Icon } from "leaflet"
import { MoveRight } from 'lucide-react'
import { MapItem } from '@/types'
import { MAP_CONSTANTS } from '@/config/constants'

export interface MarkerProps {
  record: MapItem
}

export const LocationMarker = ({ record }: MarkerProps) => {
  const { id, name, country, coordinates, type, wallet_addresses } = record

  if (!coordinates?.length || coordinates.length !== 2) {
    return null
  }

  const markerIcon = new Icon({
    iconUrl: `/PartnerIcons/${type}.svg`,
    iconSize: MAP_CONSTANTS.ICON_SIZE,
  })

  return (
    <Marker 
      key={name} 
      position={coordinates as [number, number]} 
      icon={markerIcon}
    >
      <Popup>
        <div className='flex items-center gap-10 text-lg mt-8 h-[24px] mx-8'>
          <p>{name}</p>
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
            <MoveRight color='black'/>
          </Link>
        </div>
        <div className='flex items-center gap-2 text-sm mt-4 mb-8 h-[16px] mx-8'>
          <img 
            src={`PartnerIcons/${type}.svg`} 
            className='h-6 w-6' 
            alt={`${type} icon`}
          />
          <p>{type}</p> 
        </div>
      </Popup>
    </Marker>
  )
}