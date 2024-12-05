import { materialsChartLegendDescriptions, activitesChartLegendDescriptions, activitesChartLegendHeading } from "@/config/texts";

const CustomChartLegend = ({ category }: {category: string}) => {
  const info = category === "materials" ? materialsChartLegendDescriptions : activitesChartLegendDescriptions
  return (
    <article>
      {category === "activities" &&
        <div className='text-center tracking-tight p-6 md:px-40'>
          <p className='text-xl md:text-2xl font-bold leading-none md:leading-none pb-1'>{activitesChartLegendHeading.title}</p>
          <p className='text-sm md:text-lg font-extralight leading-tight md:leading-tight'>{activitesChartLegendHeading.description}</p>
        </div>
      }
      <div className="flex flex-col md:flex-row gap-5 p-6 md:px-28">
        {Object.entries(info).map(([type, description]) => (
          <div key={type} className="flex flex-row gap-4 w-full md:w-[25%]">
            <div className="w-[24px]">
              <div className={`h-7 w-7 rounded-full bg-${type}`}></div>
            </div>
            <div>
              <h3 className="text-lg font-bold capitalize">{type}</h3>
              <p className="text-xs font-extralight leading-tight md:leading-tight">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

export { CustomChartLegend };