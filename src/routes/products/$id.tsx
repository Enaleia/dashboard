import { createFileRoute } from '@tanstack/react-router'
import { PageHeading } from '@/components/products/PageHeading'
import { Metadata } from '@/components/products/Metadata'
import { ActivityMap } from '@/components/maps/ActivityMap'
import { AttestationsTable } from '@/components/tables/AttestationsTable'
import { BackToTopButton } from '@/components/global/BackToTopButton'
import { Separator } from '@/components/ui/separator'
import { attestationDescriptions } from '@/config/texts'

/**
 * Creates a route for the product detail page using TanStack Router
 * This defines the component that will be rendered at the '/products/$id' path
 * The $id parameter is a dynamic route segment that represents the product's unique identifier
 */
export const Route = createFileRoute('/products/$id')({
  component: ProductDetailComponent
})

/**
 * ProductDetailComponent - Detailed information page for a specific product
 * 
 * Displays comprehensive data about an individual product including:
 * - Product identification and header information
 * - Interactive map showing the supply chain and traceability
 * - Product metadata and batch information
 * - Blockchain attestations verifying product authenticity
 * 
 * The page uses a consistent section layout pattern through the Section component
 * to maintain visual consistency across different information categories
 */
function ProductDetailComponent() {
  // Extract product ID from route parameters
  const { id } = Route.useParams()
  return (
    <main className='flex flex-col justify-center items-center gap-8 m-auto pb-16 md:pb-24 md:pt-8 lg:pt-16 max-w-[1500px]'>
      {/* Product Header - Displays product name and primary information */} 
      <PageHeading productId={id} dataCategory="Heading"/>
      {/* Traceability Section - Shows interactive map of product journey */}
      <Section 
        title='Traceability'
        description='Actions performed by each partner contributing to this product.'
        children={<ActivityMap pageName='Product' productId={id} />}
      />
      {/* Batch Information Section - Displays product specs and composition */}
      <Section 
        title='Batch information'
        description='Key production and compostion info for this product.'
        children={<Metadata productId={id} dataCategory="Metadata" />}
      />  
      {/* Attestations Section - Shows blockchain verification records */}
      <Section 
        title='Attestations'
        description={attestationDescriptions["Product"]}
        children={<AttestationsTable pageName='Product' partnerId={id} />}
      />
      {/* Button to scroll back to top of page */}
      <BackToTopButton />
    </main>
  )
}

interface SectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

// reusable component for product page sections with standarized styling
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
