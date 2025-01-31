import { PageName } from "@/types"

// API endpoints
export const STATS_ENDPOINTS: Partial<Record<PageName, string>> = {
  Home: "352a7482-4a18-4484-a53b-78c381d4db61",
  Locations: "bb931cab-7d63-4287-9380-1fb87a5b6431",
  PortDetail: "50637703-8870-45ca-828d-bbab78ec917a",
  RecyclerDetail: "f6495f96-4105-46fa-a904-fcda705ba889",
  ManufacturerDetail: "230ea17e-b2d2-4758-9cb6-383fe9574b28",
  Vessels: "9cb714f0-4d0b-46d0-8454-110811ad4418",
  VesselDetail: "81947692-848c-4832-bc2d-dfe09bc577a1"
}

export const MAP_ENDPOINT = "a9fc78b6-96a7-4be2-836b-153671fc367f"

export const CHART_ENDPOINTS: Partial<Record<PageName, string>> = {
  Home: "0ec1555a-082e-46bf-be91-422ab8793096",
  PortDetail: "697a7c75-c7ce-469a-8dea-38c8de1a6686",
  VesselDetail: "729df9bd-d369-4489-b87a-628c02d51041"
}

export const TABLE_ENDPOINTS: Partial<Record<PageName, string>> = {
  Locations: "a9fc78b6-96a7-4be2-836b-153671fc367f",
  Vessels: "eb03d9a6-dff3-4aec-8fd1-c5816b936c7a"
}

export const ATTESTATION_ENDPOINTS: Partial<Record<PageName, string>> = {
  LocationDetail: "37277177-5ac5-4c39-af25-9ae90b431a72",
  VesselDetail: "f8858a9b-7f4c-4542-9ce0-9362563b8660"
}


// map
export const MAP_CONSTANTS = {
  DESKTOP_BREAKPOINT: "(min-width: 768px)",
  ZOOM_LEVELS: {
    DESKTOP: 5,
    MOBILE: 3
  },
  DEFAULT_CENTER: [38.621971846028586, 13.204641636096362] as [number, number],
  ICON_SIZE: [16, 16] as [number, number],
  MAP_HEIGHT: {
    MOBILE: "400px",
    DESKTOP: "700px"
  }
} as const