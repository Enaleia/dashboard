import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
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
  { date: "2022-04-01", plastics: 222, nets: 150, metal: 30, rubber: 400 },
  { date: "2022-04-02", plastics: 447, nets: 180, metal: 40, rubber: 340 },
  { date: "2022-04-03", plastics: 167, nets: 120, metal: 60, rubber: 450 },
  { date: "2022-04-04", plastics: 242, nets: 260, metal: 10, rubber: 300 },
  { date: "2022-04-05", plastics: 373, nets: 290, metal: 30, rubber: 370 },
  { date: "2022-04-06", plastics: 301, nets: 340, metal: 35, rubber: 460 },
  { date: "2022-04-07", plastics: 245, nets: 180, metal: 55, rubber: 300 },
  { date: "2022-04-08", plastics: 409, nets: 320, metal: 70, rubber: 330 },
  { date: "2022-04-09", plastics: 459, nets: 110, metal: 80, rubber: 309 },
  { date: "2022-04-10", plastics: 261, nets: 190, metal: 78, rubber: 400 },
  { date: "2022-04-11", plastics: 327, nets: 350, metal: 35, rubber: 470 },
  { date: "2022-04-12", plastics: 292, nets: 210, metal: 50, rubber: 370 },
  { date: "2022-04-13", plastics: 342, nets: 380, metal: 30, rubber: 400 },
  { date: "2023-04-14", plastics: 437, nets: 220, metal: 30, rubber: 300 },
  { date: "2023-04-15", plastics: 420, nets: 170, metal: 40, rubber: 300 },
  { date: "2023-04-16", plastics: 438, nets: 190, metal: 80, rubber: 300 },
  { date: "2023-04-17", plastics: 446, nets: 360, metal: 65, rubber: 300 },
  { date: "2023-04-18", plastics: 364, nets: 410, metal: 100, rubber: 300 },
  { date: "2023-04-19", plastics: 243, nets: 180, metal: 110, rubber: 300 },
  { date: "2023-04-20", plastics: 489, nets: 150, metal: 50, rubber: 300 },
  { date: "2023-04-21", plastics: 437, nets: 200, metal: 70, rubber: 300 },
  { date: "2023-04-22", plastics: 224, nets: 170, metal: 60, rubber: 300 },
  { date: "2023-04-23", plastics: 438, nets: 230, metal: 100, rubber: 300 },
  { date: "2023-04-24", plastics: 387, nets: 290, metal: 80, rubber: 300 },
  { date: "2023-04-25", plastics: 215, nets: 250, metal: 60, rubber: 300 },
  { date: "2023-04-26", plastics: 745, nets: 130, metal: 90, rubber: 300 },
  { date: "2023-04-27", plastics: 383, nets: 420, metal: 30, rubber: 300 },
  { date: "2023-04-28", plastics: 422, nets: 180, metal: 35, rubber: 300 },
  { date: "2023-04-29", plastics: 315, nets: 240, metal: 45, rubber: 300 },
  { date: "2023-04-30", plastics: 454, nets: 380, metal: 30, rubber: 300 },
  { date: "2023-05-01", plastics: 465, nets: 220, metal: 60, rubber: 300 },
  { date: "2023-05-02", plastics: 293, nets: 310, metal: 70, rubber: 300 },
  { date: "2023-05-03", plastics: 247, nets: 190, metal: 30, rubber: 300 },
  { date: "2023-05-04", plastics: 385, nets: 420, metal: 40, rubber: 300 },
  { date: "2023-05-05", plastics: 481, nets: 390, metal: 90, rubber: 300 },
  { date: "2023-05-06", plastics: 498, nets: 520, metal: 80, rubber: 200 },
  { date: "2023-05-07", plastics: 388, nets: 300, metal: 70, rubber: 300 },
  { date: "2023-05-08", plastics: 449, nets: 210, metal: 90, rubber: 300 },
  { date: "2023-05-09", plastics: 427, nets: 180, metal: 90, rubber: 300 },
  { date: "2023-05-10", plastics: 293, nets: 330, metal: 80, rubber: 200 },
  { date: "2023-05-11", plastics: 335, nets: 270, metal: 70, rubber: 300 },
  { date: "2023-05-12", plastics: 497, nets: 240, metal: 40, rubber: 300 },
  { date: "2023-05-13", plastics: 497, nets: 160, metal: 100, rubber: 200 },
  { date: "2023-05-14", plastics: 448, nets: 490, metal: 90, rubber: 300 },
  { date: "2023-05-15", plastics: 473, nets: 380, metal: 70, rubber: 300 },
  { date: "2023-05-16", plastics: 338, nets: 400, metal: 100, rubber: 300 },
  { date: "2023-05-17", plastics: 499, nets: 420, metal: 40, rubber: 300 },
  { date: "2023-05-18", plastics: 315, nets: 350, metal: 50, rubber: 300 },
  { date: "2023-05-19", plastics: 235, nets: 180, metal: 40, rubber: 300 },
  { date: "2023-05-20", plastics: 477, nets: 230, metal: 30, rubber: 300 },
  { date: "2023-05-21", plastics: 482, nets: 140, metal: 50, rubber: 300 },
  { date: "2024-05-22", plastics: 481, nets: 120, metal: 80, rubber: 400 },
  { date: "2024-05-23", plastics: 252, nets: 290, metal: 300, rubber: 300 },
  { date: "2024-05-24", plastics: 294, nets: 220, metal: 300, rubber: 300 },
  { date: "2024-05-25", plastics: 201, nets: 250, metal: 300, rubber: 300 },
  { date: "2024-05-26", plastics: 213, nets: 170, metal: 300, rubber: 200 },
  { date: "2024-05-27", plastics: 420, nets: 460, metal: 200, rubber: 300 },
  { date: "2024-05-28", plastics: 233, nets: 190, metal: 300, rubber: 300 },
  { date: "2024-05-29", plastics: 478, nets: 130, metal: 300, rubber: 300 },
  { date: "2024-05-30", plastics: 340, nets: 280, metal: 300, rubber: 300 },
  { date: "2024-05-31", plastics: 478, nets: 230, metal: 300, rubber: 400 },
  { date: "2024-06-01", plastics: 478, nets: 200, metal: 300, rubber: 300 },
  { date: "2024-06-02", plastics: 470, nets: 410, metal: 400, rubber: 300 },
  { date: "2024-06-03", plastics: 403, nets: 160, metal: 300, rubber: 300 },
  { date: "2024-06-04", plastics: 439, nets: 380, metal: 300, rubber: 200 },
  { date: "2024-06-05", plastics: 488, nets: 140, metal: 300, rubber: 300 },
  { date: "2024-06-06", plastics: 294, nets: 250, metal: 200, rubber: 300 },
  { date: "2024-06-07", plastics: 323, nets: 370, metal: 300, rubber: 300 },
  { date: "2024-06-08", plastics: 385, nets: 320, metal: 300, rubber: 400 },
  { date: "2024-06-09", plastics: 438, nets: 480, metal: 300, rubber: 300 },
  { date: "2024-06-10", plastics: 455, nets: 200, metal: 400, rubber: 300 },
  { date: "2024-06-11", plastics: 492, nets: 150, metal: 300, rubber: 300 },
  { date: "2024-06-12", plastics: 492, nets: 420, metal: 300, rubber: 300 },
  { date: "2024-06-13", plastics: 481, nets: 130, metal: 300, rubber: 350 },
  { date: "2024-06-14", plastics: 426, nets: 380, metal: 300, rubber: 300 },
  { date: "2024-10-15", plastics: 307, nets: 350, metal: 300, rubber: 300 },
  { date: "2024-10-16", plastics: 371, nets: 310, metal: 200, rubber: 300 },
  { date: "2024-10-17", plastics: 475, nets: 520, metal: 300, rubber: 200 },
  { date: "2024-10-18", plastics: 407, nets: 170, metal: 300, rubber: 300 },
  { date: "2024-10-19", plastics: 341, nets: 290, metal: 100, rubber: 300 },
  { date: "2024-10-20", plastics: 408, nets: 450, metal: 300, rubber: 400 },
  { date: "2024-10-21", plastics: 469, nets: 210, metal: 300, rubber: 300 },
  { date: "2024-10-22", plastics: 317, nets: 270, metal: 300, rubber: 300 },
  { date: "2024-10-23", plastics: 480, nets: 530, metal: 100, rubber: 300 },
  { date: "2024-10-24", plastics: 432, nets: 180, metal: 300, rubber: 300 },
  { date: "2024-10-25", plastics: 441, nets: 190, metal: 300, rubber: 300 },
  { date: "2024-10-26", plastics: 434, nets: 380, metal: 300, rubber: 300 },
  { date: "2024-10-27", plastics: 448, nets: 490, metal: 200, rubber: 200 },
  { date: "2024-10-28", plastics: 449, nets: 200, metal: 300, rubber: 300 },
  { date: "2024-10-29", plastics: 403, nets: 160, metal: 300, rubber: 400 },
  { date: "2024-10-30", plastics: 446, nets: 400, metal: 100, rubber: 300 },
]

const legendData = {
  "plastics": "All types of plastics, from beverage packaging to light weight plastics.",
  "nets": "Used fishing gear and nets, collected from fishers to prevent disposal in the sea.",
  "metal": "All types of metal collected from the ocean. Often these metals can be reused elsewhere.",
  "rubber": "Mainly tires and other rubber material. This category has been recently added to the platform."
}

const CustomChartLegend = () => {
  return (
    <article className="flex flex-col md:flex-row gap-5 p-6 md:px-28">
      {Object.entries(legendData).map(([type, description]) => (
        <div key={type} className="flex flex-row gap-4 w-full md:w-[25%]">
          <div className="w-[24px]">
            <div className={`h-7 w-7 rounded-full bg-${type}`}></div>
          </div>
          <div>
            <h3 className="text-lg font-bold capitalize">{type}</h3>
            <p className="text-xs font-extralight">{description}</p>
          </div>
        </div>
      ))}
    </article>
  )
}

const chartConfig = {
  plastics: {
    label: "Plastics",
    color: "hsl(var(--chart-1))",
  },
  nets: {
    label: "Nets",
    color: "hsl(var(--chart-2))",
  },
  metal: {
    label: "Metal",
    color: "hsl(var(--chart-3))",
  },
  rubber: {
    label: "Rubber",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

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
    <>
      <ScrollArea className="max-w-[350px] md:max-w-[1500px]">
        <Card className="border-none shadow-none"> 
          <CardContent className="md:p-12">   
            <ChartContainer config={chartConfig} className=" w-full min-h-[400px] max-h-[600px]">         
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
                      // formatter={(value) => {
                      //   return [`${value} KG`]
                      // }}
                      indicator="dot"
                      className="rounded-3xl gap-4 text-lg p-4"
                    />
                  } 
                />
                <Area
                  dataKey="plastics"
                  type="natural"
                  fill="var(--color-plastics)"
                  fillOpacity={0.4}
                  stroke="var(--color-plastics)"
                  strokeWidth={3}
                  stackId="d"
                />
                <Area
                  dataKey="nets"
                  type="natural"
                  fill="var(--color-nets)"
                  fillOpacity={0.4}
                  stroke="var(--color-nets)"
                  strokeWidth={3}
                  stackId="c"
                />
                <Area
                  dataKey="metal"
                  type="natural"
                  fill="var(--color-metal)"
                  fillOpacity={0.4}
                  stroke="var(--color-metal)"
                  strokeWidth={3}
                  stackId="b"
                />
                <Area
                  dataKey="rubber"
                  type="natural"
                  fill="var(--color-rubber)"
                  fillOpacity={0.4}
                  stroke="var(--color-rubber)"
                  strokeWidth={3}
                  stackId="a"
                />
                {/* <ChartLegend content={<ChartLegendContent className="gap-16 rounded-full text-base font-semibold py-10"/>} /> */}
              </AreaChart>            
            </ChartContainer>       
          </CardContent>
        </Card>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <CustomChartLegend />
    </>

  )
}
