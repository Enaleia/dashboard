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
import { ShowingDisplay, Paginator } from "@/components/tables/Paginator"
import { Link, ArrowUpRight } from 'lucide-react'

interface AttestationTableProps {
  pageName: PageName
  partnerId: string;
}

const AttestationsTable = ({ pageName, partnerId }: AttestationTableProps) => {
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT)
  const itemsPerPage = isDesktop ? ITEMS_PER_PAGE.DESKTOP : ITEMS_PER_PAGE.MOBILE

  const { isPending, error, data } = useAttestationData({ pageName, partnerId })
  const records: AttestationItem[] = data?.data ?? []
  console.log('attestations:', records)

  const {
		currentPage,
		currentPageItems: pageTransactions,
		loadPage,
		maxPage,
		needsPagination,
	} = usePagination(records, itemsPerPage)

  if (isPending || error || !pageTransactions.length) {
    return (
      <article className="w-full lg:h-[598px] flex flex-col justify-center items-center text-center text-lg px-10">
          <>
            {isPending && <p>Loading attestation data...</p>}
            {error && <p>Sorry! We are not able to build the attestation table at this time.</p>}
            {!pageTransactions.length && <p>This partner has not made any attestations yet.</p>}
            <img src="/illustrations/dolphin.svg" alt="dolphin illustration" className="w-[300px] h-[300px]"/>
          </>
      </article>
    )
  }

  return (
    <>
      <article className="h-[620px] lg:h-[598px]">
        <p className="font-semibold py-2">Total attestations: {records.length}</p>
        {isDesktop ? ( 
          <Table className="w-full table-fixed overflow-x-auto">
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
            <TableBody>
              {pageTransactions.map((attestation, index) => {
                const { id, submittedBy } = attestation
                return (
                  <TableRow key={index} className="cursor-pointer group border-none">
                    <TableCell className="p-0 w-[46%]">
                      <div className="mt-2 px-8 py-4 border border-darkSand rounded-l-full truncate group-hover:bg-sand transition-colors">
                        {id || 'not available'}
                      </div>
                    </TableCell>
                    <TableCell className="p-0 w-[46%]">
                      <div className="mt-2 px-8 py-4 border-y border-darkSand truncate group-hover:bg-sand transition-colors">
                        {submittedBy || 'not available'}
                      </div>
                    </TableCell>
                    <TableCell className="p-0 w-[8%]">
                      <div className="mt-2 px-8 py-4 border border-darkSand rounded-r-full hover:bg-sand group-hover:bg-sand transition-colors">
                        <a href={`https://optimism.easscan.org/attestation/view/${id}`} target="_blank" rel="noopener noreferrer">
                          <ArrowUpRight size={20} strokeWidth={1}/>
                        </a>
                      </div>
                    </TableCell>            
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        ) : (
          pageTransactions.map((attestation: AttestationItem) => {
            const { id, submittedBy } = attestation
            return (
              <div className='flex flex-row my-2 justify-between w-full items-center border border-darkSand rounded-3xl text-sm'>               
                <div className='w-[80%] flex flex-col justify-between border-r border-darkSand pl-4'>
                  <div className="border-b border-darkSand p-3 truncate">{id || 'not available'}</div>
                  <div className='p-3 truncate'>{submittedBy || 'not available'}</div> 
                </div>
                <div className='h-full w-[20%] px-4'>
                  <a href={`https://optimism.easscan.org/attestation/view/${id}`} target="_blank" rel="noopener noreferrer">
                    <ArrowUpRight size={28} strokeWidth={1}/>
                  </a>
                </div>
              </div>
            )
          })
        )}
      </article>

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
            totalItemAmount={records.length}
            itemsPerPage={itemsPerPage}
          />
        </article>
			)}
    </>
  )
}

export { AttestationsTable }