import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/locations/$locationId')({
  component: LocationDetailComponent,
})

function LocationDetailComponent() {
  const { locationId } = Route.useParams()
  return (
    <div className='pt-20 text-center text-4xl'>Details for port: {locationId}</div>
  )
}