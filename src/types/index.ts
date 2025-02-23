// represents a single item in a StatsBar component
export interface StatItem {
  key: string;
  title: string;
  value: number;
  description?: string | null
}

// represents a single location marker on the ActivityMap
export interface MapItem {
  id: string;
  name: string;
  country: string;
  coordinates?: number[]
  type: string;
  wallet_addresses: string[]
  events?: {string: number}
}

// represents a single tracing line in the ActivityMap
export interface TraceItem {
  startLat: number
  startLng: number
  endLat: number
  endLng: number
}

export interface ProductPageData {
  locations: MapItem[]
  traces: TraceItem[]
}

// represents a single data point in a CollectionsChart component, 
// contains one month of accumulated collected materials data 
export interface MaterialsChartRecord {
  date: string;
  mixedPlastic: number;
  metal: number;
  rubber: number;
  preventionNet: number;
  ghostNet: number;
  rope: number;
  other: number
}

// represents a single data point in a CollectionsChart component, 
// contains one month of accumulated partner action data
export interface ActivitiesChartRecord {
  date: string;
  fishingForLitter: number;
  adHoc: number;
  beach: number;
  prevention: number;
}

// represents a single row item in the actions table,
// can be either a location or vessel entry
export interface TableItem {
  id: string;
  name: string;
  country: string;
  coordinates?: number[];       //only for locations
  registered_port?: string;     //only for vessels
  type: string;
  action_count: number;
  wallet_addresses?: string[];  //only for locations
  collector_identity?: string   //only for vessels
}

export type ProductData = "Heading" | "Metadata"

export type PageName = "Home" | "Locations" | "LocationDetail" | "PortDetail" |"RecyclerDetail" | "ManufacturerDetail" | "Vessels" | "VesselDetail" | "Product"

export type PartnerType = "See all" | "Port" | "Recycler" | "Manufacturer" | "Trawler" | "Small vessel" | "Purse seiner" | "Other"

export type SortCriteria = 'action_count' | 'country'

export interface SortState {
  isAtoZ?: boolean;
  isAscending?: boolean;
  criteria: SortCriteria
}

export interface BaseLocationRecord {
  type: string
}

export interface LocationSearchParams {
  name: string
  country: string
  coordinates: string
  type: 'Port' | 'Recycler' | 'Manufacturer'
  addresses: string[]
}

export interface VesselSearchParams {
  name: string
  country: string
  port: string
  type: 'Trawler' | 'Small vessel' | 'Purse seiner' | 'Other'
  collector_identity: string
}

// represents a single row item in the attestations table
export interface AttestationItem {
  id: string;
  submittedBy: string;
}