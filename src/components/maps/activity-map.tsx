import { useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { useMapData } from "@/hooks/api/useMapData"
import { useMapState } from '@/hooks/ui/useMapState'
import { useProcessedRecords } from '@/hooks/ui/useProcessedRecords'
import { useMediaQuery } from "@/hooks/ui/useMediaQuery"
import { PageName, PartnerType, MapItem } from "@/types"
import { MapContainer, TileLayer, useMap, Marker, Popup, Polygon } from 'react-leaflet'
import { MapStateController } from './MapStateController'
import { Icon } from "leaflet"
import { MoveRight } from 'lucide-react'
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

interface ActivityMapProps {
  pageName: PageName
  partnerType: PartnerType
}

const ActivityMap = ({ pageName, partnerType }: ActivityMapProps) => {
  // set map zoom according to screen size
  const isDesktop = useMediaQuery("(min-width: 568px)")
  const ZOOM = isDesktop ? 5 : 3
  const MAP_CENTER = [38.621971846028586, 13.204641636096362]

  const { isPending, error, data} = useMapData()
  const records: MapItem[] = data?.data ?? []
  const [mapState] = useMapState(pageName)

  const filteredLocations = useProcessedRecords(records, partnerType)

  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  // for "fishing zone" map view
  // const coordinates: [number, number][] = [
  //   [16.0794933724974, 41.8170077448667],
  //   [16.9175598550158, 34.8587337830427],
  //   [46.2498867431885, 34.5831996108818],
  //   [45.7470468536773, 44.8635965418939],
  //   [16.0794933724974, 41.8170077448667]
  // ];


	return (
    <article className='w-full h-[400px] md:h-[700px] pt-3'>
      <MapContainer 
        className='h-full z-0' 
        center={mapState.center} 
        zoom={mapState.zoom} 
        scrollWheelZoom={false}
        dragging={true}
        doubleClickZoom={true}
        touchZoom={true}
        zoomControl={true}
        keyboard={true}
        attributionControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <InvalidateMapSize />
        <MapStateController  pageName={pageName}/>
        {/* for "fishing zone" map view */}
        {/* <Polygon 
          positions={coordinates}
          pathOptions={{
            color: 'blue',
            fillColor: 'blue',
            fillOpacity: 0.2,
          }}
        /> */}
        {filteredLocations.map((record: MapItem) => {
          const { id, name, country, coordinates, type, wallet_addresses } = record; 
          return coordinates?.length === 2 && (    
            <Marker key={name} position={coordinates as [number, number]} icon={new Icon({
              iconUrl: `/PartnerIcons/${type}.svg`,
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
                  <img src={`PartnerIcons/${type}.svg`} className='h-6 w-6' />
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