import { useAttestationData } from "@/hooks/api/useAttestationData"
import { useMediaQuery } from "@/hooks/ui/useMediaQuery"
import { usePagination } from "@/hooks/ui/usePagination"
import { PageName, AttestationItem } from "@/types"
import { DESKTOP_BREAKPOINT, ITEMS_PER_PAGE } from "@/config/constants"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ShowingDisplay, TablePaginator } from "@/components/tables/TablePaginator"
import { Link, ArrowUpRight } from 'lucide-react'

/**
 * Interface for the AttestationsTable component props
 * @property {PageName} pageName - The page type where the table is displayed (affects data fetching)
 * @property {string} partnerId - ID of the partner (location/vessel/product) to fetch attestations for
 */
interface AttestationTableProps {
  pageName: PageName
  partnerId: string;
}

/**
 * AttestationsTable - Component that displays blockchain attestation records
 * 
 * Renders a table or list of blockchain attestations with:
 * - Attestation unique identifiers
 * - Submitter information
 * - Links to external blockchain explorer
 * 
 * Features:
 * - Responsive design (table on desktop, cards on mobile)
 * - Pagination with configurable items per page
 * - Loading, error, and empty states
 * - External links to verify attestations on blockchain
 * 
 * The component fetches attestation data based on the page type and partner ID,
 * then displays it with appropriate pagination controls.
 */
const AttestationsTable = ({ pageName, partnerId }: AttestationTableProps) => {
  // Determine device type for responsive layout and pagination settings
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT)
  const itemsPerPage = isDesktop ? ITEMS_PER_PAGE.DESKTOP : ITEMS_PER_PAGE.MOBILE

  // Fetch attestation data based on page type and partner ID
  const { isPending, error, data } = useAttestationData({ pageName, partnerId })
  const records: AttestationItem[] = data?.data ?? []

  // Set up pagination for attestation records
  const {
		currentPage,
		currentPageItems: pageTransactions,
		loadPage,
		maxPage,
		needsPagination,
	} = usePagination(records, itemsPerPage)

  // Handle loading, error, and empty states with a placeholder view
  if (isPending || error || !pageTransactions.length) {
    return (
      <article className="w-full lg:h-[598px] flex flex-col justify-center items-center text-center text-lg px-10">
          <>
            {isPending && <p>Loading attestation data...</p>}
            {error && <p>Sorry! We are not able to build the attestation table at this time.</p>}
            {!pageTransactions.length && <p>There is no attestation made yet.</p>}
            <img 
              src="/illustrations/dolphin.svg" 
              alt="dolphin illustration" 
              className="w-[300px] h-[300px]"
              loading="lazy"
            />
          </>
      </article>
    )
  }

  return (
    <>
      {/* Main table container with fixed height */}
      <article className="h-[620px] lg:h-[598px]">
        <p className="font-semibold py-2">Total attestations: {records.length}</p>
        {/* Desktop view: Full table with headers */}
        {isDesktop ? ( 
          <Table className="w-full table-fixed overflow-x-auto">
            {/* Table headers with styled background */}
            <TableHeader>
              <TableRow className="border-none">
                <TableHead className="p-0 w-[46%]">
                  <div className="text-xs font-light text-softBlack bg-sand mt-2 px-8 py-2 border border-darkSand rounded-l-full">
                    Attestation UID
                  </div>
                </TableHead>
                <TableHead className="p-0 w-[46%]">
                  <div className="text-xs font-light text-softBlack bg-sand mt-2 px-8 py-2 border-y border-darkSand">
                    Submitted by
                  </div>
                </TableHead>
                <TableHead className="p-0 w-[8%]">
                  <div className="text-xs font-light text-softBlack bg-sand mt-2 px-8 py-2 border border-darkSand rounded-r-full">
                    <Link size={16}/>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>

            {/* Table body with attestation records */}
            <TableBody>
              {pageTransactions.map((attestation, index) => {
                const { id, submittedBy } = attestation
                const attestationUrl = `https://optimism.easscan.org/attestation/view/${id}`
                return (
                  <TableRow 
                    key={index} 
                    className="group border-none relative"
                  >
                    <TableCell colSpan={3} className="p-0">
                      <a 
                        href={attestationUrl}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <div className="flex">
                          {/* Attestation ID column with left-rounded border */}
                          <div className="w-[46%]">
                            <div className="mt-2 px-8 py-4 border border-darkSand rounded-l-full truncate group-hover:bg-sand transition-colors">
                              {id || 'not available'}
                            </div>
                          </div>
                          {/* Submitter column */}
                          <div className="w-[46%]">
                            <div className="mt-2 px-8 py-4 border-y border-darkSand truncate group-hover:bg-sand transition-colors">
                              {submittedBy || 'not available'}
                            </div>
                          </div>
                          {/* External link column with right-rounded border */}
                          <div className="w-[8%]">
                            <div className="mt-2 px-8 py-4 border border-darkSand rounded-r-full group-hover:bg-sand transition-colors flex justify-center items-center">
                              <ArrowUpRight size={20} strokeWidth={1}/>
                            </div>
                          </div>
                        </div>
                      </a>
                    </TableCell>           
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        ) : (
          // Mobile view: Card-based layout for better small screen experience
          pageTransactions.map((attestation: AttestationItem) => {
            const { id, submittedBy } = attestation
            const attestationUrl = `https://optimism.easscan.org/attestation/view/${id}`
            return (
              <div className='flex flex-row my-2 justify-between w-full items-center border border-darkSand rounded-3xl text-sm'>               
                <div className='w-[80%] flex flex-col justify-between border-r border-darkSand pl-4'>
                  <div className="border-b border-darkSand p-3 truncate">{id || 'not available'}</div>
                  <div className='p-3 truncate'>{submittedBy || 'not available'}</div> 
                </div>
                <div className='h-full w-[20%] px-4'>
                  <a href={attestationUrl} target="_blank" rel="noopener noreferrer">
                    <ArrowUpRight size={28} strokeWidth={1}/>
                  </a>
                </div>
              </div>
            )
          })
        )}
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
            totalItemAmount={records.length}
            itemsPerPage={itemsPerPage}
          />
        </article>
      )}
    </>
  )
}

export { AttestationsTable }