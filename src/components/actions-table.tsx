import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { useMemo, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { usePagination } from "@/hooks/use-pagination"
import { ShowingDisplay, Paginator } from "@/components/paginator"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ArrowUpDown } from "lucide-react"

// API endpoint mapping for different table types
const tableEndpoints = {
  locations: "a9fc78b6-96a7-4be2-836b-153671fc367f",
  vessels: "eb03d9a6-dff3-4aec-8fd1-c5816b936c7a"
}

/**
 * Represents a single row item in the actions table
 * Can be either a location or vessel entry
 */
interface TableItem {
  id: string;
  name: string;
  country: string;
  coordinates?: number[];       //only for locations
  registered_port?: string;     //only for vessels
  type: string;
  action_count: number;
  wallet_addresses?: string[];  //only for locations
  collector_identity?: string   //only for vessels
}

/**
 * Props for the ActionsTable component
 * @param pageId - Determines whether to display locations or vessels
 * @param partnerType - Filter criterion for the type of partner to display
 */
interface ActionsTableProps {
  pageId: "locations" | "vessels"
  partnerType: string;
}

const ActionsTable = ({ pageId, partnerType }: ActionsTableProps) => {
  const navigate = useNavigate()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const itemsPerPage = 8
  // State for sorting controls
  const [isAtoZ , setIsAtoZ] = useState(false)
  const [isAscending, setIsAscending] = useState(false)
  const [sortCriteria, setSortCriteria] = useState<'action_count' | 'country'>('action_count')
  
  // Fetch table data from API
  const { isPending, error, data } = useQuery({
    queryKey: [`actionsTable-${pageId}`],
    queryFn: async () => {
      const response = await fetch(
        `https://hq.enaleia-hub.com/flows/trigger/${tableEndpoints[pageId]}`,
      )
      return await response.json()
    },
  })
  const records: TableItem[] = data?.data ?? []

// Filter records based on partner type
  const filteredLocations = useMemo(() => {
    return records
      .filter((record: TableItem) => {
        if (partnerType === 'See all') return true;
        return record.type === partnerType;
      })
  }, [partnerType, records])

  // Sort records based on current criteria and direction
  const sortedRecords = useMemo(() => {
    return [...filteredLocations].sort((a, b) => {
      if (sortCriteria === 'action_count') {
        return isAscending ? a.action_count - b.action_count : b.action_count - a.action_count;
      } else {
        return isAtoZ ? a.country.localeCompare(b.country) : b.country.localeCompare(a.country);
      }
    });
  }, [filteredLocations, isAscending, isAtoZ, sortCriteria]);

  /**
   * Handles toggling sort criteria and direction
   * @param criteria - The column to sort by ('action_count' or 'country')
   */
  const toggleSortCriteria = (criteria: 'action_count' | 'country') => {
    if (sortCriteria === criteria) {
      // Toggle the order if the same criteria is selected
      if (criteria === 'action_count') {
        setIsAscending(prev => !prev);
      } else {
        setIsAtoZ(prev => !prev);
      }
    } else {
      // Set the new criteria and reset the order
      setSortCriteria(criteria);
      if (criteria === 'action_count') {
        setIsAscending(false);
      } else {
        setIsAtoZ(false);
      }
    }
  }

   // Setup pagination for the sorted records
  const {
		currentPage,
		currentPageItems: pageTransactions,
		loadPage,
		maxPage,
		needsPagination,
	} = usePagination(sortedRecords, itemsPerPage)

  // Handle loading and error states
  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message
  
  
  return (
    <>
      {pageTransactions.length ? (
        <Table>
          {/* Table header with sortable columns */}
          <TableHeader>
            <TableRow>
              {/* Header cells with conditional rendering for desktop view */}
              <TableHead className="p-0"><div className="text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-1 md:py-2 border border-black rounded-l-3xl">{pageId === 'locations' ? 'LOCATION NAME' : 'VESSEL NAME'}</div></TableHead>
              {isDesktop &&
                <>
                  <TableHead className="p-0">
                    <div className="flex justify-between text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-2 border-y border-black">
                      <p>COUNTRY</p>
                      <div className="cursor-pointer" onClick={() => toggleSortCriteria('country')}>
                        <ArrowUpDown size={14} />
                      </div>
                    </div>
                  </TableHead>
                  <TableHead className="p-0"><div className="text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-2 border border-black">{pageId === 'locations' ? "COORDINATES" : "REGISTERED PORT"}</div></TableHead>
                  <TableHead className="p-0"><div className="flex justify-between text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-2 border-y border-black">TYPE</div></TableHead></>
              }
              <TableHead className="p-0">
                <div className="flex justify-between text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-1 md:py-2 border border-black rounded-r-3xl">
                  <p>ACTIONS</p>
                  <div className="cursor-pointer" onClick={() => toggleSortCriteria('action_count')}>
                    <ArrowUpDown size={14} />
                  </div>                
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Map through paginated records to create table rows */}
            {pageTransactions.map((partner) => {
              const { id, name, country, coordinates, type, registered_port, action_count, wallet_addresses, collector_identity } = partner
              return (
                <TableRow 
                  key={id}
                  onClick={() => navigate({
                    to: `/${pageId}/${id}`,
                    search: { name: name, country: country, coordinates: coordinates, type: type, port: registered_port, addresses: wallet_addresses, collector_identity: collector_identity }
                    })}
                  className="cursor-pointer hover:font-bold"
                >
                  <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border border-black rounded-l-3xl">{name}</div></TableCell>
                  {isDesktop &&
                    <>
                      <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border-y border-black flex gap-2"><img src={`/flag_${country}.svg`} alt="country flag" className="h-5 w-5"/><span>{country}</span></div></TableCell>
                      {pageId === 'locations' && <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border border-black">{coordinates?.length === 2 ? `${coordinates[0]}, ${coordinates[1]}` : 'not available'}</div></TableCell>}
                      {pageId === 'vessels' && <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border border-black">{registered_port ? `${registered_port}` : 'not available'}</div></TableCell>}
                      <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border-y border-black flex gap-2"><img src={`/${type.replace(/ /g, '_')}_icon.svg`} alt="location icon" className="h-5 w-5"/><span>{type}</span></div></TableCell>
                    </>
                  }
                  <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border border-black rounded-r-3xl">{action_count}</div></TableCell>            
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      ):(
        <p>no records found</p>
      )}
 
      {/* Pagination controls */}
      {needsPagination && (
        <article className="flex flex-col justify-center items-center gap-4">
          <Paginator
            needsPagination={needsPagination}
            currentPage={currentPage}
            maxPage={maxPage}
            loadPage={loadPage}
          />
          <ShowingDisplay
            currentPage={currentPage}
            totalItemAmount={filteredLocations.length}
            itemsPerPage={itemsPerPage}
          />
        </article>
			)}
    </>
  )
}

export { ActionsTable };