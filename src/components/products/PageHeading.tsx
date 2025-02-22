import { useProductData } from '@/hooks/api/useProductData'
import { ProductData } from '@/types'
import { ArrowUpRight } from 'lucide-react'

interface PageHeadingProps {
  productId: string
  dataCategory: ProductData
}

const PageHeading = ({ productId, dataCategory }: PageHeadingProps) => {
  // Fetch product data from API
  const { isPending, error, data } = useProductData({ productId, dataCategory })
  const { type, name, manufacturedBy, image, description, UID } = data?.product || {}
  // const product = data.product

  if (isPending || error) {
    return (
      <article className="w-full lg:h-[598px] flex flex-col justify-center items-center text-center text-lg px-10">
          <>
            {isPending && <p>Loading product data...</p>}
            {error && <p>Sorry! We are not able to show the product information at this time.</p>}
            <img src="/illustrations/dolphin.svg" alt="dolphin illustration" className="w-[300px] h-[300px]"/>
          </>
      </article>
    )
  }

  return (
    <section className="w-full">
      <div className="flex flex-col lg:flex-row justify-between lg:gap-10 items-start">

        <article className="lg:w-[50%] flex flex-col gap-0.5 md:gap-2 lg:gap-4 font-light">
          <p className="text-xs md:text-sm font-extralight">{type}</p>
          <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight">{name}</h1>
          <p className="text-xs md:text-sm font-extralight">Manufactured by:<strong> {manufacturedBy}</strong></p>
          <p className="text-sm md:text-base font-extralight tracking-tighter leading-3">{description}</p>
          <div className="bg-sand rounded-3xl">
            <p>This product has been attested with Ethereum Attestation Service on Optimism network</p>
            <a 
              href={`https://optimism.easscan.org/attestation/view/${UID}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex justify-between"
            >
              <p>View Certification & Attestation</p>
              <ArrowUpRight />
            </a>
          </div>
        </article>

        <article className='lg:w-[50%]'>
          <img src={image} alt="product image"/>
        </article>
      </div>
    </section>
  )
}

export { PageHeading }