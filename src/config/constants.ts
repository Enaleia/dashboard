import { PageName } from "@/types"
import { ProductData } from "@/types"

/**
 * APPLICATION API ENDPOINTS
 * 
 * These objects map different page types to their corresponding API endpoint IDs.
 * Each endpoint ID is a UUID that points to a specific data resource in the backend.
 * The Partial<Record> type allows for some page types to not have corresponding endpoints.
 */

/**
 * STATS_ENDPOINTS - API endpoints for statistics data
 * 
 * Maps different pages to their statistics data endpoints.
 * Used by the StatsBar component to fetch the appropriate metrics for each page.
 */
export const STATS_ENDPOINTS: Partial<Record<PageName, string>> = {
  Home: "352a7482-4a18-4484-a53b-78c381d4db61",
  Locations: "bb931cab-7d63-4287-9380-1fb87a5b6431",
  PortDetail: "50637703-8870-45ca-828d-bbab78ec917a",
  RecyclerDetail: "f6495f96-4105-46fa-a904-fcda705ba889",
  ManufacturerDetail: "230ea17e-b2d2-4758-9cb6-383fe9574b28",
  Vessels: "9cb714f0-4d0b-46d0-8454-110811ad4418",
  VesselDetail: "81947692-848c-4832-bc2d-dfe09bc577a1"
}

/**
 * MAP_ENDPOINTS - API endpoints for map visualization data
 * 
 * Maps pages with map visualizations to their corresponding data endpoints.
 * Used by the ActivityMap component to fetch location and trace data.
 */
export const MAP_ENDPOINTS: Partial<Record<PageName, string>> = {
  Home: "a9fc78b6-96a7-4be2-836b-153671fc367f",
  Locations: "a9fc78b6-96a7-4be2-836b-153671fc367f",
  Product: "ee39a1b1-12e7-4e40-9fb9-6808f3b0b0b7"
}

/**
 * CHART_ENDPOINTS - API endpoints for chart visualization data
 * 
 * Maps pages with chart visualizations to their corresponding data endpoints.
 * Used by the CollectionChart component to fetch time-series data.
 */
export const CHART_ENDPOINTS: Partial<Record<PageName, string>> = {
  Home: "0ec1555a-082e-46bf-be91-422ab8793096",
  PortDetail: "697a7c75-c7ce-469a-8dea-38c8de1a6686",
  VesselDetail: "729df9bd-d369-4489-b87a-628c02d51041"
}

/**
 * TABLE_ENDPOINTS - API endpoints for tabular data
 * 
 * Maps pages with data tables to their corresponding data endpoints.
 * Used by the ActionsTable component to fetch partner listing data.
 */
export const TABLE_ENDPOINTS: Partial<Record<PageName, string>> = {
  Locations: "a9fc78b6-96a7-4be2-836b-153671fc367f",
  Vessels: "eb03d9a6-dff3-4aec-8fd1-c5816b936c7a"
}

/**
 * ATTESTATION_ENDPOINTS - API endpoints for blockchain attestation data
 * 
 * Maps detail pages to their attestation data endpoints.
 * Used by the AttestationsTable component to fetch verification records.
 */
export const ATTESTATION_ENDPOINTS: Partial<Record<PageName, string>> = {
  LocationDetail: "37277177-5ac5-4c39-af25-9ae90b431a72",
  VesselDetail: "f8858a9b-7f4c-4542-9ce0-9362563b8660",
  Product: "c60ec6e9-1833-40f2-8280-c975dc0d87ca"
}

/**
 * PRODUCT_ENDPOINTS - API endpoints for product data categories
 * 
 * Maps product data categories to their corresponding endpoints.
 * Used by product detail page components to fetch specific product information.
 */
export const PRODUCT_ENDPOINTS: Partial<Record<ProductData, string>> = {
  Heading: "71ae55d2-7c17-4e05-bde6-603760e963d1",
  Metadata: "14753914-caf1-4653-8929-a37dff2f877a"
}

/**
 * MATERIAL_BREAKDOWN_ENDPOINTS - API endpoints for material breakdown charts
 * 
 * Maps specific location types (Port, Recycler) to their full API endpoint URLs.
 * Used by the useLocationMaterialBreakdown hook.
 * NOTE: These now store only the flow trigger UUIDs.
 */
export const MATERIAL_BREAKDOWN_ENDPOINTS: Partial<Record<'Port' | 'Recycler' | 'Manufacturer', string>> = {
  Port: "f9521cad-0eac-4a05-a9a9-aa5f98df3edb",
  Recycler: "f2bcd246-a455-44fb-b907-d9618e241c83",
  // Manufacturer: "MANUFACTURER_FLOW_UUID" // Placeholder if needed later
}



// APPLICATION LAYOUT CONSTANTS

/**
 * DESKTOP_BREAKPOINT - Media query for responsive layout switching
 * 
 * Defines the minimum viewport width to be considered a desktop display.
 * Used with the useMediaQuery hook for responsive component rendering.
 */
export const DESKTOP_BREAKPOINT = "(min-width: 1024px)"

/**
 * ITEMS_PER_PAGE - Pagination configuration for tables
 * 
 * Defines how many items to display per page in tables based on device type.
 * Used by table components to adjust pagination for different screen sizes.
 */
export const ITEMS_PER_PAGE = {
  DESKTOP: 8,
  MOBILE: 6
}


/**
 * MAP_CONSTANTS - Configuration constants for the ActivityMap component
 * 
 * Contains various settings to control map appearance and behavior:
 * - ZOOM_LEVELS: Default zoom levels based on device type
 * - DEFAULT_CENTER: Initial center coordinates for the map [latitude, longitude]
 * - ICON_SIZE: Size of location marker icons on the map
 * - MAP_HEIGHT: Map container height based on device type
 */
export const MAP_CONSTANTS = {
  ZOOM_LEVELS: {
    DESKTOP: 5,
    MOBILE: 3
  },
  DEFAULT_CENTER: [39.607178, 10.088321] as [number, number],
  ICON_SIZE: [16, 16] as [number, number],
  MAP_HEIGHT: {
    MOBILE: "400px",
    DESKTOP: "700px"
  }
} as const

