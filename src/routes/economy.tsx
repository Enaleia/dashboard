import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

/**
 * Creates a route for the home page using TanStack Router
 * This defines the component that will be rendered at the '/economy' path
 * The Circular Economy page component is planned for a future release,
 * when ready, it can be made discoverable by uncommenting the "Economy" <Link>,
 * located in /src/components/nav/NavLinks.tsx
 */
export const Route = createFileRoute('/economy')({
  component: EconomyComponent,
})

function EconomyComponent() {
  return (
    <h3 className='pt-20 text-center text-4xl'>Circular Economy</h3>
  )
}