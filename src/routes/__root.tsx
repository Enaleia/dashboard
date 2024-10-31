import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { NavBar } from '../components/nav-bar'
import '@fontsource-variable/dm-sans';
import '../index.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <NavBar />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
