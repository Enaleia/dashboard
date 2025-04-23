import { useQuery } from "@tanstack/react-query";
import { MATERIAL_BREAKDOWN_ENDPOINTS } from "@/config/constants";

// Type for the hook parameters
interface UseLocationMaterialBreakdownParams {
  partnerId: string;
  locationType: 'Port' | 'Recycler' | 'Manufacturer';
}

// Interfaces for the raw API responses (handle variations)
interface MaterialItem {
  material: string;
  weight: number;
  percentage: number;
}

interface PortApiResponse {
  locationId?: string; // Optional as it might not always be needed
  totalWeight: number;
  breakdown: MaterialItem[];
  updatedAt?: string;
}

interface RecyclerApiResponse {
  totalWeight: number;
  data: MaterialItem[]; // Note: 'data' field instead of 'breakdown'
  updatedAt?: string;
}

// Standardized output structure expected by the chart
export interface MaterialBreakdownItem {
    material: string;
    percentage: number;
    weight: number;
}

export interface MaterialBreakdownData {
    breakdown: MaterialBreakdownItem[];
    totalWeight: number;
}

// Base URL for flow triggers
const FLOW_TRIGGER_BASE_URL = "https://hq.enaleia-hub.com/flows/trigger/";

// Helper to normalize the API response
const normalizeApiResponse = (apiData: PortApiResponse | RecyclerApiResponse): MaterialBreakdownData => {
  const breakdown = 'breakdown' in apiData ? apiData.breakdown : apiData.data;
  return {
    totalWeight: apiData.totalWeight,
    breakdown: breakdown.map((item: MaterialItem) => ({
      material: item.material,
      percentage: item.percentage,
      weight: item.weight,
    }))
  };
};

// The actual hook
export const useLocationMaterialBreakdown = ({ partnerId, locationType }: UseLocationMaterialBreakdownParams) => {
  
  // Get the endpoint UUID based on location type
  const endpointUuid = MATERIAL_BREAKDOWN_ENDPOINTS[locationType];

  // Only enable the query if a UUID exists for the type and partnerId is provided
  const enabled = !!endpointUuid && !!partnerId;

  const fetchLocationMaterialBreakdown = async (): Promise<MaterialBreakdownData> => {
    if (!enabled) {
      // Should not happen if 'enabled' flag is used correctly, but acts as a safeguard
      throw new Error("Missing API endpoint UUID or partnerId"); 
    }

    // Construct the final URL by combining base URL, UUID, and query parameter
    const finalUrl = `${FLOW_TRIGGER_BASE_URL}${endpointUuid}?id=${partnerId}`; 
    
    const response = await fetch(finalUrl);

    if (!response.ok) {
      // Handle HTTP errors
      const errorText = await response.text(); // Get error details if possible
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    // Parse the JSON response
    const apiData: PortApiResponse | RecyclerApiResponse = await response.json();

    // Normalize the response
    return normalizeApiResponse(apiData);
  };

  return useQuery<MaterialBreakdownData, Error>({
    // Query key includes partnerId and locationType to ensure uniqueness
    queryKey: ['locationMaterialBreakdown', partnerId, locationType],
    queryFn: fetchLocationMaterialBreakdown,
    enabled: enabled, // Control query execution
    // Optional: Add TanStack Query options
    // staleTime: 5 * 60 * 1000, 
    // gcTime: 10 * 60 * 1000,
  });
}; 