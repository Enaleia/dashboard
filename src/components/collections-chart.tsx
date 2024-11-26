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
  { date: "2021-03-01", fishingForLitter: 222, adHoc: 150, beach: 130, prevention: 400 },
  { date: "2021-04-02", fishingForLitter: 447, adHoc: 180, beach: 140, prevention: 340 },
  { date: "2021-05-03", fishingForLitter: 167, adHoc: 120, beach: 160, prevention: 450 },
  { date: "2021-06-04", fishingForLitter: 242, adHoc: 260, beach: 110, prevention: 300 },
  { date: "2021-07-05", fishingForLitter: 373, adHoc: 290, beach: 130, prevention: 370 },
  { date: "2021-08-06", fishingForLitter: 301, adHoc: 340, beach: 135, prevention: 460 },
  { date: "2021-09-07", fishingForLitter: 245, adHoc: 180, beach: 155, prevention: 300 },
  { date: "2021-10-08", fishingForLitter: 409, adHoc: 320, beach: 170, prevention: 330 },
  { date: "2021-10-09", fishingForLitter: 459, adHoc: 110, beach: 180, prevention: 309 },
  { date: "2021-11-10", fishingForLitter: 261, adHoc: 190, beach: 178, prevention: 400 },
  { date: "2021-12-11", fishingForLitter: 327, adHoc: 350, beach: 135, prevention: 470 },
  { date: "2021-12-12", fishingForLitter: 292, adHoc: 210, beach: 150, prevention: 370 },
  { date: "2022-01-13", fishingForLitter: 342, adHoc: 380, beach: 130, prevention: 400 },
  { date: "2022-01-14", fishingForLitter: 437, adHoc: 220, beach: 130, prevention: 300 },
  { date: "2022-02-15", fishingForLitter: 420, adHoc: 170, beach: 140, prevention: 300 },
  { date: "2022-02-16", fishingForLitter: 438, adHoc: 190, beach: 180, prevention: 300 },
  { date: "2022-02-17", fishingForLitter: 446, adHoc: 360, beach: 165, prevention: 300 },
  { date: "2022-02-18", fishingForLitter: 364, adHoc: 410, beach: 100, prevention: 300 },
  { date: "2022-03-19", fishingForLitter: 243, adHoc: 180, beach: 110, prevention: 300 },
  { date: "2022-03-20", fishingForLitter: 489, adHoc: 150, beach: 150, prevention: 300 },
  { date: "2022-04-21", fishingForLitter: 437, adHoc: 200, beach: 170, prevention: 300 },
  { date: "2022-04-22", fishingForLitter: 224, adHoc: 170, beach: 160, prevention: 300 },
  { date: "2022-04-23", fishingForLitter: 438, adHoc: 230, beach: 100, prevention: 300 },
  { date: "2022-04-24", fishingForLitter: 387, adHoc: 290, beach: 180, prevention: 300 },
  { date: "2022-05-25", fishingForLitter: 215, adHoc: 250, beach: 160, prevention: 300 },
  { date: "2022-05-26", fishingForLitter: 545, adHoc: 130, beach: 190, prevention: 300 },
  { date: "2022-06-27", fishingForLitter: 383, adHoc: 420, beach: 130, prevention: 300 },
  { date: "2022-07-28", fishingForLitter: 422, adHoc: 180, beach: 135, prevention: 300 },
  { date: "2022-08-29", fishingForLitter: 315, adHoc: 240, beach: 145, prevention: 300 },
  { date: "2022-09-30", fishingForLitter: 454, adHoc: 380, beach: 130, prevention: 300 },
  { date: "2022-09-01", fishingForLitter: 465, adHoc: 220, beach: 160, prevention: 300 },
  { date: "2022-09-02", fishingForLitter: 293, adHoc: 310, beach: 170, prevention: 300 },
  { date: "2022-10-03", fishingForLitter: 247, adHoc: 190, beach: 130, prevention: 300 },
  { date: "2022-10-04", fishingForLitter: 385, adHoc: 420, beach: 140, prevention: 300 },
  { date: "2022-11-05", fishingForLitter: 481, adHoc: 390, beach: 190, prevention: 300 },
  { date: "2022-11-06", fishingForLitter: 498, adHoc: 520, beach: 180, prevention: 200 },
  { date: "2022-11-07", fishingForLitter: 388, adHoc: 300, beach: 170, prevention: 300 },
  { date: "2022-11-08", fishingForLitter: 449, adHoc: 210, beach: 190, prevention: 300 },
  { date: "2022-12-09", fishingForLitter: 427, adHoc: 180, beach: 190, prevention: 300 },
  { date: "2022-12-10", fishingForLitter: 293, adHoc: 330, beach: 180, prevention: 200 },
  { date: "2023-01-11", fishingForLitter: 335, adHoc: 270, beach: 170, prevention: 300 },
  { date: "2023-01-12", fishingForLitter: 497, adHoc: 240, beach: 140, prevention: 300 },
  { date: "2023-02-13", fishingForLitter: 497, adHoc: 160, beach: 100, prevention: 200 },
  { date: "2023-02-14", fishingForLitter: 448, adHoc: 490, beach: 190, prevention: 300 },
  { date: "2023-02-15", fishingForLitter: 473, adHoc: 380, beach: 170, prevention: 300 },
  { date: "2023-02-16", fishingForLitter: 338, adHoc: 400, beach: 100, prevention: 300 },
  { date: "2023-03-17", fishingForLitter: 499, adHoc: 420, beach: 140, prevention: 300 },
  { date: "2023-03-18", fishingForLitter: 315, adHoc: 350, beach: 150, prevention: 300 },
  { date: "2023-04-19", fishingForLitter: 235, adHoc: 180, beach: 140, prevention: 300 },
  { date: "2023-04-20", fishingForLitter: 477, adHoc: 230, beach: 130, prevention: 300 },
  { date: "2023-04-21", fishingForLitter: 482, adHoc: 140, beach: 150, prevention: 300 },
  { date: "2023-05-22", fishingForLitter: 481, adHoc: 120, beach: 180, prevention: 400 },
  { date: "2023-05-23", fishingForLitter: 252, adHoc: 290, beach: 300, prevention: 300 },
  { date: "2023-05-24", fishingForLitter: 294, adHoc: 220, beach: 300, prevention: 300 },
  { date: "2023-06-25", fishingForLitter: 201, adHoc: 250, beach: 300, prevention: 300 },
  { date: "2023-06-26", fishingForLitter: 213, adHoc: 170, beach: 300, prevention: 200 },
  { date: "2023-07-27", fishingForLitter: 420, adHoc: 460, beach: 200, prevention: 300 },
  { date: "2023-08-28", fishingForLitter: 233, adHoc: 190, beach: 300, prevention: 300 },
  { date: "2023-08-29", fishingForLitter: 478, adHoc: 130, beach: 300, prevention: 300 },
  { date: "2023-09-30", fishingForLitter: 340, adHoc: 280, beach: 300, prevention: 300 },
  { date: "2023-09-31", fishingForLitter: 478, adHoc: 230, beach: 300, prevention: 400 },
  { date: "2023-09-01", fishingForLitter: 478, adHoc: 200, beach: 300, prevention: 300 },
  { date: "2023-09-02", fishingForLitter: 470, adHoc: 410, beach: 400, prevention: 300 },
  { date: "2023-09-03", fishingForLitter: 403, adHoc: 160, beach: 300, prevention: 300 },
  { date: "2023-10-04", fishingForLitter: 439, adHoc: 380, beach: 300, prevention: 200 },
  { date: "2023-10-05", fishingForLitter: 488, adHoc: 140, beach: 300, prevention: 300 },
  { date: "2023-10-06", fishingForLitter: 294, adHoc: 250, beach: 200, prevention: 300 },
  { date: "2023-11-07", fishingForLitter: 323, adHoc: 370, beach: 300, prevention: 300 },
  { date: "2023-11-08", fishingForLitter: 385, adHoc: 320, beach: 300, prevention: 400 },
  { date: "2023-11-09", fishingForLitter: 438, adHoc: 480, beach: 300, prevention: 300 },
  { date: "2023-12-10", fishingForLitter: 455, adHoc: 200, beach: 400, prevention: 300 },
  { date: "2023-12-11", fishingForLitter: 492, adHoc: 150, beach: 300, prevention: 300 },
  { date: "2024-01-12", fishingForLitter: 492, adHoc: 420, beach: 300, prevention: 300 },
  { date: "2024-01-13", fishingForLitter: 481, adHoc: 130, beach: 300, prevention: 350 },
  { date: "2024-02-14", fishingForLitter: 426, adHoc: 380, beach: 300, prevention: 300 },
  { date: "2024-02-15", fishingForLitter: 307, adHoc: 350, beach: 300, prevention: 300 },
  { date: "2024-03-16", fishingForLitter: 371, adHoc: 310, beach: 200, prevention: 300 },
  { date: "2024-03-17", fishingForLitter: 475, adHoc: 520, beach: 300, prevention: 200 },
  { date: "2024-03-18", fishingForLitter: 407, adHoc: 170, beach: 300, prevention: 300 },
  { date: "2024-04-19", fishingForLitter: 341, adHoc: 290, beach: 100, prevention: 300 },
  { date: "2024-05-20", fishingForLitter: 408, adHoc: 450, beach: 300, prevention: 400 },
  { date: "2024-06-21", fishingForLitter: 469, adHoc: 210, beach: 300, prevention: 300 },
  { date: "2024-07-22", fishingForLitter: 317, adHoc: 270, beach: 300, prevention: 300 },
  { date: "2024-07-23", fishingForLitter: 480, adHoc: 530, beach: 100, prevention: 300 },
  { date: "2024-08-24", fishingForLitter: 432, adHoc: 180, beach: 300, prevention: 300 },
  { date: "2024-08-25", fishingForLitter: 441, adHoc: 190, beach: 300, prevention: 300 },
  { date: "2024-09-26", fishingForLitter: 434, adHoc: 380, beach: 300, prevention: 300 },
  { date: "2024-09-27", fishingForLitter: 448, adHoc: 490, beach: 200, prevention: 200 },
  { date: "2024-10-28", fishingForLitter: 449, adHoc: 200, beach: 300, prevention: 300 },
  { date: "2024-10-29", fishingForLitter: 403, adHoc: 160, beach: 300, prevention: 400 },
  { date: "2024-10-30", fishingForLitter: 446, adHoc: 400, beach: 100, prevention: 300 },
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

interface CollectionsChartProps {
  category: string;
  timeRange: string;
}

export function CollectionsChart({ category, timeRange }: CollectionsChartProps) {
  const chartConfig = category === "materials" ? materialsChartConfig : activitiesChartConfig
  const chartData = category === "materials" ? materialsData : activitiesData


  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const now = new Date()
    const currentYear = now.getFullYear()
    let startDate: Date

    if (timeRange === "This year") {
      startDate = new Date(currentYear, 0, 1)
    } else if (timeRange === "Last year") {
      startDate = new Date(currentYear - 1, 0, 1)
    } else {
      return true
    }
    return date >= startDate
  }).reduce((acc, item) => {
    const month = new Date(item.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = { date: month, plastics: 0, nets: 0, metal: 0, rubber: 0, fishingForLitter: 0, adHoc: 0, prevention: 0, beach: 0 };
    }
    // Accumulate values
    if (category === "materials") {
      const materialItem = item as { plastics: number; nets: number; metal: number; rubber: number; date: string };
      acc[month].plastics += materialItem.plastics;
      acc[month].nets += materialItem.nets;
      acc[month].metal += materialItem.metal;
      acc[month].rubber += materialItem.rubber;
    } else {
      const activityItem = item as { fishingForLitter: number; adHoc: number; beach: number; prevention: number; date: string };
      acc[month].fishingForLitter += activityItem.fishingForLitter;
      acc[month].adHoc += activityItem.adHoc;
      acc[month].prevention += activityItem.prevention;
      acc[month].beach += activityItem.beach;
    }
    return acc;
  }, {} as Record<string, any>);
  // Convert accumulated data back to an array
  const accumulatedData = Object.values(filteredData);


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
              data={accumulatedData}
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
                    year: "2-digit"
                    // day: "numeric",
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
                    className="w-[250px] md:w-[325px] rounded-3xl gap-2 md:gap-4 text-sm md:text-lg p-4 md:p-6"
                    labelFormatter={(value) => (
                      <div className="font-extralight">
                        {new Date(value).toLocaleDateString("en-US", { month: "short",  year: "numeric" })}
                      </div>
                    )}
                    formatter={(value, name, item, index) => (
                      <>
                        <div className={`h-4 w-4 md:h-6 md:w-6 rounded-full bg-${name}`}/>
                        <div className="capitalize font-bold">{name}</div>
                        <div className="m-auto text-gray-300">--</div>
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
                dataKey={category === "materials" ? "plastics" : "fishingForLitter"}
                type="natural"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.4}
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                stackId="d"
              />
              <Area
                dataKey={category === "materials" ? "nets" : "adHoc"}
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
