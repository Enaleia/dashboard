import { useEffect } from 'react'
import { Polyline, useMap } from 'react-leaflet'
import  L from 'leaflet'
import 'leaflet-arrowheads'
import { TraceItem } from '@/types'
import React from 'react'

/**
 * Creates a curved line between two points using quadratic bezier
 * @param {[number, number]} start - Starting coordinates [latitude, longitude]
 * @param {[number, number]} end - Ending coordinates [latitude, longitude]
 * @returns {Array<[number, number]>} Array of points forming the curved line
 */
const createCurvedPath = (start: [number, number], end: [number, number]): Array<[number, number]> => {
  const points: Array<[number, number]> = []
  const segments = 16 // Number of segments in the curve
  
  // Calculate control point (mid-point with offset)
  const midX = (start[0] + end[0]) / 2
  const midY = (start[1] + end[1]) / 2
  const offset = 0.15 // Curve offset factor
  const dx = end[0] - start[0]
  const dy = end[1] - start[1]
  const controlPoint: [number, number] = [
    midX - dy * offset,
    midY + dx * offset
  ]

  // Generate curve points
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const x = Math.pow(1-t, 2) * start[0] + 
              2 * (1-t) * t * controlPoint[0] + 
              Math.pow(t, 2) * end[0]
    const y = Math.pow(1-t, 2) * start[1] + 
              2 * (1-t) * t * controlPoint[1] + 
              Math.pow(t, 2) * end[1]
    points.push([x, y])
  }

  return points
}

/**
 * Calculate number of arrows to display based on line distance
 * 
 * Determines the appropriate number of directional arrows to show along a trace line
 * based on the distance between the start and end points. This ensures visual balance
 * with more arrows on longer lines and fewer on shorter ones.
 * 
 * @param {[number, number]} start - Starting coordinates [latitude, longitude]
 * @param {[number, number]} end - Ending coordinates [latitude, longitude]
 * @returns {number} The number of arrows to display along the line
 */
const getArrowFrequency = (start: [number, number], end: [number, number]): number => {
  // Create Leaflet latLng objects for distance calculation
  const startPoint = L.latLng(start[0], start[1])
  const endPoint = L.latLng(end[0], end[1])
  // Calculate distance in kilometers
  const distanceInKm = startPoint.distanceTo(endPoint) / 1000

  // Scale arrow frequency based on distance thresholds with increased values
  if (distanceInKm < 100) return 2      // Short distance: 5 arrows
  if (distanceInKm < 300) return 3      // Medium distance: 6 arrows
  if (distanceInKm < 2000) return 6     // Long distance: 7 arrows
  return 8                              // Very long distance: 8 arrows
}

/**
 * Interface for the TracingLines component props
 * @property {TraceItem[]} traces - Array of trace data connecting points on the map
 */
interface TracingLinesProps {
  traces: TraceItem[]
}

/**
 * TracingLines - Component that renders supply chain connections on the map
 * 
 * Creates dashed lines with directional arrows between points on a map to visualize
 * the movement of materials or products through the supply chain. Used primarily
 * on the product detail page to show the journey of materials.
 * 
 * Features:
 * - Dashed lines for visual distinction from borders and other map elements
 * - Directional arrows showing the flow direction (source to destination)
 * - Dynamic arrow frequency based on distance (more arrows on longer lines)
 * - Workaround for an initial render issue with the leaflet-arrowheads plugin
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

  return traces.map((trace, index) => {
    const curvedPath = createCurvedPath(
      [trace.startLat, trace.startLng],
      [trace.endLat, trace.endLng]
    )
    
    // Generate a unique key based on coordinates and index for stability
    const traceKey = `trace-${trace.startLat}-${trace.startLng}-${trace.endLat}-${trace.endLng}-${index}`;

    return (
      // Add key to the React Fragment
      <React.Fragment key={traceKey}>
        {/* Background line */}
        <Polyline
          key={`bg-${traceKey}`}
          positions={curvedPath}
          color="#2985D0"
          weight={5}
          opacity={0.2}
        />
        {/* Animated dashed line */}
        <Polyline
          key={`line-${traceKey}`}
          positions={curvedPath}
          color="black"
          weight={1}
          dashArray="4,6"
          opacity={0.7}
          eventHandlers={{
            add: (e) => {
              // Add animation to the path element
              const path = e.target.getElement();
              if (path) {
                // Set up the animation properties
                path.style.strokeDasharray = '4, 6';
                path.style.strokeDashoffset = '40';
                path.style.animation = 'dash 1.5s linear infinite';
                // Add the keyframes if they don't exist
                if (!document.getElementById('dash-keyframe')) {
                  const style = document.createElement('style');
                  style.id = 'dash-keyframe';
                  style.textContent = `
                    @keyframes dash {
                      to {
                        stroke-dashoffset: 0;
                      }
                    }
                  `;
                  document.head.appendChild(style);
                }
              }
            }
          }}
        />
      </React.Fragment>
    )
  })
}