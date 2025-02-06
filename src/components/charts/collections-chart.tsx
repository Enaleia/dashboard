import { useChartData } from "@/hooks/api/useChartData"
import { useChartTicks } from "@/hooks/ui/useChartTicks"
import { MaterialsChartConfig, ActivitiesChartConfig } from "@/config/charts"
import { PageName, MaterialsChartRecord, ActivitiesChartRecord } from "@/types"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/charts/chart"
import { formatCamelCaseString } from "@/utils/camelCaseFormatter"
import { calculateTooltipTotal } from "@/utils/chartTooltipCalculation"

interface CollectionsChartProps {
  pageName: PageName
  partnerId?: string;
  timeRange: string
}

const CollectionsChart = ({ pageName, partnerId, timeRange }: CollectionsChartProps) => {
  
  const { isPending, error, data } = useChartData({ pageName, partnerId, timeRange })
  const records = (data?.data ?? []) as (CollectionsChartProps['pageName'] extends "Home" ? MaterialsChartRecord[] : ActivitiesChartRecord[])
  console.log("records:", records)
  const chartConfig = pageName === "Home" ? MaterialsChartConfig : ActivitiesChartConfig
  const { ticks, tickFormatter } = useChartTicks(records, timeRange)

  return (
    <ScrollArea className="max-w-[350px] md:max-w-[1500px]">
      <Card className="border-none shadow-none"> 
        <CardContent className="md:p-12">   
          <ChartContainer 
            config={chartConfig} 
            className=" w-full min-h-[400px] max-h-[400px]"
          >
            {isPending ? (
              <div className="w-full h-full text-lg">
                Loading chart data...
              </div>
            ) : error || !records.length ? (
              <div className="w-[40%] md:w-full h-full flex flex-col justify-center md:items-center text-center text-lg">
                <p>😕 sorry!</p>
                <p>We were not able to build the chart you requested.</p>
                <img src="/Sealife/dolphin.svg" alt="dolphin illustration" className="w-[300px] h-[300px]"/>
              </div>
            ) : (
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
                      className="w-[250px] rounded-3xl gap-2 md:gap-3 text-sm md:text-lg p-4 md:p-6"
                      labelFormatter={(value) => (
                        <div className="font-extralight">
                          {new Date(value).toLocaleDateString("en-US", { month: "short",  year: "numeric" })}
                        </div>
                      )}
                      formatter={(value, name, item, index) => (
                        <>
                          <div className={`h-3 w-3 md:h-4 md:w-4 rounded-full bg-${name}`}/>
                          <div className="font-semibold text-sm">{formatCamelCaseString(String(name))}</div>
                          <div className="ml-auto font-extralight text-sm">{value} Kgs</div>
                          {index === (pageName === "Home" ? 6 : 3) && (
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
            )}           
          </ChartContainer>       
        </CardContent>
      </Card>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

export { CollectionsChart };
