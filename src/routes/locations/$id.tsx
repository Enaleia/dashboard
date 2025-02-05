import { createFileRoute, useSearch } from '@tanstack/react-router'
import { LocationSearchParams } from '@/types'
import { useState } from 'react'
import { DetailPageHeading } from '@/components/detail-page-heading'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { StatsBar } from '@/components/stats-bar'
import { CollectionsChart } from '@/components/charts/collections-chart'
import { CustomChartLegend } from '@/components/charts/custom-chart-legend'
import { AttestationsTable } from '@/components/tables/attestations-table'
import { DetailPageBackNav } from '@/components/detail-page-back-nav'
import { BackToTopButton } from '@/components/back-to-top'
import {
  dateChoices,
  partnerDetailInfo,
  attestationDescriptions,
} from '@/config/texts'

export const Route = createFileRoute('/locations/$id')({
  component: LocationDetailComponent,
})

function LocationDetailComponent() {
  const { id } = Route.useParams()
  const search = useSearch({ from: `/locations/$id` }) as LocationSearchParams
  const { name, country, coordinates, type, addresses } = search
  const [selectedChartDates, setSelectedChartDates] = useState('All time')
  const { heading, description, statSubtitle, statDescription } = partnerDetailInfo[type]

  return (
    <main className="flex flex-col justify-center items-center gap-8 m-auto pt-0 pb-16 md:pb-32 md:pt-16 max-w-[1500px]">
      <DetailPageHeading
        name={name}
        country={country}
        coordinates={coordinates}
        type={type}
        addresses={addresses}
      />

      <section className="border border-primary rounded-3xl overflow-hidden p-10 text-center">
        <h2 className="font-bold text-2xl md:text-4xl tracking-tight pb-2">{heading}</h2>
        <p className="font-extralight text-sm md:text-lg tracking-tight leading-tight md:leading-tight">{description}</p>       

        <StatsBar pageName={`${type}Detail`} partnerId={id}/>
         
        {statSubtitle &&
          <>
            <Separator className='bg-black' />
            <h3 className='font-bold text-lg md:text-2xl tracking-tight pt-10 pb-2'>{statSubtitle}</h3>
            <p className='font-extralight'>{statDescription}</p>
          </>
        }
      </section>

      {type === 'Port' && (
        <section className="border border-primary rounded-3xl overflow-hidden pb-6 md:pb-10">
          <article className='flex flex-col md:flex-row justify-between gap-6 md:items-end px-4 py-8 md:p-12 md:pb-0'>
            <h2 className='font-bold text-4xl md:text-5xl tracking-tight'>Waste removed by action type</h2>
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

          <CollectionsChart
            pageName='PortDetail'
            partnerId={id}
            timeRange={selectedChartDates}
          />
          <CustomChartLegend category="activities" />
        </section>
      )}

      <section className="flex flex-col gap-3 my-6 md:my-20 w-full md:w-[85%]">
        <h2 className="font-bold text-3xl md:text-5xl tracking-tight">
          Attestations
        </h2>
        <p className="w-full md:w-[70%] font-extralight tracking-tight leading-tight md:leading-tight">
          {attestationDescriptions[type]}
        </p>
        <Separator className="bg-black my-1" />
        <AttestationsTable pageName='LocationDetail' partnerId={id}/>
      </section>

      <DetailPageBackNav detailType="location" />
      <BackToTopButton />
    </main>
  )
}
