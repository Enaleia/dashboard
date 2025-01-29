import { MaterialsChartConfig, ActivitiesChartConfig } from "@/config/charts"

type TooltipCalculationParams = {
  payload: Record<string, number>;
  config: typeof MaterialsChartConfig | typeof ActivitiesChartConfig;
}

export function calculateTooltipTotal(params: TooltipCalculationParams): number {
  const { payload, config } = params
  const keys = Object.keys(config)
  return keys.reduce((sum, key) => sum + (payload[key] || 0), 0)
}