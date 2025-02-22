import { useProductData } from '@/hooks/api/useProductData'
import { ProductData } from '@/types'

interface MetadataProps {
  productId: string
  dataCategory: ProductData
}

const Metadata = ({ productId, dataCategory }: MetadataProps) => {
  // Fetch product data from API
  const { isPending, error, data } = useProductData({ productId, dataCategory })
  // console.log(data.meta.stats)
  const { stats = {}, materials = {} } = data?.meta ?? {}
  // const { stats, materials } = data.meta
  // const stats = data.meta.stats
  // const materials = data.meta.materials

  if (isPending || error) {
    return (
      <article className="w-full lg:h-[598px] flex flex-col justify-center items-center text-center text-lg px-10">
          <>
            {isPending && <p>Loading attestation data...</p>}
            {error && <p>Sorry! We are not able to build the attestation table at this time.</p>}
            <img src="/illustrations/dolphin.svg" alt="dolphin illustration" className="w-[300px] h-[300px]"/>
          </>
      </article>
    )
  }

  // const meta = {
  //   "stats": {
  //     "Product weight per item": 17.3, 
  //     "Production date": '01/22/2025',
  //     "Batch quantity": '50',
  //     "Ocean-sourced materials used": 3882,
  //     "Non ocean-sourced materials used": 982,
  //     "Percentage made with ocean sourced waste": '20%'
  //   },
  //   "materials": {
  //     "High-Density Polyethylene": 1234,
  //     "Polypropylene": 1643,
  //     "...additional materials": 54
  //   }
  // }

  return (
    <article className='pt-2'>
      {Object.entries(stats).map(([title, value], index) => (
        <>
          <div key={title} className={`flex justify-between text-sm ${index > 0 ? 'border-t border-darkSand' : ''} py-2`}>          
            <p>{title}</p>
            <p className='font-bold'>{value as string | number}<span className='font-extralight'>{typeof value === 'number' ? ' kg' : ''}</span></p>
          </div>
          {index === 3 && Object.entries(materials).map(([material, value]) => (
            <div key={material} className='flex justify-between text-sm pl-2'>
              <p className='font-extralight'>{material}</p>
              <p className='font-bold'>{value as number}<span className='font-extralight'>{typeof value === 'number' ? ' kg' : ''}</span></p>
            </div>
          ))}
        </>
      ))}
    </article>
  )
}

export { Metadata }