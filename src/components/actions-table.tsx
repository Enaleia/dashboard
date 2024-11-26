import { useNavigate } from "@tanstack/react-router"
import { useMemo } from "react"
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

interface TableItem {
  name: string;
  country: string;
  coordinates?: number[];
  port?: string;
  type: string;
  kg: number;
  actions: number
}

interface ActionsTableProps {
  category: string;
  tableData: TableItem[]
  partnerType: string;
  sortOrder: string
}

const ActionsTable = ({ category, tableData, partnerType, sortOrder }: ActionsTableProps) => {
  const navigate = useNavigate()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const itemsPerPage = 8

  const filteredLocations = useMemo(() => {
    return tableData
      .filter(record => {
        if (partnerType === 'See all') return true;
        return record.type === partnerType;
      })
  }, [partnerType, tableData])

  const {
		currentPage,
		currentPageItems: pageTransactions,
		loadPage,
		maxPage,
		needsPagination,
	} = usePagination(filteredLocations, itemsPerPage)
  
  return (
    <>
      {pageTransactions.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="p-0"><div className="text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-1 md:py-2 border border-black rounded-l-3xl">NAME</div></TableHead>
              {isDesktop &&
                <>
                  <TableHead className="p-0"><div className="text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-2 border-y border-black">COUNTRY</div></TableHead>
                  <TableHead className="p-0"><div className="text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-2 border border-black">{category === 'locations' ? "COORDINATES" : "REGISTERED PORT"}</div></TableHead>
                  <TableHead className="p-0"><div className="text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-2 border-y border-black">TYPE</div></TableHead>
                </>
              }
              <TableHead className="p-0"><div className="text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-1 md:py-2 border border-black rounded-r-3xl">ACTION COUNT</div></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageTransactions.map((partner) => (
              <TableRow 
                key={partner.name}
                onClick={() => navigate({to: `/${category}/${partner.name}`})}
                className="cursor-pointer hover:font-bold"
              >
                <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border border-black rounded-l-3xl">{partner.name}</div></TableCell>
                {isDesktop &&
                  <>
                    <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border-y border-black flex gap-2"><img src={`/flag_${partner.country}.svg`} alt="country flag" className="h-5 w-5"/><span>{partner.country}</span></div></TableCell>
                    {partner.coordinates && <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border border-black">{String(partner.coordinates[0]).slice(0, 10)}, {String(partner.coordinates[1]).slice(0, 10)}</div></TableCell>}
                    {partner.port && <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border border-black">{partner.port}</div></TableCell>}
                    <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border-y border-black flex gap-2"><img src={`/${partner.type}_icon.svg`} alt="location icon" className="h-5 w-5"/><span>{partner.type}</span></div></TableCell>
                  </>
                }
                <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border border-black rounded-r-3xl">{partner.actions}</div></TableCell>            
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ):(
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
          {/* <ShowingDisplay
            currentPage={currentPage}
            totalItemAmount={filteredLocations.length}
            itemsPerPage={itemsPerPage}
          /> */}
        </article>
			)}
    </>
  )
}

export { ActionsTable };