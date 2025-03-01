import { useState, useCallback } from 'react'
import { SortState } from '@/types'

/**
 * useTableSort - Custom hook for managing table sorting state
 * 
 * Provides state management and toggling functionality for table column sorting.
 * Handles two sorting criteria:
 * - 'country': Text-based alphabetical sorting (A-Z or Z-A)
 * - 'action_count': Numeric sorting (ascending or descending)
 * 
 * The hook maintains sorting state and provides a memoized toggle function
 * to switch between criteria or reverse the current sort direction.
 * 
 * @returns {Object} An object containing:
 *   - sortState: Current sorting configuration (criteria and direction)
 *   - toggleSortCriteria: Function to change or toggle sort criteria
 */
export const useTableSort = () => {
  // Initialize sorting state with default values
  const [sortState, setSortState] = useState<SortState>({
    isAtoZ: false,          // For country/text sorting (false = Z-A, true = A-Z)
    isAscending: false,     // For action_count/numeric sorting (false = high-to-low, true = low-to-high)
    criteria: 'action_count' // Default sort column
  })

   /**
   * Toggles the sort criteria or direction
   * 
   * If the selected criteria is already active, it toggles the sort direction.
   * If a different criteria is selected, it switches to that criteria with default direction.
   * 
   * @param {('action_count'|'country')} criteria - The column to sort by
   */
  const toggleSortCriteria = useCallback((criteria: 'action_count' | 'country') => {
    setSortState(prev => {
      // If clicking the same column that's already being sorted
      if (prev.criteria === criteria) {
        return {
          ...prev,
          // Toggle sort direction based on criteria type
          isAtoZ: criteria === 'country' ? !prev.isAtoZ : prev.isAtoZ,
          isAscending: criteria === 'action_count' ? !prev.isAscending : prev.isAscending
        }
      }
      // If switching to a different column
      return {
        ...prev,
        criteria,
        // Reset sort directions to defaults when changing criteria
        isAtoZ: false,
        isAscending: false
      }
    })
  }, [])

  return { sortState, toggleSortCriteria }
}