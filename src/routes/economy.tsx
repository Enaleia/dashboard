import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/economy')({
  component: EconomyComponent,
})

function EconomyComponent() {
  return (
    <h3 className='pt-20 text-center text-4xl'>Circular Economy</h3>
  )
}