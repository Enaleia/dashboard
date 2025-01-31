import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  // Set initial state based on media query
  const [value, setValue] = useState(() => {
    // Only run matchMedia if in browser environment
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Function to handle changes
    const onChange = (event: MediaQueryListEvent) => {
      setValue(event.matches);
    };

    // Add listener and clean up
    mediaQuery.addEventListener("change", onChange);
    
    // Update value if it's different from current mediaQuery state
    if (value !== mediaQuery.matches) {
      setValue(mediaQuery.matches);
    }

    return () => mediaQuery.removeEventListener("change", onChange);
  }, [query]);

  return value;
}