import { ChartConfig } from "@/components/ui/chart"

// config for CollectionsChart component representing the collection of materials,
// used on the home page
export const MaterialsChartConfig = {
  mixedPlastic: {
    label: "Mixed plastic",
    color: "hsl(var(--mixedPlastic))",
  },
  metal: {
    label: "Metal",
    color: "hsl(var(--metal))",
  },
  rubber: {
    label: "Rubber",
    color: "hsl(var(--rubber))",
  },
  preventionNet: {
    label: "Prevention net",
    color: "hsl(var(--preventionNet))",
  },
  ghostNet: {
    label: "Ghost net",
    color: "hsl(var(--ghostNet))",
  },
  rope: {
    label: "Rope",
    color: "hsl(var(--rope))",
  },
  PP: {
    label: "PP",
    color: "hsl(var(--pp))",
  },
  PA: {
    label: "PA",
    color: "hsl(var(--pa))",
  },
  PET: {
    label: "PET",
    color: "hsl(var(--pet))",
  },
  NET: {
    label: "Net",
    color: "hsl(var(--net))",
  },
  PS: {
    label: "PS",
    color: "hsl(var(--ps))",
  },
  PE: {
    label: "PE",
    color: "hsl(var(--pe))",
  },
  LDPE: {
    label: "LDPE",
    color: "hsl(var(--ldpe))",
  },
  HDPE: {
    label: "HDPE",
    color: "hsl(var(--hdpe))",
  },
  NON_RECYCLABLE: {
    label: "Non-Recyclable",
    color: "hsl(var(--nonRecyclable))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--other))",
  },
} satisfies ChartConfig

// config for CollectionsChart component representing the collection activity,
// used on location detail and collector detail pages
export const ActivitiesChartConfig = {
  fishingForLitter: {
    label: "Fishing for litter",
    color: "hsl(var(--fishingForLitter))",
  },
  adHoc: {
    label: "Ad hoc",
    color: "hsl(var(--adHoc))",
  },
  prevention: {
    label: "Prevention",
    color: "hsl(var(--prevention))",
  },
  beach: {
    label: "Beach cleanup",
    color: "hsl(var(--beach))",
  },
} satisfies ChartConfig