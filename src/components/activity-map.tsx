import { useEffect } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
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

const ActivityMap = () => {
	return (
		<MapContainer className='h-full z-0' center={[38.32217739504656, 23.952204640936014]} zoom={5} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <InvalidateMapSize />
    </MapContainer>
	);
};

export { ActivityMap };