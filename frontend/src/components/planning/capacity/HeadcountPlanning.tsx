
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DepartmentCapacity } from "./types";

interface HeadcountPlanningProps {
  departments: DepartmentCapacity[];
  onHeadcountChange: (department: string, field: string, value: number) => void;
}

const HeadcountPlanning = ({ departments, onHeadcountChange }: HeadcountPlanningProps) => {
  const totalCurrentHeadcount = departments.reduce((sum, dept) => sum + dept.currentHeadcount, 0);
  const totalPlannedAdditions = departments.reduce((sum, dept) => sum + dept.plannedAdditions, 0);
  const totalPlannedReductions = departments.reduce((sum, dept) => sum + dept.plannedReductions, 0);
  const totalNetChange = departments.reduce((sum, dept) => sum + dept.netChange, 0);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Headcount Planning</CardTitle>
        <CardDescription>
          Adjust planned headcount additions and reductions by department
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 font-medium text-sm border-b pb-2">
          <div>Department</div>
          <div>Current</div>
          <div>Planned +/-</div>
          <div>Net Change</div>
        </div>
        
        {departments.map((dept, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 items-center py-3 border-b">
            <div className="font-medium">{dept.department}</div>
            <div>{dept.currentHeadcount}</div>
            <div className="flex items-center space-x-2">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center">
                  <span className="text-xs text-green-600 mr-2">+</span>
                  <Input
                    type="number"
                    value={dept.plannedAdditions}
                    onChange={(e) => onHeadcountChange(
                      dept.department,
                      "plannedAdditions",
                      parseInt(e.target.value || "0")
                    )}
                    className="h-8 w-16"
                  />
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-red-600 mr-2">-</span>
                  <Input
                    type="number"
                    value={dept.plannedReductions}
                    onChange={(e) => onHeadcountChange(
                      dept.department,
                      "plannedReductions",
                      parseInt(e.target.value || "0")
                    )}
                    className="h-8 w-16"
                  />
                </div>
              </div>
            </div>
            <div className={`font-semibold ${dept.netChange >= 0 ? "text-green-600" : "text-red-600"}`}>
              {dept.netChange >= 0 ? "+" : ""}{dept.netChange}
            </div>
          </div>
        ))}
        
        <div className="grid grid-cols-4 gap-4 items-center py-3 mt-2 border-t-2 font-semibold">
          <div>Total</div>
          <div>{totalCurrentHeadcount}</div>
          <div className="flex space-x-4">
            <span className="text-green-600">+{totalPlannedAdditions}</span>
            <span className="text-red-600">-{totalPlannedReductions}</span>
          </div>
          <div className={`${totalNetChange >= 0 ? "text-green-600" : "text-red-600"}`}>
            {totalNetChange >= 0 ? "+" : ""}{totalNetChange}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeadcountPlanning;
