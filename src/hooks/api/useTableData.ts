import { useQuery } from "@tanstack/react-query"
import { TABLE_ENDPOINTS } from "@/config/constants"
import { PageName } from "@/types"

interface TableDataParams {
  pageName: PageName
}

export function useTableData({ pageName }: TableDataParams) {
  return useQuery({
    queryKey: [`tableData-${pageName}`],
    queryFn: async () => {
      const response = await fetch(
        `https://hq.enaleia-hub.com/flows/trigger/${TABLE_ENDPOINTS[pageName]}`
      )
      return response.json()
    },
  })
}