import { Link } from "@tanstack/react-router";

const DetailPageBackNav = ({ detailType }: {detailType: string}) => {
  return (
    <section className='relative w-full rounded-3xl overflow-hidden'>
      <img src={`/images/${detailType}.jpg`} alt={detailType === "location" ?  'underwater scene' : 'fishing vessel helm'} className='object-cover bg-center h-[120px] md:h-auto w-full'/>
      <Link 
        to={`/${detailType}s`} 
        className='absolute inset-0 flex flex-col items-center justify-center text-center text-sand text-2xl font-semibold'
      >
        Go back to all {detailType}s
      </Link>
    </section>
  )
}

export { DetailPageBackNav }