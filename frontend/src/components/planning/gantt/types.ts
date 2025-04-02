
export interface Allocation {
  id: number;
  project: string;
  startWeek: number;
  endWeek: number;
  utilization: number;
}

export interface ResourceAllocation {
  id: number;
  name: string;
  role: string;
  department: string;
  utilization: number;
  avatar: string;
  allocations: Allocation[];
}

export interface Week {
  week: number;
  label: string;
  month: string;
}
