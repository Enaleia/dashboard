import { useQuery } from "@tanstack/react-query";

// Define types based on the sample API response
export interface MaterialBreakdownItem {
  material: string;
  weight: number;
  percentage: number;
}

export interface MaterialBreakdownData {
  collectorId: string;
  totalWeight: number;
  breakdown: MaterialBreakdownItem[];
  updatedAt: string;
}

// Define the API endpoint URL
const API_ENDPOINT = 'https://hq.enaleia-hub.com/flows/trigger/0e5d77d8-b084-4ec5-9e60-b2b66907dedf';

// Function to fetch data
const fetchVesselMaterialBreakdown = async (vesselId: string): Promise<MaterialBreakdownData> => {
  const response = await fetch(`${API_ENDPOINT}?id=${vesselId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// React Query hook
export const useVesselMaterialBreakdown = (vesselId: string) => {
  return useQuery<MaterialBreakdownData, Error>({
    queryKey: ['vesselMaterialBreakdown', vesselId], // Unique key for this query
    queryFn: () => fetchVesselMaterialBreakdown(vesselId),
    enabled: !!vesselId, // Only run the query if vesselId is provided
    staleTime: 1000 * 60 * 5, // Optional: Cache data for 5 minutes
  });
}; 