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
      <div className='mx-24 my-8 border border-black rounded-full px-14 py-6 max-w-[1500px]'>
        <NavBar />
      </div>    
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
