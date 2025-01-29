import { ChartConfig } from "@/components/ui/chart"

// config for CollectionsChart component representing the collection of materials,
// used on the home page
export const MaterialsChartConfig = {
  mixedPastic: {
    label: "Mixed plastic",
    color: "hsl(var(--chart-1))",
  },
  metal: {
    label: "Metal",
    color: "hsl(var(--chart-2))",
  },
  rubber: {
    label: "Rubber",
    color: "hsl(var(--chart-3))",
  },
  preventionNet: {
    label: "Prevention net",
    color: "hsl(var(--chart-4))",
  },
  ghostNet: {
    label: "Ghost net",
    color: "hsl(var(--chart-5))",
  },
  rope: {
    label: "Rope",
    color: "hsl(var(--chart-6))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-7))",
  },
} satisfies ChartConfig

// config for CollectionsChart component representing the collection activity,
// used on location detail and collector detail pages
export const ActivitiesChartConfig = {
  litter: {
    label: "Fishing for litter",
    color: "hsl(var(--chart-8))",
  },
  adhoc: {
    label: "Ad hoc",
    color: "hsl(var(--chart-9))",
  },
  prevention: {
    label: "Prevention",
    color: "hsl(var(--chart-10))",
  },
  beach: {
    label: "Beach cleanup",
    color: "hsl(var(--chart-11))",
  },
} satisfies ChartConfig