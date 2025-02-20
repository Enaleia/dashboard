import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { PageHero } from '@/components/global/PageHero'
import { StatsBar } from '@/components/global/StatsBar'
import { TableActionsBar } from '@/components/tables/TableActionsBar'
import { ActionsTable } from '@/components/tables/ActionsTable'
import { vesselsPageTexts, vesselTypes } from '@/config/texts'
import { PartnerType } from '@/types'


export const Route = createFileRoute('/vessels/')({
  component: VesselsComponent,
})

function VesselsComponent() {
  const { heroTitle, heroDescription } = vesselsPageTexts
  const [selectedVesselType, setSelectedVesselType] = useState<PartnerType>("See all")

  return (
    <main className='flex flex-col justify-center items-center gap-8 md:gap-16 m-auto md:pt-8 lg:pt-16 max-w-[1500px]'>
      <PageHero title={heroTitle} description={heroDescription} />
      <StatsBar pageName='Vessels'/>

      <section className='w-full'>
        <TableActionsBar 
          partnerTypes={vesselTypes} 
          selectedPartnerType={selectedVesselType}
          setSelectedPartnerType={setSelectedVesselType}
        />
        <div className='overflow-hidden rounded-3xl pt-8 pb-16'>
          <ActionsTable pageName='Vessels' partnerType={selectedVesselType} />
        </div>          
      </section> 
    </main>
  )
}
