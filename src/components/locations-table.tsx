import { useNavigate } from "@tanstack/react-router"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import tableData from '../map_data.json'

const LocationsTable = () => {
  const navigate = useNavigate()
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="p-0"><div className="text-xs font-bold text-black mt-2 mb-5 px-8 py-2 border border-black rounded-l-3xl">NAME</div></TableHead>
            <TableHead className="p-0"><div className="text-xs font-bold text-black mt-2 mb-5 px-8 py-2 border-y border-black">COUNTRY</div></TableHead>
            <TableHead className="p-0"><div className="text-xs font-bold text-black mt-2 mb-5 px-8 py-2 border border-black">COORDINATES</div></TableHead>
            <TableHead className="p-0"><div className="text-xs font-bold text-black mt-2 mb-5 px-8 py-2 border-y border-black">TYPE</div></TableHead>
            <TableHead className="p-0"><div className="text-xs font-bold text-black mt-2 mb-5 px-8 py-2 border border-black rounded-r-3xl">ACTION COUNT</div></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((location) => (
            <TableRow 
              key={location.name}
              onClick={() => navigate({to: `/locations/${location.name}`})}
              className="cursor-pointer hover:font-bold"
            >
              <TableCell className="p-0"><div className="mb-2 px-8 py-5 border border-black rounded-l-3xl">{location.name}</div></TableCell>
              <TableCell className="p-0"><div className="mb-2 px-8 py-5 border-y border-black">{location.country}</div></TableCell>
              <TableCell className="p-0"><div className="mb-2 px-8 py-5 border border-black">{String(location.latitude).slice(0, 10)}, {String(location.longitude).slice(0, 10)}</div></TableCell>
              <TableCell className="p-0"><div className="mb-2 px-8 py-5 border-y border-black flex gap-2"><img src={`/${location.type}_icon.svg`} alt="location icon"/><span>{location.type}</span></div></TableCell>
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