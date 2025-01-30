import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

// Helper component to trigger invalidateSize
export const MapSizeHandler = () => {
  const map = useMap()
  
  useEffect(() => {
    // Small delay to ensure the container has fully rendered
    const timeout = setTimeout(() => {
      map.invalidateSize()
    }, 100)
    
    return () => clearTimeout(timeout)
  }, [map])
  
  return null
}