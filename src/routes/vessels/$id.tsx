import { createFileRoute, useSearch } from '@tanstack/react-router'
import { VesselSearchParams } from '@/types'
import { useState } from 'react'
import { DetailPageHeading } from '@/components/global/DetailPageHeading'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { StatsBar } from '@/components/global/StatsBar'
import { CollectionChart } from '@/components/charts/CollectionChart'
import { CustomChartLegend } from '@/components/charts/CustomChartLegend'
import { AttestationsTable } from '@/components/tables/AttestationsTable'
import { DetailPageBackNav } from '@/components/global/DetailPageBackNav'
import { BackToTopButton } from '@/components/global/BackToTopButton'
import { dateChoices, partnerDetailInfo, attestationDescriptions } from '@/config/texts'

/**
 * Creates a route for the vessel detail page using TanStack Router
 * This defines the component that will be rendered at the '/vessels/$id' path
 * The $id parameter is a dynamic route segment that represents the vessel's unique identifier
 */
export const Route = createFileRoute('/vessels/$id')({
  component: VesselDetailComponent,
})

/**
 * VesselDetailComponent - Detailed information page for a specific vessel
 * 
 * Displays comprehensive data about an individual vessel including:
 * - Vessel identification and registration details
 * - Collection statistics and performance metrics
 * - Time-series charts of waste collection activities
 * - Blockchain attestations for verification of collection activities
 * 
 * Data is loaded dynamically based on the vessel ID from the URL parameter
 * and additional vessel details from the search/query parameters
 */
function VesselDetailComponent() {
  // Extract vessel ID from route parameters
  const { id } = Route.useParams()
  // Extract vessel details from search/query parameters
  const search = useSearch({ from: `/vessels/$id` }) as VesselSearchParams
  const { name, country, port, type, collector_identity } = search
  // State for chart date range filter with default value "All time"
  const [selectedChartDates, setSelectedChartDates] = useState('All time')
  // Destructure text content from config
  const { heading, statSubtitle, statDescription } = partnerDetailInfo["Vessel"]

  return (
    <main className='flex flex-col justify-center items-center gap-8 m-auto pt-0 pb-16 lg:pb-32 md:pt-8 lg:pt-16 max-w-[1500px]'>
      {/* Vessel Header - Displays vessel name, country, port, type and collector ID */}      
      <DetailPageHeading name={name} country={country} registered_port={port} type={type} collector_id={collector_identity} />
      
      {/* Statistics Section - Shows key metrics about the vessel's activities */}
      <section className="border border-primary rounded-3xl overflow-hidden text-center">
        <h2 className="font-bold text-4xl md:text-5xl tracking-tight pt-12 lg:pb-12 px-4 md:px-10 lg:px-20">{heading}</h2>
        {/* Stats dashboard with vessel-specific metrics */}
        <StatsBar pageName='VesselDetail' partnerId={id}/>
        <Separator />
        {/* Additional contextual information about the statistics */}
        <div className='py-12 px-4 md:px-10 lg:px-20'>
          <h3 className='font-bold text-lg md:text-2xl tracking-tight leading-tight px-12 pb-2'>{statSubtitle}</h3>
          <p className='font-extralight tracking-tight leading-tight'>{statDescription}</p>
        </div>
      </section>

      {/* Collection Activity Chart Section - Visualizes collection data by action type */}
      <section className="w-full border border-primary rounded-3xl overflow-hidden pb-4 md:pb-14">
        {/* Chart header with title and time range filters */}
        <article className='flex flex-col lg:flex-row justify-between gap-6 lg:items-end px-4 py-8 md:p-12 md:pb-0'>
          <h2 className='font-bold text-3xl text-center lg:text-left tracking-tight'>Waste removed by action type</h2>
          {/* Time range filter buttons */}
          <div className="flex flex-row justify-center gap-1 md:gap-2">
            {dateChoices.map((choice) => (
              <Button
                key={choice}
                variant={selectedChartDates === choice ? 'default' : 'outline'}
                className='text-xs'
                onClick={() => setSelectedChartDates(choice)}
              >
                {choice}
              </Button>
            ))}
          </div>
        </article>

        <CollectionChart
          pageName='VesselDetail'
          partnerId={id}
          timeRange={selectedChartDates}
        />
        <CustomChartLegend category="activities" />
      </section>

      {/* Attestations Section - Displays blockchain verification records */}
      <section className='flex flex-col gap-3 my-6 md:my-20 w-full md:w-[85%]'>
        <h2 className='font-bold text-3xl md:text-5xl tracking-tight'>Attestations</h2>
        <p className='w-full md:w-[70%] font-extralight tracking-tight leading-tight md:leading-tight'>{attestationDescriptions["Vessel"]}</p>
        <Separator className='bg-softBlack my-1'/>
        <AttestationsTable pageName='VesselDetail' partnerId={id}/>
      </section>

      {/* Navigation back to vessels listing page */}   
      <DetailPageBackNav detailType='vessel'/>
      {/* Button to scroll back to top of page */}
      <BackToTopButton />
    </main>
  )
}