import { useEffect, useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { MapContainer, TileLayer, useMap, Marker, Tooltip, Popup } from 'react-leaflet'
import { Icon } from "leaflet";
import { CircleArrowRight } from 'lucide-react';
import mapData from '../map_data.json'
import 'leaflet/dist/leaflet.css'

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

const ActivityMap = ({ selectedLocationType }: {selectedLocationType: string}) => {
  const filteredLocations = useMemo(() => {
    return mapData
      .filter(record => {
        if (selectedLocationType === 'See all') return true;
        return record.type === selectedLocationType;
      })
  }, [selectedLocationType, mapData])

	return (
    <article className='w-full h-[300px] md:h-[700px]'>
      <MapContainer className='h-full z-0' center={[38.32217739504656, 23.952204640936014]} zoom={6} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <InvalidateMapSize />
        {filteredLocations.map(location => {
          const customIcon = new Icon({
            iconUrl: `/${location.type}_icon.svg`,
            iconSize: [16, 16], 
            // iconAnchor: [5, 5], // Point of the icon which will correspond to marker's location
            // popupAnchor: [0, -5] // Point from which the popup should open relative to the iconAnchor
          });
          return (
            <Marker key={location.name} position={[location.latitude, location.longitude]} icon={customIcon}>
              <Popup>
                <div className='flex items-center gap-10 text-lg mt-8 h-[24px] mx-8'>
                  <p>{location.name}</p>
                  <Link to={`/locations/${location.name}`}>
                    <CircleArrowRight color='#2985D0'/>
                  </Link>
                </div>
                <div className='flex items-center gap-2 text-sm mt-4 mb-8 h-[16px] mx-8'>
                  <img src={`/${location.type}_icon.svg`} className='h-6 w-6' />
                  <p>{location.type}</p> 
                  {/* <p>{location.kg}kg</p>             */}
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