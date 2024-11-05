import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { StatsBar } from '@/components/stats-bar'
import { ActivityMap } from '@/components/activity-map'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/locations/')({
  component: LocationsComponent,
})

function LocationsComponent() {
  const locationTypes = ["See all", "Ports", "Recyclers", "Manufacturers"]
  const viewTypes = ["List", "Map"]
  const [selectedLocationType, setSelectedLocationType] = useState("See all")
  const [selectedViewType, setSelectedViewType] = useState("List")


  return (
    <main className='flex flex-col justify-center items-center gap-10 md:gap-16 m-auto pt-10 pb-32 md:pt-16 max-w-[1500px]'>
      <section className='flex flex-col items-center gap-6 px-6 text-center'>
        <h1 className='w-full font-bold text-3xl md:text-6xl leading-10 md:px-80'>We are a global effort with the focus on the Mediterranean Sea</h1>
        <p className='w-full font-extralight text-base md:text-lg md:px-60'>Our journey began in Greece, and we are now expanding to other Mediterranean countries. United by a shared mission and values, our partners are making impactful contributions in these regions to protect our common waters and marine ecosystems.</p>
      </section>

      <StatsBar pageId='locations'/>

      <section className='w-full px-16'>
        <article className='flex flex-col md:flex-row items-center md:justify-between'>
          <div className='flex flex-col md:flex-row items-center md:gap-2'>
            <p className='text-xs md:text-sm font-extralight'>Location type:</p>
            <div className='flex flex-row justify-center gap-2'>
              {locationTypes.map((type) => (
                <Button
                  key={type} 
                  variant={selectedLocationType === type ? "default" : "outline"}
                  onClick={() => setSelectedLocationType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
          <div className='flex flex-col md:flex-row items-center md:gap-4'>
            <div className='flex flex-row justify-center gap-2'>
              {viewTypes.map((type) => (
                <Button
                  key={type} 
                  variant={selectedViewType === type ? "default" : "outline"}
                  onClick={() => setSelectedViewType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
            <div className='flex flex-col md:flex-row items-center md:gap-2'>
              <p className='text-xs md:text-sm font-extralight'>Sort by:</p>
              <Button>Most actions performed</Button>
            </div>
          </div>
        </article>

        {selectedViewType === "List" && 
          <article className='flex justify-center mt-12'>
            <Button variant="outline">Load more</Button>
          </article>
        }

        {selectedViewType === "Map" &&
          <article className='overflow-hidden rounded-3xl mt-6'>
            <ActivityMap />
          </article>
        }
           
      </section> 
    </main>

    // <div className='pt-20 text-center '>
    //   <h3 className='text-4xl pb-8'>Explore Locations</h3>
    //   <div className='flex flex-col text-xl'>
    //     <Link className='hover:font-bold' to="/locations/$locationId" params={{locationId: '1234'}}>port 1234</Link>
    //     <Link className='hover:font-bold' to="/locations/$locationId" params={{locationId: '5678'}}>port 5678</Link>
    //     <Link className='hover:font-bold' to="/locations/$locationId" params={{locationId: '9012'}}>port 9012</Link> 
    //   </div>          
    // </div>
  )
}