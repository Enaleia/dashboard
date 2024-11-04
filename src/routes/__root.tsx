import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { NavHeader } from '../components/nav-header'
import { NavFooter } from '../components/nav-footer'
import '@fontsource-variable/dm-sans'
import '../index.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <NavHeader />
      <Outlet />
      <NavFooter />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
