import { useMemo } from 'react'
import { PartnerType, SortState, BaseLocationRecord } from '@/types'

/**
 * useProcessedRecords - Custom hook for filtering and sorting record collections
 * 
 * This hook processes arrays of records (locations, vessels, etc.) by:
 * 1. Filtering records based on partner type
 * 2. Sorting the filtered results based on provided sort criteria
 * 
 * The hook is designed to work with any record type that extends BaseLocationRecord,
 * making it reusable across different components that need similar data processing.
 * Results are memoized to prevent unnecessary recalculations on re-renders.
 * 
 * @template T - Generic type extending BaseLocationRecord (must have a 'type' property)
 * @param {T[]} records - Array of records to be processed
 * @param {PartnerType} partnerType - Selected partner type filter ('See all' or specific type)
 * @param {SortState} [sortState] - Optional sorting configuration
 * @returns {T[]} - Filtered and sorted array of records
 */
export function useProcessedRecords<T extends BaseLocationRecord>(
  records: T[],
  partnerType: PartnerType,
  sortState?: SortState
) {
  return useMemo(() => {
    // Step 1: Filter records by partner type
    // If 'See all' is selected, include all records; otherwise, only include matching types
    let processedData = records.filter((record) =>
      partnerType === 'See all' ? true : record.type === partnerType
    )

    // Step 2: Apply sorting if sortState is provided
    if (sortState) {
      processedData = [...processedData].sort((a, b) => {
        // Handle numeric sorting by action_count
        if (sortState.criteria === 'action_count') {
          // Use type assertion with fallback to 0 if property doesn't exist
          const aCount = (a as any).action_count ?? 0
          const bCount = (b as any).action_count ?? 0
          // Sort ascending (low to high) or descending (high to low) based on isAscending flag
          return sortState.isAscending ? aCount - bCount : bCount - aCount
        }
        
        // Handle alphabetical sorting by country
        if (sortState.criteria === 'country') {
          // Use type assertion with fallback to empty string if property doesn't exist
          const aCountry = (a as any).country ?? ''
          const bCountry = (b as any).country ?? ''
          // Sort A-Z or Z-A based on isAtoZ flag using string comparison
          return sortState.isAtoZ 
            ? aCountry.localeCompare(bCountry) 
            : bCountry.localeCompare(aCountry)
        }
        
        return 0
      })
    }
    // Default case if no valid criteria is provided
    return processedData
  }, [records, partnerType, sortState]) // Recalculate only when these dependencies change
}