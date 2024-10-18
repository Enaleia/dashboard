import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/locations/$locationId')({
  component: LocationDetailComponent,
})

function LocationDetailComponent() {
  const { locationId } = Route.useParams()
  return (
    <div>Details for port: {locationId}</div>
  )
}