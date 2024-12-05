import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { StatsBar } from '@/components/stats-bar'
import { TableActionsBar } from '@/components/table-actions-bar'
import { ActionsTable } from '@/components/actions-table'
import { ActivityMap } from '@/components/activity-map'
import { locationsPageTexts, locationTypes, sortByOptions, viewTypes } from '@/config/texts'
import tableData from '@/map_data.json'

export const Route = createFileRoute('/locations/')({
  component: LocationsComponent,
})

function LocationsComponent() {
  const { heroTitle, heroDescription } = locationsPageTexts
  const [selectedLocationType, setSelectedLocationType] = useState("See all")
  const [selectedSortOrder, setSelectedSortOrder] = useState("")
  const [selectedViewType, setSelectedViewType] = useState("List")

  return (
    <main className='flex flex-col justify-center items-center gap-8 md:gap-10 m-auto md:pt-16 max-w-[1500px]'>
      <section className='flex flex-col items-center gap-6 px-6 text-center'>
        <h1 className='w-full font-bold text-5xl md:text-7xl tracking-tight md:px-[24%]'>{heroTitle}</h1>
        <p className='w-full font-extralight text-base md:text-lg md:px-56 leading-tight md:leading-tight'>{heroDescription}</p>
      </section>

      <StatsBar pageId='locations'/>

      <section className='w-full'>
        <TableActionsBar 
          category='locations' 
          partnerTypes={locationTypes} 
          selectedPartnerType={selectedLocationType}
          setSelectedPartnerType={setSelectedLocationType}
          sortByOptions={sortByOptions}
          selectedSortOrder={selectedSortOrder}
          setSelectedSortOrder={setSelectedSortOrder}
          viewTypes={viewTypes}
          selectedViewType={selectedViewType}
          setSelectedViewType={setSelectedViewType}
        />

        <article className='overflow-hidden rounded-3xl m-4 md:mx-24 pb-16'>
          {selectedViewType === "List" && <ActionsTable category='locations' tableData={tableData} partnerType={selectedLocationType} sortOrder={selectedSortOrder}/>}
          {selectedViewType === "Map" && <ActivityMap locationType={selectedLocationType}/>}
        </article>          
      </section> 
    </main>
  )
}