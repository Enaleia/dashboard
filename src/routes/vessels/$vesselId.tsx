import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/vessels/$vesselId')({
  component: VesselDetailComponent,
})

function VesselDetailComponent() {
  const { vesselId } = Route.useParams()
  return (
    <div>Details for vessel: {vesselId}</div>
  )
}