
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CapacityViewHeader from "./capacity/CapacityViewHeader";
import CapacityMetrics from "./capacity/CapacityMetrics";
import CapacityOverview from "./capacity/CapacityOverview";
import DepartmentCapacityChart from "./capacity/DepartmentCapacityChart";
import HeadcountPlanning from "./capacity/HeadcountPlanning";
import { capacityData, departmentCapacity } from "./capacity/mockData";
import { DepartmentCapacity } from "./capacity/types";

const CapacityView = () => {
  const [capacityPlan, setCapacityPlan] = useState("overview");
  const [departments, setDepartments] = useState<DepartmentCapacity[]>(departmentCapacity);
  
  const handleHeadcountChange = (department: string, field: string, value: number) => {
    setDepartments(departments.map(dept => {
      if (dept.department === department) {
        const updatedDept = { ...dept, [field]: value };
        
        // Recalculate net change
        if (field === "plannedAdditions" || field === "plannedReductions") {
          updatedDept.netChange = updatedDept.plannedAdditions - updatedDept.plannedReductions;
        }
        
        return updatedDept;
      }
      return dept;
    }));
  };
  
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <CapacityViewHeader />
      
      <CapacityMetrics departments={departments} />
      
      <div className="flex-1 p-4 overflow-hidden">
        <Tabs 
          defaultValue="overview" 
          value={capacityPlan}
          onValueChange={setCapacityPlan}
          className="h-full flex flex-col"
        >
          <TabsList className="bg-transparent mb-4">
            <TabsTrigger value="overview">Capacity Overview</TabsTrigger>
            <TabsTrigger value="departments">By Department</TabsTrigger>
            <TabsTrigger value="planning">Headcount Planning</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="flex-1 m-0">
            <CapacityOverview data={capacityData} />
          </TabsContent>
          
          <TabsContent value="departments" className="flex-1 m-0">
            <DepartmentCapacityChart data={departments} />
          </TabsContent>
          
          <TabsContent value="planning" className="flex-1 m-0 overflow-auto">
            <HeadcountPlanning 
              departments={departments}
              onHeadcountChange={handleHeadcountChange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CapacityView;
