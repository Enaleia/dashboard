import { createFileRoute } from '@tanstack/react-router'
import { AboutCard } from '@/components/about-card'
import { ArrowUpRight } from 'lucide-react'

const aboutCardInfo = [
  {
    image: 'turtle_rings',
    title: 'Log waste collection at the port',
    description: 'Using the mobile app, each port coordinator records and submits data directly to the blockchain. The mobile app operates as a distributed node, with each user having their own account (wallet) to interact securely with the blockchain.<br/><br/>The mobile app is currently in testing phase. If you are interested to learn more about our code, please visit the <a href="" style="font-weight: bold">repository</a>.',
  },
  {
    image: 'fish',
    title: 'Tag physical items with unique tracking codes',
    description: 'Waste collected by the fisher community is sent to recyclers with a unique 6-digit tag for traceability.<br/><br/> As the waste is processed, it is tracked through each stage to its final destination. Enaleia supports a <a href="" style="font-weight: bold">circular economy</a>—learn more about the products created from our efforts.',
  },
  {
    image: 'octopus',
    title: 'Immutably attest to collected data',
    description: 'Each data submission by port coordinators is stored on the blockchain in a human-readable format. This ensures that future marine scientists or environmentalists can reference historical data for research.<br/><br/> We use <a href="" style="font-weight: bold">Ethereum Attestation Service</a> to certify the authenticity of this data. How to read the data we attested? Learn more about our <a href="" style="font-weight: bold">attestation scheme</a>.',
  },
  {
    image: 'crab',
    title: 'Demonstrate transparency',
    description: 'Our public dashboard is a critical tool for showcasing transparency and highlighting the impact of our efforts.<br/><br/> All data visualizations are backed by attestations, and public users can verify them via the <a href="" style="font-weight: bold">blockchain explorer</a>.',
  }
]

const aboutPageLinks = [
  {
    text: 'Propose idea in Github forum',
    url: ''
  },
  {
    text: 'Chat with us on Discord',
    url: ''
  },
  {
    text: 'Follow updates on X',
    url: ''
  }
]

export const Route = createFileRoute('/about')({
  component: AboutComponent,
})

function AboutComponent() {
  return (
    <main className='flex flex-col justify-center items-center gap-20 md:gap-36 m-auto pt-0 pb-20 md:pb-32 md:pt-16 max-w-[1500px]'>
      
      <section className='flex flex-col items-center gap-6 text-center mx-4 md:mx-16'>
        <h1 className='w-full font-bold text-5xl md:text-7xl tracking-tight md:px-48'>Transparency. Accountability. Open source data on a distributed network.</h1>
        <p className='w-full font-extralight text-lg md:text-xl tracking-tight leading-tight md:leading-tight'>Enaleia Hub is a step toward sustainable innovation, open collaboration, and fostering trust in the data that drives ocean clean-up efforts.</p>
        <img src='/about_photo.jpg' alt="photo of port operations" className='object-cover bg-center h-[350px] md:h-auto w-full rounded-3xl overflow-hidden'/>
      </section> 

      <section className='text-center mx-4 md:mx-16'>
        <h2 className='w-full font-bold text-4xl md:text-6xl tracking-tight px-16'>How does Enaleia Hub work?</h2>
        <p className='w-full font-extralight text-base md:text-lg tracking-tight leading-tight md:leading-tight md:px-48'>The Hub is a data visualization and traceability platform built to streamline operational workflows for Enaleia. By leveraging blockchain technology, it enhances transparency and efficiency in tracking and managing environmental efforts. The Hub integrates multiple interfaces, including a backend to store data and a custom connector to support the internal operations team in submitting data as attestations. It empowers all stakeholders—whether part of Enaleia or external partners—to contribute to data submission seamlessly.</p>
        <div className='flex flex-col md:flex-row gap-4 md:justify-between pt-6'>
          {aboutCardInfo.map(({ image, title, description }) => (
            <AboutCard image={image} title={title} description={description}/>
          ))}
        </div>
      </section>

      <section className='mx-4 md:mx-16'>
        <div className='relative w-full overflow-hidden rounded-3xl'>
          <img src='/ocean_photo.jpg' alt="photo of sun shining on the ocean" className='object-cover bg-center h-[1000px] md:h-auto w-full'/>
          <div className='absolute inset-0 flex flex-col md:flex-row items-start justify-start md:justify-between p-4 pt-12 md:p-10'>
            <div className='md:w-[75%]'>
              <h2 className='font-bold text-4xl md:text-6xl tracking-tight'>Collaboration for impact</h2>
              <p className='font-extralight text-base md-text-xl tracking-tight leading-tight md:leading-tight py-2'>This first release has been developed by Pollen Labs to accelerate collaboration and innovation.  Our vision extends beyond Enaleia, as this platform aims to inspire similar organizations to adopt public blockchain technology, aligning with Ethereum’s values. While designed for decentralized applications, Ethereum also offers powerful enterprise solutions, providing instant data transparency and accountability. We envision that any enterprise striving for transparency can easily adopt and replicate this solution—because ultimately, it’s for the environment we all share.</p>
              <p className='font-extralight text-base md-text-xl tracking-tight leading-tight md:leading-tight py-2'>There are many ways to collaborate and strengthen this solution. We invite you to join our conversation.</p>
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
        </div>
      </section>

    </main> 
  )
}
