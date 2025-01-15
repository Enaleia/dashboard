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
import {
  dateChoices,
  partnerDetailInfo,
  attestationDescriptions,
} from '@/config/texts'

export const Route = createFileRoute('/locations/$id')({
  component: LocationDetailComponent,
})

interface SearchParams {
  name: string
  country: string
  coordinates: string
  type: 'Port' | 'Recycler' | 'Manufacturer'
  addresses: string[]
}

function LocationDetailComponent() {
  const { id } = Route.useParams()
  const search = useSearch({ from: `/locations/$id` }) as SearchParams
  const { name, country, coordinates, type, addresses } = search
  const [selectedChartDates, setSelectedChartDates] = useState('This year')

  return (
    <main className="flex flex-col justify-center items-center gap-8 m-auto pt-0 pb-16 md:pb-32 md:pt-16 max-w-[1500px]">
      <DetailPageHeading
        name={name}
        country={country}
        coordinates={coordinates}
        type={type}
        addresses={addresses}
      />

      <section className="border border-primary rounded-3xl overflow-hidden">
        <article className="flex flex-col md:flex-row justify-between border-b border-primary p-4 pb-8 md:p-8">
          <div className=" w-full md:w-[65%]">
            <h2 className="font-bold text-2xl md:text-4xl tracking-tight">
              {partnerDetailInfo[type].heading}
            </h2>
            <p className="font-extralight text-sm md:text-lg tracking-tight leading-tight md:leading-tight">
              {partnerDetailInfo[type].description}
            </p>
          </div>

          {type === 'Port' && (
            <div className="flex flex-col justify-end">
              <p className="text-xs md:text-base font-extralight md:text-right pt-4 pb-2 md:py-0">
                Last update: mm/dd/yyyy
              </p>
              <div className="flex flex-row justify-between items-end gap-2 md:py-4">
                {dateChoices.map((choice) => (
                  <Button
                    key={choice}
                    variant={
                      selectedChartDates === choice ? 'default' : 'outline'
                    }
                    onClick={() => setSelectedChartDates(choice)}
                  >
                    {choice}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </article>

        <StatsBar
          pageId="recyclerDetail"
          recyclerId={id}
        />
        <StatsBar
          pageId="manufacturerDetail"
          manufacturerId={id}
        />

        {type === 'Port' ? (
          <div className="py-6 md:py-0">
            <StatsBar pageId='portDetail' portId={id}/>
            <CollectionsChart
              category="activities"
              timeRange={selectedChartDates}
            />
            <CustomChartLegend category="activities" />
          </div>
        ) : (
          <div className="flex flex-col items-center md:p-16">
            <img
              src="/turtles.svg"
              alt="illustration of turtles"
              className="object-cover bg-center h-[150px] md:h-auto w-full mt-10 md:mt-0"
            />
            <p className="md:w-[60%] text-center text-xs md:text-lg p-8 md:p-0">
              We are currently exploring the best ways to represent data from
              this partner. If you’re a data scientist and would like to
              contribute, we’d love to hear from you!
            </p>
          </div>
        )}
      </section>

      <section className="flex flex-col gap-3 my-6 md:my-20 w-full md:w-[85%]">
        <h2 className="font-bold text-3xl md:text-5xl tracking-tight">
          Attestations
        </h2>
        <p className="w-full md:w-[70%] font-extralight tracking-tight leading-tight md:leading-tight">
          {attestationDescriptions[type]}
        </p>
        <Separator className="bg-black my-1" />
        <AttestationsTable />
      </section>

      <DetailPageBackNav detailType="location" />
      <BackToTopButton />
    </main>
  )
}
