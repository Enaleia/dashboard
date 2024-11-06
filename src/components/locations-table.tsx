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
            <TableHead>Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Coordinates</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Action count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((location) => (
            <TableRow 
              key={location.name}
              onClick={() => navigate({to: `/locations/${location.name}`})}
              className="cursor-pointer hover:font-bold"
            >
              <TableCell>{location.name}</TableCell>
              <TableCell>{location.country}</TableCell>
              <TableCell>{String(location.latitude).slice(0, 10)}, {String(location.longitude).slice(0, 10)} </TableCell>
              <TableCell>{location.type}</TableCell>
              <TableCell>{location.actions}</TableCell>            
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