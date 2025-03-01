import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { PageHero } from '@/components/global/PageHero'
import { StatsBar } from '@/components/global/StatsBar'
import { TableActionsBar } from '@/components/tables/TableActionsBar'
import { ActionsTable } from '@/components/tables/ActionsTable'
import { ActivityMap } from '@/components/maps/ActivityMap'
import { locationsPageTexts, locationTypes, viewTypes } from '@/config/texts'
import { PartnerType } from '@/types'

/**
 * Creates a route for the locations page using TanStack Router
 * This defines the component that will be rendered at the '/locations/' path
 */
export const Route = createFileRoute('/locations/')({
  component: LocationsComponent,
})

/**
 * LocationsComponent - Page displaying all ports/recyclers/manufacturers and their activities
 * 
 * Provides an overview of all locations participating in the collection program with:
 * - Hero section with title and description
 * - Summary statistics about location activities
 * - Filterable table of locations with their details and statistics
 * 
 * Users can filter the table by location type (Port/recyclerr/Manfacturer)
 */
function LocationsComponent() {
  // Destructure text content from config
  const { heroTitle, heroDescription } = locationsPageTexts
  // State to track currently selected location type filter
  // Default is "See all" to show all locations types initially
  const [selectedLocationType, setSelectedLocationType] = useState<PartnerType>("See all")
  // State to track currently selected ui view
  // Can be "List" (for table), or "Map"
  const [selectedViewType, setSelectedViewType] = useState("List")

  return (
    <main className='flex flex-col justify-center items-center gap-8 md:gap-16 m-auto md:pt-8 lg:pt-16 max-w-[1500px]'>
      <PageHero title={heroTitle} description={heroDescription} /> 
      <StatsBar pageName='Locations'/>

      <section className='w-full'>
        {/* Filter controls for the locations table */}
        <TableActionsBar 
          partnerTypes={locationTypes} 
          selectedPartnerType={selectedLocationType}
          setSelectedPartnerType={setSelectedLocationType}
          viewTypes={viewTypes}
          selectedViewType={selectedViewType}
          setSelectedViewType={setSelectedViewType}
        />

        <div className='w-full pt-8 pb-16'>
          {/* Table displaying location data filtered by selected type */}
          {selectedViewType === "List" && <ActionsTable pageName='Locations' partnerType={selectedLocationType}/>}
          {/* Map displaying location data filtered by selected type */}
          {selectedViewType === "Map" && <ActivityMap pageName='Locations' partnerType={selectedLocationType}/>}
        </div>          
      </section> 
    </main>
  )
}