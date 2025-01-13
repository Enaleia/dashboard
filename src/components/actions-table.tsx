import { useQuery } from "@tanstack/react-query"
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
  // tableData: TableItem[]
  partnerType: string;
  sortOrder: string
}

const ActionsTable = ({ pageId, partnerType, sortOrder }: ActionsTableProps) => {
  const navigate = useNavigate()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const itemsPerPage = 8
  const { isPending, error, data } = useQuery({
    queryKey: [pageId],
    queryFn: async () => {
      // const queryString = [
      //   portId ? `port_id=${portId}` : '',
      //   vesselId ? `vessel_id=${vesselId}` : ''
      // ].filter(Boolean).join('&')
      // const response = await fetch(
      //   `/api/flows/trigger/${tableEndpoints[pageId]}${queryString ? '?' + queryString : ''}`
      //   // `https://hq.enaleia-hub.com/flows/trigger/${statEndpoints[pageId]}`,
      // )
      const queryString = `&sort=${sortOrder}`
      const response = await fetch(
        `/api/flows/trigger/${tableEndpoints[pageId]}`
        // `https://hq.enaleia-hub.com/flows/trigger/${statEndpoints[pageId]}`,
      )
      return await response.json()
    },
  })
  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  const records = data.locationPayload
 

  // const filteredLocations = useMemo(() => {
  //   return tableData
  //     .filter(record => {
  //       if (partnerType === 'See all') return true;
  //       return record.type === partnerType;
  //     })
  // }, [partnerType, tableData])

  // const {
	// 	currentPage,
	// 	currentPageItems: pageTransactions,
	// 	loadPage,
	// 	maxPage,
	// 	needsPagination,
	// } = usePagination(filteredLocations, itemsPerPage)
  
  return (
    <>
      {records.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="p-0"><div className="text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-1 md:py-2 border border-black rounded-l-3xl">NAME</div></TableHead>
              {isDesktop &&
                <>
                  <TableHead className="p-0"><div className="text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-2 border-y border-black">COUNTRY</div></TableHead>
                  <TableHead className="p-0"><div className="text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-2 border border-black">{pageId === 'locations' ? "COORDINATES" : "REGISTERED PORT"}</div></TableHead>
                  <TableHead className="p-0"><div className="text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-2 border-y border-black">TYPE</div></TableHead>
                </>
              }
              <TableHead className="p-0"><div className="text-xs font-bold text-black bg-gray-300 mt-2 mb-5 px-8 py-1 md:py-2 border border-black rounded-r-3xl">ACTION COUNT</div></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((partner: TableItem) => (
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
{/* 
      {needsPagination && (
        <article className="flex flex-col justify-center items-center gap-4">
          <Paginator
            needsPagination={needsPagination}
            currentPage={currentPage}
            maxPage={maxPage}
            loadPage={loadPage}
          /> */}
          {/* <ShowingDisplay
            currentPage={currentPage}
            totalItemAmount={filteredLocations.length}
            itemsPerPage={itemsPerPage}
          /> */}
        {/* </article>
			)} */}
    </>
  )
}

export { ActionsTable };