import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { useMediaQuery } from "@/hooks/use-media-query";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { Icon } from "leaflet";
import { MoveRight } from 'lucide-react';
import 'leaflet/dist/leaflet.css'

interface MapItem {
  id: string;
  name: string;
  country: string;
  coordinates?: number[];
  type: string;
  wallet_addresses: string[]
}

// Helper component to trigger invalidateSize
const InvalidateMapSize = () => {
  const map = useMap();
  useEffect(() => {
    // Small delay to ensure the container has fully rendered
    const timeout = setTimeout(() => {
      map.invalidateSize();
    }, 100);   
    return () => clearTimeout(timeout);
  }, [map]); 
  return null;
};

const ActivityMap = ({ locationType }: {locationType: string}) => {
  // set map zoom according to screen size
  const isDesktop = useMediaQuery("(min-width: 568px)");
  const zoom = isDesktop ? 5 : 3;

  const { isPending, error, data } = useQuery({
    queryKey: ['landingMap'],
    queryFn: async () => {
      const response = await fetch(
        `/api/flows/trigger/a9fc78b6-96a7-4be2-836b-153671fc367f`
        // `https://hq.enaleia-hub.com/`,
      )
      return await response.json()
    },
  })
  const records = data?.data ?? []

  const filteredLocations = useMemo(() => {
    return records
      .filter((record: MapItem) => {
        if (locationType === 'See all') return true;
        return record.type === locationType;
      })
  }, [locationType, records])

  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message


	return (
    <article className='w-full h-[400px] md:h-[700px] pt-3'>
      <MapContainer className='h-full z-0' center={[38.621971846028586, 13.204641636096362]} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <InvalidateMapSize />
        {filteredLocations.map((record: MapItem) => {
          const { id, name, country, coordinates, type, wallet_addresses } = record; 
          return coordinates?.length === 2 && (    
            <Marker key={name} position={coordinates as [number, number]} icon={new Icon({
              iconUrl: `/${type}_icon.svg`,
              iconSize: [16, 16], 
            })}>
              <Popup>
                <div className='flex items-center gap-10 text-lg mt-8 h-[24px] mx-8'>
                  <p>{name}</p>
                  <Link 
                    to={`/locations/${id}`}
                    search={{ name: name, country: country, coordinates: coordinates, type: type, addresses: wallet_addresses }}
                  >
                    <MoveRight color='black'/>
                  </Link>
                </div>
                <div className='flex items-center gap-2 text-sm mt-4 mb-8 h-[16px] mx-8'>
                  <img src={`/${type}_icon.svg`} className='h-6 w-6' />
                  <p>{type}</p> 
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </article>
	);
};

export { ActivityMap };