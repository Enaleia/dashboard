import { atom, useAtom } from 'jotai'
import { LatLngTuple } from 'leaflet'
import { PageName } from '@/types'

interface MapState {
  center: LatLngTuple
  zoom: number
}

const homePageMapStateAtom = atom<MapState>({
  center: [38.621971846028586, 13.204641636096362],
  zoom: 5
})

const LocationsPageMapStateAtom = atom<MapState>({
  center: [38.621971846028586, 13.204641636096362],
  zoom: 5
})

export const useMapState = (pageName: PageName) => {
  const [homePageState, setHomePageState] = useAtom(homePageMapStateAtom)
  const [locationsPageState, setLocationsPageState] = useAtom(LocationsPageMapStateAtom)

  if (pageName === 'Home') {
    return [homePageState, setHomePageState] as const
  }
  return [locationsPageState, setLocationsPageState] as const
}