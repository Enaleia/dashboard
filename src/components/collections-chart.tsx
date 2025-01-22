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
  pageId: PageId;
  partnerId?: string;
  timeRange: string;
}

//https://hq.enaleia-hub.com/flows/trigger/729df9bd-d369-4489-b87a-628c02d51041?id=1139&start_date=2024-01-01&end_date=2024-05-01

const chartEndpoints = {
  Home: "729df9bd-d369-4489-b87a-628c02d51041",
  PortDetail: "729df9bd-d369-4489-b87a-628c02d51041",
  VesselDetail: "729df9bd-d369-4489-b87a-628c02d51041"
}

export function CollectionsChart({ pageId, partnerId, timeRange }: CollectionsChartProps) {
  const chartConfig = pageId === "Home" ? materialsChartConfig : activitiesChartConfig  

  const { isPending, error, data } = useQuery({
    queryKey: [`chart-${pageId}`, timeRange],
    queryFn: async () => {
      let queryString = partnerId ? `?id=${partnerId}` : ''

      if (timeRange !== 'All time') {
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - (timeRange === 'Last 12 months' ? 12 : 6));
        
        const dateQuery = `${queryString ? '&' : '?'}start_date=${startDate.toISOString().split('T')[0]}&end_date=${endDate}`;
        queryString += dateQuery;
      }

      const response = await fetch(
        `https://hq.enaleia-hub.com/flows/trigger/${chartEndpoints[pageId]}${queryString}`
      )
      return await response.json()
    },
  })
  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message
  const records = data?.activitiesData ?? []
  console.log("records:", records)


  // const filteredData = records.filter((item: any) => {
  //   const date = new Date(item.date)
  //   const now = new Date()
  //   const currentYear = now.getFullYear()
  //   let startDate: Date

  //   if (timeRange === "This year") {
  //     startDate = new Date(currentYear, 0, 1); // Start from January 1st of the current year
  //     return date >= startDate && date <= now; // Include dates up to the current date
  //   } else if (timeRange === "Last year") {
  //     startDate = new Date(currentYear - 1, 0, 1); // Start from January 1st of the last year
  //     const endDate = new Date(currentYear, 0, 0); // End at December 31st of the last year
  //     return date >= startDate && date <= endDate; // Include all dates of the last year
  //   } else if (timeRange === "All time") {
  //     return true // Include all data points for all time
  //   }
  // }).reduce((acc: any, item: any) => {
  //   const month = new Date(item.date).toLocaleString('default', { month: 'short', year: 'numeric' });
  //   if (!acc[month]) {
  //     acc[month] = { date: month, plastics: 0, nets: 0, metal: 0, rubber: 0, fishingForLitter: 0, adHoc: 0, prevention: 0, beach: 0 };
  //   }
  //   // Accumulate values
  //   if (pageId === "Home") {
  //     const materialItem = item as { plastics: number; nets: number; metal: number; rubber: number; date: string };
  //     acc[month].plastics += materialItem.plastics;
  //     acc[month].nets += materialItem.nets;
  //     acc[month].metal += materialItem.metal;
  //     acc[month].rubber += materialItem.rubber;
  //   } else {
  //     const activityItem = item as { fishingForLitter: number; adHoc: number; beach: number; prevention: number; date: string };
  //     acc[month].fishingForLitter += activityItem.fishingForLitter;
  //     acc[month].adHoc += activityItem.adHoc;
  //     acc[month].prevention += activityItem.prevention;
  //     acc[month].beach += activityItem.beach;
  //   }
  //   return acc;
  // }, {} as Record<string, any>);
  // // Convert accumulated data back to an array
  // const accumulatedData = Object.values(filteredData);

  // const activitiesData = [{date:"2024-04-01",fishingForLitter:0,adHoc:9340,beach:0,prevention:0},{date:"2024-05-01",fishingForLitter:1345,adHoc:0,beach:0,prevention:0},{date:"2024-06-01",fishingForLitter:4860,adHoc:0,beach:0,prevention:0},{date:"2024-07-01",fishingForLitter:5633,adHoc:0,beach:0,prevention:1559},{date:"2024-08-01",fishingForLitter:8406,adHoc:0,beach:0,prevention:1254},{date:"2024-09-01",fishingForLitter:13841,adHoc:0,beach:0,prevention:997},{date:"2024-10-01",fishingForLitter:14042,adHoc:0,beach:0,prevention:2121},{date:"2024-11-01",fishingForLitter:6300,adHoc:0,beach:0,prevention:0}]
  // console.log('activitiesData:', activitiesData)

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
                              {/* {item.payload.plastics + item.payload.nets + item.payload.metal + item.payload.rubber} Kgs */}
                              {item.payload.fishingForLitter + item.payload.adHoc + item.payload.beach + item.payload.prevention} Kgs
                            </div>
                          </div>
                        )}
                      </>
                    )}                    
                  />
                } 
              />
              <Area
                dataKey={pageId === "Home" ? "plastics" : "fishingForLitter"}
                type="monotone"
                baseValue={0}
                fill="hsl(var(--chart-1))"
                fillOpacity={0.4}
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                connectNulls={true}
              />
              <Area
                dataKey={pageId === "Home" ? "nets" : "adHoc"}
                type="monotone"
                baseValue={0}
                fill="hsl(var(--chart-2))"
                fillOpacity={0.4}
                stroke="hsl(var(--chart-2))"
                strokeWidth={3}
                connectNulls={true}
              />
              <Area
                dataKey={pageId === "Home" ? "metal" : "prevention"}
                type="monotone"
                baseValue={0}
                fill="hsl(var(--chart-3))"
                fillOpacity={0.4}
                stroke="hsl(var(--chart-3))"
                strokeWidth={3}
                connectNulls={true}
              />
              <Area
                dataKey={pageId === "Home" ? "rubber" : "beach"}
                type="monotone"
                baseValue={0}
                fill="hsl(var(--chart-4))"
                fillOpacity={0.4}
                stroke="hsl(var(--chart-4))"
                strokeWidth={3}
                connectNulls={true}
              />
            </AreaChart>            
          </ChartContainer>       
        </CardContent>
      </Card>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
