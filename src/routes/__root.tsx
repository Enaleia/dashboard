import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { NavHeader } from '@/components/nav-header'
import { ScrollToTop } from '@/components/scroll-to-top'
import { NavFooter } from '@/components/nav-footer'
import '@fontsource-variable/dm-sans'
import '@/index.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <NavHeader />
      <ScrollToTop />
      <Outlet />
      <NavFooter />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
