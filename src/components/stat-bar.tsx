interface StatCardProps {
  title: string;
  stat: number;
  isWeight: boolean;
  description: string
}

const StatCard = ({ title, stat, isWeight, description }: StatCardProps) => {
  return (
    <div className="flex flex-col md:w-1/5 justify-center items-center text-center font-extralight">
      <p className="text-sm md:text-xl">{title}</p>
      <p className="text-3xl md:text-5xl font-bold pt-4 pb-1">{stat}{isWeight && <span>K</span>}</p>
      <p className="text-xs md:text-sm w-[80%]">{description}</p>
    </div>
  )
}

const StatBar = () => {
  const landingStats = [
    {
      title: "Waste removed (Kgs)",
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

  return (
    <article className='flex flex-col md:flex-row md:gap-5 items-center p-12'>
      {landingStats.map((stat: StatCardProps) => (
        <StatCard title={stat.title} stat={stat.stat} isWeight={stat.isWeight} description={stat.description} />
      ))}
    </article>
  )
}

export { StatBar };