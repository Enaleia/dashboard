import { createFileRoute } from '@tanstack/react-router'
import { PageHeading } from '@/components/products/PageHeading'
import { ActivityMap } from '@/components/maps/ActivityMap'

export const Route = createFileRoute('/products/$id')({
  component: ProductDetailComponent
})

function ProductDetailComponent() {
  const { id } = Route.useParams()
  return (
    <main className='flex flex-col justify-center items-center gap-8 md:gap-20 m-auto pb-16 md:pb-24 md:pt-8 lg:pt-16 max-w-[1500px]'>
      <PageHeading productId={id} dataCategory="Heading"/>
      <section className='w-full'>
        <h2>Traceablitiy</h2>
        <p>Actions performed by each partner contributing to this product</p>
        <div className='overflow-hidden rounded-3xl'>
          <ActivityMap pageName='Home' partnerType='See all'/>
        </div>
      </section>
    </main>
  )
}
