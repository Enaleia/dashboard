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
import { ShowingDisplay, TablePaginator } from "@/components/tables/TablePaginator"
import { ArrowUpDown } from "lucide-react"

/**
 * Interface for the ActionsTable component props
 * @property {PageName} pageName - The page type where the table is displayed ('Locations' or 'Vessels')
 * @property {PartnerType} partnerType - The selected partner type filter
 */
interface ActionsTableProps {
  pageName: PageName
  partnerType: PartnerType
}

/**
 * ActionsTable - Component that displays partner data in a sortable, filterable table
 * 
 * Renders a table of partners (locations or vessels) with:
 * - Partner identification details (name, country, type)
 * - Location-specific data (coordinates) or vessel-specific data (registered port)
 * - Action count with sorting capability
 * - Clickable rows that navigate to detail pages
 * 
 * Features:
 * - Responsive design (simplified view on mobile)
 * - Sortable columns (country and action_count)
 * - Filtering by partner type
 * - Pagination with configurable items per page
 * - Loading and error states
 * 
 * The component handles data fetching, filtering, sorting, and navigation to detail pages.
 */
const ActionsTable = ({ pageName, partnerType }: ActionsTableProps) => {
  // Determine device type for responsive layout and pagination settings
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT)
  const itemsPerPage = isDesktop ? ITEMS_PER_PAGE.DESKTOP : ITEMS_PER_PAGE.MOBILE
  
  // Set up navigation for detail page links
  const navigate = useNavigate()
  
  // Initialize sorting functionality
  const { sortState, toggleSortCriteria } = useTableSort()
  
  // Fetch table data from API based on page type
  const { isPending, error, data } = useTableData({ pageName })
  const records: TableItem[] = data?.data ?? []

  // Apply filtering and sorting to records
  const processedRecords = useProcessedRecords(records, partnerType, sortState)

   // Setup pagination for the sorted records
  const {
		currentPage,
		currentPageItems: pageTransactions,
		loadPage,
		maxPage,
		needsPagination,
	} = usePagination(processedRecords, itemsPerPage)
  
  // Handle loading and error states with placeholders
  if (isPending || error) {
    return (
      <article className="w-full lg:h-[598px] flex flex-col justify-center items-center text-center text-lg px-10">
        {isPending ? (
          <p>Loading table data...</p>
        ) : (
          <>
            <p>😕 sorry!</p>
            <p>We are not able to build the {pageName} table at this time.</p>
            <img 
              src="/illustrations/dolphin.svg" 
              alt="dolphin illustration" 
              className="w-[300px] h-[300px]"
              loading="lazy"
            />
          </>
        )}
      </article>
    )
  }
  
  return (
    <>
      {/* Main table container with fixed height */}
      <article className="h-[450px] lg:h-[598px]">
        <Table className="w-full table-fixed overflow-x-auto">
          <TableHeader>
            <TableRow className="border-none">
              {/* Partner name column header - always visible */}
              <TableHead className="p-0 w-[30%]">
                  <div className="text-xs font-light text-softBlack bg-sand px-4 md:px-8 py-1 md:py-2 border border-darkSand rounded-l-full">
                    {pageName === 'Locations' ? 'LOCATION NAME' : 'VESSEL NAME'}
                  </div>
              </TableHead>

              {/* Additional columns - only visible on desktop */}
              {isDesktop &&
                <>
                  {/* Country column with sort toggle */}
                  <TableHead className="p-0 w-[17%]">
                    <div className="flex gap-2 text-xs font-light text-softBlack bg-sand px-8 py-2 border-y border-darkSand">
                      <p>COUNTRY</p>
                      <div className="cursor-pointer" onClick={() => toggleSortCriteria('country')}>
                        <ArrowUpDown size={14} />
                      </div>
                    </div>
                  </TableHead>
                  {/* Coordinates/port column - content depends on page type */}
                  <TableHead className="p-0 w-[23%]">
                    <div className="text-xs font-light text-softBlack bg-sand px-8 py-2 border border-darkSand">
                      {pageName === 'Locations' ? "COORDINATES" : "REGISTERED PORT"}
                    </div>
                  </TableHead>
                  {/* Partner type column */}
                  <TableHead className="p-0 w-[17%]">
                    <div className="text-xs font-light text-softBlack bg-sand px-8 py-2 border-y border-darkSand">
                      TYPE
                    </div>
                  </TableHead>
                </>
              }

              {/* Actions count column with sort toggle - always visible */}
              <TableHead className="p-0 w-[13%]">
                <div className="flex gap-2 text-xs font-light text-softBlack bg-sand p-4 md:px-8 py-1 md:py-2 border border-darkSand rounded-r-full">
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
                  // Navigate to detail page with all relevant data as search params
                  onClick={() => navigate({
                    to: `/${pageName.toLowerCase()}/${id}`,
                    search: { name: name, country: country, coordinates: coordinates, type: type, port: registered_port, addresses: wallet_addresses, collector_identity: collector_identity }
                    })}
                  className="cursor-pointer group border-none"
                >
                  {/* Partner name cell - always visible */}
                  <TableCell className="p-0 w-[30%]">
                    <div className="mt-2 px-4 md:px-8 py-4 border border-darkSand rounded-l-full truncate group-hover:bg-sand transition-colors">
                      {name}
                    </div>
                  </TableCell>

                  {/* Additional cells - only visible on desktop */}
                  {isDesktop &&
                    <>
                      {/* Country cell with flag icon */}
                      <TableCell className="p-0 w-[17%]">
                        <div className="mt-2 px-8 py-4 border-y border-darkSand flex gap-2 trucate group-hover:bg-sand transition-colors">
                          <img 
                            src={`/country-flags/${country}.svg`} 
                            alt={`${country} flag`} 
                            className="h-5 w-5"
                            loading="lazy"
                          />
                          <span>{country}</span>
                        </div>
                      </TableCell>
                      {/* Coordinates cell - only for Locations */}
                      {pageName === 'Locations' && <TableCell className="p-0 w-[23%]">
                        <div className="mt-2 px-8 py-4 border border-darkSand truncate group-hover:bg-sand transition-colors">
                          {coordinates?.length === 2 ? `${coordinates[0]}, ${coordinates[1]}` : 'not available'}
                        </div>
                      </TableCell>}
                      {/* Registered port cell - only for Vessels */}
                      {pageName === 'Vessels' && <TableCell className="p-0 w-[23%]">
                        <div className="mt-2 px-8 py-4 border border-darkSand truncate group-hover:bg-sand transition-colors">
                          {registered_port ? `${registered_port}` : 'not available'}
                        </div>
                      </TableCell>}
                      {/* Partner type cell with icon */}
                      <TableCell className="p-0 w-[17%]">
                        <div className="mt-2 px-8 py-4 border-y border-darkSand flex gap-2 truncate group-hover:bg-sand transition-colors">
                          <img 
                            src={`/partner-icons/${type.replace(/ /g, '_')}.svg`} 
                            alt={`${type} icon`} 
                            className="h-5 w-5"
                            loading="lazy"
                          />
                          <span>{type}</span>
                        </div>
                      </TableCell>
                    </>
                  }

                  {/* Actions count cell - always visible */}
                  <TableCell className="p-0 w-[13%]">
                    <div className="mt-2 px-4 md:px-8 py-4 border border-darkSand rounded-r-full group-hover:bg-sand transition-colors">
                      {action_count}
                    </div>
                  </TableCell>            
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </article>
 
      {/* Pagination controls - only displayed if needed */}
      {needsPagination && (
        <article className="flex flex-col justify-center items-center gap-4">
          {/* Page number buttons with prev/next controls */}
          <TablePaginator
            needsPagination={needsPagination}
            currentPage={currentPage}
            maxPage={maxPage}
            loadPage={loadPage}
          />
          {/* "Showing X-Y of Z items" indicator */}
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

export { ActionsTable }