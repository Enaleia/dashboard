import { Area, AreaChart, CartesianGrid, XAxis, YAxis, LegendProps } from "recharts"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { date: "2022-04-01", plastic: 222, prevention: 150, metal: 30, ghostnet: 300 },
  { date: "2022-04-02", plastic: 97, prevention: 180, metal: 40, ghostnet: 300 },
  { date: "2022-04-03", plastic: 167, prevention: 120, metal: 60, ghostnet: 300 },
  { date: "2022-04-04", plastic: 242, prevention: 260, metal: 10, ghostnet: 300 },
  { date: "2022-04-05", plastic: 373, prevention: 290, metal: 30, ghostnet: 300 },
  { date: "2022-04-06", plastic: 301, prevention: 340, metal: 35, ghostnet: 300 },
  { date: "2022-04-07", plastic: 245, prevention: 180, metal: 55, ghostnet: 300 },
  { date: "2022-04-08", plastic: 409, prevention: 320, metal: 70, ghostnet: 300 },
  { date: "2022-04-09", plastic: 59, prevention: 110, metal: 80, ghostnet: 300 },
  { date: "2022-04-10", plastic: 261, prevention: 190, metal: 78, ghostnet: 300 },
  { date: "2022-04-11", plastic: 327, prevention: 350, metal: 35, ghostnet: 300 },
  { date: "2022-04-12", plastic: 292, prevention: 210, metal: 50, ghostnet: 300 },
  { date: "2022-04-13", plastic: 342, prevention: 380, metal: 30, ghostnet: 300 },
  { date: "2023-04-14", plastic: 137, prevention: 220, metal: 30, ghostnet: 300 },
  { date: "2023-04-15", plastic: 120, prevention: 170, metal: 40, ghostnet: 300 },
  { date: "2023-04-16", plastic: 138, prevention: 190, metal: 80, ghostnet: 300 },
  { date: "2023-04-17", plastic: 446, prevention: 360, metal: 65, ghostnet: 300 },
  { date: "2023-04-18", plastic: 364, prevention: 410, metal: 100, ghostnet: 300 },
  { date: "2023-04-19", plastic: 243, prevention: 180, metal: 110, ghostnet: 300 },
  { date: "2023-04-20", plastic: 89, prevention: 150, metal: 50, ghostnet: 300 },
  { date: "2023-04-21", plastic: 137, prevention: 200, metal: 70, ghostnet: 300 },
  { date: "2023-04-22", plastic: 224, prevention: 170, metal: 60, ghostnet: 300 },
  { date: "2023-04-23", plastic: 138, prevention: 230, metal: 100, ghostnet: 300 },
  { date: "2023-04-24", plastic: 387, prevention: 290, metal: 80, ghostnet: 300 },
  { date: "2023-04-25", plastic: 215, prevention: 250, metal: 60, ghostnet: 300 },
  { date: "2023-04-26", plastic: 75, prevention: 130, metal: 90, ghostnet: 300 },
  { date: "2023-04-27", plastic: 383, prevention: 420, metal: 30, ghostnet: 300 },
  { date: "2023-04-28", plastic: 122, prevention: 180, metal: 35, ghostnet: 300 },
  { date: "2023-04-29", plastic: 315, prevention: 240, metal: 45, ghostnet: 300 },
  { date: "2023-04-30", plastic: 454, prevention: 380, metal: 30, ghostnet: 300 },
  { date: "2023-05-01", plastic: 165, prevention: 220, metal: 60, ghostnet: 300 },
  { date: "2023-05-02", plastic: 293, prevention: 310, metal: 70, ghostnet: 300 },
  { date: "2023-05-03", plastic: 247, prevention: 190, metal: 30, ghostnet: 300 },
  { date: "2023-05-04", plastic: 385, prevention: 420, metal: 40, ghostnet: 300 },
  { date: "2023-05-05", plastic: 481, prevention: 390, metal: 90, ghostnet: 300 },
  { date: "2023-05-06", plastic: 498, prevention: 520, metal: 80, ghostnet: 300 },
  { date: "2023-05-07", plastic: 388, prevention: 300, metal: 70, ghostnet: 300 },
  { date: "2023-05-08", plastic: 149, prevention: 210, metal: 90, ghostnet: 300 },
  { date: "2023-05-09", plastic: 227, prevention: 180, metal: 90, ghostnet: 300 },
  { date: "2023-05-10", plastic: 293, prevention: 330, metal: 80, ghostnet: 300 },
  { date: "2023-05-11", plastic: 335, prevention: 270, metal: 70, ghostnet: 300 },
  { date: "2023-05-12", plastic: 197, prevention: 240, metal: 40, ghostnet: 300 },
  { date: "2023-05-13", plastic: 197, prevention: 160, metal: 100, ghostnet: 300 },
  { date: "2023-05-14", plastic: 448, prevention: 490, metal: 90, ghostnet: 300 },
  { date: "2023-05-15", plastic: 473, prevention: 380, metal: 70, ghostnet: 300 },
  { date: "2023-05-16", plastic: 338, prevention: 400, metal: 100, ghostnet: 300 },
  { date: "2023-05-17", plastic: 499, prevention: 420, metal: 40, ghostnet: 300 },
  { date: "2023-05-18", plastic: 315, prevention: 350, metal: 50, ghostnet: 300 },
  { date: "2023-05-19", plastic: 235, prevention: 180, metal: 40, ghostnet: 300 },
  { date: "2023-05-20", plastic: 177, prevention: 230, metal: 30, ghostnet: 300 },
  { date: "2023-05-21", plastic: 82, prevention: 140, metal: 50, ghostnet: 300 },
  { date: "2024-05-22", plastic: 81, prevention: 120, metal: 80, ghostnet: 300 },
  { date: "2024-05-23", plastic: 252, prevention: 290, metal: 300, ghostnet: 300 },
  { date: "2024-05-24", plastic: 294, prevention: 220, metal: 300, ghostnet: 300 },
  { date: "2024-05-25", plastic: 201, prevention: 250, metal: 300, ghostnet: 300 },
  { date: "2024-05-26", plastic: 213, prevention: 170, metal: 300, ghostnet: 300 },
  { date: "2024-05-27", plastic: 420, prevention: 460, metal: 300, ghostnet: 300 },
  { date: "2024-05-28", plastic: 233, prevention: 190, metal: 300, ghostnet: 300 },
  { date: "2024-05-29", plastic: 78, prevention: 130, metal: 300, ghostnet: 300 },
  { date: "2024-05-30", plastic: 340, prevention: 280, metal: 300, ghostnet: 300 },
  { date: "2024-05-31", plastic: 178, prevention: 230, metal: 300, ghostnet: 300 },
  { date: "2024-06-01", plastic: 178, prevention: 200, metal: 300, ghostnet: 300 },
  { date: "2024-06-02", plastic: 470, prevention: 410, metal: 300, ghostnet: 300 },
  { date: "2024-06-03", plastic: 103, prevention: 160, metal: 300, ghostnet: 300 },
  { date: "2024-06-04", plastic: 439, prevention: 380, metal: 300, ghostnet: 300 },
  { date: "2024-06-05", plastic: 88, prevention: 140, metal: 300, ghostnet: 300 },
  { date: "2024-06-06", plastic: 294, prevention: 250, metal: 300, ghostnet: 300 },
  { date: "2024-06-07", plastic: 323, prevention: 370, metal: 300, ghostnet: 300 },
  { date: "2024-06-08", plastic: 385, prevention: 320, metal: 300, ghostnet: 300 },
  { date: "2024-06-09", plastic: 438, prevention: 480, metal: 300, ghostnet: 300 },
  { date: "2024-06-10", plastic: 155, prevention: 200, metal: 300, ghostnet: 300 },
  { date: "2024-06-11", plastic: 92, prevention: 150, metal: 300, ghostnet: 300 },
  { date: "2024-06-12", plastic: 492, prevention: 420, metal: 300, ghostnet: 300 },
  { date: "2024-06-13", plastic: 81, prevention: 130, metal: 300, ghostnet: 300 },
  { date: "2024-06-14", plastic: 426, prevention: 380, metal: 300, ghostnet: 300 },
  { date: "2024-10-15", plastic: 307, prevention: 350, metal: 300, ghostnet: 300 },
  { date: "2024-10-16", plastic: 371, prevention: 310, metal: 300, ghostnet: 300 },
  { date: "2024-10-17", plastic: 475, prevention: 520, metal: 300, ghostnet: 300 },
  { date: "2024-10-18", plastic: 107, prevention: 170, metal: 300, ghostnet: 300 },
  { date: "2024-10-19", plastic: 341, prevention: 290, metal: 300, ghostnet: 300 },
  { date: "2024-10-20", plastic: 408, prevention: 450, metal: 300, ghostnet: 300 },
  { date: "2024-10-21", plastic: 169, prevention: 210, metal: 300, ghostnet: 300 },
  { date: "2024-10-22", plastic: 317, prevention: 270, metal: 300, ghostnet: 300 },
  { date: "2024-10-23", plastic: 480, prevention: 530, metal: 300, ghostnet: 300 },
  { date: "2024-10-24", plastic: 132, prevention: 180, metal: 300, ghostnet: 300 },
  { date: "2024-10-25", plastic: 141, prevention: 190, metal: 300, ghostnet: 300 },
  { date: "2024-10-26", plastic: 434, prevention: 380, metal: 300, ghostnet: 300 },
  { date: "2024-10-27", plastic: 448, prevention: 490, metal: 300, ghostnet: 300 },
  { date: "2024-10-28", plastic: 149, prevention: 200, metal: 300, ghostnet: 300 },
  { date: "2024-10-29", plastic: 103, prevention: 160, metal: 300, ghostnet: 300 },
  { date: "2024-10-30", plastic: 446, prevention: 400, metal: 300, ghostnet: 300 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  plastic: {
    label: "Plastic",
    color: "hsl(var(--chart-1))",
  },
  prevention: {
    label: "Prevention",
    color: "hsl(var(--chart-2))",
  },
  metal: {
    label: "Metal",
    color: "hsl(var(--chart-3))",
  },
  ghostnet: {
    label: "Ghost net",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

// const CustomLegendItem = ({ payload }: LegendProps) => (
//   <div style={{ display: 'flex', alignItems: 'center' }}>
//     {payload.map((entry) => (
//       <div key={entry.value} style={{ marginRight: 10, display: 'flex', alignItems: 'center' }}>
//         <div
//           style={{
//             width: 12,
//             height: 12,
//             backgroundColor: entry.color,
//             borderRadius: '50%',
//             marginRight: 5,
//           }}
//         />
//         <span>{entry.name}</span>
//       </div>
//     ))}
//   </div>
// });

export function MaterialsChart({ timeRange }: {timeRange: string}) {
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const now = new Date()
    let daysToSubtract = 700
    if (timeRange === "Last 30 days") {
      daysToSubtract = 30
    } else if (timeRange === "Last year") {
      daysToSubtract = 365
    }
    now.setDate(now.getDate() - daysToSubtract)
  return date >= now
  })

  return (
    <Card className="border-none shadow-none"> 
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={4}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={4}
            />
            <ChartTooltip 
              cursor={false} 
              content={
                <ChartTooltipContent 
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })
                  }}
                  indicator="dot"
                />
              } 
            />
            <Area
              dataKey="plastic"
              type="natural"
              fill="var(--color-plastic)"
              fillOpacity={0.4}
              stroke="var(--color-plastic)"
              stackId="d"
            />
            <Area
              dataKey="prevention"
              type="natural"
              fill="var(--color-prevention)"
              fillOpacity={0.4}
              stroke="var(--color-prevention)"
              stackId="c"
            />
            <Area
              dataKey="metal"
              type="natural"
              fill="var(--color-metal)"
              fillOpacity={0.4}
              stroke="var(--color-metal)"
              stackId="b"
            />
            <Area
              dataKey="ghostnet"
              type="natural"
              fill="var(--color-ghostnet)"
              fillOpacity={0.4}
              stroke="var(--color-ghostnet)"
              stackId="a"
            />
            {/* <ChartLegend content={<CustomLegendItem />} /> */}
            <ChartLegend content={<ChartLegendContent className="gap-16 rounded-full text-base font-semibold py-10"/>} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
