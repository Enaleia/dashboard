import { PartnerType } from '@/types'
import { Button } from '@/components/ui/button'

/**
 * Interface for the TableActionsBar component props
 * @property {PartnerType[]} partnerTypes - Array of available partner type filter options
 * @property {PartnerType} selectedPartnerType - Currently selected partner type filter
 * @property {(partnerType: PartnerType) => void} setSelectedPartnerType - Function to update selected partner type
 * @property {string[]} [viewTypes] - Optional array of view type options (e.g., "List", "Map")
 * @property {string} [selectedViewType] - Optional currently selected view type
 * @property {(viewType: string) => void} [setSelectedViewType] - Optional function to update selected view type
 */
interface TableActionsBarProps {
  partnerTypes: PartnerType[]
  selectedPartnerType: PartnerType
  setSelectedPartnerType: (partnerType: PartnerType) => void
  viewTypes?: string[]
  selectedViewType?: string
  setSelectedViewType?: (viewType: string) => void
}

/**
 * TableActionsBar - Component that provides filtering and view type controls for tables
 * 
 * Renders a toolbar with two main control groups:
 * 1. Partner type filter buttons (e.g., "Port", "Recycler", "Manufacturer")
 * 2. Optional view type toggle buttons (e.g., "List", "Map")
 * 
 * The component handles:
 * - Highlighting the currently selected options
 * - Triggering filter/view changes via callbacks
 * - Responsive design (partner type filters hidden on mobile)
 * - Conditional rendering of view type buttons
 */
const TableActionsBar = ({ 
    partnerTypes,
    selectedPartnerType,
    setSelectedPartnerType,
    viewTypes, 
    selectedViewType, 
    setSelectedViewType 
  }: TableActionsBarProps) => {
    
  return (
    <article className='flex items-center justify-between'>
      {/* Partner Type Filter Buttons */}
      {/* Hidden on mobile (< lg breakpoint) for space efficiency */}
      <div className='hidden lg:flex items-center md:gap-2'>
        <p className='text-xs md:text-sm font-extralight'>Location type:</p>
        <div className='flex flex-row justify-center gap-2'>
          {partnerTypes.map((type) => (
            <Button
              key={type} 
              variant={selectedPartnerType === type ? "default" : "outline"}
              onClick={() => setSelectedPartnerType(type)}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>
      
      {/* View Type Toggle Buttons (List/Map) */}
      {/* Only rendered if viewTypes and setSelectedViewType are provided */}
      {viewTypes && setSelectedViewType ?
        <div className='flex flex-row gap-2'>
          {viewTypes.map((type) => (
            <Button
              key={type} 
              variant={selectedViewType === type ? "default" : "outline"}
              onClick={() => setSelectedViewType(type)}
            >
              {type}
            </Button>
          ))}
        </div>
      : null
      }
    </article>
  )
}

export { TableActionsBar }