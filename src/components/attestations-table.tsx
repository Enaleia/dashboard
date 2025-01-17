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
import { Link, ArrowUpRight } from 'lucide-react'
import attestationData from '@/attestation_data.json'

interface Attestation {
  UUID: string;
  submittedOn: string;
  submittedBy: string;
  txLink: string
}

const AttestationsTable = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const itemsPerPage = isDesktop ? 8 : 5

  const {
		currentPage,
		currentPageItems: pageTransactions,
		loadPage,
		maxPage,
		needsPagination,
	} = usePagination(attestationData, itemsPerPage)

  return (
    <>
      <p className="font-semibold py-2">Total attestations: {attestationData.length}</p>
      {pageTransactions.length ? (
        isDesktop ? ( 
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="p-0"><div className="text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-2 border border-black rounded-l-3xl">Attestation UUID</div></TableHead>
                <TableHead className="p-0"><div className="text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-2 border-y border-black">Submitted by</div></TableHead>
                <TableHead className="p-0"><div className="text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-2 border border-black rounded-r-3xl"><Link size={16}/></div></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageTransactions.map((attestation) => {
                const { UUID, submittedBy, txLink } = attestation
                return (
                  <TableRow key={UUID}>
                    <TableCell className="p-0"><div className="mb-2 px-8 py-5 border border-black rounded-l-3xl">{UUID}</div></TableCell>
                    <TableCell className="p-0"><div className="mb-2 px-8 py-5 border-y border-black flex gap-2">{submittedBy}</div></TableCell>
                    <TableCell className="p-0"><div className="mb-2 px-8 py-5 border border-black rounded-r-3xl"><a href={`${txLink}`}><ArrowUpRight size={20} strokeWidth={1}/></a></div></TableCell>            
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        ) : (
          pageTransactions.map((attestation: Attestation) => {
            const { UUID, submittedBy, txLink } = attestation
            return (
              <div className='flex flex-row justify-between w-full items-center border border-black rounded-3xl text-sm'>               
                <div className='w-full flex flex-col justify-between border-r border-gray-400 pl-4'>
                  <div className="border-b border-gray-400 p-3">{UUID.slice(0, 28)}....</div>
                  <div className='w-full flex flex-row justify-between p-3'>{submittedBy}</div> 
                </div>
                <div className='h-full px-4'><a href={txLink}><ArrowUpRight size={28} strokeWidth={1}/></a></div>
              </div>
            )
          })
        )
      ) : (
        <p>no records found</p>
      )}

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
            totalItemAmount={attestationData.length}
            itemsPerPage={itemsPerPage}
          />
        </article>
			)}
    </>
  )
}

export { AttestationsTable };