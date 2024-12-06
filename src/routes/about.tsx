import { createFileRoute } from '@tanstack/react-router'
import { PageHero } from '@/components/page-hero'
import { AboutCard } from '@/components/about-card'
import { BackToTopButton } from '@/components/back-to-top'
import { ArrowUpRight } from 'lucide-react'
import { aboutPageTexts, aboutCardInfo, aboutPageLinks } from '@/config/texts'

export const Route = createFileRoute('/about')({
  component: AboutComponent,
})

function AboutComponent() {
  const { 
    heroTitle, 
    heroDescription, 
    hubFlowSectionTitle, 
    hubFlowSectionDescription, 
    collabSectionTitle, 
    collabSectionDescription1, 
    collabSectionDescription2 
  } = aboutPageTexts

  return (
    <main className='flex flex-col justify-center items-center gap-8 m-auto pt-0 pb-16 md:pb-24 md:pt-24 max-w-[1500px]'>      
      <section className='flex flex-col items-center gap-10'>
        <PageHero title={heroTitle} description={heroDescription} width='90'/>
        <img src='/about_photo.jpg' alt="photo of port operations" className='object-cover bg-center h-[350px] md:h-auto w-full rounded-3xl overflow-hidden'/>
      </section> 

      <section className='text-center my-10 md:my-24'>
        <h2 className='w-full font-bold text-4xl md:text-6xl tracking-tight px-16'>{hubFlowSectionTitle}</h2>
        <p className='w-full font-extralight text-base md:text-lg tracking-tight leading-tight md:leading-tight md:px-12'>{hubFlowSectionDescription}</p>
        <div className='flex flex-col md:flex-row gap-4 md:justify-between pt-6'>
          {aboutCardInfo.map(({ image, title, description }) => (
            <AboutCard image={image} title={title} description={description}/>
          ))}
        </div>
      </section>

      <section className='relative w-full overflow-hidden rounded-3xl'>
        <img src='/ocean_photo.jpg' alt="photo of sun shining on the ocean" className='object-cover bg-center h-[1000px] md:h-[500px] w-full'/>
        <div className='absolute inset-0 flex flex-col md:flex-row items-start justify-start md:justify-between p-4 pt-12 md:p-10'>
          <div className='md:w-[75%]'>
            <h2 className='font-bold text-4xl md:text-6xl tracking-tight'>{collabSectionTitle}</h2>
            <p className='font-extralight text-base tracking-tight leading-tight md:leading-tight py-2'>{collabSectionDescription1}</p>
            <p className='font-extralight text-base tracking-tight leading-tight md:leading-tight py-2'>{collabSectionDescription2}</p>
          </div>
          <div className='flex flex-col gap-6 pt-8 md:pt-16 md:w-[20%]'>
            {aboutPageLinks.map(({ text, url }) => (
              <a href={url} className='flex justify-between items-center border-b border-black hover:font-bold'>
                <p>{text}</p>
                <ArrowUpRight />
              </a>
            ))}
          </div>
        </div>
      </section>

      <BackToTopButton />

    </main> 
  )
}
