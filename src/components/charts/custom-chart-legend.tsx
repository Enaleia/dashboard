import { materialsChartLegendDescriptions, activitesChartLegendDescriptions } from "@/config/texts"
import { formatCamelCaseString } from "@/utils/camelCaseFormatter"

interface ChartLegendProps {
  category: string
}

const CustomChartLegend = ({ category }: ChartLegendProps) => {
  const legendInfo = category === "materials" ? materialsChartLegendDescriptions : activitesChartLegendDescriptions;
  
  return (
    <article className="w-full flex justify-center p-8 md:px-28 lg:py-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl">
        {Object.entries(legendInfo).map(([type, description]) => (
          <div key={type} className="flex items-start gap-2">
            <div className="flex-shrink-0">
              <div className={`h-6 w-6 rounded-full bg-${type}`}></div>
            </div>
            <div>
              <h3 className="text-lg font-bold">{formatCamelCaseString(type)}</h3>
              <p className="text-sm font-extralight leading-tight">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

export { CustomChartLegend };