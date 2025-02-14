import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { PageHero } from '@/components/page-hero'
import { StatsBar } from '@/components/stats-bar'
import { TableActionsBar } from '@/components/tables/table-actions-bar'
import { ActionsTable } from '@/components/tables/actions-table'
import { vesselsPageTexts, vesselTypes } from '@/config/texts'
import { PartnerType } from '@/types'


export const Route = createFileRoute('/vessels/')({
  component: VesselsComponent,
})

function VesselsComponent() {
  const { heroTitle, heroDescription } = vesselsPageTexts
  const [selectedVesselType, setSelectedVesselType] = useState<PartnerType>("See all")

  return (
    <main className='flex flex-col justify-center items-center gap-8 md:gap-10 m-auto md:pt-8 lg:pt-16 max-w-[1500px]'>
      <PageHero title={heroTitle} description={heroDescription} width='85' />
      <StatsBar pageName='Vessels'/>

      <section className='w-full'>
        <TableActionsBar 
          partnerTypes={vesselTypes} 
          selectedPartnerType={selectedVesselType}
          setSelectedPartnerType={setSelectedVesselType}
        />
        <article className='overflow-hidden rounded-3xl pb-16'>
          <ActionsTable pageName='Vessels' partnerType={selectedVesselType} />
        </article>          
      </section> 
    </main>
  )
}
