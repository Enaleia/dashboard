import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <h3 className='pt-20 text-center text-4xl'>Welcome to Enaleia!</h3>
  )
}
