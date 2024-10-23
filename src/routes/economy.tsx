import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/economy')({
  component: EconomyComponent,
})

function EconomyComponent() {
  return (
    <div className="p-2">
      <h3>Circular Economy</h3>
    </div>
  )
}