import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/locations/')({
  component: LocationsComponent,
})

function LocationsComponent() {
  return (
    <div className='pt-20 text-center '>
      <h3 className='text-4xl pb-8'>Explore Locations</h3>
      <div className='flex flex-col text-xl'>
        <Link className='hover:font-bold' to="/locations/$locationId" params={{locationId: '1234'}}>port 1234</Link>
        <Link className='hover:font-bold' to="/locations/$locationId" params={{locationId: '5678'}}>port 5678</Link>
        <Link className='hover:font-bold' to="/locations/$locationId" params={{locationId: '9012'}}>port 9012</Link> 
      </div>          
    </div>
  )
}