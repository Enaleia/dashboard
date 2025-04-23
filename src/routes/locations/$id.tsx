import { createFileRoute, useSearch } from '@tanstack/react-router'
import { LocationSearchParams, AttestationItem } from '@/types'
import { useState } from 'react'
import { DetailPageHeading } from '@/components/global/DetailPageHeading'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { StatsBar } from '@/components/global/StatsBar'
import { CollectionChart } from '@/components/charts/CollectionChart'
import { CustomChartLegend } from '@/components/charts/CustomChartLegend'
import { AttestationsTable, ColumnDef } from '@/components/tables/AttestationsTable'
import { DetailPageBackNav } from '@/components/global/DetailPageBackNav'
import { BackToTopButton } from '@/components/global/BackToTopButton'
import {
  dateChoices,
  partnerDetailInfo,
  attestationDescriptions,
} from '@/config/texts'
import { useAttestationData } from "@/hooks/api/useAttestationData"
import { ArrowUpRight } from 'lucide-react'

/**
 * Creates a route for the location detail page using TanStack Router
 * This defines the component that will be rendered at the '/locations/$id' path
 * The $id parameter is a dynamic route segment that represents the location's unique identifier
 */
export const Route = createFileRoute('/locations/$id')({
  component: LocationDetailComponent,
})

/**
 * LocationDetailComponent - Detailed information page for a specific location partner
 * 
 * Displays comprehensive data about an individual location (Port, Recycler, or Manufacturer) including:
 * - Location identification and geographical details
 * - Partner-specific description and context
 * - Collection statistics and performance metrics
 * - Time-series charts of waste collection activities (for Port locations only)
 * - Blockchain attestations for verification of collection/processing activities
 * 
 * Content is conditionally rendered based on the location type (Port, Recycler, Manufacturer)
 * with different sections appearing depending on the partner's role in the waste management chain
 */
function LocationDetailComponent() {
  // Extract location ID from route parameters
  const { id } = Route.useParams()
  // Extract location details from search/query parameters
  const search = useSearch({ from: `/locations/$id` }) as LocationSearchParams
  const { name, country, coordinates, type, addresses } = search

  // State for chart date range filter with default value "All time"
  const [selectedChartDates, setSelectedChartDates] = useState('All time')

  // Destructure text content from config
  const { heading, description, statSubtitle, statDescription } = partnerDetailInfo[type]

  // --- Fetch Attestation Data --- 
  const { isPending: isLoadingAttestations, error: attestationsError, data: attestationsResponse } = 
    useAttestationData({ pageName: 'LocationDetail', partnerId: id });
  
  // Provide default empty array if data is null/undefined
  const attestationsData: AttestationItem[] = attestationsResponse?.data ?? [];
  const totalAttestationRecords = attestationsResponse?.count ?? 0;
  // --- End Fetch Attestation Data ---

  // --- Define Columns for Location Table ---
  const locationColumns: ColumnDef<AttestationItem>[] = [
    {
      id: 'actionDate',
      header: 'Action date',
      cell: (item) => item.dateFormatted || 'N/A',
      width: 'w-[20%]',
      isSortable: true,
      sortAccessor: (item) => item.timestamp ? new Date(item.timestamp) : null,
    },
    {
      id: 'action',
      header: 'Action type',
      cell: (item) => item.action || 'N/A',
      width: 'w-[20%]',
    },
    {
      id: 'submittedBy',
      header: 'Submitted by',
      cell: (item) => item.submittedBy ? formatAddress(item.submittedBy) : 'N/A',
      width: 'w-[30%]',
    },
    {
      id: 'attestationUid',
      header: 'Attestation UID',
      cell: (item) => (
        <div className="flex items-center justify-between">
           <span>{item.id ? formatAddress(item.id, 10) : 'N/A'}</span> 
           <ArrowUpRight size={16} strokeWidth={1.5} className="ml-2 flex-shrink-0" />
        </div>
      ),
      width: 'w-[30%]',
    },
  ];
  // --- End Define Columns ---

  // --- Define Mobile Card Renderer --- 
  const renderLocationMobileCard = (item: AttestationItem) => {
      const attestationUrl = `https://optimism.easscan.org/attestation/view/${item.id}`;
      return (
          <a 
            href={attestationUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block text-current no-underline hover:text-current"
          >
            <div className='border border-darkSand rounded-2xl p-4 text-sm'> 
                <div className='flex justify-between items-start mb-1'>
                    <span className='text-sm text-gray-600'>{item.dateFormatted || 'N/A'}</span>
                </div>
                <p className='font-semibold text-2xl mb-1'>{item.action || 'N/A'}</p>
                <p className='text-sm text-gray-700 mb-6'>
                    Submitted by: {item.submittedBy ? formatAddress(item.submittedBy) : 'N/A'}
                </p>
                <div className='text-sm text-gray-700 flex items-center'>
                    Attestation UID: {item.id ? formatAddress(item.id, 10) : 'N/A'}
                    <ArrowUpRight size={14} strokeWidth={1.5} className="ml-1 flex-shrink-0" />
                </div>
            </div>
          </a>
      );
  };
  // --- End Define Mobile Card Renderer ---

  // --- Helper Function (Placeholder) ---
  // Simple address formatting utility 
  // TODO: Replace with actual utility from @/utils/formatAddress if it exists
  const formatAddress = (address: string | undefined | null, charsToShow = 6): string => {
    if (!address) return 'N/A';
    if (address.length <= charsToShow * 2 + 2) return address; // Don't format if too short
    return `${address.substring(0, charsToShow + 2)}...${address.substring(address.length - charsToShow)}`;
  };
  // --- End Helper Function ---

  return (
    <main className="flex flex-col justify-center items-center gap-8 m-auto pt-0 pb-16 lg:pb-32 md:pt-8 lg:pt-16 max-w-[1500px]">
      {/* Location Header - Displays location name, country, coordinates, type and blockchain addresses */}
      <DetailPageHeading
        name={name}
        country={country}
        coordinates={coordinates}
        type={type}
        addresses={addresses}
      />

      {/* Main Information Section - Shows partner description and statistics */}
      <section className="border border-primary rounded-3xl overflow-hidden text-center">
        <div className='pt-12 lg:pb-12 px-4 md:px-10 lg:px-20'>
          <h2 className="font-bold text-4xl md:text-5xl tracking-tight pb-2">{heading}</h2>
          <p className="font-extralight text-sm md:text-lg tracking-tight leading-tight md:leading-tight">{description}</p>       
        </div>
        {/* Stats dashboard with location-specific metrics */}
        <StatsBar pageName={`${type}Detail`} partnerId={id}/>
        {/* Conditional statistics explanation - only shown if statSubtitle exists for this partner type */} 
        {statSubtitle &&
          <>
            <Separator />
            <div className='py-12 px-4 md:px-10 lg:px-20'>
              <h3 className='font-bold text-lg md:text-2xl tracking-tight leading-tight px-12 pb-2'>{statSubtitle}</h3>
              <p className='font-extralight tracking-tight leading-tight'>{statDescription}</p>
            </div>
          </>
        }
      </section>

      {/* Collection Activity Chart Section - Only shown for Port type locations */}
      {type === 'Port' && (
        <section className="w-full border border-primary rounded-3xl overflow-hidden pb-4 md:pb-14">
          {/* Chart header with title and time range filters */}
          <article className='flex flex-col lg:flex-row justify-between gap-6 lg:items-end px-4 py-8 md:p-12 md:pb-0'>
            <h2 className='font-bold text-3xl text-center lg:text-left tracking-tight'>Waste removed by action type</h2>
            <div className="flex flex-row justify-center gap-1 md:gap-2">
              {/* Time range filter buttons */}
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
            pageName='PortDetail'
            partnerId={id}
            timeRange={selectedChartDates}
          />
          <CustomChartLegend category="activities" />
        </section>
      )}

      {/* Attestations Section - Displays blockchain verification records */}
      <section className="flex flex-col gap-3 my-6 md:my-20 w-full md:w-[100%]">
        <h2 className="font-bold text-3xl md:text-5xl tracking-tight">
          Attestations
        </h2>
        <p className="w-full md:w-[70%] font-extralight tracking-tight leading-tight md:leading-tight">
          {attestationDescriptions[type]}
        </p>
        <Separator className="bg-softBlack my-1" />
        <AttestationsTable
          data={attestationsData} 
          columns={locationColumns}
          renderMobileCard={renderLocationMobileCard}
          isLoading={isLoadingAttestations}
          error={attestationsError}
          totalRecords={totalAttestationRecords}
        />
      </section>

      {/* Navigation back to locations listing page */}
      <DetailPageBackNav detailType="location" />
      {/* Button to scroll back to top of page */}
      <BackToTopButton />
    </main>
  )
}
