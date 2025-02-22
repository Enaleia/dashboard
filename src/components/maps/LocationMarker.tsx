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
        
        <div className='flex items-center gap-2 text-sm mt-3 mb-6 h-[16px] mx-2'>
          <img 
            src={`/partner-icons/${type}.svg`} 
            className='h-6 w-6' 
            alt={`${type} icon`}
          />
          <p className='uppercase'>{type}</p> 
        </div>
      </Popup>
    </Marker>
  )
}