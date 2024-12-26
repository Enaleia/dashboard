import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NavHeader } from '@/components/nav-header'
import { ScrollToTop } from '@/components/scroll-to-top'
import { NavFooter } from '@/components/nav-footer'
import '@fontsource-variable/dm-sans'
import '@/index.css'

export const Route = createRootRoute({
  component: RootComponent,
})

const queryClient = new QueryClient()

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavHeader />
      <ScrollToTop />
      <Outlet />
      <NavFooter />
      <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
