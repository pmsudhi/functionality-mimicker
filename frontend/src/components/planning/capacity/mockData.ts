
import { CapacityData, DepartmentCapacity } from "./types";

// Sample capacity planning data
export const capacityData: CapacityData[] = [
  {
    month: "Jan",
    demand: 120,
    capacity: 100,
    gap: -20,
  },
  {
    month: "Feb",
    demand: 130,
    capacity: 105,
    gap: -25,
  },
  {
    month: "Mar",
    demand: 125,
    capacity: 110,
    gap: -15,
  },
  {
    month: "Apr",
    demand: 140,
    capacity: 115,
    gap: -25,
  },
  {
    month: "May",
    demand: 145,
    capacity: 125,
    gap: -20,
  },
  {
    month: "Jun",
    demand: 155,
    capacity: 130,
    gap: -25,
  },
  {
    month: "Jul",
    demand: 165,
    capacity: 140,
    gap: -25,
  },
  {
    month: "Aug",
    demand: 170,
    capacity: 150,
    gap: -20,
  },
  {
    month: "Sep",
    demand: 180,
    capacity: 160,
    gap: -20,
  },
  {
    month: "Oct",
    demand: 185,
    capacity: 170,
    gap: -15,
  },
  {
    month: "Nov",
    demand: 190,
    capacity: 175,
    gap: -15,
  },
  {
    month: "Dec",
    demand: 180,
    capacity: 180,
    gap: 0,
  },
];

// Department capacity data
export const departmentCapacity: DepartmentCapacity[] = [
  {
    department: "Engineering",
    currentHeadcount: 65,
    plannedAdditions: 10,
    plannedReductions: 2,
    netChange: 8,
  },
  {
    department: "Design",
    currentHeadcount: 20,
    plannedAdditions: 5,
    plannedReductions: 1,
    netChange: 4,
  },
  {
    department: "Product",
    currentHeadcount: 15,
    plannedAdditions: 3,
    plannedReductions: 0,
    netChange: 3,
  },
  {
    department: "Marketing",
    currentHeadcount: 12,
    plannedAdditions: 2,
    plannedReductions: 1,
    netChange: 1,
  },
  {
    department: "Sales",
    currentHeadcount: 25,
    plannedAdditions: 5,
    plannedReductions: 2,
    netChange: 3,
  },
  {
    department: "Customer Support",
    currentHeadcount: 18,
    plannedAdditions: 4,
    plannedReductions: 0,
    netChange: 4,
  },
];
