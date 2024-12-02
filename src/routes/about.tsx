import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

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
    </main> 
  )
}
