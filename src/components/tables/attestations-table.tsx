import { useAttestationData } from "@/hooks/api/useAttestationData"
import { PageName, AttestationItem } from "@/types"
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
import { useMediaQuery } from "@/hooks/ui/useMediaQuery"
import { Link, ArrowUpRight } from 'lucide-react'

interface AttestationTableProps {
  pageName: PageName
  partnerId: string;
}

const AttestationsTable = ({ pageName, partnerId }: AttestationTableProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const itemsPerPage = isDesktop ? 8 : 5

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

  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message


  return (
    <>
      <p className="font-semibold py-2">Total attestations: {records.length}</p>
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
                const { id, submittedBy } = attestation
                return (
                  <TableRow key={id}>
                    <TableCell className="p-0"><div className="mb-2 px-8 py-5 border border-black rounded-l-3xl">{id || 'null'}</div></TableCell>
                    <TableCell className="p-0"><div className="mb-2 px-8 py-5 border-y border-black flex gap-2">{submittedBy || 'null'}</div></TableCell>
                    <TableCell className="p-0"><div className="mb-2 px-8 py-5 border border-black rounded-r-3xl"><a href=''><ArrowUpRight size={20} strokeWidth={1}/></a></div></TableCell>            
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        ) : (
          pageTransactions.map((attestation: AttestationItem) => {
            const { id, submittedBy } = attestation
            return (
              <div className='flex flex-row justify-between w-full items-center border border-black rounded-3xl text-sm'>               
                <div className='w-full flex flex-col justify-between border-r border-gray-400 pl-4'>
                  <div className="border-b border-gray-400 p-3">{id || 'null'}....</div>
                  <div className='w-full flex flex-row justify-between p-3'>{submittedBy || 'null'}</div> 
                </div>
                <div className='h-full px-4'><a href=''><ArrowUpRight size={28} strokeWidth={1}/></a></div>
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
            totalItemAmount={records.length}
            itemsPerPage={itemsPerPage}
          />
        </article>
			)}
    </>
  )
}

export { AttestationsTable };