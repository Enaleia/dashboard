import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const materialsData = [
  { date: "2022-04-01", plastics: 222, nets: 150, metal: 130, rubber: 400 },
  { date: "2022-04-02", plastics: 447, nets: 180, metal: 140, rubber: 340 },
  { date: "2022-04-03", plastics: 167, nets: 120, metal: 160, rubber: 450 },
  { date: "2022-04-04", plastics: 242, nets: 260, metal: 110, rubber: 300 },
  { date: "2022-04-05", plastics: 373, nets: 290, metal: 130, rubber: 370 },
  { date: "2022-04-06", plastics: 301, nets: 340, metal: 135, rubber: 460 },
  { date: "2022-04-07", plastics: 245, nets: 180, metal: 155, rubber: 300 },
  { date: "2022-04-08", plastics: 409, nets: 320, metal: 170, rubber: 330 },
  { date: "2022-04-09", plastics: 459, nets: 110, metal: 180, rubber: 309 },
  { date: "2022-04-10", plastics: 261, nets: 190, metal: 178, rubber: 400 },
  { date: "2022-04-11", plastics: 327, nets: 350, metal: 135, rubber: 470 },
  { date: "2022-04-12", plastics: 292, nets: 210, metal: 150, rubber: 370 },
  { date: "2022-04-13", plastics: 342, nets: 380, metal: 130, rubber: 400 },
  { date: "2023-04-14", plastics: 437, nets: 220, metal: 130, rubber: 300 },
  { date: "2023-04-15", plastics: 420, nets: 170, metal: 140, rubber: 300 },
  { date: "2023-04-16", plastics: 438, nets: 190, metal: 180, rubber: 300 },
  { date: "2023-04-17", plastics: 446, nets: 360, metal: 165, rubber: 300 },
  { date: "2023-04-18", plastics: 364, nets: 410, metal: 100, rubber: 300 },
  { date: "2023-04-19", plastics: 243, nets: 180, metal: 110, rubber: 300 },
  { date: "2023-04-20", plastics: 489, nets: 150, metal: 150, rubber: 300 },
  { date: "2023-04-21", plastics: 437, nets: 200, metal: 170, rubber: 300 },
  { date: "2023-04-22", plastics: 224, nets: 170, metal: 160, rubber: 300 },
  { date: "2023-04-23", plastics: 438, nets: 230, metal: 100, rubber: 300 },
  { date: "2023-04-24", plastics: 387, nets: 290, metal: 180, rubber: 300 },
  { date: "2023-04-25", plastics: 215, nets: 250, metal: 160, rubber: 300 },
  { date: "2023-04-26", plastics: 545, nets: 130, metal: 190, rubber: 300 },
  { date: "2023-04-27", plastics: 383, nets: 420, metal: 130, rubber: 300 },
  { date: "2023-04-28", plastics: 422, nets: 180, metal: 135, rubber: 300 },
  { date: "2023-04-29", plastics: 315, nets: 240, metal: 145, rubber: 300 },
  { date: "2023-04-30", plastics: 454, nets: 380, metal: 130, rubber: 300 },
  { date: "2023-05-01", plastics: 465, nets: 220, metal: 160, rubber: 300 },
  { date: "2023-05-02", plastics: 293, nets: 310, metal: 170, rubber: 300 },
  { date: "2023-05-03", plastics: 247, nets: 190, metal: 130, rubber: 300 },
  { date: "2023-05-04", plastics: 385, nets: 420, metal: 140, rubber: 300 },
  { date: "2023-05-05", plastics: 481, nets: 390, metal: 190, rubber: 300 },
  { date: "2023-05-06", plastics: 498, nets: 520, metal: 180, rubber: 200 },
  { date: "2023-05-07", plastics: 388, nets: 300, metal: 170, rubber: 300 },
  { date: "2023-05-08", plastics: 449, nets: 210, metal: 190, rubber: 300 },
  { date: "2023-05-09", plastics: 427, nets: 180, metal: 190, rubber: 300 },
  { date: "2023-05-10", plastics: 293, nets: 330, metal: 180, rubber: 200 },
  { date: "2023-05-11", plastics: 335, nets: 270, metal: 170, rubber: 300 },
  { date: "2023-05-12", plastics: 497, nets: 240, metal: 140, rubber: 300 },
  { date: "2023-05-13", plastics: 497, nets: 160, metal: 100, rubber: 200 },
  { date: "2023-05-14", plastics: 448, nets: 490, metal: 190, rubber: 300 },
  { date: "2023-05-15", plastics: 473, nets: 380, metal: 170, rubber: 300 },
  { date: "2023-05-16", plastics: 338, nets: 400, metal: 100, rubber: 300 },
  { date: "2023-05-17", plastics: 499, nets: 420, metal: 140, rubber: 300 },
  { date: "2023-05-18", plastics: 315, nets: 350, metal: 150, rubber: 300 },
  { date: "2023-05-19", plastics: 235, nets: 180, metal: 140, rubber: 300 },
  { date: "2023-05-20", plastics: 477, nets: 230, metal: 130, rubber: 300 },
  { date: "2023-05-21", plastics: 482, nets: 140, metal: 150, rubber: 300 },
  { date: "2024-05-22", plastics: 481, nets: 120, metal: 180, rubber: 400 },
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

const activitiesData = [
  { date: "2022-04-01", litter: 222, adhoc: 150, beach: 130, prevention: 400 },
  { date: "2022-04-02", litter: 447, adhoc: 180, beach: 140, prevention: 340 },
  { date: "2022-04-03", litter: 167, adhoc: 120, beach: 160, prevention: 450 },
  { date: "2022-04-04", litter: 242, adhoc: 260, beach: 110, prevention: 300 },
  { date: "2022-04-05", litter: 373, adhoc: 290, beach: 130, prevention: 370 },
  { date: "2022-04-06", litter: 301, adhoc: 340, beach: 135, prevention: 460 },
  { date: "2022-04-07", litter: 245, adhoc: 180, beach: 155, prevention: 300 },
  { date: "2022-04-08", litter: 409, adhoc: 320, beach: 170, prevention: 330 },
  { date: "2022-04-09", litter: 459, adhoc: 110, beach: 180, prevention: 309 },
  { date: "2022-04-10", litter: 261, adhoc: 190, beach: 178, prevention: 400 },
  { date: "2022-04-11", litter: 327, adhoc: 350, beach: 135, prevention: 470 },
  { date: "2022-04-12", litter: 292, adhoc: 210, beach: 150, prevention: 370 },
  { date: "2022-04-13", litter: 342, adhoc: 380, beach: 130, prevention: 400 },
  { date: "2023-04-14", litter: 437, adhoc: 220, beach: 130, prevention: 300 },
  { date: "2023-04-15", litter: 420, adhoc: 170, beach: 140, prevention: 300 },
  { date: "2023-04-16", litter: 438, adhoc: 190, beach: 180, prevention: 300 },
  { date: "2023-04-17", litter: 446, adhoc: 360, beach: 165, prevention: 300 },
  { date: "2023-04-18", litter: 364, adhoc: 410, beach: 100, prevention: 300 },
  { date: "2023-04-19", litter: 243, adhoc: 180, beach: 110, prevention: 300 },
  { date: "2023-04-20", litter: 489, adhoc: 150, beach: 150, prevention: 300 },
  { date: "2023-04-21", litter: 437, adhoc: 200, beach: 170, prevention: 300 },
  { date: "2023-04-22", litter: 224, adhoc: 170, beach: 160, prevention: 300 },
  { date: "2023-04-23", litter: 438, adhoc: 230, beach: 100, prevention: 300 },
  { date: "2023-04-24", litter: 387, adhoc: 290, beach: 180, prevention: 300 },
  { date: "2023-04-25", litter: 215, adhoc: 250, beach: 160, prevention: 300 },
  { date: "2023-04-26", litter: 545, adhoc: 130, beach: 190, prevention: 300 },
  { date: "2023-04-27", litter: 383, adhoc: 420, beach: 130, prevention: 300 },
  { date: "2023-04-28", litter: 422, adhoc: 180, beach: 135, prevention: 300 },
  { date: "2023-04-29", litter: 315, adhoc: 240, beach: 145, prevention: 300 },
  { date: "2023-04-30", litter: 454, adhoc: 380, beach: 130, prevention: 300 },
  { date: "2023-05-01", litter: 465, adhoc: 220, beach: 160, prevention: 300 },
  { date: "2023-05-02", litter: 293, adhoc: 310, beach: 170, prevention: 300 },
  { date: "2023-05-03", litter: 247, adhoc: 190, beach: 130, prevention: 300 },
  { date: "2023-05-04", litter: 385, adhoc: 420, beach: 140, prevention: 300 },
  { date: "2023-05-05", litter: 481, adhoc: 390, beach: 190, prevention: 300 },
  { date: "2023-05-06", litter: 498, adhoc: 520, beach: 180, prevention: 200 },
  { date: "2023-05-07", litter: 388, adhoc: 300, beach: 170, prevention: 300 },
  { date: "2023-05-08", litter: 449, adhoc: 210, beach: 190, prevention: 300 },
  { date: "2023-05-09", litter: 427, adhoc: 180, beach: 190, prevention: 300 },
  { date: "2023-05-10", litter: 293, adhoc: 330, beach: 180, prevention: 200 },
  { date: "2023-05-11", litter: 335, adhoc: 270, beach: 170, prevention: 300 },
  { date: "2023-05-12", litter: 497, adhoc: 240, beach: 140, prevention: 300 },
  { date: "2023-05-13", litter: 497, adhoc: 160, beach: 100, prevention: 200 },
  { date: "2023-05-14", litter: 448, adhoc: 490, beach: 190, prevention: 300 },
  { date: "2023-05-15", litter: 473, adhoc: 380, beach: 170, prevention: 300 },
  { date: "2023-05-16", litter: 338, adhoc: 400, beach: 100, prevention: 300 },
  { date: "2023-05-17", litter: 499, adhoc: 420, beach: 140, prevention: 300 },
  { date: "2023-05-18", litter: 315, adhoc: 350, beach: 150, prevention: 300 },
  { date: "2023-05-19", litter: 235, adhoc: 180, beach: 140, prevention: 300 },
  { date: "2023-05-20", litter: 477, adhoc: 230, beach: 130, prevention: 300 },
  { date: "2023-05-21", litter: 482, adhoc: 140, beach: 150, prevention: 300 },
  { date: "2024-05-22", litter: 481, adhoc: 120, beach: 180, prevention: 400 },
  { date: "2024-05-23", litter: 252, adhoc: 290, beach: 300, prevention: 300 },
  { date: "2024-05-24", litter: 294, adhoc: 220, beach: 300, prevention: 300 },
  { date: "2024-05-25", litter: 201, adhoc: 250, beach: 300, prevention: 300 },
  { date: "2024-05-26", litter: 213, adhoc: 170, beach: 300, prevention: 200 },
  { date: "2024-05-27", litter: 420, adhoc: 460, beach: 200, prevention: 300 },
  { date: "2024-05-28", litter: 233, adhoc: 190, beach: 300, prevention: 300 },
  { date: "2024-05-29", litter: 478, adhoc: 130, beach: 300, prevention: 300 },
  { date: "2024-05-30", litter: 340, adhoc: 280, beach: 300, prevention: 300 },
  { date: "2024-05-31", litter: 478, adhoc: 230, beach: 300, prevention: 400 },
  { date: "2024-06-01", litter: 478, adhoc: 200, beach: 300, prevention: 300 },
  { date: "2024-06-02", litter: 470, adhoc: 410, beach: 400, prevention: 300 },
  { date: "2024-06-03", litter: 403, adhoc: 160, beach: 300, prevention: 300 },
  { date: "2024-06-04", litter: 439, adhoc: 380, beach: 300, prevention: 200 },
  { date: "2024-06-05", litter: 488, adhoc: 140, beach: 300, prevention: 300 },
  { date: "2024-06-06", litter: 294, adhoc: 250, beach: 200, prevention: 300 },
  { date: "2024-06-07", litter: 323, adhoc: 370, beach: 300, prevention: 300 },
  { date: "2024-06-08", litter: 385, adhoc: 320, beach: 300, prevention: 400 },
  { date: "2024-06-09", litter: 438, adhoc: 480, beach: 300, prevention: 300 },
  { date: "2024-06-10", litter: 455, adhoc: 200, beach: 400, prevention: 300 },
  { date: "2024-06-11", litter: 492, adhoc: 150, beach: 300, prevention: 300 },
  { date: "2024-06-12", litter: 492, adhoc: 420, beach: 300, prevention: 300 },
  { date: "2024-06-13", litter: 481, adhoc: 130, beach: 300, prevention: 350 },
  { date: "2024-06-14", litter: 426, adhoc: 380, beach: 300, prevention: 300 },
  { date: "2024-10-15", litter: 307, adhoc: 350, beach: 300, prevention: 300 },
  { date: "2024-10-16", litter: 371, adhoc: 310, beach: 200, prevention: 300 },
  { date: "2024-10-17", litter: 475, adhoc: 520, beach: 300, prevention: 200 },
  { date: "2024-10-18", litter: 407, adhoc: 170, beach: 300, prevention: 300 },
  { date: "2024-10-19", litter: 341, adhoc: 290, beach: 100, prevention: 300 },
  { date: "2024-10-20", litter: 408, adhoc: 450, beach: 300, prevention: 400 },
  { date: "2024-10-21", litter: 469, adhoc: 210, beach: 300, prevention: 300 },
  { date: "2024-10-22", litter: 317, adhoc: 270, beach: 300, prevention: 300 },
  { date: "2024-10-23", litter: 480, adhoc: 530, beach: 100, prevention: 300 },
  { date: "2024-10-24", litter: 432, adhoc: 180, beach: 300, prevention: 300 },
  { date: "2024-10-25", litter: 441, adhoc: 190, beach: 300, prevention: 300 },
  { date: "2024-10-26", litter: 434, adhoc: 380, beach: 300, prevention: 300 },
  { date: "2024-10-27", litter: 448, adhoc: 490, beach: 200, prevention: 200 },
  { date: "2024-10-28", litter: 449, adhoc: 200, beach: 300, prevention: 300 },
  { date: "2024-10-29", litter: 403, adhoc: 160, beach: 300, prevention: 400 },
  { date: "2024-10-30", litter: 446, adhoc: 400, beach: 100, prevention: 300 },
]

const materialsChartConfig = {
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

const activitiesChartConfig = {
  litter: {
    label: "Fishing for litter",
    color: "hsl(var(--chart-1))",
  },
  adhoc: {
    label: "Ad hoc",
    color: "hsl(var(--chart-2))",
  },
  prevention: {
    label: "Prevention",
    color: "hsl(var(--chart-3))",
  },
  beach: {
    label: "Beach cleanup",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

interface WasteChartProps {
  category: string;
  timeRange: string;
}

export function MaterialsChart({ category, timeRange }: WasteChartProps) {
  const chartConfig = category === "materials" ? materialsChartConfig : activitiesChartConfig
  const chartData = category === "materials" ? materialsData : activitiesData
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
    <ScrollArea className="max-w-[350px] md:max-w-[1500px]">
      <Card className="border-none shadow-none"> 
        <CardContent className="md:p-12">   
          <ChartContainer 
            config={chartConfig} 
            className=" w-full min-h-[400px] max-h-[600px]"
          >         
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
                    className="w-[240px] md:w-[300px] rounded-3xl gap-2 md:gap-4 text-sm md:text-lg p-4 md:p-6"
                    labelFormatter={(value) => (
                      <div className="font-extralight">
                        {new Date(value).toLocaleDateString("en-US", { month: "short",  year: "numeric" })}
                      </div>
                    )}
                    formatter={(value, name, item, index) => (
                      <>
                        <div className={`h-4 w-4 md:h-6 md:w-6 rounded-full bg-chart-${index +1}`}/>
                        <div className="capitalize font-bold">{name}</div>
                        <div className="m-auto text-gray-300">---</div>
                        <div className="ml-auto font-extralight">{value} Kgs</div>
                        {index === 3 && (
                          <div className="mt-1.5 flex basis-full items-center border-t border-gray-400 pt-1.5 text-sm md:text-lg">
                            Total
                            <div className="ml-auto font-extralight">
                              {item.payload.plastics + item.payload.nets + item.payload.metal + item.payload.rubber} Kgs
                            </div>
                          </div>
                        )}
                      </>
                    )}                    
                  />
                } 
              />
              <Area
                dataKey={category === "materials" ? "plastics" : "litter"}
                type="natural"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.4}
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                stackId="d"
              />
              <Area
                dataKey={category === "materials" ? "nets" : "adhoc"}
                type="natural"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.4}
                stroke="hsl(var(--chart-2))"
                strokeWidth={3}
                stackId="c"
              />
              <Area
                dataKey={category === "materials" ? "metal" : "prevention"}
                type="natural"
                fill="hsl(var(--chart-3))"
                fillOpacity={0.4}
                stroke="hsl(var(--chart-3))"
                strokeWidth={3}
                stackId="b"
              />
              <Area
                dataKey={category === "materials" ? "rubber" : "beach"}
                type="natural"
                fill="hsl(var(--chart-4))"
                fillOpacity={0.4}
                stroke="hsl(var(--chart-4))"
                strokeWidth={3}
                stackId="a"
              />
            </AreaChart>            
          </ChartContainer>       
        </CardContent>
      </Card>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
