import { useState } from 'react'
import { useMapData } from '@/hooks/api/useMapData'
import { useMapState } from '@/hooks/ui/useMapState'
import { useProcessedRecords } from '@/hooks/ui/useProcessedRecords'
import { PageName, PartnerType, MapItem, TraceItem, ProductPageData } from "@/types"
import { MapContainer, TileLayer, Polygon } from 'react-leaflet'
import { MapStateController } from './MapStateController'
import { MapSizeHandler } from './MapSizeHandler'
import { LocationMarker } from './LocationMarker'
import { TracingLines } from './TracingLines'
import 'leaflet/dist/leaflet.css'

interface ActivityMapProps {
  pageName: PageName
  partnerType: PartnerType
  productId? : string
}

const ActivityMap = ({ pageName, partnerType, productId }: ActivityMapProps) => {

  const [tileError, setTileError] = useState(false);
  const { isPending, error, data} = useMapData({ pageName, productId })
  
  const isProductPage = (responseData: any): responseData is ProductPageData => {
    return responseData && 'locations' in responseData && 'traces' in responseData;
  };

  const records: MapItem[] = isProductPage(data?.data) 
    ? data?.data?.locations ?? [] 
    : data?.data ?? [];

  const traces: TraceItem[] = isProductPage(data?.data) 
    ? data?.data?.traces ?? [] 
    : [];

  console.log('map records:', records)
  console.log('map traces:', traces)
  const [mapState] = useMapState(pageName)

  // const filteredLocations = useProcessedRecords(records, partnerType)

  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

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
        {/* {filteredLocations.length > 0 ?
          filteredLocations.map((record) => (
            <LocationMarker key={record.id} record={record} />
        ))
        : 
          <div className='flex flex-col text-center text-lg md:text-2xl font-semibold px-20 pt-28 md:pt-72'>
            <p>sorry!</p>
            <p>We aren't able to mark our locations right now.</p>
          </div>
        } */}
        {records.length > 0 ?
          records.map((record) => (
            <LocationMarker key={record.id} record={record} />
        ))
        : 
          <div className='flex flex-col text-center text-lg md:text-2xl font-semibold px-20 pt-28 md:pt-72'>
            <p>sorry!</p>
            <p>We aren't able to mark our locations right now.</p>
          </div>
        }
        <TracingLines traces={traces}/>
      </MapContainer>
    </article>
	)
}

export { ActivityMap }