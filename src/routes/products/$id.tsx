/*
* Product Detail Page Component
* 
* A comprehensive product page displaying various sections of product information.
* Uses TanStack Router for routing and parameter handling.
* Sections include:
* - Product heading information
* - Traceability map
* - Product metadata
* - Blockchain attestations
*/

import { createFileRoute } from '@tanstack/react-router'
import { PageHeading } from '@/components/products/PageHeading'
import { Metadata } from '@/components/products/Metadata'
import { ActivityMap } from '@/components/maps/ActivityMap'
import { AttestationsTable } from '@/components/tables/AttestationsTable'
import { BackToTopButton } from '@/components/global/BackToTopButton'
import { Separator } from '@/components/ui/separator'
import { attestationDescriptions } from '@/config/texts'

export const Route = createFileRoute('/products/$id')({
  component: ProductDetailComponent
})

function ProductDetailComponent() {
  const { id } = Route.useParams()
  console.log(id)
  return (
    <main className='flex flex-col justify-center items-center gap-8 m-auto pb-16 md:pb-24 md:pt-8 lg:pt-16 max-w-[1500px]'>
      <PageHeading productId={id} dataCategory="Heading"/>
      <Section 
        title='Traceability'
        description='Actions performed by each partner contributing to this product'
        children={<ActivityMap pageName='Product' productId={id} />}
      />
      <Section 
        title='Metadata'
        description='Key information about this product & its production info'
        children={<Metadata productId={id} dataCategory="Metadata" />}
      />  
      <Section 
        title='Attestations'
        description={attestationDescriptions["Product"]}
        children={<AttestationsTable pageName='Product' partnerId={id} />}
      />
      <BackToTopButton />
    </main>
  )
}

interface SectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const Section = ({ title, description, children }: SectionProps) => (
  <section className='flex flex-col gap-3 my-6 w-full'>
    <h2 className='font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight'>{title}</h2>
    <p className='w-full md:w-[70%] font-extralight tracking-tight leading-tight md:leading-tight'>
      {description}
    </p>
    <Separator className='bg-softBlack my-1'/>
    {children}
  </section>
)
