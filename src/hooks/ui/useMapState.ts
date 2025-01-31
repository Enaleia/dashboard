import { useEffect, useRef } from 'react'
import { atom, useAtom } from 'jotai'
import { LatLngTuple } from 'leaflet'
import { useMediaQuery } from './useMediaQuery'
import { MAP_CONSTANTS } from '@/config/constants'
import { PageName } from '@/types'

interface MapState {
  center: LatLngTuple
  zoom: number | null
}

// Create base atoms with default values
const homePageMapStateAtom = atom<MapState>({
  center: MAP_CONSTANTS.DEFAULT_CENTER,
  zoom: null
})
const LocationsPageMapStateAtom = atom<MapState>({
  center: MAP_CONSTANTS.DEFAULT_CENTER,
  zoom: null
})


export const useMapState = (pageName: PageName) => {
  // Initialize state based on window width
  const isDesktop = useMediaQuery(MAP_CONSTANTS.DESKTOP_BREAKPOINT)
  const initialRenderRef = useRef(true)

  const [homePageState, setHomePageState] = useAtom(homePageMapStateAtom)
  const [locationsPageState, setLocationsPageState] = useAtom(LocationsPageMapStateAtom)

  const currentState = pageName === 'Home' ? homePageState : locationsPageState
  const setState = pageName === 'Home' ? setHomePageState : setLocationsPageState

  // Set initial zoom only once
  useEffect(() => {
    if (!initialRenderRef.current) return

    // Only set default zoom if current zoom is null
    if (currentState.zoom === null) {
      const defaultZoom = isDesktop ? 
        MAP_CONSTANTS.ZOOM_LEVELS.DESKTOP : 
        MAP_CONSTANTS.ZOOM_LEVELS.MOBILE
      
      // console.log('Setting initial zoom:', {
      //   isDesktop,
      //   defaultZoom,
      //   currentZoom: currentState.zoom
      // })

      setState(prev => ({
        ...prev,
        zoom: defaultZoom
      }))
    }
    
    initialRenderRef.current = false
  }, [])


  // Ensure we always have a zoom value
  const finalState = {
    ...currentState,
    zoom: currentState.zoom ?? (isDesktop ? 
      MAP_CONSTANTS.ZOOM_LEVELS.DESKTOP : 
      MAP_CONSTANTS.ZOOM_LEVELS.MOBILE
    )
  }

  return [finalState, setState] as const
}