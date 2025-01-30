import { useQuery } from "@tanstack/react-query"
import { ATTESTATION_ENDPOINTS } from "@/config/constants"
import { PageName } from "@/types"

interface AttestationDataParams {
  pageName: PageName
  partnerId: string
}

export function useAttestationData({ pageName, partnerId }: AttestationDataParams) {
  return useQuery({
    queryKey: [`attestationData-${pageName}-${partnerId || ''}`],
    queryFn: async () => {
      const queryString = partnerId ? `?id=${partnerId}` : ''
      const response = await fetch(
        `https://hq.enaleia-hub.com/flows/trigger/${ATTESTATION_ENDPOINTS[pageName]}${queryString}`
      )
      return response.json()
    },
  })
}