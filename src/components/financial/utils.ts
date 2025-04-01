
// Format number to Indian style (e.g., 1,00,000)
export const formatIndianStyle = (value: number): string => {
  if (value < 1000) return value.toString();
  
  let result = "";
  let str = Math.floor(value).toString();
  
  const lastThree = str.substring(str.length - 3);
  const remaining = str.substring(0, str.length - 3);
  
  result = lastThree;
  
  if (remaining.length > 0) {
    let i = remaining.length;
    while (i > 0) {
      const segment = remaining.substring(Math.max(0, i - 2), i);
      result = segment + (result.length > 0 ? "," + result : result);
      i -= 2;
    }
  }
  
  return result;
};

// Format number with SAR currency
export const formatSAR = (value: number) => {
  return `SAR ${formatIndianStyle(value)}`;
};

// Get seasonal factor for a given month
export const getSeasonalFactor = (month: string): number => {
  const seasonalFactors: Record<string, number> = {
    'Jan': 0.95, 'Feb': 0.97, 'Mar': 1.0, 'Apr': 1.02,
    'May': 1.03, 'Jun': 1.05, 'Jul': 1.07, 'Aug': 1.05,
    'Sep': 1.0, 'Oct': 0.98, 'Nov': 1.02, 'Dec': 1.1
  };
  
  return seasonalFactors[month] || 1.0;
};
