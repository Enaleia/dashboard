import { useState } from 'react'
import { useMapData } from '@/hooks/api/useMapData'
import { useMapState } from '@/hooks/ui/useMapState'
import { useProcessedRecords } from '@/hooks/ui/useProcessedRecords'
import { MapStateController } from '@/components/maps/MapStateController'
import { MapSizeHandler } from '@/components/maps/MapSizeHandler'
import { LocationMarker } from '@/components/maps/LocationMarker'
import { TracingLines } from '@/components/maps/TracingLines'
import { PageName, PartnerType, MapItem, TraceItem, ProductPageData } from "@/types"
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

/**
 * Interface for the ActivityMap component props
 * @property {PageName} pageName - Determines which data to fetch and display
 * @property {PartnerType} [partnerType] - Optional filter for location types on the Locations page
 * @property {string} [productId] - Required for Product page to fetch specific product data
 */
interface ActivityMapProps {
  pageName: PageName              
  partnerType?: PartnerType      
  productId? : string             
}

/**
 * ActivityMap - Interactive map component for visualizing location data
 * 
 * Uses Leaflet/React-Leaflet to render an OpenStreetMap-based visualization of:
 * - Partner locations as map markers
 * - Supply chain connections as trace lines (for product pages)
 * 
 * The component adapts its data and appearance based on the page context,
 * fetching different data sets and applying appropriate styling.
 */
const ActivityMap = ({ pageName, partnerType, productId }: ActivityMapProps) => {
  // Track tile loading errors for error handling UI
  const [tileError, setTileError] = useState(false)
  // Fetch map data based on current page context and product ID
  const { isPending, error, data} = useMapData({ pageName, productId })
  
  /**
   * Type guard to differentiate between Product page data structure and other pages' data structures
   * Product pages have a nested structure with both locations and traces
   */
  const isProductPage = (responseData: any): responseData is ProductPageData => {
    return responseData && 'locations' in responseData && 'traces' in responseData;
  }

  // Extract and normalize location data based on page type
  const records: MapItem[] = isProductPage(data?.data) 
    ? data?.data?.locations ?? [] 
    : data?.data ?? []

  // Extract trace data for Product page, empty array for other pages
  const traces: TraceItem[] = isProductPage(data?.data) 
    ? data?.data?.traces ?? [] 
    : []
  console.log('map records:', records)
  console.log('map traces:', traces)

  // Get map configuration (center, zoom) based on page type
  const [mapState] = useMapState(pageName)

  // Apply location filtering only when partnerType is provided (Locations page)
  const displayedLocations = partnerType
    ? useProcessedRecords(records, partnerType)
    : records

  // Display loading/error states with appropriate messages
  if (isPending || error) {
    return (
      <article className='w-full h-[400px] md:h-[500px] lg:h-[700px] pt-3 text-center'>
        <>
        {isPending && <p>Loading map...</p>}
        {error && <p>An error has occurred: {error.message}</p>}
        </>
      </article>
    )
  }

	return (
    // Map container with responsive height and conditional styling based on page type
    <article className={`w-full h-[400px] md:h-[500px] lg:h-[700px] ${pageName==='Home' ? 'pt-3': 'overflow-hidden rounded-3xl'}`}>
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
        {/* OpenStreetMap tile layer with error handling */}
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
        {/* Utility components for map resizing and state management */}
        <MapSizeHandler />
        <MapStateController  pageName={pageName}/>
        {/* Render location markers or empty state message if no locations available*/}
        {displayedLocations.length ?
          displayedLocations.map((record) => (
            <LocationMarker key={record.id} record={record} />
        ))
        : 
          <div className='flex flex-col text-center text-lg md:text-2xl font-semibold px-20 pt-28 md:pt-72'>
            <p>sorry!</p>
            <p>We aren't able to mark our locations right now.</p>
          </div>
        }
        {/* Render trace lines (only visible on Product page) */}
        <TracingLines traces={traces}/>
      </MapContainer>
    </article>
	)
}

export { ActivityMap }