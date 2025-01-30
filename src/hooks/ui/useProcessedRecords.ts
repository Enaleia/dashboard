import { useMemo } from 'react'
import { PartnerType, SortState, BaseLocationRecord } from '@/types'

export function useProcessedRecords<T extends BaseLocationRecord>(
  records: T[],
  partnerType: PartnerType,
  sortState?: SortState
) {
  return useMemo(() => {
    // Start with filtering
    let processedData = records.filter((record) =>
      partnerType === 'See all' ? true : record.type === partnerType
    )

    // Apply sorting if sortState is provided
    if (sortState) {
      processedData = [...processedData].sort((a, b) => {
        if (sortState.criteria === 'action_count') {
          const aCount = (a as any).action_count ?? 0
          const bCount = (b as any).action_count ?? 0
          return sortState.isAscending ? aCount - bCount : bCount - aCount
        }
        
        if (sortState.criteria === 'country') {
          const aCountry = (a as any).country ?? ''
          const bCountry = (b as any).country ?? ''
          return sortState.isAtoZ 
            ? aCountry.localeCompare(bCountry) 
            : bCountry.localeCompare(aCountry)
        }
        
        return 0
      })
    }

    return processedData
  }, [records, partnerType, sortState])
}