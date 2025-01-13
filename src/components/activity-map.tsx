import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { useMediaQuery } from "@/hooks/use-media-query";
import { MapContainer, TileLayer, useMap, Marker, Tooltip, Popup } from 'react-leaflet'
import { Icon } from "leaflet";
import { MoveRight } from 'lucide-react';
import mapData from '../map_data.json'
import 'leaflet/dist/leaflet.css'

interface MapItem {
  company_id: string;
  location_name: string;
  country: string;
  coordinates?: string;
  port?: string;
  type: string;
  // kg: number;
  // action_count: number
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
  // const isDesktop = useMediaQuery("(min-width: 568px)");
  // const zoom = isDesktop ? 6 : 4;

  // const filteredLocations = useMemo(() => {
  //   if (locationType === 'Most active') {
  //     return mapData.sort((a, b) => b.actions - a.actions); // Sort in descending order
  //   }
  //   return mapData
  //     .filter(record => {
  //       if (locationType === 'See all') return true;
  //       return record.type === locationType;
  //     })
  // }, [locationType, mapData])

  const { isPending, error, data } = useQuery({
    queryKey: ['landingMap'],
    queryFn: async () => {
      const response = await fetch(
        `/api/flows/trigger/a9fc78b6-96a7-4be2-836b-153671fc367f?role=fcf2d257-495d-48d9-a2e0-a272ed3c44db&role=47eb616c-820c-4be9-abe1-9a41d385bc6d&role=0f0ca9f1-3f58-4c56-8361-9dd82ba2b476&sort=descending&page=1&limit=1000`
        // `https://hq.enaleia-hub.com/flows/trigger/${statEndpoints[pageId]}`,
      )
      return await response.json()
    },
  })
  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  const records = data.locationPayload

	return (
    <article className='w-full h-[400px] md:h-[700px]'>
      <MapContainer className='h-full z-0' center={[38.621971846028586, 13.204641636096362]} zoom={5} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <InvalidateMapSize />
        {records.map((record: MapItem) => {
          const latLong = record.coordinates?.split(', ')    
          const customIcon = new Icon({
            iconUrl: `/${record.type}_icon.svg`,
            iconSize: [16, 16], 
            // iconAnchor: [5, 5], // Point of the icon which will correspond to marker's location
            // popupAnchor: [0, -5] // Point from which the popup should open relative to the iconAnchor
          });        
          return latLong ? (
            <Marker key={record.location_name} position={[Number(latLong[0]), Number(latLong[1])]} icon={customIcon}>
              <Popup>
                <div className='flex items-center gap-10 text-lg mt-8 h-[24px] mx-8'>
                  <p>{record.location_name}</p>
                  <Link 
                    to={`/locations/${record.company_id}`}
                    search={{ name: record.location_name, country: record.country, coordinates: record.coordinates, type: record.type }}
                  >
                    <MoveRight color='black'/>
                  </Link>
                </div>
                <div className='flex items-center gap-2 text-sm mt-4 mb-8 h-[16px] mx-8'>
                  <img src={`/${record.type}_icon.svg`} className='h-6 w-6' />
                  <p>{record.type}</p> 
                </div>
              </Popup>
            </Marker>
          ) : null;
        })}
      </MapContainer>
    </article>
	);
};

export { ActivityMap };