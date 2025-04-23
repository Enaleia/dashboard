import React, { useState, useRef, useEffect } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts';
import { MaterialsChartConfig } from '@/config/charts';
import { MaterialBreakdownData, MaterialBreakdownItem } from '@/hooks/api/useVesselMaterialBreakdown';

// Helper to map API material names to config keys (remains the same)
const getMaterialConfigKey = (materialName: string): string => {
  const mapping: { [key: string]: string } = {
    "Mixed Plastic": "mixedPlastic",
    "Metal": "metal",
    "Rubber": "rubber",
    "Prevention Net": "preventionNet",
    "Ghost Net": "ghostNet",
    "Rope": "rope",
    "Other": "other",
  };
  // Handle potential variations like 'Other-2'
  if (materialName.startsWith("Other")) return "other"; 
  return mapping[materialName] || "other";
};

// Helper to get label from config key
const getMaterialLabel = (configKey: string): string => {
    const entry = MaterialsChartConfig[configKey as keyof typeof MaterialsChartConfig];
    return entry ? entry.label : configKey; // Fallback to key if label not found
};

interface MaterialBreakdownChartProps {
  data: MaterialBreakdownData;
  title: string;
}

// Manual Tooltip Component
const HoverTooltip = ({ hoveredKey, data }: { hoveredKey: string | null; data: MaterialBreakdownData | null }) => {
  if (!hoveredKey || !data) return null;

  const item = data.breakdown.find(d => getMaterialConfigKey(d.material) === hoveredKey);
  if (!item) return null; 

  const configKey = hoveredKey;
  const percentage = item.percentage;
  const materialLabel = getMaterialLabel(configKey);
  const colorEntry = MaterialsChartConfig[configKey as keyof typeof MaterialsChartConfig];
  const color = colorEntry ? colorEntry.color : MaterialsChartConfig.other.color;

  // Final tooltip style (compact, rounded-full)
  return (
    <div className="w-auto bg-white py-2 px-4 rounded-full shadow-lg flex items-center justify-between space-x-4 whitespace-nowrap">
      <div className="flex items-center gap-2">
        <div
          className="w-5 h-5 rounded-full flex-shrink-0"
          style={{ backgroundColor: color }}
        ></div>
        <span className="font-bold text-lg">{materialLabel}</span>
      </div>
      <span className="font-light text-lg">
        {`${percentage?.toFixed(1)}%`}
      </span>
    </div>
  );
};

export const MaterialBreakdownChart: React.FC<MaterialBreakdownChartProps> = ({ data, title }) => {
  const [hoveredMaterialKey, setHoveredMaterialKey] = useState<string | null>(null);
  // Updated mouse position state to include container width
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number; containerWidth: number } | null>(null);
  // Ref for the chart container div
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const chartData = [
    data.breakdown.reduce((acc: { [key: string]: number }, item: MaterialBreakdownItem) => {
      acc[getMaterialConfigKey(item.material)] = item.percentage;
      return acc;
    }, {} as { [key: string]: number })
  ];

  const materialsWithPercentage = data.breakdown.filter(item => item.percentage > 0);
  const allMaterialsForLegend = data.breakdown;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top, 
        containerWidth: rect.width 
    });
  };

  const handleMouseLeave = () => {
    setMousePosition(null);
    setHoveredMaterialKey(null);
  };
  
  // Calculate tooltip style based on position
  const getTooltipStyle = () => {
      if (!mousePosition) return {};
      
      const { x, y, containerWidth } = mousePosition;
      const tooltipOffset = 10; // Offset from cursor
      // Threshold to flip tooltip (e.g., 66% of container width)
      const flipThreshold = containerWidth * 0.66; 
      
      let left = x + tooltipOffset;
      let top = y + tooltipOffset;
      let transform = 'translateX(0%)';

      if (x > flipThreshold) {
          // Position to the left of the cursor
          left = x - tooltipOffset;
          transform = 'translateX(-100%)'; 
      }
      
      return {
          position: 'absolute' as const,
          top: top,
          left: left,
          transform: transform,
          zIndex: 50,
          pointerEvents: 'none' as const,
      };
  }

  return (
    <div className="self-stretch rounded-[40px] flex flex-col justify-start items-start gap-8"> 
      {/* Title - Added text-center */}
      <div className="self-stretch px-4 md:px-10 lg:px-12 pt-2 text-center"> 
        <h2 className="text-black text-3xl md:text-3xl font-bold tracking-tight">{title}</h2>
      </div>
      
      {/* Chart Bar Section - Apply rounding and overflow to container */}
      <div 
         ref={chartContainerRef} 
         className="w-full relative" 
         onMouseMove={handleMouseMove} 
         onMouseLeave={handleMouseLeave}
      >
        {/* Added rounded-full and ensured overflow-hidden, corrected my-0 typo */}
        <div className="w-full h-[160px] bg-sand-beige overflow-hidden rounded-3xl py-0 my-0"> 
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={chartData}
                stackOffset="expand"
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                barCategoryGap={0}
              >
                <XAxis type="number" hide />
                <YAxis type="category" hide />
                {materialsWithPercentage.map((item: MaterialBreakdownItem) => {
                  const configKey = getMaterialConfigKey(item.material);
                  const colorEntry = MaterialsChartConfig[configKey as keyof typeof MaterialsChartConfig];
                  const color = colorEntry ? colorEntry.color : '#808080';
                  const isActive = hoveredMaterialKey === configKey;
                  const opacity = hoveredMaterialKey === null ? 0.4 : (isActive ? 1 : 0.4);

                  return (
                    <Bar
                      key={configKey}
                      dataKey={configKey}
                      stackId="a"
                      fill={color}
                      fillOpacity={opacity}
                      // Removed radius prop - using container rounding
                      onMouseEnter={() => setHoveredMaterialKey(configKey)}
                      isAnimationActive={false}
                    />
                  );
                })}
              </BarChart>
            </ResponsiveContainer>
            {/* Manual Tooltip */} 
            {hoveredMaterialKey && mousePosition && (
              <div style={getTooltipStyle()}>
                <HoverTooltip hoveredKey={hoveredMaterialKey} data={data} />
              </div>
            )}
          </div>
      </div>
     
      {/* Legend Section - 2 columns left-aligned on mobile, flex wrap center on md+ */}
      <div className="self-stretch py-8 grid grid-cols-2 justify-items-start gap-x-6 gap-y-6 md:flex md:flex-wrap md:justify-center md:px-12"> 
        {allMaterialsForLegend.map((item: MaterialBreakdownItem) => {
          const configKey = getMaterialConfigKey(item.material);
          const colorEntry = MaterialsChartConfig[configKey as keyof typeof MaterialsChartConfig];
          const color = colorEntry ? colorEntry.color : '#808080'; 
          return (
            // Removed default width, added responsive width for md+
            <div key={item.material} className="flex items-start gap-2 md:w-40"> 
               <span
                className="inline-block w-3 h-full rounded-[64px] flex-shrink-0"
                style={{ backgroundColor: color }}
              />
              <div className="inline-flex flex-col justify-start items-start gap-1">
                <span className="text-black text-base font-light leading-normal">{item.material}</span> 
                <div className="inline-flex justify-start items-baseline gap-0.5">
                  <span className="text-black text-xl font-bold leading-tight">{new Intl.NumberFormat().format(item.weight)}</span> 
                  <span className="text-black text-base  leading-tight">Kg</span> 
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 