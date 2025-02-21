import { useState } from 'react'
import { useMapData } from '@/hooks/api/useMapData'
import { useMapState } from '@/hooks/ui/useMapState'
import { useProcessedRecords } from '@/hooks/ui/useProcessedRecords'
import { PageName, PartnerType, MapItem } from "@/types"
import { MapContainer, TileLayer, Polygon } from 'react-leaflet'
import { MapStateController } from './MapStateController'
import { MapSizeHandler } from './MapSizeHandler'
import { LocationMarker } from './LocationMarker'
import { TracingLines } from './TracingLines'
import 'leaflet/dist/leaflet.css'

interface ActivityMapProps {
  pageName: PageName
  partnerType: PartnerType
}

const ActivityMap = ({ pageName, partnerType }: ActivityMapProps) => {

  const [tileError, setTileError] = useState(false);
  const { isPending, error, data} = useMapData()
  const records: MapItem[] = data?.data ?? []
  const [mapState] = useMapState(pageName)

  const filteredLocations = useProcessedRecords(records, partnerType)

  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  const tracingCoords = [
    {startLat: 40.459179, startLng: 22.860999, endLat:37.935 , endLng: 21.145},
    {startLat: 37.956992, startLng: 23.6137, endLat:37.935 , endLng: 21.145},
    {startLat: 37.935, startLng: 21.145, endLat: 41.3263, endLng: -8.7166},
  ]

	return (
    <article className='w-full h-[400px] md:h-[500px] lg:h-[700px] pt-3'>
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
          eventHandlers={{
            tileerror: () => {
              setTileError(true);
              console.error('Failed to load map tiles');
            }
          }}
        />
        {tileError && (
          <div className="absolute bottom-4 left-4 bg-red-50 text-red-600 px-4 py-2 rounded-md shadow-sm z-[1000]">
            Failed to load map tiles. Map functionality may be limited.
          </div>
        )}
        <MapSizeHandler />
        <MapStateController  pageName={pageName}/>
        {filteredLocations.length > 0 ?
          filteredLocations.map((record) => (
            <LocationMarker key={record.id} record={record} />
        ))
        : 
          <div className='flex flex-col text-center text-lg md:text-2xl font-semibold px-20 pt-28 md:pt-72'>
            <p>sorry!</p>
            <p>We aren't able to mark our locations right now.</p>
          </div>
        }
        <TracingLines traces={tracingCoords}/>
      </MapContainer>
    </article>
	)
}

export { ActivityMap }