interface PageHeroProps {
  title: string,
  description: string
}

const PageHero = ({ title, description }: PageHeroProps) => {
  return (
    <article className={`w-full lg:w-[75%] flex flex-col justify-center items-center gap-4 text-center`}>
      <h1 className='w-full font-bold text-5xl md:text-7xl tracking-tight'>{title}</h1>
      <p className='w-full font-extralight text-lg md:text-xl tracking-tight leading-tight md:leading-tight'>{description}</p>
    </article>
  )
}

export { PageHero };