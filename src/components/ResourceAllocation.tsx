
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  PlusCircle, 
  MoreHorizontal, 
  Users, 
  ArrowUp, 
  ArrowDown,
  Calendar,
  AlertCircle,
  Clock,
  Check
} from "lucide-react";

// Sample projects data
const projectsData = [
  {
    id: 1,
    name: "Website Redesign",
    status: "Active",
    startDate: "2023-06-01",
    endDate: "2023-08-15",
    progress: 65,
    allocatedResources: 8,
    resourceNeeded: 10,
    priority: "High",
    allocationData: [
      { id: 101, name: "John Smith", role: "Frontend Developer", avatar: "", allocation: 100 },
      { id: 102, name: "Sarah Johnson", role: "UX Designer", avatar: "", allocation: 75 },
      { id: 103, name: "Emma Wilson", role: "Product Manager", avatar: "", allocation: 50 },
    ]
  },
  {
    id: 2,
    name: "Mobile App Development",
    status: "Active",
    startDate: "2023-07-15",
    endDate: "2023-12-01",
    progress: 35,
    allocatedResources: 6,
    resourceNeeded: 8,
    priority: "Medium",
    allocationData: [
      { id: 104, name: "Michael Davis", role: "Backend Developer", avatar: "", allocation: 75 },
      { id: 105, name: "James Brown", role: "DevOps Engineer", avatar: "", allocation: 50 },
      { id: 106, name: "Lisa Wang", role: "Product Owner", avatar: "", allocation: 25 },
    ]
  },
  {
    id: 3,
    name: "API Development",
    status: "Active",
    startDate: "2023-05-01",
    endDate: "2023-09-30",
    progress: 80,
    allocatedResources: 4,
    resourceNeeded: 4,
    priority: "Medium",
    allocationData: [
      { id: 107, name: "Michael Davis", role: "Backend Developer", avatar: "", allocation: 75 },
      { id: 108, name: "David Miller", role: "Database Engineer", avatar: "", allocation: 100 },
    ]
  },
  {
    id: 4,
    name: "Brand Refresh",
    status: "Planned",
    startDate: "2023-09-01",
    endDate: "2023-11-30",
    progress: 0,
    allocatedResources: 3,
    resourceNeeded: 5,
    priority: "Low",
    allocationData: [
      { id: 109, name: "Sarah Johnson", role: "UX Designer", avatar: "", allocation: 50 },
      { id: 110, name: "Ryan Clark", role: "Lead Designer", avatar: "", allocation: 25 },
    ]
  },
  {
    id: 5,
    name: "Cloud Migration",
    status: "Active",
    startDate: "2023-06-15",
    endDate: "2023-10-15",
    progress: 45,
    allocatedResources: 5,
    resourceNeeded: 6,
    priority: "High",
    allocationData: [
      { id: 111, name: "James Brown", role: "DevOps Engineer", avatar: "", allocation: 100 },
      { id: 112, name: "Kevin Anderson", role: "Systems Engineer", avatar: "", allocation: 75 },
      { id: 113, name: "Daniel White", role: "Backend Developer", avatar: "", allocation: 50 },
    ]
  },
];

// Sample available resources
const availableResources = [
  { id: 201, name: "Olivia Martinez", role: "UX Designer", department: "Design", availability: 50 },
  { id: 202, name: "Robert Johnson", role: "Frontend Developer", department: "Engineering", availability: 100 },
  { id: 203, name: "Sophia Wilson", role: "Junior Developer", department: "Engineering", availability: 25 },
  { id: 204, name: "William Taylor", role: "Backend Developer", department: "Engineering", availability: 50 },
  { id: 205, name: "Emma Davis", role: "Frontend Developer", department: "Engineering", availability: 25 },
  { id: 206, name: "Jessica Lee", role: "Database Engineer", department: "Engineering", availability: 25 },
  { id: 207, name: "Chris Evans", role: "Product Manager", department: "Product", availability: 50 },
];

const ResourceAllocation = () => {
  const [projects, setProjects] = useState(projectsData);
  const [resources, setResources] = useState(availableResources);
  const [selectedProject, setSelectedProject] = useState<number | null>(1);  // Default to first project
  const [allocView, setAllocView] = useState("projects");
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500";
      case "Planned":
        return "bg-blue-500";
      case "Completed":
        return "bg-gray-500";
      case "On Hold":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };
  
  const getAllocationColor = (allocation: number) => {
    if (allocation < 25) return "bg-gray-200";
    if (allocation < 50) return "bg-blue-200";
    if (allocation < 75) return "bg-blue-300";
    return "bg-blue-500";
  };
  
  const currentProject = projects.find(p => p.id === selectedProject);
  
  return (
    <div className="h-full flex flex-col overflow-hidden p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Resource Allocation</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Q3 2023
          </Button>
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <div className="text-xs mt-1 flex items-center">
              <Badge variant="outline" className="mr-1">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                {projects.filter(p => p.status === "Active").length} Active
              </Badge>
              <Badge variant="outline" className="mr-1">
                <div className="h-2 w-2 rounded-full bg-blue-500 mr-1"></div>
                {projects.filter(p => p.status === "Planned").length} Planned
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Resource Gap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.reduce((sum, p) => sum + (p.resourceNeeded - p.allocatedResources), 0)} FTE
            </div>
            <div className="text-xs text-red-500 mt-1 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              Resource shortfall detected
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <Progress value={78} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>
      
      <div className="flex-1 overflow-hidden border rounded-md">
        <Tabs 
          defaultValue="projects" 
          value={allocView}
          onValueChange={setAllocView}
          className="h-full flex flex-col"
        >
          <div className="border-b px-4">
            <TabsList className="bg-transparent">
              <TabsTrigger value="projects" className="data-[state=active]:bg-transparent">
                Project View
              </TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:bg-transparent">
                Resource View
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="projects" className="h-full m-0 flex flex-col">
            <div className="flex-1 flex">
              <div className="w-1/3 border-r overflow-auto">
                <ScrollArea className="h-full">
                  <div className="p-4">
                    <h3 className="font-medium mb-3">Projects</h3>
                    {projects.map(project => (
                      <div 
                        key={project.id}
                        className={`mb-3 p-3 border rounded-md cursor-pointer transition-colors hover:bg-secondary ${
                          selectedProject === project.id ? "bg-secondary" : ""
                        }`}
                        onClick={() => setSelectedProject(project.id)}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{project.name}</h4>
                          <Badge className={`${getStatusColor(project.status)} text-white`}>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                        </div>
                        <div className="mt-2">
                          <Progress value={project.progress} className="h-1.5" />
                          <div className="mt-1 flex justify-between text-xs">
                            <span>{project.progress}% Complete</span>
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {project.allocatedResources}/{project.resourceNeeded}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              
              <div className="w-2/3 overflow-auto p-4">
                {currentProject && (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{currentProject.name}</h3>
                        <div className="flex space-x-2 mt-1">
                          <Badge className={`${getStatusColor(currentProject.status)} text-white`}>
                            {currentProject.status}
                          </Badge>
                          <Badge className={`${getPriorityColor(currentProject.priority)} text-white`}>
                            {currentProject.priority} Priority
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <PlusCircle className="h-4 w-4 mr-1" />
                        Add Resource
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="p-3 border rounded-md">
                        <div className="text-sm text-muted-foreground">Timeline</div>
                        <div className="mt-1 font-medium">
                          {new Date(currentProject.startDate).toLocaleDateString()} - {new Date(currentProject.endDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="p-3 border rounded-md">
                        <div className="text-sm text-muted-foreground">Resources</div>
                        <div className="mt-1 font-medium">
                          {currentProject.allocatedResources}/{currentProject.resourceNeeded} Allocated
                        </div>
                      </div>
                      <div className="p-3 border rounded-md">
                        <div className="text-sm text-muted-foreground">Progress</div>
                        <div className="mt-1 font-medium">
                          {currentProject.progress}% Complete
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="font-medium mb-2">Allocated Resources</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Allocation</TableHead>
                          <TableHead className="w-16">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentProject.allocationData.map((resource) => (
                          <TableRow key={resource.id}>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={resource.avatar} alt={resource.name} />
                                  <AvatarFallback>{resource.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{resource.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{resource.role}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <div className={`h-2 w-12 rounded-full ${getAllocationColor(resource.allocation)}`} />
                                <span>{resource.allocation}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Edit Allocation</DropdownMenuItem>
                                  <DropdownMenuItem>Replace Resource</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    <h4 className="font-medium mt-6 mb-2">Available Resources</h4>
                    <ScrollArea className="h-48 border rounded-md">
                      <div className="p-3">
                        {resources.map((resource) => (
                          <div key={resource.id} className="flex justify-between items-center py-2 border-b">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={resource.avatar} alt={resource.name} />
                                <AvatarFallback>{resource.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{resource.name}</div>
                                <div className="text-xs text-muted-foreground">{resource.role}</div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Badge variant="outline" className="mr-2">
                                {resource.availability}% Available
                              </Badge>
                              <Button variant="ghost" size="icon">
                                <PlusCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="h-full m-0">
            <div className="h-full overflow-auto p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Resource Allocation Overview</h3>
                <Button variant="outline" size="sm">
                  <Clock className="h-4 w-4 mr-1" />
                  Q3 2023
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resource</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Utilization</TableHead>
                    <TableHead>Projects</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">John Smith</div>
                          <div className="text-xs text-muted-foreground">Frontend Developer</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>Engineering</TableCell>
                    <TableCell>
                      <div className="w-full">
                        <Progress value={100} className="h-2" />
                        <div className="text-xs mt-1">100% Allocated</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="mr-1">Website Redesign</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="success" className="bg-green-500 text-white">
                        <Check className="h-3 w-3 mr-1" /> Fully Allocated
                      </Badge>
                    </TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Sarah Johnson</div>
                          <div className="text-xs text-muted-foreground">UX Designer</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>Design</TableCell>
                    <TableCell>
                      <div className="w-full">
                        <Progress value={75} className="h-2" />
                        <div className="text-xs mt-1">75% Allocated</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="mr-1">Website Redesign</Badge>
                      <Badge variant="outline">Brand Refresh</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-yellow-500 text-white">
                        <Clock className="h-3 w-3 mr-1" /> Partial Availability
                      </Badge>
                    </TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>MD</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Michael Davis</div>
                          <div className="text-xs text-muted-foreground">Backend Developer</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>Engineering</TableCell>
                    <TableCell>
                      <div className="w-full">
                        <Progress value={75} className="h-2" />
                        <div className="text-xs mt-1">75% Allocated</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="mr-1">API Development</Badge>
                      <Badge variant="outline">Mobile App</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-yellow-500 text-white">
                        <Clock className="h-3 w-3 mr-1" /> Partial Availability
                      </Badge>
                    </TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>EW</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Emma Wilson</div>
                          <div className="text-xs text-muted-foreground">Product Manager</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>
                      <div className="w-full">
                        <Progress value={50} className="h-2" />
                        <div className="text-xs mt-1">50% Allocated</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Website Redesign</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-500 text-white">
                        <ArrowUp className="h-3 w-3 mr-1" /> Available
                      </Badge>
                    </TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>JB</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">James Brown</div>
                          <div className="text-xs text-muted-foreground">DevOps Engineer</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>Engineering</TableCell>
                    <TableCell>
                      <div className="w-full">
                        <Progress value={100} className="h-2" />
                        <div className="text-xs mt-1">100% Allocated</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="mr-1">Cloud Migration</Badge>
                      <Badge variant="outline">Mobile App</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="success" className="bg-green-500 text-white">
                        <Check className="h-3 w-3 mr-1" /> Fully Allocated
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResourceAllocation;
