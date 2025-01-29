import { useState, useCallback } from 'react'
import { SortState } from '@/types'

export const useTableSort = () => {
  const [sortState, setSortState] = useState<SortState>({
    isAtoZ: false,
    isAscending: false,
    criteria: 'action_count'
  });

  const toggleSortCriteria = useCallback((criteria: 'action_count' | 'country') => {
    setSortState(prev => {
      if (prev.criteria === criteria) {
        return {
          ...prev,
          isAtoZ: criteria === 'country' ? !prev.isAtoZ : prev.isAtoZ,
          isAscending: criteria === 'action_count' ? !prev.isAscending : prev.isAscending
        };
      }
      return {
        ...prev,
        criteria,
        isAtoZ: false,
        isAscending: false
      }
    })
  }, [])

  return { sortState, toggleSortCriteria }
}