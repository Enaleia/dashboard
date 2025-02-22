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
    <main className='flex flex-col justify-center items-center gap-4 md:gap-8 m-auto pb-16 md:pb-24 md:pt-8 lg:pt-16 max-w-[1500px]'>
      <PageHeading productId={id} dataCategory="Heading"/>

      <section className='flex flex-col gap-3 my-6 w-full'>
        <h2 className='font-bold text-3xl md:text-5xl tracking-tight'>Traceablitiy</h2>
        <p className='w-full md:w-[70%] font-extralight tracking-tight leading-tight md:leading-tight'>
          Actions performed by each partner contributing to this product
        </p>
        <Separator className='bg-softBlack my-1'/>
        <div className='overflow-hidden rounded-3xl'>
          <ActivityMap pageName='Product' productId={id}/>
        </div>
      </section>

      <section className='flex flex-col gap-3 my-6 w-full'>
        <h2 className='font-bold text-3xl md:text-5xl tracking-tight'>Metadata</h2>
        <p className='w-full md:w-[70%] font-extralight tracking-tight leading-tight md:leading-tight'>
          Key information about this product & its production info
        </p>
        <Separator className='bg-softBlack my-1'/>
        <Metadata productId={id} dataCategory="Metadata"/>
      </section>

      <section className='flex flex-col gap-3 my-6 w-full'>
        <h2 className='font-bold text-3xl md:text-5xl tracking-tight'>Attestations</h2>
        <p className='w-full md:w-[70%] font-extralight tracking-tight leading-tight md:leading-tight'>
          {attestationDescriptions["Product"]}
        </p>
        <Separator className='bg-softBlack my-1'/>
        <AttestationsTable pageName='Product' partnerId={id}/>
      </section>

      <BackToTopButton />
    </main>
  )
}
