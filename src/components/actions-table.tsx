import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { useMemo, useState } from "react"
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
import { ArrowUpDown } from "lucide-react"

const pageIds = [
  'locations',
  'vessels',
] as const

type PageId = typeof pageIds[number]

const tableEndpoints = {
  locations: "a9fc78b6-96a7-4be2-836b-153671fc367f?role=fcf2d257-495d-48d9-a2e0-a272ed3c44db&role=47eb616c-820c-4be9-abe1-9a41d385bc6d&role=0f0ca9f1-3f58-4c56-8361-9dd82ba2b476&sort=descending&page=1&limit=1000",
  vessels: ""
}

interface TableItem {
  company_id: string;
  location_name: string;
  country: string;
  coordinates?: string;
  port?: string;
  type: string;
  kg: number;
  action_count: number
}

interface ActionsTableProps {
  pageId: PageId;
  partnerType: string;
  sortOrder: string
}

const ActionsTable = ({ pageId, partnerType, sortOrder }: ActionsTableProps) => {
  const navigate = useNavigate()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const itemsPerPage = 8
  const [isAtoZ , setIsAtoZ] = useState(false)
  const [isAscending, setIsAscending] = useState(false)
  const [sortCriteria, setSortCriteria] = useState<'action_count' | 'country'>('action_count')
  
  const { isPending, error, data } = useQuery({
    queryKey: [pageId],
    queryFn: async () => {
      const response = await fetch(
        `/api/flows/trigger/${tableEndpoints[pageId]}`
        // `https://hq.enaleia-hub.com/flows/trigger/${tableEndpoints[pageId]}`,
      )
      return await response.json()
    },
  })
  const records = data?.locationPayload ?? []

  const filteredLocations = useMemo(() => {
    return records
      .filter((record: TableItem) => {
        if (partnerType === 'See all') return true;
        return record.type === partnerType;
      })
  }, [partnerType, records])

  const sortedRecords = useMemo(() => {
    return [...filteredLocations].sort((a, b) => {
      if (sortCriteria === 'action_count') {
        return isAscending ? a.action_count - b.action_count : b.action_count - a.action_count;
      } else {
        return isAtoZ ? a.country.localeCompare(b.country) : b.country.localeCompare(a.country);
      }
    });
  }, [filteredLocations, isAscending, isAtoZ, sortCriteria]);

  const toggleSortCriteria = (criteria: 'action_count' | 'country') => {
    if (sortCriteria === criteria) {
      // Toggle the order if the same criteria is selected
      if (criteria === 'action_count') {
        setIsAscending(prev => !prev);
      } else {
        setIsAtoZ(prev => !prev);
      }
    } else {
      // Set the new criteria and reset the order
      setSortCriteria(criteria);
      if (criteria === 'action_count') {
        setIsAscending(false);
      } else {
        setIsAtoZ(false);
      }
    }
  }
  // const sortedCountries = useMemo(() => {
  //   return [...filteredLocations].sort((a, b) => {
  //     return isAtoZ ? a.action_count - b.action_count : b.action_count - a.action_count;
  //   });
  // }, [filteredLocations, isAtoZ])

  // const sortedActionCounts = useMemo(() => {
  //   return [...filteredLocations].sort((a, b) => {
  //     return isAscending ? a.action_count - b.action_count : b.action_count - a.action_count;
  //   });
  // }, [filteredLocations, isAscending])

  // const toggleCountryOrder = () => {
  //   setIsAtoZ(prev => !prev);
  // }

  // const toggleActionsOrder = () => {
  //   setIsAscending(prev => !prev);
  // }

  const {
		currentPage,
		currentPageItems: pageTransactions,
		loadPage,
		maxPage,
		needsPagination,
	} = usePagination(sortedRecords, itemsPerPage) as {
    currentPage: number; 
    currentPageItems: TableItem[]; 
    loadPage: () => void; 
    maxPage: number; 
    needsPagination: boolean;
  }

  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message
  
  
  return (
    <>
      {pageTransactions.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="p-0"><div className="text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-1 md:py-2 border border-black rounded-l-3xl">{pageId === 'locations' ? 'LOCATION NAME' : 'VESSEL NAME'}</div></TableHead>
              {isDesktop &&
                <>
                  <TableHead className="p-0">
                    <div className="flex justify-between text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-2 border-y border-black">
                      <p>COUNTRY</p>
                      <div className="cursor-pointer" onClick={() => toggleSortCriteria('country')}>
                        <ArrowUpDown size={14} />
                      </div>
                    </div>
                  </TableHead>
                  <TableHead className="p-0"><div className="text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-2 border border-black">{pageId === 'locations' ? "COORDINATES" : "REGISTERED PORT"}</div></TableHead>
                  <TableHead className="p-0"><div className="flex justify-between text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-2 border-y border-black">TYPE</div></TableHead></>
              }
              <TableHead className="p-0">
                <div className="flex justify-between text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-1 md:py-2 border border-black rounded-r-3xl">
                  <p>ACTIONS</p>
                  <div className="cursor-pointer" onClick={() => toggleSortCriteria('action_count')}>
                    <ArrowUpDown size={14} />
                  </div>                
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageTransactions.map((partner) => (
              <TableRow 
                key={partner.location_name}
                onClick={() => navigate({
                  to: `/${pageId}/${partner.company_id}`,
                  search: { name: partner.location_name, country: partner.country, coordinates: partner.coordinates, type: partner.type }
                  })}
                className="cursor-pointer hover:font-bold"
              >
                <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border border-black rounded-l-3xl">{partner.location_name}</div></TableCell>
                {isDesktop &&
                  <>
                    <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border-y border-black flex gap-2"><img src={`/flag_${partner.country}.svg`} alt="country flag" className="h-5 w-5"/><span>{partner.country}</span></div></TableCell>
                    {pageId === 'locations' && <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border border-black">{partner.coordinates || 'not available'}</div></TableCell>}
                    {pageId === 'vessels' && <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border border-black">{partner.port || 'not available'}</div></TableCell>}
                    <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border-y border-black flex gap-2"><img src={`/${partner.type}_icon.svg`} alt="location icon" className="h-5 w-5"/><span>{partner.type}</span></div></TableCell>
                  </>
                }
                <TableCell className="p-0"><div className="mb-2 px-8 py-4 md:pt-5 border border-black rounded-r-3xl">{partner.action_count}</div></TableCell>            
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
          <ShowingDisplay
            currentPage={currentPage}
            totalItemAmount={filteredLocations.length}
            itemsPerPage={itemsPerPage}
          />
        </article>
			)}
    </>
  )
}

export { ActionsTable };