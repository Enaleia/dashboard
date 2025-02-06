import { PartnerType } from '@/types';
import { Button } from '@/components/ui/button'

interface TableActionsBarProps {
  partnerTypes: PartnerType[]
  selectedPartnerType: PartnerType
  setSelectedPartnerType: (partnerType: PartnerType) => void
  viewTypes?: string[]
  selectedViewType?: string
  setSelectedViewType?: (viewType: string) => void
}

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

export { TableActionsBar };