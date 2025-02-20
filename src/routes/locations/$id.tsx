import { createFileRoute, useSearch } from '@tanstack/react-router'
import { LocationSearchParams } from '@/types'
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
    <main className="flex flex-col justify-center items-center gap-8 m-auto pt-0 pb-16 lg:pb-32 md:pt-8 lg:pt-16 max-w-[1500px]">
      <DetailPageHeading
        name={name}
        country={country}
        coordinates={coordinates}
        type={type}
        addresses={addresses}
      />

      <section className="border border-primary rounded-3xl overflow-hidden text-center">
        <div className='pt-12 lg:pb-12 px-4 md:px-10 lg:px-20'>
          <h2 className="font-bold text-4xl md:text-5xl tracking-tight pb-2">{heading}</h2>
          <p className="font-extralight text-sm md:text-lg tracking-tight leading-tight md:leading-tight">{description}</p>       
        </div>

        <StatsBar pageName={`${type}Detail`} partnerId={id}/>
         
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

      {type === 'Port' && (
        <section className="w-full border border-primary rounded-3xl overflow-hidden pb-4 md:pb-14">
          <article className='flex flex-col lg:flex-row justify-between gap-6 lg:items-end px-4 py-8 md:p-12 md:pb-0'>
            <h2 className='font-bold text-3xl text-center lg:text-left tracking-tight'>Waste removed by action type</h2>
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
        <Separator className="bg-softBlack my-1" />
        <AttestationsTable pageName='LocationDetail' partnerId={id}/>
      </section>

      <DetailPageBackNav detailType="location" />
      <BackToTopButton />
    </main>
  )
}
