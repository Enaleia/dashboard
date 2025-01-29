import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { useMemo } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useTableSort } from "@/hooks/use-table-sort"
import { processTableData } from "@/utils/tableProcessing"
import { TABLE_ENDPOINTS } from "@/config/api"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { usePagination } from "@/hooks/use-pagination"
import { ShowingDisplay, Paginator } from "@/components/tables/paginator"
import { ArrowUpDown } from "lucide-react"

const ITEMS_PER_PAGE = 8

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
  const { sortState, toggleSortCriteria } = useTableSort()
  
  // Fetch table data from API
  const { isPending, error, data } = useQuery({
    queryKey: [`actionsTable-${pageId}`],
    queryFn: async () => {
      const response = await fetch(
        `https://hq.enaleia-hub.com/flows/trigger/${TABLE_ENDPOINTS[pageId]}`,
      )
      return await response.json()
    },
    // staleTime: 5 * 60 * 1000,  // Cache data for 5 minutes
    // cacheTime: 30 * 60 * 1000, // Keep unused data in cache for 30 minutes
  })

  const processedRecords = useMemo(() => 
    processTableData(data?.data ?? [], partnerType, sortState),
    [data, partnerType, sortState]
  )

   // Setup pagination for the sorted records
  const {
		currentPage,
		currentPageItems: pageTransactions,
		loadPage,
		maxPage,
		needsPagination,
	} = usePagination(processedRecords, ITEMS_PER_PAGE)

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
                      <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border-y border-black flex gap-2"><img src={`/CountryFlags/${country}.svg`} alt={`${country} flag`} className="h-5 w-5"/><span>{country}</span></div></TableCell>
                      {pageId === 'locations' && <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border border-black">{coordinates?.length === 2 ? `${coordinates[0]}, ${coordinates[1]}` : 'not available'}</div></TableCell>}
                      {pageId === 'vessels' && <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border border-black">{registered_port ? `${registered_port}` : 'not available'}</div></TableCell>}
                      <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border-y border-black flex gap-2"><img src={`/PartnerIcons/${type.replace(/ /g, '_')}.svg`} alt={`${type} icon`} className="h-5 w-5"/><span>{type}</span></div></TableCell>
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
            totalItemAmount={processedRecords.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </article>
			)}
    </>
  )
}

export { ActionsTable };