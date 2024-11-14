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
import { ArrowUpDown } from "lucide-react"
import { usePagination } from "@/hooks/use-pagination"
import { ShowingDisplay, Paginator } from "@/components/paginator"
import vesselData from '@/vessel_data.json'

const VesselsTable = ({ selectedVesselType }: {selectedVesselType: string}) => {
  const navigate = useNavigate()
  const itemsPerPage = 8

  const filteredLocations = useMemo(() => {
    if (selectedVesselType === 'Most active') {
      return vesselData.sort((a, b) => b.actions - a.actions); // Sort in descending order
    }
    return vesselData
      .filter(record => {
        if (selectedVesselType === 'See all') return true;
        return record.type === selectedVesselType;
      })
  }, [selectedVesselType, vesselData])

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
              <TableHead className="p-0">
                <div className="flex justify-between text-xs font-bold text-black mt-2 mb-5 px-8 py-2 border border-black rounded-l-3xl">
                <p>NAME</p>
                <ArrowUpDown size={16} strokeWidth={1} className="cursor-pointer"/>
                </div>
              </TableHead>
              <TableHead className="p-0">
                <div className="flex justify-between text-xs font-bold text-black mt-2 mb-5 px-8 py-2 border-y border-black">
                  <p>COUNTRY</p>
                  <ArrowUpDown size={16} strokeWidth={1} className="cursor-pointer"/>
                </div>
              </TableHead>
              <TableHead className="p-0">
                <div className="text-xs font-bold text-black mt-2 mb-5 px-8 py-2 border border-black">REGISTERED PORT</div>
              </TableHead>
              <TableHead className="p-0">
                <div className="text-xs font-bold text-black mt-2 mb-5 px-8 py-2 border-y border-black">TYPE</div>
              </TableHead>
              <TableHead className="p-0">
                <div className="flex justify-between text-xs font-bold text-black mt-2 mb-5 px-8 py-2 border border-black rounded-r-3xl">
                  <p>ACTION COUNT</p>
                  <ArrowUpDown 
                    size={16} 
                    strokeWidth={1} 
                    className="cursor-pointer"
                  />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageTransactions.map((vessel) => (
              <TableRow 
                key={vessel.name}
                onClick={() => navigate({to: `/vessels/${vessel.name}`})}
                className="cursor-pointer hover:font-bold"
              >
                <TableCell className="p-0"><div className="mb-2 px-8 py-5 border border-black rounded-l-3xl">{vessel.name}</div></TableCell>
                <TableCell className="p-0"><div className="mb-2 px-8 py-5 border-y border-black flex gap-2"><img src={`/flag_${vessel.country}.svg`} alt="country flag" className="h-5 w-5"/><span>{vessel.country}</span></div></TableCell>
                <TableCell className="p-0"><div className="mb-2 px-8 py-5 border border-black">{vessel.port}</div></TableCell>
                <TableCell className="p-0"><div className="mb-2 px-8 py-5 border-y border-black flex gap-2"><img src={`/${vessel.type}_icon.svg`} alt="location icon" className="h-5 w-5"/><span>{vessel.type}</span></div></TableCell>
                <TableCell className="p-0"><div className="mb-2 px-8 py-5 border border-black rounded-r-3xl">{vessel.actions}</div></TableCell>            
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

export { VesselsTable };