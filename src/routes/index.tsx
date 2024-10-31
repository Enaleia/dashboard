import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ActivityMap } from '../components/activity-map'
import { AreaChart } from '../components/area-chart'
import { CircleArrowDown } from 'lucide-react';
import chartData from '../chart_data.json'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <main className='flex flex-col justify-center items-center gap-14 md:gap-24 m-auto pt-10 pb-32 md:pt-16 max-w-[1500px]'>
      <section className='flex flex-col items-center gap-6 px-6 text-center'>
        <h1 className='w-full font-bold text-3xl md:text-6xl leading-10 md:px-80'>Working together with fishers for a sustainable marine ecosystem</h1>
        <p className='w-full font-extralight text-base md:text-lg md:px-60'>Welcome to the ENALEIA Hub—a dashboard that tracks the environmental efforts and impacts made by our community and partners. Our mission is to create a sustainable marine ecosystem by promoting circular and social economy solutions.</p>
        <div className='flex flex-row items-center gap-2 font-extralight text-[#2985D0]'>
          <CircleArrowDown color="#2985D0" strokeWidth={1}/>
          <p>Explore the data</p>
        </div>
      </section>
      <section className='flex flex-col gap-4 text-center px-6 md:px-48'>
        <p className='w-full font-semibold text-2xl md:text-3xl'>Our Impact at a Glance</p>
        <p className='w-full text-base md-text-lg'>Since 2023, we’ve partnered with local fishers to promote a healthier marine environment. Alongside our professional training programs, we empower fishers to be active stewards of the ocean by incentivizing sustainable practices and marine conservation efforts.</p>
      </section>
      <section className='flex flex-col gap-3 md:gap-8 bg-white mx-6 md:mx-16'>
        <article className='flex flex-row justify-around md:justify-start gap-2 p-4 md:p-8'>
          <button className='bg-slate-300 p-2'>All time</button>
          <button className='bg-slate-300 p-2'>Last year</button>
          <button className='bg-slate-300 p-2'>Last 30 days</button>
        </article>
        <article className='flex flex-col md:flex-row items-center md:justify-around'>
          <p className='font-semibold text-2xl md:4xl'>520k</p>
          <p className='font-semibold text-2xl md:4xl'>12k</p>
          <p className='font-semibold text-2xl md:4xl'>5</p>
          <p className='font-semibold text-2xl md:4xl'>145</p>
          <p className='font-semibold text-2xl md:4xl'>87</p>
        </article>
        <article className='w-[90%] md:w-[94%] h-[300px] md:h-[700px] my-6 self-center bg-slate-300'>
          <ActivityMap />
        </article>
      </section>
      <section className='flex flex-col gap-4 px-6 md:px-20'>
        <p className='w-full font-semibold text-2xl md:text-3xl'>Waste Collection Insights</p>
        <p className='w-full text-base md-text-lg'>Plastic waste makes up the majority of what our community collects. Various factors, such as tourism and fishing seasons, influence the trends in our data. Explore how these dynamics shape our collection efforts over time.</p>
      </section>
      <section className='flex flex-col gap-3 md:gap-8 bg-white mx-6 md:mx-16'>
        <article className='flex flex-row justify-around md:justify-start gap-2 p-4 md:p-8'>
          <button className='bg-slate-300 p-2'>All time</button>
          <button className='bg-slate-300 p-2'>Last year</button>
          <button className='bg-slate-300 p-2'>Last 30 days</button>
        </article>
        <article className='w-[90%] md:w-[94%] h-[300px] md:h-[500px] mb-6 self-center'>
          <AreaChart data={chartData}/>
        </article>
      </section>
      <section className='flex flex-col gap-4 text-center px-6 md:px-48'>
        <p className='w-full font-semibold text-2xl md:text-3xl'>Circular Economy</p>
        <p className='w-full text-base md-text-lg'>Connecting with planet-conscious organizations and companies that are working on closing the loop on waste.</p>
        <button className='w-fit self-center bg-slate-300 p-3'>
          <Link
            to="/economy"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Learn more
          </Link>
        </button>
      </section>
    </main>
  )
}
