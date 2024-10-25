import { ResponsiveLine, Serie } from '@nivo/line'

interface AreaChartProps {
  data: Serie[]
}

const AreaChart = ({ data }: AreaChartProps) => {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      enableGridX={false}
      enableArea
      // areaBaselineValue={-20}
      areaOpacity={0.15}
      animate={true}
      motionConfig="wobbly"
    
      xScale={{ type: 'point' }}
      colors={{ scheme: 'paired' }}
      curve="catmullRom"
      lineWidth={3}
      pointSize={8}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      enableTouchCrosshair={true}
      useMesh={true}
      enableSlices="x"
      axisBottom={{
        tickSize: 0,
        tickPadding: 15,
        tickRotation: 0,
        legend: 'year',
        legendOffset: 40,
        legendPosition: 'middle',
        truncateTickAt: 0
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 15,
        tickRotation: 0,
        legend: 'amount',
        legendOffset: -50,
        legendPosition: 'middle',
        truncateTickAt: 0
      }}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    />
  )
}

export { AreaChart };