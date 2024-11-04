import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { StatsBar } from '@/components/stats-bar'
import { ActivityMap } from '../components/activity-map'
import { AreaChart } from '../components/area-chart'
import { CircleArrowDown, CircleArrowUp } from 'lucide-react'
import { Button, buttonVariants } from "@/components/ui/button"
import chartData from '../chart_data.json'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  const [selectedMapDates, setSelectedMapDates] = useState('All time')
  const [selectedChartDates, setSelectedChartDates] = useState('All time')
  const dateChoices = ["All time", "Last year", "Last 30 days"]

  return (
    <main className='flex flex-col justify-center items-center gap-14 md:gap-24 m-auto pt-10 pb-32 md:pt-16 max-w-[1500px]'>
      <section className='flex flex-col items-center gap-6 px-6 text-center'>
        <h1 className='w-full font-bold text-3xl md:text-6xl leading-10 md:px-80'>Working together with fishers for a sustainable marine ecosystem</h1>
        <p className='w-full font-extralight text-base md:text-lg md:px-60'>Welcome to the ENALEIA Hub—a dashboard that tracks the environmental efforts and impacts made by our community and partners. Our mission is to create a sustainable marine ecosystem by promoting circular and social economy solutions.</p>
        <div 
          className='flex flex-row items-center gap-2 font-extralight text-[#2985D0] cursor-pointer'
          onClick={() => window.scrollTo({ top: 2000, behavior: 'smooth'})}
        >
          <CircleArrowDown color="#2985D0" strokeWidth={1}/>
          <p>Explore the data</p>
        </div>
      </section>

      <section className='overflow-hidden border border-black rounded-3xl mx-2 md:mx-16'>
        <article className='relative w-full'>
          <img src='/impact_photo.jpg' alt="photo of port operations" className='object-cover bg-center'/>
          <div className='absolute inset-0 flex flex-col items-center justify-center text-center text-[#F6F4F2]'>
            <p className='w-full font-bold text-2xl md:text-5xl pt-4 md:pt-10'>Our impact at a glance</p>
            <p className='w-[90%] md:w-[60%] font-extralight text-base md-text-xl py-2 md:py-6'>Since 2023, we’ve partnered with local fishers to promote a healthier marine environment. Alongside our professional training programs, we empower fishers to be active stewards of the ocean by incentivizing sustainable practices and marine conservation efforts.</p>
            <div className='flex flex-row justify-center gap-3 text-black text-sm'>
              {dateChoices.map((choice) => (
                <Button 
                variant={selectedMapDates === choice ? "secondary" : "outline2"}
                onClick={() => setSelectedMapDates(choice)}
              >
                {choice}
              </Button>
              ))}
            </div>
          </div>
        </article>
        <StatsBar/>
        <article className='w-full h-[300px] md:h-[700px]'>
          <ActivityMap />
        </article>
      </section>
      
      <section className='flex flex-col border border-black rounded-3xl mx-2 md:mx-16 md:p-12'>
        <article className='flex flex-col md:flex-row md:justify-between md:items-end'>
          <div className='w-[55%]'>
            <p className='font-bold text-2xl md:text-5xl pb-2 md:pb-4'>Waste collection insights</p>
            <p className='font-extralight text-base md-text-xl'>Plastic waste makes up the majority of what our community collects. Various factors, such as tourism and fishing seasons, influence the trends in our data. Explore how these dynamics shape our collection efforts over time.</p>
          </div>
          <div className='flex flex-row justify-around md:justify-start gap-2 p-4 md:p-8'>
            {dateChoices.map((choice) => (
              <Button 
                variant={selectedChartDates === choice ? "default" : "outline"}
                onClick={() => setSelectedChartDates(choice)}
              >
                {choice}
              </Button>
            ))}
          </div>
        </article>
        <article className='w-[90%] md:w-[94%] h-[300px] md:h-[500px] mb-6 self-center'>
          <AreaChart data={chartData}/>
        </article>
        <p className='font-extralight text-lg md:text-xl text-center'>To understand the breakdown of plastic material and its origin, please view locations page.</p>
      </section>

      <section className='flex flex-col items-center gap-4 m-auto w-full md:w-[60%] md:gap-8 text-center'>
        <p className='font-bold text-3xl'>ENALEIA partners with environmentally conscious organizations and companies dedicated to closing the loop on waste and promoting sustainability.</p>
        <p className='w-full text-base md-text-lg'>Collaboration is essential for a successful transition to circularity. ENALEIA partners with certified recycling and upcycling organizations that are transforming collected marine plastic into valuable resources, seamlessly integrating it into the circular economy.</p>
        <Link 
          className={buttonVariants({ variant: "default" })}
          to="/economy"
            activeProps={{
              className: 'font-bold',
            }}
        >
          Learn more about the circular economy
        </Link>
        <div 
          className='flex flex-row items-center gap-2 pt-8 font-extralight text-[#2985D0] cursor-pointer'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}
        >
          <CircleArrowUp color="#2985D0" strokeWidth={1}/>
          <p>Back to top</p>
        </div>
      </section>
    </main>
  )
}
