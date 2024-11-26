import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { StatsBar } from '@/components/stats-bar'
import { TableActionsBar } from '@/components/table-actions-bar'
import { VesselsTable } from '@/components/vessels-table'
import { ActivityMap } from '@/components/activity-map'

export const Route = createFileRoute('/vessels/')({
  component: VesselsComponent,
})

function VesselsComponent() {
  const vesselTypes = ["See all", "Trawler", "Seiner", "Other", "Most active"]
  const sortByOptions = ["Most to least active", "Least to most active", "Name A-Z", "Name Z-A", "Country A-Z", "Country Z-A", "Type A-Z", "Type Z-A"]
  const viewTypes = ["List", "Map"]
  const [selectedVesselType, setSelectedVesselType] = useState("See all")
  const [selectedSortOrder, setSelectedSortOrder] = useState("")
  const [selectedViewType, setSelectedViewType] = useState("List")

  return (
    <main className='flex flex-col justify-center items-center gap-10 md:gap-16 m-auto md:pt-16 max-w-[1500px]'>
      <section className='flex flex-col items-center gap-6 px-6 text-center'>
        <h1 className='w-full font-bold text-5xl md:text-7xl tracking-tight md:px-[20%]'>Vessels and fishers on the frontline of the marine plastic pollution crisis</h1>
        <p className='w-full font-extralight text-base md:text-lg md:px-56'>We collaborate with fishing communities across the Mediterranean, empowering them to adopt sustainable fishing practices while incentivizing the collection of plastic bycatch. By bringing this waste back to port, fishers play a crucial role in addressing marine plastic pollution and protecting the health of our oceans.</p>
      </section>

      <StatsBar pageId='locations'/>

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
        <article className='overflow-hidden rounded-3xl mt-6'>
          {selectedViewType === "List" && <VesselsTable  selectedVesselType={selectedVesselType}/>}
          {selectedViewType === "Map" && <ActivityMap locationType={selectedVesselType}/>}
        </article>          
      </section> 
    </main>
  )
}
