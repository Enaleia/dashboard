import { useQuery } from "@tanstack/react-query"
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

const pageIds = [
  'Home',
  'PortDetail', 
  'VesselDetail' 
] as const

type PageId = typeof pageIds[number]

const materialsChartConfig = {
  mixedPastic: {
    label: "Mixed plastic",
    color: "hsl(var(--chart-1))",
  },
  metal: {
    label: "Metal",
    color: "hsl(var(--chart-2))",
  },
  rubber: {
    label: "Rubber",
    color: "hsl(var(--chart-3))",
  },
  preventionNet: {
    label: "Prevention net",
    color: "hsl(var(--chart-4))",
  },
  ghostNet: {
    label: "Ghost net",
    color: "hsl(var(--chart-5))",
  },
  rope: {
    label: "Rope",
    color: "hsl(var(--chart-6))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-7))",
  },
} satisfies ChartConfig

const activitiesChartConfig = {
  litter: {
    label: "Fishing for litter",
    color: "hsl(var(--chart-8))",
  },
  adhoc: {
    label: "Ad hoc",
    color: "hsl(var(--chart-9))",
  },
  prevention: {
    label: "Prevention",
    color: "hsl(var(--chart-10))",
  },
  beach: {
    label: "Beach cleanup",
    color: "hsl(var(--chart-11))",
  },
} satisfies ChartConfig

interface CollectionsChartProps {
  pageId: PageId;
  partnerId?: string;
  timeRange: string;
}

//https://hq.enaleia-hub.com/flows/trigger/729df9bd-d369-4489-b87a-628c02d51041?id=1139&start_date=2024-01-01&end_date=2024-05-01

const chartEndpoints = {
  Home: "0ec1555a-082e-46bf-be91-422ab8793096",
  PortDetail: "729df9bd-d369-4489-b87a-628c02d51041",
  VesselDetail: "729df9bd-d369-4489-b87a-628c02d51041"
}

export function CollectionsChart({ pageId, partnerId, timeRange }: CollectionsChartProps) {
  const chartConfig = pageId === "Home" ? materialsChartConfig : activitiesChartConfig  

  const { isPending, error, data } = useQuery({
    queryKey: [`chart-${pageId}`, timeRange],
    queryFn: async () => {
      console.log(timeRange)
      let queryString = ''

      if (partnerId) {
        queryString += `?id=${partnerId}`
      }

      if (timeRange !== 'All time') {
        const endDate = new Date().toISOString().split('T')[0]
        const startDate = new Date()
        startDate.setMonth(startDate.getMonth() - (timeRange === 'Last 12 months' ? 12 : 6))       
        queryString += (queryString ? '&' : '?') + `start_date=${startDate.toISOString().split('T')[0]}&end_date=${endDate}`       
      }
      
      console.log(queryString)

      const response = await fetch(
        `https://hq.enaleia-hub.com/flows/trigger/${chartEndpoints[pageId]}${queryString}`
      )
      return await response.json()
    },
  })
  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message
  const records = data?.data ?? []
  console.log("records:", records)

  return (
    <ScrollArea className="max-w-[350px] md:max-w-[1500px]">
      <Card className="border-none shadow-none"> 
        <CardContent className="md:p-12">   
          <ChartContainer 
            config={chartConfig} 
            className=" w-full min-h-[400px] max-h-[400px]"
          >         
            <AreaChart
              accessibilityLayer
              data={records}
              // margin={{
              //   left: 10,
              //   bottom: 20,
              // }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={4}
                tickFormatter={(value) => {
                  // console.log("Tick value:", value);
                  const [year, month] = value.split('-'); // Split the value into year and month
                  const date = new Date(Number(year), Number(month) - 1, 1)
                  // console.log("new date:", date);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric"
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
                              {item.payload.mixedPlastic + item.payload.metal + item.payload.rubber + item.payload.preventionNet + item.payload.ghostNet + item.payload.rope + item.payload.other} Kgs
                              {/* {item.payload.fishingForLitter + item.payload.adHoc + item.payload.beach + item.payload.prevention} Kgs */}
                            </div>
                          </div>
                        )}
                      </>
                    )}                    
                  />
                } 
              />
              {pageId === "Home" ? (
                <>
                  <Area
                    dataKey="mixedPlastic"
                    type="monotone"
                    baseValue={0}
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.4}
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={3}
                    connectNulls={true}
                  />
                  <Area
                    dataKey="metal"
                    type="monotone"
                    baseValue={0}
                    fill="hsl(var(--chart-2))"
                    fillOpacity={0.4}
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={3}
                    connectNulls={true}
                  />
                  <Area
                    dataKey="rubber"
                    type="monotone"
                    baseValue={0}
                    fill="hsl(var(--chart-3))"
                    fillOpacity={0.4}
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={3}
                    connectNulls={true}
                  />
                  <Area
                    dataKey="preventionNet"
                    type="monotone"
                    baseValue={0}
                    fill="hsl(var(--chart-4))"
                    fillOpacity={0.4}
                    stroke="hsl(var(--chart-4))"
                    strokeWidth={3}
                    connectNulls={true}
                  />
                  <Area
                    dataKey="ghostNet"
                    type="monotone"
                    baseValue={0}
                    fill="hsl(var(--chart-5))"
                    fillOpacity={0.4}
                    stroke="hsl(var(--chart-5))"
                    strokeWidth={3}
                    connectNulls={true}
                  />
                  <Area
                    dataKey="rope"
                    type="monotone"
                    baseValue={0}
                    fill="hsl(var(--chart-6))"
                    fillOpacity={0.4}
                    stroke="hsl(var(--chart-6))"
                    strokeWidth={3}
                    connectNulls={true}
                  />
                  <Area
                    dataKey="other"
                    type="monotone"
                    baseValue={0}
                    fill="hsl(var(--chart-7))"
                    fillOpacity={0.4}
                    stroke="hsl(var(--chart-7))"
                    strokeWidth={3}
                    connectNulls={true}
                  />
                </>
              ):(
                <>
                  <Area
                    dataKey="fishingForLitter"
                    type="monotone"
                    baseValue={0}
                    fill="hsl(var(--chart-8))"
                    fillOpacity={0.4}
                    stroke="hsl(var(--chart-8))"
                    strokeWidth={3}
                    connectNulls={true}
                  />
                  <Area
                    dataKey="adHoc"
                    type="monotone"
                    baseValue={0}
                    fill="hsl(var(--chart-9))"
                    fillOpacity={0.4}
                    stroke="hsl(var(--chart-9))"
                    strokeWidth={3}
                    connectNulls={true}
                  />
                  <Area
                    dataKey="prevention"
                    type="monotone"
                    baseValue={0}
                    fill="hsl(var(--chart-10))"
                    fillOpacity={0.4}
                    stroke="hsl(var(--chart-10))"
                    strokeWidth={3}
                    connectNulls={true}
                  />
                  <Area
                    dataKey="beach"
                    type="monotone"
                    baseValue={0}
                    fill="hsl(var(--chart-11))"
                    fillOpacity={0.4}
                    stroke="hsl(var(--chart-11))"
                    strokeWidth={3}
                    connectNulls={true}
                  />
                </>
              )}
            </AreaChart>            
          </ChartContainer>       
        </CardContent>
      </Card>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
