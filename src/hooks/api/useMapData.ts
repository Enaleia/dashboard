import { useQuery } from "@tanstack/react-query"
import { MAP_ENDPOINT } from "@/config/constants"

export function useMapData() {
  return useQuery({
    queryKey: ['mapData'],
    queryFn: async () => {
      const response = await fetch(
        `https://hq.enaleia-hub.com/flows/trigger/${MAP_ENDPOINT}`
      )
      return response.json()
    },
  })
}