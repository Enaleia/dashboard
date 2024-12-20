import { Separator } from "@radix-ui/react-select";

const landingStats = [
  {
    title: "Waste removed (kgs)",
    stat: 107.7,
    isWeight: true,
    description: "Collection containing plastic, metal, fishing nets, etc.",
  },
  {
    title: "Active vessels",
    stat: 132,
    isWeight: false,
    description: "Fishers that participate in our actions.",
  },
  {
    title: "Actions performed",
    stat: 2901,
    isWeight: false,
    description: "Fishing for litter, prevention, beach clean-up & more.",
  },
  {
    title: "Locations",
    stat: 92,
    isWeight: false,
    description: "Ports, recyclers, and manufacturing sites.",
  },
  {
    title: "Countries",
    stat: 4,
    isWeight: false,
    description: "Countries participating within the Mediterranean area.",
  }
]

const locationsStats = [
  {
    title: "Location count",
    stat: 152,
    isWeight: false,
    description: "From all the countries that participate",
  },
  {
    title: "Ports",
    stat: 92,
    isWeight: false,
    description: "Ports that receive fisherman’s waste collection",
  },
  {
    title: "Recyclers",
    stat: 4,
    isWeight: false,
    description: "Companies that participate in plastic sorting and pelletization.",
  },
  {
    title: "Manufacturers",
    stat: 1,
    isWeight: false,
    description: "Producers of consumer products using recycled plastics.",
  }
]

interface StatCardProps {
  title: string;
  stat: number;
  isWeight: boolean;
  description: string
}

const StatCard = ({ title, stat, isWeight, description, borderClass }: StatCardProps & { borderClass: string }) => {
  return (
    <div className={`flex flex-col w-full md:w-[20%] justify-center items-center text-center font-extralight ${borderClass} md:border-none md:pb-0`}>
      <p className="text-xl md:text-lg font-medium">{title}</p>
      <p className="text-4xl md:text-5xl font-bold pt-4 pb-1">{stat}{isWeight && <span>K</span>}</p>
      <p className="md:min-h-[30px] text-xs md:text-xs w-[80%] leading-tight md:leading-tight">{description}</p>
    </div>
  )
}

const StatsBar = ({ pageId }: {pageId: string}) => {
  let pageStats: StatCardProps[]
  if (pageId === "landing") {
    pageStats = landingStats
  } else {
    pageStats = locationsStats
  }

  return (
    <article className='flex flex-col md:flex-row justify-around gap-8 md:gap-0 items-center px-12 pb-12 md:py-8 md:px-2'>
      {pageStats.map((stat: StatCardProps, index: number) => (
        <StatCard key={stat.title} title={stat.title} stat={stat.stat} isWeight={stat.isWeight} description={stat.description} borderClass={index === pageStats.length - 1? "" : "border-b border-black pb-6"}/>
      ))}
    </article>
  )
}

export { StatsBar };