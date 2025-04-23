import { useQuery } from "@tanstack/react-query";

// Define the structure for a single item in the API response's data array
interface HomeMaterialItem {
  material: string;
  weight: number;
  percentage: number;
}

// Define the structure for the overall API response
interface HomeMaterialApiResponse {
  totalWeight: number;
  data: HomeMaterialItem[];
  updatedAt: string;
}

// Define the structure expected by the MaterialBreakdownChart component
// Re-using the structure from the Vessel hook for consistency, ensure it matches chart needs
export interface MaterialBreakdownItem {
    material: string;
    percentage: number;
    weight: number; // Added weight, as the chart component seems to use it in the legend
}

export interface MaterialBreakdownData {
    breakdown: MaterialBreakdownItem[];
    totalWeight?: number; // Make totalWeight optional or ensure it's passed
}

// The actual hook
export const useHomeMaterialBreakdown = () => {
    const API_URL = "https://hq.enaleia-hub.com/flows/trigger/62094b59-538c-409a-a5c3-0010e77c8fdd";

    const fetchHomeMaterialBreakdown = async (): Promise<MaterialBreakdownData> => {
        const response = await fetch(API_URL);

        if (!response.ok) {
          // Handle HTTP errors (e.g., 404, 500)
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const apiData: HomeMaterialApiResponse = await response.json();

        // Transform the API data into the format expected by the chart component
        const breakdownData: MaterialBreakdownData = {
            totalWeight: apiData.totalWeight,
            breakdown: apiData.data.map((item: HomeMaterialItem) => ({ 
                material: item.material,
                percentage: item.percentage,
                weight: item.weight, // Include weight
            })),
        };
        return breakdownData;
    };

    return useQuery<MaterialBreakdownData, Error>({
        queryKey: ['homeMaterialBreakdown'], // Unique query key
        queryFn: fetchHomeMaterialBreakdown,
        // Optional: Add TanStack Query options like staleTime, gcTime if needed
        // staleTime: 5 * 60 * 1000, // 5 minutes
        // gcTime: 10 * 60 * 1000, // 10 minutes
    });
}; 