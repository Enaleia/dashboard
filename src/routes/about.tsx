import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: AboutComponent,
})

function AboutComponent() {
  return (
    <main className='flex flex-col justify-center items-center gap-14 md:gap-24 m-auto pt-0 pb-20 md:pb-32 md:pt-16 max-w-[1500px]'>
      <section className='flex flex-col items-center gap-6 px-6 text-center'>
        <h1 className='w-full font-bold text-5xl md:text-7xl tracking-tight md:px-48'>Transparency. Accountability. Open source data on a distributed network.</h1>
        <p className='w-full font-extralight text-lg md:text-xl tracking-tight leading-tight md:leading-tight'>Enaleia Hub is a step toward sustainable innovation, open collaboration, and fostering trust in the data driving ocean clean-up efforts.</p>
        <img src='/about_photo.jpg' alt="photo of port operations" className='object-cover bg-center h-[350px] md:h-auto w-full md:pt-8 rounded-3xl'/>
      </section> 

      <section></section>

      <section className='mx-4 md:mx-16'>
        <div className='relative w-full overflow-hidden rounded-3xl'>
          <img src='/ocean_photo.jpg' alt="photo of sun shining on the ocean" className='object-cover bg-center h-[1000px] md:h-auto w-full'/>
          <div className='absolute inset-0 flex flex-col md:flex-row items-start justify-start md:justify-between p-4 pt-12 md:p-10'>
            <div className='md:w-[75%]'>
              <p className='font-bold text-4xl md:text-6xl tracking-tight'>Collaboration for impact</p>
              <p className='font-extralight text-base md-text-xl tracking-tight leading-tight md:leading-tight py-2'>This first release has been developed by Pollen Labs to accelerate collaboration and innovation.  Our vision extends beyond Enaleia, as this platform aims to inspire similar organizations to adopt public blockchain technology, aligning with Ethereum’s values. While designed for decentralized applications, Ethereum also offers powerful enterprise solutions, providing instant data transparency and accountability. We envision that any enterprise striving for transparency can easily adopt and replicate this solution—because ultimately, it’s for the environment we all share.</p>
              <p className='font-extralight text-base md-text-xl tracking-tight leading-tight md:leading-tight py-2'>There are many ways to collaborate and strengthen this solution. We invite you to join our conversation.</p>
            </div>
            <div className='flex flex-col gap-6 pt-8 md:pt-16 md:w-[20%]'>
              <a href='' className='flex justify-between items-center border-b border-black hover:font-bold'>
                <p>Propose idea in Github forum</p>
                <ArrowUpRight />
              </a>
              <a href='' className='flex justify-between items-center border-b border-black hover:font-bold'>
                <p>Chat with us on Discord</p>
                <ArrowUpRight />
              </a>
              <a href='' className='flex justify-between items-center border-b border-black hover:font-bold'>
                <p>Follow updates on X</p>
                <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main> 
  )
}
