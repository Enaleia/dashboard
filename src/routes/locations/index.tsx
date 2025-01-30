import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { PageHero } from '@/components/page-hero'
import { StatsBar } from '@/components/stats-bar'
import { TableActionsBar } from '@/components/tables/table-actions-bar'
import { ActionsTable } from '@/components/tables/actions-table'
import { ActivityMap } from '@/components/maps/activity-map'
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
    <main className='flex flex-col justify-center items-center gap-8 md:gap-10 m-auto md:pt-16 max-w-[1500px]'>
      <PageHero title={heroTitle} description={heroDescription} width='80' /> 
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

        <article className='overflow-hidden rounded-3xl pb-16'>
          {selectedViewType === "List" && <ActionsTable pageId='locations' partnerType={selectedLocationType}/>}
          {selectedViewType === "Map" && <ActivityMap partnerType={selectedLocationType}/>}
        </article>          
      </section> 
    </main>
  )
}