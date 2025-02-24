/**
 * Metadata Component
 * 
 * Displays product metadata including material composition.
 * Renders stats as key-value pairs with nested materials list after the fourth stat.
 * Handles loading and error states with a fallback UI.
 */

import { useProductData } from '@/hooks/api/useProductData'
import { ProductData } from '@/types'

interface MetadataProps {
  productId: string               // Unique identifier for the product
  dataCategory: ProductData       // Category of product data to fetch
}

const Metadata = ({ productId, dataCategory }: MetadataProps) => {
   // Fetch product data from API with loading/error states
  const { isPending, error, data } = useProductData({ productId, dataCategory })
  const { stats = {}, plastics = {} } = data?.meta ?? {}

  /*
  * Loading/Error state view
  * Shows loading message or error with dolphin illustration
  */
  if (isPending || error) {
    return (
      <article className="w-full h-[382px] flex flex-col justify-center items-center text-center text-lg px-10">
          <>
            {isPending && <p>Loading metadata stats...</p>}
            {error && <p>Sorry! We are not able to display the metadata at this time.</p>}
            <img src="/illustrations/dolphin.svg" alt="dolphin illustration" className="w-[300px] h-[300px]"/>
          </>
      </article>
    )
  }

  return (
    <article className='pt-2'>
      {/* Render each stat title and its value */}
      {Object.entries(stats).map(([title, value], index) => (
        <div key={title} className={`flex justify-between text-sm ${index > 0 ? 'border-t border-darkSand' : ''} py-2`}>          
          <p>{title}</p>
          <p className='font-bold'>{value as string | number}<span className='font-extralight'>{typeof value === 'number' ? ' kg' : ''}</span></p>
        </div>
      ))}
      {/* Render recycled plastics breakdown */}
      {Object.entries(plastics).map(([plastic, value]) => (
        <div key={plastic} className='flex justify-between text-sm pl-2 pt-2'>
          <p className='font-extralight'>{plastic}</p>
          <p className='font-bold'>{value as number}</p>
        </div>
      ))}

    </article>
  )
}

export { Metadata }