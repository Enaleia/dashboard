import { useNavigate } from "@tanstack/react-router"
import { useState, useMemo } from "react"
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
import tableData from '../map_data.json'
import { useMediaQuery } from "@/hooks/use-media-query";

const LocationsTable = ({ locationType, sortOrder }: { locationType: string, sortOrder: string }) => {
  const navigate = useNavigate()
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const itemsPerPage = 8

  const filteredLocations = useMemo(() => {
    if (locationType === 'Most active') {
      return tableData.sort((a, b) => b.actions - a.actions); // Sort in descending order
    }
    return tableData
      .filter(record => {
        if (locationType === 'See all') return true;
        return record.type === locationType;
      })
  }, [locationType, tableData])

  const {
		currentPage,
		currentPageItems: pageTransactions,
		loadPage,
		maxPage,
		needsPagination,
	} = usePagination(filteredLocations, itemsPerPage);
  
  return (
    <>
      {pageTransactions.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="p-0"><div className="text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-2 border border-black rounded-l-3xl">NAME</div></TableHead>
              {isDesktop &&
                <>
                  <TableHead className="p-0"><div className="text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-2 border-y border-black">COUNTRY</div></TableHead>
                  <TableHead className="p-0"><div className="text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-2 border border-black">COORDINATES</div></TableHead>
                  <TableHead className="p-0"><div className="text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-2 border-y border-black">TYPE</div></TableHead>
                </>
              }
              <TableHead className="p-0"><div className="text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-2 border border-black rounded-r-3xl">ACTION COUNT</div></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageTransactions.map((location) => (
              <TableRow 
                key={location.name}
                onClick={() => navigate({to: `/locations/${location.name}`})}
                className="cursor-pointer hover:font-bold"
              >
                <TableCell className="p-0"><div className="mb-2 px-8 py-5 border border-black rounded-l-3xl">{location.name}</div></TableCell>
                {isDesktop &&
                  <>
                    <TableCell className="p-0"><div className="mb-2 px-8 py-5 border-y border-black flex gap-2"><img src={`/flag_${location.country}.svg`} alt="country flag" className="h-5 w-5"/><span>{location.country}</span></div></TableCell>
                    <TableCell className="p-0"><div className="mb-2 px-8 py-5 border border-black">{String(location.coordinates[0]).slice(0, 10)}, {String(location.coordinates[1]).slice(0, 10)}</div></TableCell>
                    <TableCell className="p-0"><div className="mb-2 px-8 py-5 border-y border-black flex gap-2"><img src={`/${location.type}_icon.svg`} alt="location icon" className="h-5 w-5"/><span>{location.type}</span></div></TableCell>
                  </>
                }
                <TableCell className="p-0"><div className="mb-2 px-8 py-5 border border-black rounded-r-3xl">{location.actions}</div></TableCell>            
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ):(
        <p>no records found</p>
      )}

      {needsPagination && (
        <section className="flex flex-col justify-center items-center gap-4">
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
        </section>
			)}
    </>
  )
}

export { LocationsTable };