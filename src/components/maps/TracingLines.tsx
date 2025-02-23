import { useEffect } from 'react'
import { Polyline, useMap } from 'react-leaflet'
import  L from 'leaflet'
import 'leaflet-arrowheads'
import { TraceItem } from '@/types'

/**
* Calculate number of arrows to display based on line distance
* Returns more arrows for longer distances to maintain visual balance
*/
const getArrowFrequency = (start: [number, number], end: [number, number]): number => {
  const startPoint = L.latLng(start[0], start[1])
  const endPoint = L.latLng(end[0], end[1])
  const distanceInKm = startPoint.distanceTo(endPoint) / 1000

  // Scale arrow frequency based on distance thresholds
  if (distanceInKm < 100) return 2      // Short distance: 2 arrows
  if (distanceInKm < 300) return 3      // Medium distance: 3 arrows
  if (distanceInKm < 2000) return 4     // Long distance: 4 arrows
  return 5                              // Very long distance: 5 arrows
}

interface TracingLinesProps {
  traces: TraceItem[]
}
/**
* Component that renders dashed lines with directional arrows between points on a map
* Each line represents a transfer of materials involved in the creation of a product
*/
export const TracingLines = ({ traces }: TracingLinesProps ) => {
  const map = useMap()

  // Force initial render of arrows with a micro zoom adjustment
  // This is a workaround for leaflet-arrowheads not rendering on initial load
  useEffect(() => {
    const currentZoom = map.getZoom()
    setTimeout(() => {
      // Trigger minimal zoom change to force arrow rendering
      map.setZoom(currentZoom + 0.0001)
      setTimeout(() => {
        // Reset to original zoom level
        map.setZoom(currentZoom)
      }, 50)
    }, 100)
  }, [map])

  return traces.map((trace, index) => (
    <Polyline
      key={`line-${index}`}
      positions={[
        [trace.startLat, trace.startLng],
        [trace.endLat, trace.endLng]
      ]}
      color="black"
      weight={1}
      dashArray="5,10"
      eventHandlers={{
        add: (e) => {
          // Calculate and apply arrows when line is added to map
          const frequency = getArrowFrequency(
            [trace.startLat, trace.startLng],
            [trace.endLat, trace.endLng]
          )

          e.target.arrowheads({
            size: '10px',           // Size of arrowhead
            frequency: frequency,   // Number of arrows along line
            fill: true,             // Solid arrowhead fill
            yawn: 45,               // Angle of arrowhead
            thickness: 1,           // Weight of arrowhead lines
          })
        }
      }}
    />
  ))
}