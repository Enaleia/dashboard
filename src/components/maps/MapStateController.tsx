import { useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import debounce from 'lodash.debounce'
import { useMapState } from '@/hooks/ui/useMapState'
import { PageName } from '@/types'

/**
 * Interface for the MapStateController component props
 * @property {PageName} pageName - The current page type, used to determine which state to manage
 */
interface MapStateControllerProps {
  pageName: PageName
}

/**
 * MapStateController - Component for persisting and restoring map view state
 * 
 * This utility component manages the map's view state (center position and zoom level)
 * across different pages, allowing users to return to the same map view when navigating
 * back to a page with a map.
 * 
 * Key features:
 * 1. Initializes the map view from stored state on first mount
 * 2. Tracks map movements and zoom changes
 * 3. Persists the view state when the map is manipulated
 * 4. Uses debouncing to prevent excessive state updates
 * 5. Maintains separate view states for different page types
 * 
 * This creates a seamless user experience by remembering map positions
 * as users navigate through the application.
 */
export const MapStateController = ({ pageName }: MapStateControllerProps) => {
  // Get access to the Leaflet map instance
  const map = useMap()
  // Get the stored map state and setter for the current page
  const [mapState, setMapState] = useMapState(pageName)
  // Ref to track whether this is the initial mounting of the component
  const isInitialMount = useRef(true)

  // Effect to set the initial map view from stored state on first mount
  useEffect(() => {
    if (isInitialMount.current && mapState) {
      // Set the map view without animation on initial mount
      map.setView(mapState.center, mapState.zoom, { animate: false })
      // Mark initial mounting as complete
      isInitialMount.current = false
    }
  }, [map, mapState])

  // Effect to track map movements and save state changes
  useEffect(() => {
    // Debounce the state update to prevent too frequent updates during panning/zooming
    const saveState = debounce(() => {
      const center = map.getCenter()
      const zoom = map.getZoom()
      
      // Save the current view state
      setMapState({
        center: [center.lat, center.lng],
        zoom: zoom
      })
    }, 100) // Wait 100ms after movement stops before saving state

    // Event handler for map movement and zoom events
    const handleMapEvent = () => {
      // Only save state if it's not the initial mount (to avoid overwriting initial state)
      if (!isInitialMount.current) {
        saveState()
      }
    }
    // Register event listeners for map movement and zoom
    map.on('moveend', handleMapEvent)
    map.on('zoomend', handleMapEvent)

    // Ensure dragging is enabled
    map.dragging.enable()

    // Cleanup function to remove event listeners and cancel pending operations
    return () => {
      map.off('moveend', handleMapEvent)
      map.off('zoomend', handleMapEvent)
      saveState.cancel() // Cancel any pending debounced calls
    }
  }, [map, setMapState])

  // Component doesn't render anything visible
  return null
}