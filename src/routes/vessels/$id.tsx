import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useState } from 'react'
import { DetailPageHeading } from '@/components/detail-page-heading'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { StatsBar } from '@/components/stats-bar'
import { CollectionsChart } from '@/components/collections-chart'
import { CustomChartLegend } from '@/components/custom-chart-legend'
import { AttestationsTable } from '@/components/attestations-table'
import { DetailPageBackNav } from '@/components/detail-page-back-nav'
import { BackToTopButton } from '@/components/back-to-top'
import { dateChoices, partnerDetailInfo, attestationDescriptions } from '@/config/texts'

export const Route = createFileRoute('/vessels/$id')({
  component: VesselDetailComponent,
})

interface SearchParams {
  name: string
  country: string
  port: string
  type: 'Trawler' | 'Small vessel' | 'Purse seiner' | 'Other'
  collector_identity: string
}

function VesselDetailComponent() {
  const { id } = Route.useParams()
  const search = useSearch({ from: `/vessels/$id` }) as SearchParams
  const { name, country, port, type, collector_identity } = search
  const [selectedChartDates, setSelectedChartDates] = useState('This year')

  return (
    <main className='flex flex-col justify-center items-center gap-8 m-auto pt-0 pb-16 md:pb-32 md:pt-16 max-w-[1500px]'>
      <DetailPageHeading name={name} country={country} registered_port={port} type={type} collector_id={collector_identity} />

      <section className='border border-primary rounded-3xl overflow-hidden'>
        <article className='flex flex-col md:flex-row justify-between border-b border-primary p-4 pb-8 md:p-8'>
          <h2 className='font-bold text-2xl md:text-4xl tracking-tight'>{partnerDetailInfo["Vessel"].heading}</h2>
          <p className='font-extralight text-sm md:text-lg tracking-tight leading-tight md:leading-tight'>{partnerDetailInfo["Vessel"].description}</p>
          <div className='flex flex-col justify-end'>
            <p className='text-xs md:text-base font-extralight md:text-right pt-4 pb-2 md:py-0'>Last update: mm/dd/yyyy</p>
            <div className='flex flex-row justify-between items-end gap-2 md:py-4'>
              {dateChoices.map((choice) => (
                <Button 
                  key={choice}
                  variant={selectedChartDates === choice ? "default" : "outline"}
                  onClick={() => setSelectedChartDates(choice)}
                >
                  {choice}
                </Button>
              ))}
            </div>
          </div>
        </article>
  
        <div className='py-6 md:py-0'>
          {/* <StatsBar pageId='vessel_detail_page_statistics' vesselId={id}/> */}
          <CollectionsChart category='activities' timeRange={selectedChartDates}/>
          <CustomChartLegend category='activities' />
        </div>
      </section>

      <section className='flex flex-col gap-3 my-6 md:my-20 w-full md:w-[85%]'>
        <h2 className='font-bold text-3xl md:text-5xl tracking-tight'>Attestations</h2>
        <p className='w-full md:w-[70%] font-extralight tracking-tight leading-tight md:leading-tight'>{attestationDescriptions["Vessel"]}</p>
        <Separator className='bg-black my-1'/>
        <AttestationsTable />
      </section>

      <DetailPageBackNav detailType='vessel'/>
      <BackToTopButton />
    </main>
  )
}