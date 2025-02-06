interface AboutCardProps {
  image: string;
  title: string;
  description: string
}

const AboutCard = ({ image, title, description }: AboutCardProps) => {
  return (
    <article className="flex flex-col items-center gap-4 md:gap-2 w-full border border-black rounded-3xl p-4 text-left">
      <img src={`/Sealife/${image}.svg`} alt={`illustration of ${image}`} className="h-[200px] w-[200px]"/>
      <h3 className="font-semibold text-xl md:text-xl tracking-tight">{title}</h3>
      <p className="font-extralight text-sm md:text-base tracking-tight leading-tight md:leading-tight" dangerouslySetInnerHTML={{__html: description}}></p>
    </article>
  )
}

export { AboutCard };