import { useNavigate } from "@tanstack/react-router"
import { useTableData } from "@/hooks/api/useTableData"
import { useMediaQuery } from "@/hooks/ui/useMediaQuery"
import { useProcessedRecords } from "@/hooks/ui/useProcessedRecords"
import { useTableSort } from "@/hooks/ui/useTableSort"
import { PageName, PartnerType, TableItem } from "@/types"
import { DESKTOP_BREAKPOINT, ITEMS_PER_PAGE } from "@/config/constants"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { usePagination } from "@/hooks/ui/usePagination"
import { ShowingDisplay, Paginator } from "@/components/tables/paginator"
import { ArrowUpDown } from "lucide-react"

/**
 * Props for the ActionsTable component
 * @param pageId - Determines whether to display locations or vessels
 * @param partnerType - Filter criterion for the type of partner to display
 */
interface ActionsTableProps {
  pageName: PageName
  partnerType: PartnerType
}

const ActionsTable = ({ pageName, partnerType }: ActionsTableProps) => {
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT)
  const itemsPerPage = isDesktop ? ITEMS_PER_PAGE.DESKTOP : ITEMS_PER_PAGE.MOBILE
  const navigate = useNavigate()
  const { sortState, toggleSortCriteria } = useTableSort()
  
  // Fetch table data from API
  const { isPending, error, data } = useTableData({ pageName })
  const records: TableItem[] = data?.data ?? []
  const processedRecords = useProcessedRecords(records, partnerType, sortState)

   // Setup pagination for the sorted records
  const {
		currentPage,
		currentPageItems: pageTransactions,
		loadPage,
		maxPage,
		needsPagination,
	} = usePagination(processedRecords, itemsPerPage)

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
              <TableHead className="p-0"><div className="text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-1 md:py-2 border border-black rounded-l-3xl">{pageName === 'Locations' ? 'LOCATION NAME' : 'VESSEL NAME'}</div></TableHead>
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
                  <TableHead className="p-0"><div className="text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-2 border border-black">{pageName === 'Locations' ? "COORDINATES" : "REGISTERED PORT"}</div></TableHead>
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
                    to: `/${pageName.toLowerCase()}/${id}`,
                    search: { name: name, country: country, coordinates: coordinates, type: type, port: registered_port, addresses: wallet_addresses, collector_identity: collector_identity }
                    })}
                  className="cursor-pointer hover:font-bold"
                >
                  <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border border-black rounded-l-3xl">{name}</div></TableCell>
                  {isDesktop &&
                    <>
                      <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border-y border-black flex gap-2"><img src={`/CountryFlags/${country}.svg`} alt={`${country} flag`} className="h-5 w-5"/><span>{country}</span></div></TableCell>
                      {pageName === 'Locations' && <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border border-black">{coordinates?.length === 2 ? `${coordinates[0]}, ${coordinates[1]}` : 'not available'}</div></TableCell>}
                      {pageName === 'Vessels' && <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border border-black">{registered_port ? `${registered_port}` : 'not available'}</div></TableCell>}
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
            itemsPerPage={itemsPerPage}
          />
        </article>
			)}
    </>
  )
}

export { ActionsTable };