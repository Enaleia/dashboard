import { ArrowUpRight } from 'lucide-react'

const PageHeading = () => {
  return (
    <section className="w-full">
      <div className="flex flex-col lg:flex-row justify-between lg:gap-10 items-start">

        <div className="lg:w-[50%] flex flex-col gap-0.5 md:gap-2 lg:gap-4 font-light">
          <p className="text-xs md:text-sm font-extralight">Kayak</p>
          <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight">Enaleia x Nelo Kayak: Limited Edition</h1>
          <p className="text-xs md:text-sm font-extralight">Manufactured by: Nelo</p>
          <p className="text-xs md:text-sm font-extralight">The Enaleia x Nelo is the perfect choice for any person who is looking for an extra-stable and versatile kayak. Its extravagant design is specially developed to be a boat for all skill levels. With a stability level of 10/10, the Enaleia x Nelo makes paddling easy for everyone, even those who never paddle before. As usual, Nelo wants the best performance possible even in an entry-level boat, which makes the Enaleia x Nelo probably the fastest boat in its range.</p>
          <div className="bg-sand rounded-3xl">
            <p>This product has been attested on Ethereum Attestation service on Optimism network</p>
            <a className="flex justify-between">
              <p>View Certification & Attestation</p>
              <ArrowUpRight />
            </a>
          </div>
        </div>

        <div className='lg:w-[50%]'>
          <img src= "https://hq.enaleia-hub.com/assets/949aadb7-9740-4b9d-8250-f7c6c6f8f2fc"/>
        </div>
      </div>
    </section>
  )
}

export { PageHeading }