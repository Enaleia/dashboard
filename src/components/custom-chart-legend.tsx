const materialsInfo = {
  "plastics": "All types of plastics, from beverage packaging to light weight plastics.",
  "nets": "Used fishing gear and nets, collected from fishers to prevent disposal in the sea.",
  "metal": "All types of metal collected from the ocean. Often these metals can be reused elsewhere.",
  "rubber": "Mainly tires and other rubber material. This category has been recently added to the platform."
}

const activitesInfo = {
  "fishingForLitter": "Plastic collected from the sea by fishers or fishing vessels, through both active and passive efforts.",
  "adHoc": "Waste gathered through large-scale, one-off cleanup projects, often requiring divers for underwater efforts.",
  "prevention": "Used fishing gear, primarily nets, collected from fishers to prevent disposal in the sea.",
  "beach cleanup": "Waste collected during occasional beach cleanups where fishers are not involved; tracked separately."
}

const CustomChartLegend = ({ category }: {category: string}) => {
  const info = category === "materials" ? materialsInfo : activitesInfo
  return (
    <article className="flex flex-col md:flex-row gap-5 p-6 md:px-28">
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
    </article>
  )
}

export { CustomChartLegend };