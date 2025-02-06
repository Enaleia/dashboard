interface PageHeroProps {
  title: string,
  description: string
  width: string
}

const PageHero = ({ title, description, width }: PageHeroProps) => {
  return (
    <article className={`w-full lg:w-[${width}%] flex flex-col justify-center items-center gap-4 text-center`}>
      <h1 className='w-full font-bold text-5xl md:text-7xl tracking-tight'>{title}</h1>
      <p className='w-full font-extralight text-lg md:text-xl tracking-tight leading-tight md:leading-tight'>{description}</p>
    </article>
  )
}

export { PageHero };