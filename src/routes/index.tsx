import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <main className='flex flex-col gap-14 md:gap-24 pt-10 pb-32 md:pt-20 bg-slate-100'>
      <section className='flex flex-col md:flex-row gap-6 md:gap-10 px-6 md:px-48'>
        <p className='w-full md:w-3/5 font-semibold text-3xl md:text-4xl tracking-wide'>Working Together with Fishers for a Sustainable Marine Ecosystem</p>
        <p className='w-full md:w-2/5 text-lg md:text-xl'>Welcome to the ENALEIA Hub—a dashboard that tracks the environmental efforts and impacts made by our community and partners. Our mission is to create a sustainable marine ecosystem by promoting circular and social economy solutions.</p>
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
          <MapContainer className='h-full z-0' center={[38.32217739504656, 23.952204640936014]} zoom={7} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
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
        <article className='w-[90%] md:w-[94%] h-[300px] md:h-[500px] mb-6 self-center bg-slate-300'></article>
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
