import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMediaQuery } from "@/hooks/use-media-query";

interface TableActionsBarProps {
  // category: string;
  partnerTypes: string[];
  selectedPartnerType: string;
  setSelectedPartnerType: (partnerType: string) => void;
  // sortByOptions: string[];
  // selectedSortOrder: string,
  // setSelectedSortOrder: (sortby: string) => void;
  viewTypes?: string[];
  selectedViewType?: string;
  setSelectedViewType?: (viewType: string) => void
}

const TableActionsBar = ({ 
    // category, 
    partnerTypes,
    selectedPartnerType,
    setSelectedPartnerType, 
    // sortByOptions,
    // selectedSortOrder,
    // setSelectedSortOrder,
    viewTypes, 
    selectedViewType, 
    setSelectedViewType 
  }: TableActionsBarProps) => {
    
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <article className='flex items-center justify-between'>
      <div className='hidden md:flex items-center md:gap-2'>
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

      {/* <div>
        {selectedViewType === "List" &&
          <Select name="sort" onValueChange={(value) => setSelectedSortOrder(value)}>
            <SelectTrigger className="w-[200px] border-black rounded-3xl">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className='border-black rounded-3xl'>
              <SelectItem value="activityDesc">{sortByOptions[0]}</SelectItem>
              <SelectItem value="activityAsc">{sortByOptions[1]}</SelectItem>
              {isDesktop &&
                <>
                  <SelectItem value="nameAZ">{sortByOptions[2]}</SelectItem>
                  <SelectItem value="nameZA">{sortByOptions[3]}</SelectItem>
                  <SelectItem value="countryAZ">{sortByOptions[4]}</SelectItem>
                  <SelectItem value="countryZA">{sortByOptions[5]}</SelectItem>
                  <SelectItem value="typeAZ">{sortByOptions[6]}</SelectItem>
                  <SelectItem value="typeZA">{sortByOptions[7]}</SelectItem>
                </>
              }
            </SelectContent>
          </Select>         
        }
      </div> */}
      
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