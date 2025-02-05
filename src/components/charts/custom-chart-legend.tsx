import { materialsChartLegendDescriptions, activitesChartLegendDescriptions } from "@/config/texts"
import { formatCamelCaseString } from "@/utils/camelCaseFormatter"

interface ChartLegendProps {
  category: string
}

const CustomChartLegend = ({ category}: ChartLegendProps) => {
  const legendInfo = category === "materials" ? materialsChartLegendDescriptions : activitesChartLegendDescriptions
  return (
    <article className="flex justify-center">
      <div className="flex flex-wrap flex-col md:flex-row margin-auto gap-5 p-6 md:px-14">
        {Object.entries(legendInfo).map(([type, description]) => (
          <div key={type} className="flex flex-row items-start gap-3 w-full md:w-[20%]">
            <div className="w-[20px]">
              <div className={`h-6 w-6 rounded-full bg-${type}`}></div>
            </div>
            <div>
              <h3 className="text-xl font-bold">{formatCamelCaseString(type)}</h3>
              <p className="text-xs font-extralight leading-tight md:leading-tight">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

export { CustomChartLegend };