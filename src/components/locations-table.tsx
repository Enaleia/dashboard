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
import { Button } from "./ui/button"
import { ArrowUpDown } from "lucide-react"
import tableData from '../map_data.json'

const LocationsTable = ({ selectedLocationType }: {selectedLocationType: string}) => {
  const navigate = useNavigate()

  const filteredLocations = useMemo(() => {
    return tableData
      .filter(record => {
        if (selectedLocationType === 'See all') return true;
        return record.type === selectedLocationType;
      })
  }, [selectedLocationType, tableData])
  
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="p-0">
              <div className="flex justify-between text-xs font-bold text-black mt-2 mb-5 px-8 py-2 border border-black rounded-l-3xl">
              <p>NAME</p>
              <ArrowUpDown size={16} strokeWidth={1}/>
              </div>
            </TableHead>
            <TableHead className="p-0">
              <div className="flex justify-between text-xs font-bold text-black mt-2 mb-5 px-8 py-2 border-y border-black">
                <p>COUNTRY</p>
                <ArrowUpDown size={16} strokeWidth={1}/>
              </div>
            </TableHead>
            <TableHead className="p-0">
              <div className="text-xs font-bold text-black mt-2 mb-5 px-8 py-2 border border-black">COORDINATES</div>
            </TableHead>
            <TableHead className="p-0">
              <div className="text-xs font-bold text-black mt-2 mb-5 px-8 py-2 border-y border-black">TYPE</div>
            </TableHead>
            <TableHead className="p-0">
              <div className="flex justify-between text-xs font-bold text-black mt-2 mb-5 px-8 py-2 border border-black rounded-r-3xl">
                <p>ACTION COUNT</p>
                <ArrowUpDown size={16} strokeWidth={1}/>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLocations.map((location) => (
            <TableRow 
              key={location.name}
              onClick={() => navigate({to: `/locations/${location.name}`})}
              className="cursor-pointer hover:font-bold"
            >
              <TableCell className="p-0"><div className="mb-2 px-8 py-5 border border-black rounded-l-3xl">{location.name}</div></TableCell>
              <TableCell className="p-0"><div className="mb-2 px-8 py-5 border-y border-black flex gap-2"><img src={`/flag_${location.country}.svg`} alt="country flag" className="h-5 w-5"/><span>{location.country}</span></div></TableCell>
              <TableCell className="p-0"><div className="mb-2 px-8 py-5 border border-black">{String(location.latitude).slice(0, 10)}, {String(location.longitude).slice(0, 10)}</div></TableCell>
              <TableCell className="p-0"><div className="mb-2 px-8 py-5 border-y border-black flex gap-2"><img src={`/${location.type}_icon.svg`} alt="location icon" className="h-5 w-5"/><span>{location.type}</span></div></TableCell>
              <TableCell className="p-0"><div className="mb-2 px-8 py-5 border border-black rounded-r-3xl">{location.actions}</div></TableCell>            
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center pt-12">
        <Button variant="outline">Load more</Button>
      </div>
    </>
  )
}

export { LocationsTable };