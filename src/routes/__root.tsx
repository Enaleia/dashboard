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

// Create a new QueryClient with custom default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 6 hours
      staleTime: 1000 * 60 * 60 * 6, 
      // Keep in garbage collection for 1 week
      gcTime: 1000 * 60 * 60 * 24 * 7,
      // Retry failed requests 3 times with increasing delays
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Refetch only when user intentionally refreshes or revisits after a long time
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
})

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavHeader />
      <ScrollToTop />
      <Outlet />
      <NavFooter />
      {/* uncomment below to enable Router or Query devtools */}
      {/* <TanStackRouterDevtools position="bottom-left" /> */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}
