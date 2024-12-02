interface AboutCardProps {
  image: string;
  title: string;
  description: string
}

const AboutCard = ({ image, title, description }: AboutCardProps) => {
  return (
    <article className="flex flex-col gap-4 w-full md:w-[325px] border border-black rounded-3xl p-6 text-left">
      <img src={`/${image}.svg`} alt={`illustration of ${image}`}/>
      <h3 className="font-semibold text-2xl md:text-2xl tracking-tight">{title}</h3>
      <p className="font-extralight text-sm md:text-base tracking-tight leading-tight md:leading-tight" dangerouslySetInnerHTML={{__html: description}}></p>
    </article>
  )
}

export { AboutCard };