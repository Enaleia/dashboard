import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useMediaQuery } from '@/hooks/ui/useMediaQuery'
import { PageHero } from '@/components/global/PageHero'
import { StatsBar } from '@/components/global/StatsBar'
import { ActivityMap } from '../components/maps/ActivityMap'
import { CollectionChart } from '@/components/charts/CollectionChart'
import { CustomChartLegend } from '@/components/charts/CustomChartLegend'
import { CircleArrowDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { BackToTopButton } from '@/components/global/BackToTopButton'
import { homePageTexts, dateChoices } from '@/config/texts'
import { DESKTOP_BREAKPOINT } from '@/config/constants'

/**
 * Creates a route for the home page using TanStack Router
 * This defines the component that will be rendered at the '/' path
 */
export const Route = createFileRoute('/')({
  component: HomeComponent,
})

/**
 * HomeComponent - Main landing page for the application
 * 
 * Displays an overview of the application with:
 * - Hero section with title and description
 * - Impact visualization section with stats and map
 * - Waste collection data charts with time range filtering
 * - Collaboration section with links to more information
 * 
 * Layout is responsive with different arrangements for mobile and desktop
 */

function HomeComponent() {
  // Destructure text content from config
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

  // State for chart date range filter with default value "All time"
  const [selectedChartDates, setSelectedChartDates] = useState('All time')
    // Responsive layout handling based on screen size
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT)

  return (
    <main className='flex flex-col justify-center items-center gap-8 md:gap-20 m-auto pb-16 md:pb-24 md:pt-8 lg:pt-16 max-w-[1500px]'>
      {/* Hero Section - Displays page title, description and scrolling helper */}
      <section className='flex flex-col items-center gap-6'>
        <PageHero title={heroTitle} description={heroDescription}/>
        <div 
          className='flex flex-row justify-center items-center gap-2 font-normal text-ocean cursor-pointer'
          onClick={() => window.scrollTo({ top: isDesktop ? 1950: 2300, behavior: 'smooth'})}
        >
          <CircleArrowDown color="#2985D0" strokeWidth={2}/>
          <p>Explore the data</p>
        </div>
      </section>
      {/* Impact Visualization Section - Shows key stats and activity map */}
      <section className='overflow-hidden border border-primary rounded-3xl'>
        {/* Hero image with overlay text */}
        <article className='relative w-full pb-8'>
          <img 
            src='/images/home.jpg' 
            alt="photo of port operations" 
            className='object-cover bg-center h-[350px] md:h-[450px] lg:h-auto w-full'
          />
          <div className='absolute inset-0 flex flex-col items-center justify-center text-center text-sand'>
            <p className='w-full font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight px-10 pt-4 md:pt-10'>{impactSectionTitle}</p>
            <p className='w-[90%] md:w-[60%] font-extralight text-lg md-text-xl tracking-tight leading-tight md:leading-tight py-2 md:py-6'>{impactSectionDescription}</p>
          </div>
        </article>
        <StatsBar pageName='Home'/>
        <ActivityMap pageName='Home'/>
      </section>
      {/* Waste Collection Data Section - Displays charts with time filtering */}
      <section className='flex flex-col border border-primary rounded-3xl pb-4'>
        {/* Chart header with title, description and time range filters */}
        <article className='px-4 py-8 md:p-12 md:pb-0'>
          <p className='font-bold text-5xl md:text-6xl tracking-tight'>{wasteChartTitle}</p>
          <div className='flex flex-col lg:flex-row lg:items-end lg:gap-8'>
            <p className='font-extralight text-base md-text-xl tracking-tight leading-tight md:leading-tight pt-2 pb-4 lg:pb-0'>{wasteChartDescription}</p>
            {/* Time range filter buttons */}
            <div className='flex flex-row justify-center gap-1 md:gap-2'>        
              {dateChoices.map((choice) => (
                <Button 
                  key={choice}
                  variant={selectedChartDates === choice ? "default" : "outline"}
                  className='text-xs'
                  onClick={() => setSelectedChartDates(choice)}
                >
                  {choice}
                </Button>
              ))}
            </div>
          </div>
        </article>
        
        <CollectionChart pageName='Home' timeRange={selectedChartDates}/>
        <CustomChartLegend category='materials' />

        <article className='font-extralight text-base md:text-lg text-center p-6 md:p-12'>
          <p>
            To explore the individual collection activities of our partners, please view our
            <Link to="/locations" className='font-bold'>&nbsp;&nbsp;locations page</Link>
          </p>
        </article>
      </section>
      {/* Collaboration Section - Information about the project with CTA */}
      <section className='flex flex-col items-center gap-8 m-auto w-full lg:w-[85%] text-center tracking-tight pt-10 px-4 md:px-0'>
        <p className='font-bold text-3xl md:text-5xl tracking-tight'>{collabSectionTitle}</p>
        <p className='w-full text-base md-text-lg font-extralight leading-tight md:leading-tight'>{collabSectionDescription}</p>
        <Link to="/about" >
          <Button className='px-6'>Learn more about how it works</Button>        
        </Link>
        <Link to="https://enaleia-hub.com/products/4767" className="font-bold text-base">
          See product tracing demo
        </Link>
        {/* Button to scroll back to top of page */}
        <BackToTopButton />
      </section>
    </main>
  )
}
