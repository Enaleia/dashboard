// Represents a single item in a StatsBar component
// Used to display key metrics with title, value, and optional description
export interface StatItem {
  key: string;         // Unique identifier for the stat item
  title: string;       // Display label for the stat
  value: number;       // Numeric value to be displayed
  description?: string | null  // Optional explanatory text for the stat
}

// Represents a single location marker on the ActivityMap
// Used to display partner locations with their name and type
// All properties are passed from the map tooltip to the location's detail page
export interface MapItem {
  id: string;          // Unique identifier for the location
  name: string;        // Display name of the location
  country: string;     // Country where the location is situated
  coordinates?: number[]  // [latitude, longitude] array for map positioning
  type: string;        // Type of location (Port/Recycler/Manufacturer)
  wallet_addresses: string[]  // Associated blockchain wallet addresses
  events?: {string: number}  // Optional map of event types to their counts (for product page only)
}

// Represents a single tracing line in the ActivityMap
// Used to visualize transfer of materials between partners
export interface TraceItem {
  startLat: number     // Starting latitude coordinate
  startLng: number     // Starting longitude coordinate
  endLat: number       // Ending latitude coordinate
  endLng: number       // Ending longitude coordinate
}

// Container for all map-related data needed for the Product page
export interface ProductPageData {
  locations: MapItem[] // Array of location markers to display
  traces: TraceItem[]  // Array of trace lines connecting locations
}

// Represents a single data point in a CollectionsChart component
// Contains one month of accumulated collected materials data
// Used for visualizing material collection trends over time
export interface MaterialsChartRecord {
  date: string;        // Month/year in ISO format (YYYY-MM)
  mixedPlastic: number; // Amount of mixed plastic collected (kg)
  metal: number;       // Amount of metal collected (kg)
  rubber: number;      // Amount of rubber collected (kg)
  preventionNet: number; // Amount of prevention nets collected (kg)
  ghostNet: number;    // Amount of ghost nets collected (kg)
  rope: number;        // Amount of rope collected (kg)
  other: number        // Amount of other materials collected (kg)
}

// Represents a single data point in a CollectionsChart component,
// Contains one month of accumulated partner action data
// Used for visualizing collection activities over time
export interface ActivitiesChartRecord {
  date: string;        // Month/year in ISO format (YYYY-MM)
  fishingForLitter: number; // Count of fishing for litter activities
  adHoc: number;       // Count of ad hoc collection activities
  beach: number;       // Count of beach cleanup activities
  prevention: number;  // Count of prevention activities
}

// Represents a single row item in the actions table,
// Can be either a location or vessel entry
// Used for unified display of different partner types
export interface TableItem {
  id: string;          // Unique identifier for the table item
  name: string;        // Display name of the location or vessel
  country: string;     // Country of registration or operation
  coordinates?: number[]; // [latitude, longitude] array (only for locations)
  registered_port?: string; // Home port name (only for vessels)
  type: string;        // Type of partner (Port/Recycler/Manufacturer/Vessel type)
  action_count: number; // Total number of recorded actions/activities
  wallet_addresses?: string[]; // Associated blockchain addresses (only for locations)
  collector_identity?: string  // Blockchain identity (only for vessels)
}

// Defines the types of data sections available on the product page
export type ProductData = "Heading" | "Metadata"

// Defines all available page types in the application
// Used to index API endpoints, manage map state
export type PageName = "Home" | "Locations" | "LocationDetail" | "PortDetail" |
  "RecyclerDetail" | "ManufacturerDetail" | "Vessels" | "VesselDetail" | "Product"

// Defines all partner types for filtering purposes
export type PartnerType = "See all" | "Port" | "Recycler" | "Manufacturer" | 
  "Trawler" | "Small vessel" | "Purse seiner" | "Other"

// Defines the available sorting criteria for tables
export type SortCriteria = 'action_count' | 'country'

// Represents the current state of sorting for tables
// Used to track and toggle sorting direction
export interface SortState {
  isAtoZ?: boolean;      // For text-based sorting (alphabetical)
  isAscending?: boolean; // For numeric sorting (low to high)
  criteria: SortCriteria // The field being sorted by
}

// Base interface for location record types
export interface BaseLocationRecord {
  type: string          // Type classifier for the location
}

// Parameters used for searching/filtering locations
export interface LocationSearchParams {
  name: string           // Location name search term
  country: string        // Country filter
  coordinates: string    // Geographic coordinates filter
  type: 'Port' | 'Recycler' | 'Manufacturer'  // Location type filter
  addresses: string[]    // Blockchain wallet addresses filter
}

// Parameters used for searching/filtering vessels
export interface VesselSearchParams {
  name: string          // Vessel name search term
  country: string       // Country of registration filter
  port: string          // Home port filter
  type: 'Trawler' | 'Small vessel' | 'Purse seiner' | 'Other'  // Vessel type filter
  collector_identity: string  // Blockchain identity filter
}

// Represents a single row item in the attestations table
// Used to display blockchain verification records
export interface AttestationItem {
  id: string;           // Unique identifier for the attestation
  submittedBy: string;  // Address or identity of the submitter
}