import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/vessels/')({
  component: VesselsComponent,
})

function VesselsComponent() {
  return (
    <div className='pt-20 text-center '>
      <h3 className='text-4xl pb-8'>ExploreVessels</h3>
      <div className='flex flex-col text-xl'>
        <Link className='hover:font-bold' to="/vessels/$vesselId" params={{vesselId: '1234'}}>vessel 1234</Link>
        <Link className='hover:font-bold' to="/vessels/$vesselId" params={{vesselId: '5678'}}>vessel 5678</Link>
        <Link className='hover:font-bold' to="/vessels/$vesselId" params={{vesselId: '9012'}}>vessel 9012</Link> 
      </div>          
    </div>
  )
}
