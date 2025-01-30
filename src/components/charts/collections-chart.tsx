import { useChartData } from "@/hooks/api/useChartData"
import { useChartTicks } from "@/hooks/ui/useChartTicks"
import { MaterialsChartConfig, ActivitiesChartConfig } from "@/config/charts"
import { MaterialsChartRecord, ActivitiesChartRecord } from "@/types"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/charts/chart"
import { calculateTooltipTotal } from "@/utils/chartTooltipCalculation"

interface CollectionsChartProps {
  pageId: "Home" | "PortDetail" | "VesselDetail"
  partnerId?: string;
  timeRange: string
}

export function CollectionsChart({ pageId, partnerId, timeRange }: CollectionsChartProps) {
  
  const { isPending, error, data } = useChartData({ pageId, partnerId, timeRange })
  const records = (data?.data ?? []) as (CollectionsChartProps['pageId'] extends "Home" ? MaterialsChartRecord[] : ActivitiesChartRecord[])
  console.log("records:", records)
  const chartConfig = pageId === "Home" ? MaterialsChartConfig : ActivitiesChartConfig
  const { ticks, tickFormatter } = useChartTicks(records, timeRange)

  if (isPending) return <div className="w-full h-[490px] p-28">Loading...</div>
  if (error) return 'An error has occurred: ' + error.message


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
              margin={{ right: 30 }}
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
                              {calculateTooltipTotal({payload: item.payload, config: chartConfig})} Kgs
                            </div>
                          </div>
                        )}
                      </>
                    )}                    
                  />
                } 
              />
              {Object.keys(chartConfig).map((key) => (
                <Area
                  key={key}
                  dataKey={key}
                  type="monotone"
                  baseValue={0}
                  fill={`hsl(var(--${key}))`}
                  fillOpacity={0.4}
                  stroke={`hsl(var(--${key}))`}
                  strokeWidth={3}
                  connectNulls={true}
                />
              ))}
            </AreaChart>            
          </ChartContainer>       
        </CardContent>
      </Card>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
