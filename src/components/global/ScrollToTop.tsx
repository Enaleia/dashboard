import { useEffect } from 'react'
import { useLocation } from '@tanstack/react-router'

/**
 * ScrollToTop - Utility component that automatically scrolls to the top on page navigation
 * 
 * This component solves a common issue in single-page applications where the scroll position
 * persists between page navigations. When a user navigates from a scrolled position on one page
 * to another page, the new page would normally maintain the same scroll position, which can be
 * disorienting.
 * 
 * The component:
 * 1. Monitors changes to the URL pathname using TanStack Router's useLocation hook
 * 2. Automatically scrolls the window to the top (0,0) when the pathname changes
 * 3. Renders nothing in the DOM (returns null)
 * 
 * Usage:
 * This component should be placed once, typically near the root of the application,
 * to ensure consistent scrolling behavior across all page navigations.
 */
const ScrollToTop = () => {
  // Extract the current pathname from the location object
  const { pathname } = useLocation()

  // Effect that runs whenever the pathname changes
  useEffect(() => {
    // Scroll the window to the top-left corner (x:0, y:0)
    window.scrollTo(0, 0)
  }, [pathname])   // Only re-run when pathname changes

  // Component doesn't render anything visible
  return null
}

export { ScrollToTop }