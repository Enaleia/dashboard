import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/locations/')({
  component: LocationsComponent,
})

function LocationsComponent() {
  return (
    <div className="p-2">
      <h3 className='pb-4 underline'>Explore Locations</h3>
      <div className='flex flex-col'>
        <Link className='hover:font-bold' to="/locations/$locationId" params={{locationId: '1234'}}>port 1234</Link>
        <Link className='hover:font-bold' to="/locations/$locationId" params={{locationId: '5678'}}>port 5678</Link>
        <Link className='hover:font-bold' to="/locations/$locationId" params={{locationId: '9012'}}>port 9012</Link> 
      </div>          
    </div>
  )
}