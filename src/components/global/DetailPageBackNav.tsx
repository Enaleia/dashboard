import { Link } from "@tanstack/react-router";

/**
 * DetailPageBackNav - Navigation component for returning to listing pages
 * 
 * Creates a visually appealing full-width banner with background image that serves
 * as a navigation link back to the parent listing page (Locations or Vessels).
 * 
 * Features:
 * - Context-aware background image based on detail type
 * - Clear text prompt to return to the listing page
 * - Consistent styling with rounded corners and overlay text
 * - Responsive height adjustment for different screen sizes
 * 
 * @param {Object} props - Component props
 * @param {string} props.detailType - Type of detail page ("location" or "vessel")
 */
const DetailPageBackNav = ({ detailType }: {detailType: string}) => {
  return (
    <section className='relative w-full rounded-3xl overflow-hidden'>
      {/* Background image that changes based on detail type */}
      <img 
        src={`/images/${detailType}.jpg`} 
        alt={detailType === "location" ?  'underwater scene' : 'fishing vessel helm'} 
        className='object-cover bg-center h-[120px] md:h-auto w-full'
      />
      {/* Navigation link with text overlay */}
      <Link 
        to={`/${detailType}s`} 
        className='absolute inset-0 flex flex-col items-center justify-center text-center text-sand text-2xl font-semibold'
      >
        Go back to all {detailType}s
      </Link>
    </section>
  )
}

export { DetailPageBackNav }