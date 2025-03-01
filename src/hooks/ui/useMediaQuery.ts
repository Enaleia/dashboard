import { useEffect, useState } from "react"

/**
 * useMediaQuery - Custom hook for responsive design based on media queries
 * 
 * This hook allows components to react to changes in the viewport size or other
 * media features by leveraging the browser's matchMedia API. It returns a boolean
 * indicating whether the current viewport matches the provided media query.
 * 
 * The hook handles:
 * - Initial state based on current media query match
 * - Server-side rendering (SSR) compatibility
 * - Subscription to media query changes
 * - Cleanup of event listeners
 * 
 * @param {string} query - CSS media query string (e.g., "(min-width: 768px)")
 * @returns {boolean} - Whether the current viewport matches the provided query
 * 
 * @example
 * // Check if viewport is at least desktop width
 * const isDesktop = useMediaQuery("(min-width: 1024px)");
 * 
 * // Use in conditional rendering
 * return (
 *   <div>
 *     {isDesktop ? <DesktopComponent /> : <MobileComponent />}
 *   </div>
 * );
 */
export function useMediaQuery(query: string) {
  // Set initial state based on media query
  // Using function form of useState to avoid unnecessary evaluations on re-renders
  const [value, setValue] = useState(() => {
    // Only run matchMedia if in browser environment
    // This prevents errors during server-side rendering
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    // Default to false if running on server
    return false
  })

  useEffect(() => {
    // Create MediaQueryList object for the provided query
    const mediaQuery = window.matchMedia(query)

    // Function to handle media query changes
    const onChange = (event: MediaQueryListEvent) => {
      setValue(event.matches)
    }

    // Ensure value is synchronized with current media query state
    // This handles edge cases where the value might be out of sync
    mediaQuery.addEventListener("change", onChange);
    
    // Update value if it's different from current mediaQuery state
    if (value !== mediaQuery.matches) {
      setValue(mediaQuery.matches)
    }
    // Cleanup function to remove event listener when component unmounts
    // or when query changes
    return () => mediaQuery.removeEventListener("change", onChange);
  }, [query])   // Re-run effect only when query changes

  return value
}