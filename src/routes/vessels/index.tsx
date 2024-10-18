import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/vessels/')({
  component: VesselsComponent,
})

function VesselsComponent() {
  return (
    <div className="p-2">
      <h3 className='pb-4 underline'>ExploreVessels</h3>
      <div className='flex flex-col'>
        <Link className='hover:font-bold' to="/vessels/$vesselId" params={{vesselId: '1234'}}>vessel 1234</Link>
        <Link className='hover:font-bold' to="/vessels/$vesselId" params={{vesselId: '5678'}}>vessel 5678</Link>
        <Link className='hover:font-bold' to="/vessels/$vesselId" params={{vesselId: '9012'}}>vessel 9012</Link> 
      </div>          
    </div>
  )
}
