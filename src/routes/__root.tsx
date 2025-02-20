import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NavHeader } from '@/components/nav/NavHeader'
import { ScrollToTop } from '@/components/global/ScrollToTop'
import { NavFooter } from '@/components/nav/NavFooter'
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
