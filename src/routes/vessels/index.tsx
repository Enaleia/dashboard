import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { PageHero } from '@/components/page-hero'
import { StatsBar } from '@/components/stats-bar'
import { TableActionsBar } from '@/components/table-actions-bar'
import { ActionsTable } from '@/components/actions-table'
import { ActivityMap } from '@/components/activity-map'
import { vesselsPageTexts, vesselTypes, sortByOptions, viewTypes } from '@/config/texts'
import tableData from '@/vessel_data.json'

export const Route = createFileRoute('/vessels/')({
  component: VesselsComponent,
})

function VesselsComponent() {
  const { heroTitle, heroDescription } = vesselsPageTexts
  const [selectedVesselType, setSelectedVesselType] = useState("See all")
  const [selectedSortOrder, setSelectedSortOrder] = useState("")
  const [selectedViewType, setSelectedViewType] = useState("List")

  return (
    <main className='flex flex-col justify-center items-center gap-8 md:gap-10 m-auto md:pt-16 max-w-[1500px]'>
      <PageHero title={heroTitle} description={heroDescription} width='85' />
      <StatsBar pageId='vessel_main_page_statistics'/>

      <section className='w-full'>
        <TableActionsBar 
          category='vessels' 
          partnerTypes={vesselTypes} 
          selectedPartnerType={selectedVesselType}
          setSelectedPartnerType={setSelectedVesselType}
          sortByOptions={sortByOptions}
          selectedSortOrder={selectedSortOrder}
          setSelectedSortOrder={setSelectedSortOrder}
          viewTypes={viewTypes}
          selectedViewType={selectedViewType}
          setSelectedViewType={setSelectedViewType}
        />
        <article className='overflow-hidden rounded-3xl pb-16'>
          {selectedViewType === "List" && <ActionsTable category='vessels' tableData={tableData} partnerType={selectedVesselType} sortOrder={selectedSortOrder}/>}
          {selectedViewType === "Map" && <ActivityMap locationType={selectedVesselType}/>}
        </article>          
      </section> 
    </main>
  )
}
