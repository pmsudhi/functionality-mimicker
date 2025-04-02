
import React from "react";

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  formatter?: (value: any, name: string, props?: any) => any;
  labelFormatter?: (label: any) => React.ReactNode;
  contentStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  valueFormatter?: (value: any) => string;
  nameKey?: string;
  valueKey?: string;
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({
  active,
  payload,
  label,
  formatter,
  labelFormatter,
  contentStyle,
  itemStyle,
  valueFormatter = (value) => (typeof value === 'number' ? value.toLocaleString() : String(value)),
  nameKey,
  valueKey,
}) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const formattedLabel = labelFormatter ? labelFormatter(label) : label;

  return (
    <div className="chart-tooltip" style={contentStyle}>
      {formattedLabel && (
        <div className="chart-tooltip-label">{formattedLabel}</div>
      )}
      <div className="chart-tooltip-content">
        {payload.map((entry, index) => {
          const name = nameKey ? entry[nameKey] : entry.name;
          let value = valueKey ? entry[valueKey] : entry.value;
          
          if (formatter) {
            value = formatter(value, name, entry);
          } else {
            value = valueFormatter(value);
          }

          const color = entry.color || entry.fill || entry.stroke || '#8884d8';
          
          return (
            <div key={`item-${index}`} className="chart-tooltip-item" style={itemStyle}>
              <div>
                <span 
                  className="chart-tooltip-color" 
                  style={{ backgroundColor: color }}
                />
                <span className="chart-tooltip-name">{name}</span>
              </div>
              <div className="chart-tooltip-value">{value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartTooltip;
