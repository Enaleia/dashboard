import { Polyline } from 'react-leaflet'
import 'leaflet-arrowheads'

interface Trace {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
}

export const TracingLines = ({ traces }: { traces:Trace[] }) => {
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
          e.target.arrowheads({
            size: '20px',
            frequency: '5',
            fill: true,
            yawn: 45,
            thickness: 1, 
            stemLength: 5, 
            proportionalToTotal: false
          })
        }
      }}
    />
  ))
}