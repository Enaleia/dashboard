import { useState } from 'react'
import { useMapData } from '@/hooks/api/useMapData'
import { useMapState } from '@/hooks/ui/useMapState'
import { useProcessedRecords } from '@/hooks/ui/useProcessedRecords'
import { PageName, PartnerType, MapItem } from "@/types"
import { MapContainer, TileLayer, Polygon } from 'react-leaflet'
import { MapStateController } from './MapStateController'
import { MapSizeHandler } from './MapSizeHandler'
import { LocationMarker } from './LocationMarker'
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
        {/* for "fishing zone" map view */}
        {/* <Polygon 
          positions={coordinates}
          pathOptions={{
            color: 'blue',
            fillColor: 'blue',
            fillOpacity: 0.2,
          }}
        /> */}
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
      </MapContainer>
    </article>
	)
}

export { ActivityMap }