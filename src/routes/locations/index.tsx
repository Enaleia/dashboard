import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { PageHero } from '@/components/global/PageHero'
import { StatsBar } from '@/components/global/StatsBar'
import { TableActionsBar } from '@/components/tables/TableActionsBar'
import { ActionsTable } from '@/components/tables/ActionsTable'
import { ActivityMap } from '@/components/maps/ActivityMap'
import { locationsPageTexts, locationTypes, viewTypes } from '@/config/texts'
import { PartnerType } from '@/types'

export const Route = createFileRoute('/locations/')({
  component: LocationsComponent,
})

function LocationsComponent() {
  const { heroTitle, heroDescription } = locationsPageTexts
  const [selectedLocationType, setSelectedLocationType] = useState<PartnerType>("See all")
  const [selectedViewType, setSelectedViewType] = useState("List")

  return (
    <main className='flex flex-col justify-center items-center gap-8 md:gap-16 m-auto md:pt-8 lg:pt-16 max-w-[1500px]'>
      <PageHero title={heroTitle} description={heroDescription} /> 
      <StatsBar pageName='Locations'/>

      <section className='w-full'>
        <TableActionsBar 
          partnerTypes={locationTypes} 
          selectedPartnerType={selectedLocationType}
          setSelectedPartnerType={setSelectedLocationType}
          viewTypes={viewTypes}
          selectedViewType={selectedViewType}
          setSelectedViewType={setSelectedViewType}
        />

        <div className='overflow-hidden rounded-3xl pt-8 pb-16'>
          {selectedViewType === "List" && <ActionsTable pageName='Locations' partnerType={selectedLocationType}/>}
          {selectedViewType === "Map" && <ActivityMap pageName='Locations' partnerType={selectedLocationType}/>}
        </div>          
      </section> 
    </main>
  )
}