import { 
  materialsChartLegendDescriptions, 
  activitesChartLegendDescriptions, 
  // activitesChartLegendHeading 
} from "@/config/texts";

const CustomChartLegend = ({ category }: {category: string}) => {
  const info = category === "materials" ? materialsChartLegendDescriptions : activitesChartLegendDescriptions
  return (
    <article className="flex justify-center">
      <div className="flex flex-wrap flex-col md:flex-row margin-auto gap-5 p-6 md:px-14">
        {Object.entries(info).map(([type, description]) => (
          <div key={type} className="flex flex-row gap-4 w-full md:w-[20%]">
            <div className="w-[24px]">
              <div className={`h-7 w-7 rounded-full bg-${type}`}></div>
            </div>
            <div>
              <h3 className="text-lg font-bold capitalize">{type.replace(/([A-Z])/g, ' $1').trim()}</h3>
              <p className="text-xs font-extralight leading-tight md:leading-tight">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

export { CustomChartLegend };