import { useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import debounce from 'lodash.debounce'
import { useMapState } from '@/hooks/ui/useMapState'
import { PageName } from '@/types'

interface MapStateControllerProps {
  pageName: PageName
}

export const MapStateController = ({ pageName }: MapStateControllerProps) => {
  const map = useMap()
  const [mapState, setMapState] = useMapState(pageName)
  const isInitialMount = useRef(true)

  // Only set initial view on first mount
  useEffect(() => {
    if (isInitialMount.current && mapState) {
      map.setView(mapState.center, mapState.zoom, { animate: false })
      isInitialMount.current = false
    }
  }, [map, mapState])

  useEffect(() => {
    // Debounce the state update to prevent too frequent updates
    const saveState = debounce(() => {
      const center = map.getCenter()
      const zoom = map.getZoom()
      
      setMapState({
        center: [center.lat, center.lng],
        zoom: zoom
      })
    }, 100) // Wait 100ms after movement stops before saving state

    // Handle map movement events
    const handleMapEvent = () => {
      // Only save state if it's not the initial mount
      if (!isInitialMount.current) {
        saveState()
      }
    }

    map.on('moveend', handleMapEvent)
    map.on('zoomend', handleMapEvent)

    // Ensure dragging is enabled
    map.dragging.enable()

    return () => {
      map.off('moveend', handleMapEvent)
      map.off('zoomend', handleMapEvent)
      saveState.cancel() // Cancel any pending debounced calls
    }
  }, [map, setMapState])

  return null
}