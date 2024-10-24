import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/vessels/$vesselId')({
  component: VesselDetailComponent,
})

function VesselDetailComponent() {
  const { vesselId } = Route.useParams()
  return (
    <div className='pt-20 text-center text-4xl'>Details for vessel: {vesselId}</div>
  )
}