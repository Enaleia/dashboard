import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
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
  pageId: "Home" | "PortDetail" | "VesselDetail"
  partnerId?: string;
  timeRange: string
}

const chartEndpoints = {
  Home: "0ec1555a-082e-46bf-be91-422ab8793096",
  PortDetail: "697a7c75-c7ce-469a-8dea-38c8de1a6686",
  VesselDetail: "729df9bd-d369-4489-b87a-628c02d51041"
}

interface MaterialsChartRecord {
  date: string;
  mixedPlastic: number;
  metal: number;
  rubber: number;
  preventionNet: number;
  ghostNet: number;
  rope: number;
  other: number
}

interface ActivitiesChartRecord {
  date: string;
  fishingForLitter: number;
  adHoc: number;
  beach: number;
  prevention: number;
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
  
  // const records = data?.data ?? []
  const records = (data?.data ?? []) as (CollectionsChartProps['pageId'] extends "Home" ? MaterialsChartRecord[] : ActivitiesChartRecord[])
  console.log("records:", records)

  const { ticks, tickFormatter } = useMemo(() => {
    if (timeRange === 'All time') {
      // Pre-process records to group by year
      const yearGroups = records.reduce((acc, record) => {
        const year = record.date.substring(0, 4)
        if (!acc[year]) {
          acc[year] = []
        }
        acc[year].push(record)
        return acc;
      }, {} as Record<string, Array<{ date: string }>>)

      // Take the first record of each year for ticks
      const yearTicks = Object.values(yearGroups).map(yearRecords => yearRecords[0].date)

      return {
        ticks: yearTicks,
        tickFormatter: (value: string) => value.substring(0, 4)
      }
    }
    
    return {
      ticks: records.map(record => record.date),
      tickFormatter: (value: string) => {
        const date = new Date(value)
        return date.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
          timeZone: "UTC"
        });
      }
    };
  }, [timeRange])

  if (isPending) return <div className="w-full h-[490px] p-28">Loading...</div>
  if (error) return 'An error has occurred: ' + error.message

  // const ticks = records.map(record => record.date)

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
              margin={{
                // left: 10,
                // bottom: 20,
                right: 30
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                ticks={ticks}              
                tickFormatter={tickFormatter}
                interval={0}
                // interval={timeRange === "All time" ? 4 : 0}
                // tickFormatter={(value) => {
                //   const date = new Date(value)
                //   return date.toLocaleDateString("en-US", {
                //     month: "short",
                //     year: "numeric",
                //     timeZone: "UTC"
                //   });
                // }}
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
                        <div className="capitalize font-bold">{String(name).replace(/([A-Z])/g, ' $1').trim()}</div>
                        <div className="ml-auto font-extralight">{value} Kgs</div>
                        {index === (pageId === "Home" ? 6 : 3) && (
                          <div className="mt-1.5 flex basis-full items-center border-t border-gray-400 pt-1.5 text-sm md:text-lg">
                            Total
                            <div className="ml-auto font-extralight">
                              {pageId === "Home" ? 
                                (item.payload.mixedPlastic + item.payload.metal + item.payload.rubber + item.payload.preventionNet + item.payload.ghostNet + item.payload.rope + item.payload.other) + ' Kgs'
                              :
                                (item.payload.fishingForLitter + item.payload.adHoc + item.payload.beach + item.payload.prevention) + ' Kgs'
                              }
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
