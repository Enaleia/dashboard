interface CardProps {
  image: string;
  title: string;
  description: string
}

const Card = ({ image, title, description }: CardProps) => {
  return (
    <article className="flex flex-col items-center gap-4 md:gap-2 w-full border border-black rounded-3xl">
      <img src={`/illustrations/${image}.svg`} alt={`illustration of ${image}`} className="h-[200px] w-[200px] py-2"/>
      <div className="pb-8 pl-6 pr-3 text-left">
        <h3 className="font-semibold text-xl md:text-xl tracking-tight pb-2">{title}</h3>
        <p className="font-extralight text-base tracking-tight leading-tight md:leading-tight" dangerouslySetInnerHTML={{__html: description}}></p>
      </div>
    </article>
  )
}

export { Card }