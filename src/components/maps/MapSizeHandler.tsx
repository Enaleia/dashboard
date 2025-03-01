import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

/**
 * MapSizeHandler - Utility component to fix common Leaflet map rendering issues
 * 
 * This component solves a common problem with Leaflet maps where the map doesn't
 * render correctly when initially loaded in a container with non-static dimensions
 * or when the map is initially hidden (such as in tabs, modals, or collapsible sections).
 * 
 * It works by:
 * 1. Accessing the Leaflet map instance using the useMap hook
 * 2. Calling invalidateSize() after a short delay to force the map to recalculate its dimensions
 * 3. Returning null since it doesn't render any visible elements
 * 
 * The short delay ensures the DOM has fully rendered and stabilized before
 * recalculating the map dimensions.
 */
export const MapSizeHandler = () => {
  // Get access to the Leaflet map instance from the parent MapContainer
  const map = useMap()
  
  useEffect(() => {
    // Small delay to ensure the container has fully rendered
    // This is necessary because the map container might not have its final dimensions
    // immediately after mounting, especially in responsive layouts
    const timeout = setTimeout(() => {
      // Tell Leaflet to recalculate the map's size and redraw
      map.invalidateSize()
    }, 100)
    
    // Clean up timeout to prevent memory leaks if component unmounts
    return () => clearTimeout(timeout)
  }, [map])   // Only re-run if the map instance changes
  
  // Component doesn't render anything visible
  return null
}