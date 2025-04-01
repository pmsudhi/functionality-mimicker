
export interface DepartmentCapacity {
  department: string;
  currentHeadcount: number;
  plannedAdditions: number;
  plannedReductions: number;
  netChange: number;
}

export interface CapacityData {
  month: string;
  demand: number;
  capacity: number;
  gap: number;
}
