import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { PageHero } from '@/components/page-hero'
import { StatsBar } from '@/components/stats-bar'
import { ActivityMap } from '../components/activity-map'
import { CollectionsChart } from '@/components/collections-chart'
import { CustomChartLegend } from '@/components/custom-chart-legend'
import { CircleArrowDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { BackToTopButton } from '@/components/back-to-top'
import { homePageTexts, dateChoices } from '@/config/texts'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  const { 
    heroTitle, 
    heroDescription, 
    impactSectionTitle, 
    impactSectionDescription, 
    wasteChartTitle, 
    wasteChartDescription,
    collabSectionTitle,
    collabSectionDescription
  } = homePageTexts

  const [selectedChartDates, setSelectedChartDates] = useState('This year')

  return (
    <main className='flex flex-col justify-center items-center gap-8 md:gap-20 m-auto pb-16 md:pb-24 md:pt-24 max-w-[1500px]'>
      <section className='flex flex-col items-center gap-6'>
        <PageHero title={heroTitle} description={heroDescription} width='75'/>
        <div 
          className='flex flex-row justify-center items-center gap-2 font-normal text-ocean cursor-pointer'
          onClick={() => window.scrollTo({ top: 2000, behavior: 'smooth'})}
        >
          <CircleArrowDown color="#2985D0" strokeWidth={2}/>
          <p>Explore the data</p>
        </div>
      </section>

      <section className='overflow-hidden border border-primary rounded-3xl'>
        <article className='relative w-full pb-8'>
          <img src='/impact_photo.jpg' alt="photo of port operations" className='object-cover bg-center h-[350px] md:h-auto w-full'/>
          <div className='absolute inset-0 flex flex-col items-center justify-center text-center text-sand'>
            <p className='w-full font-bold text-5xl md:text-7xl tracking-tight px-10 pt-4 md:pt-10'>{impactSectionTitle}</p>
            <p className='w-[90%] md:w-[60%] font-extralight text-lg md-text-xl tracking-tight leading-tight md:leading-tight py-2 md:py-6'>{impactSectionDescription}</p>
          </div>
        </article>
        <StatsBar pageId='home'/>
        <ActivityMap locationType='See all'/>
      </section>
      
      <section className='flex flex-col border border-primary rounded-3xl'>
        <article className='flex flex-col md:flex-row justify-between items-end p-4 md:p-12 md:pb-0'>
          <div className='w-full md:w-[65%] tracking-tight'>
            <p className='font-bold text-5xl md:text-6xl pb-4 tracking-tight'>{wasteChartTitle}</p>
            <p className='font-extralight text-base md-text-xl tracking-tight leading-tight md:leading-tight'>{wasteChartDescription}</p>
          </div>
          <div className='flex flex-col justify-end items-end m-auto md:m-0 pt-4 md:pt-0'>
            <p className='text-xs font-extralight'>Last update: mm/dd/yyyy</p>
            <div className='flex flex-row justify-between md:justify-start gap-2 py-4'>
              {dateChoices.map((choice) => (
                <Button 
                  key={choice}
                  variant={selectedChartDates === choice ? "default" : "outline"}
                  onClick={() => setSelectedChartDates(choice)}
                >
                  {choice}
                </Button>
              ))}
            </div>
          </div>
        </article>

        <CollectionsChart category='materials' timeRange={selectedChartDates}/>
        <CustomChartLegend category='materials' />
        <article className='font-extralight text-base md:text-lg text-center p-6 md:p-12'>
          <p>
            To understand the breakdown of plastic material and its origin, please view our
            <Link to="/locations" className='font-bold'>&nbsp;&nbsp;locations page</Link>
          </p>
        </article>
      </section>

      <section className='flex flex-col items-center gap-6 m-auto w-full md:w-[85%] text-center tracking-tight pt-10 px-4 md:px-0'>
        <p className='font-bold text-3xl md:text-5xl tracking-tight'>{collabSectionTitle}</p>
        <p className='w-full text-base md-text-lg font-extralight leading-tight md:leading-tight'>{collabSectionDescription}</p>
        <Link to="/economy" >
          <Button className='px-6'>Learn more about the circular economy</Button>        
        </Link>
        <BackToTopButton />
      </section>
    </main>
  )
}
