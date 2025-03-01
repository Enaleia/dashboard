import { useEffect, useRef } from 'react'
import { atom, useAtom } from 'jotai'
import { LatLngTuple } from 'leaflet'
import { useMediaQuery } from './useMediaQuery'
import { MAP_CONSTANTS, DESKTOP_BREAKPOINT } from '@/config/constants'
import { PageName } from '@/types'

/**
 * Interface for map state properties
 * @property {LatLngTuple} center - Current center coordinates of the map [lat, lng]
 * @property {number|null} zoom - Current zoom level or null if not yet initialized
 */
interface MapState {
  center: LatLngTuple
  zoom: number | null
}

/**
 * Jotai atoms for persisting map state across component unmounts/remounts
 * Each page has its own atom to maintain separate map states
 */
// Home page map state atom
const homePageMapStateAtom = atom<MapState>({
  center: MAP_CONSTANTS.DEFAULT_CENTER,
  zoom: null
})
// Locations page map state atom
const locationsPageMapStateAtom = atom<MapState>({
  center: MAP_CONSTANTS.DEFAULT_CENTER,
  zoom: null
})
// Product page map state atom
const productPageMapStateAtom = atom<MapState>({
  center: MAP_CONSTANTS.DEFAULT_CENTER,
  zoom: null
})


/**
 * useMapState - Custom hook for managing map state across different pages
 * 
 * This hook provides persistent map state (center position and zoom level) for
 * each page that contains a map. It uses Jotai atoms to persist state across 
 * component unmounts/remounts and handles responsive adjustments based on screen size.
 * 
 * Key features:
 * - Separate map state for each page type (Home, Locations, Product)
 * - Responsive zoom levels based on desktop vs mobile viewport
 * - Initialization logic that runs only once
 * - Fallback zoom level if state is not yet initialized
 * 
 * @param {PageName} pageName - Current page name to determine which state atom to use
 * @returns {[MapState, Function]} - Current map state and setter function as tuple
 */
export const useMapState = (pageName: PageName) => {
  // Check if current viewport is desktop size for responsive adjustments
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT)
  // Track initial render to only set default zoom once
  const initialRenderRef = useRef(true)

  // Get state and setter for each page type
  const [homePageState, setHomePageState] = useAtom(homePageMapStateAtom)
  const [locationsPageState, setLocationsPageState] = useAtom(locationsPageMapStateAtom)
  const [productPageState, setProductPageState] = useAtom(productPageMapStateAtom)

  // Select the appropriate state based on current page
  const currentState = 
    pageName === 'Home' ? homePageState : 
    pageName === 'Locations' ? locationsPageState :
    productPageState

  // Select the appropriate state setter based on current page
  const setState = 
    pageName === 'Home' ? setHomePageState : 
    pageName === 'Locations' ? setLocationsPageState :
    setProductPageState

  // Initialize zoom level on first render if not already set
  useEffect(() => {
    // Skip if not the initial render
    if (!initialRenderRef.current) return

    // Only set default zoom if current zoom is null (not yet initialized)
    if (currentState.zoom === null) {
      const defaultZoom = isDesktop ? 
        MAP_CONSTANTS.ZOOM_LEVELS.DESKTOP : 
        MAP_CONSTANTS.ZOOM_LEVELS.MOBILE

      setState(prev => ({
        ...prev,
        zoom: defaultZoom
      }))
    }
    
    // Mark initial render as complete
    initialRenderRef.current = false
  }, [])


  // Create final state object with fallback zoom value if zoom is null
  const finalState = {
    ...currentState,
    zoom: currentState.zoom ?? (isDesktop ? 
      MAP_CONSTANTS.ZOOM_LEVELS.DESKTOP : 
      MAP_CONSTANTS.ZOOM_LEVELS.MOBILE
    )
  }

  // Return state and setter as a tuple with const assertion for type safety
  return [finalState, setState] as const
}