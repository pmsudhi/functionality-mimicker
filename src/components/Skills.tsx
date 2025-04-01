
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  PlusCircle,
  Search,
  Filter,
  ArrowUpDown,
  Download,
  BarChart3,
  Lightbulb,
  BookOpen,
  Star
} from "lucide-react";

// Sample skills data
const skillsData = [
  {
    id: 1,
    name: "React",
    category: "Technical",
    type: "Frontend",
    resourceCount: 25,
    proficiencyAvg: 3.8,
  },
  {
    id: 2,
    name: "Node.js",
    category: "Technical",
    type: "Backend",
    resourceCount: 18,
    proficiencyAvg: 3.5,
  },
  {
    id: 3,
    name: "UI/UX Design",
    category: "Technical",
    type: "Design",
    resourceCount: 12,
    proficiencyAvg: 3.9,
  },
  {
    id: 4,
    name: "Project Management",
    category: "Soft Skills",
    type: "Management",
    resourceCount: 15,
    proficiencyAvg: 3.2,
  },
  {
    id: 5,
    name: "Python",
    category: "Technical",
    type: "Backend",
    resourceCount: 20,
    proficiencyAvg: 3.6,
  },
  {
    id: 6,
    name: "AWS",
    category: "Technical",
    type: "DevOps",
    resourceCount: 14,
    proficiencyAvg: 3.3,
  },
  {
    id: 7,
    name: "Leadership",
    category: "Soft Skills",
    type: "Management",
    resourceCount: 10,
    proficiencyAvg: 3.7,
  },
  {
    id: 8,
    name: "Data Analysis",
    category: "Technical",
    type: "Data",
    resourceCount: 8,
    proficiencyAvg: 3.4,
  },
];

// Sample resource with skills
const resourcesWithSkillsData = [
  {
    id: 1,
    name: "John Smith",
    role: "Frontend Developer",
    department: "Engineering",
    skills: [
      { id: 1, name: "React", proficiency: 4 },
      { id: 9, name: "JavaScript", proficiency: 5 },
      { id: 10, name: "HTML/CSS", proficiency: 4 },
      { id: 11, name: "TypeScript", proficiency: 3 },
    ],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "UX Designer",
    department: "Design",
    skills: [
      { id: 3, name: "UI/UX Design", proficiency: 5 },
      { id: 12, name: "Figma", proficiency: 4 },
      { id: 13, name: "User Research", proficiency: 4 },
      { id: 14, name: "Wireframing", proficiency: 5 },
    ],
  },
  {
    id: 3,
    name: "Michael Davis",
    role: "Backend Developer",
    department: "Engineering",
    skills: [
      { id: 2, name: "Node.js", proficiency: 4 },
      { id: 5, name: "Python", proficiency: 3 },
      { id: 15, name: "SQL", proficiency: 4 },
      { id: 16, name: "MongoDB", proficiency: 3 },
    ],
  },
  {
    id: 4,
    name: "Emma Wilson",
    role: "Product Manager",
    department: "Product",
    skills: [
      { id: 4, name: "Project Management", proficiency: 4 },
      { id: 7, name: "Leadership", proficiency: 4 },
      { id: 17, name: "Agile", proficiency: 5 },
      { id: 18, name: "Product Strategy", proficiency: 4 },
    ],
  },
  {
    id: 5,
    name: "James Brown",
    role: "DevOps Engineer",
    department: "Engineering",
    skills: [
      { id: 6, name: "AWS", proficiency: 5 },
      { id: 19, name: "Docker", proficiency: 4 },
      { id: 20, name: "Kubernetes", proficiency: 4 },
      { id: 21, name: "CI/CD", proficiency: 5 },
    ],
  },
];

// Skill gap by department
const skillGapData = [
  {
    department: "Engineering",
    skills: [
      { name: "Kubernetes", gap: -4 },
      { name: "Machine Learning", gap: -3 },
      { name: "GraphQL", gap: -2 },
    ],
  },
  {
    department: "Design",
    skills: [
      { name: "3D Design", gap: -2 },
      { name: "Motion Design", gap: -2 },
    ],
  },
  {
    department: "Product",
    skills: [
      { name: "Data Analysis", gap: -3 },
      { name: "Market Research", gap: -2 },
    ],
  },
  {
    department: "Marketing",
    skills: [
      { name: "SEO", gap: -2 },
      { name: "Content Strategy", gap: -2 },
      { name: "Social Media", gap: -1 },
    ],
  },
];

const Skills = () => {
  const [skillsView, setSkillsView] = useState("inventory");
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const getProficiencyLabel = (level: number) => {
    switch (level) {
      case 1: return "Beginner";
      case 2: return "Basic";
      case 3: return "Intermediate";
      case 4: return "Advanced";
      case 5: return "Expert";
      default: return "Unknown";
    }
  };
  
  const getProficiencyColor = (level: number) => {
    switch (level) {
      case 1: return "bg-gray-200";
      case 2: return "bg-blue-200";
      case 3: return "bg-blue-300";
      case 4: return "bg-blue-500";
      case 5: return "bg-blue-700";
      default: return "bg-gray-200";
    }
  };
  
  const filteredSkills = skillsData.filter(skill => 
    skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredResources = resourcesWithSkillsData.filter(resource => 
    resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.skills.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="h-full flex flex-col overflow-hidden p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Skills Management</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Skill
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{skillsData.length}</div>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-1 text-xs flex flex-wrap gap-1">
              <Badge variant="outline">
                {skillsData.filter(s => s.category === "Technical").length} Technical
              </Badge>
              <Badge variant="outline">
                {skillsData.filter(s => s.category === "Soft Skills").length} Soft Skills
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Skills per Resource
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">4.2</div>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <Progress value={4.2 / 5 * 100} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Skill Gaps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">8</div>
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-1 text-xs text-amber-500">
              Skills needed for upcoming projects
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex-1 overflow-hidden border rounded-md">
        <Tabs 
          defaultValue="inventory" 
          value={skillsView}
          onValueChange={setSkillsView}
          className="h-full flex flex-col"
        >
          <div className="border-b px-4">
            <TabsList className="bg-transparent">
              <TabsTrigger value="inventory" className="data-[state=active]:bg-transparent">
                Skill Inventory
              </TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:bg-transparent">
                Resources
              </TabsTrigger>
              <TabsTrigger value="gaps" className="data-[state=active]:bg-transparent">
                Skill Gaps
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="inventory" className="h-full m-0 flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search skills..." 
                    className="pl-8" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="ml-4 flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="h-4 w-4 mr-1" />
                    Sort
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-background">
                  <TableRow>
                    <TableHead>Skill</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Resources</TableHead>
                    <TableHead>Avg. Proficiency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSkills.map(skill => (
                    <TableRow 
                      key={skill.id} 
                      className={selectedSkill === skill.id ? "bg-muted" : ""}
                      onClick={() => setSelectedSkill(skill.id === selectedSkill ? null : skill.id)}
                    >
                      <TableCell className="font-medium">{skill.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{skill.category}</Badge>
                      </TableCell>
                      <TableCell>{skill.type}</TableCell>
                      <TableCell>{skill.resourceCount}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-0.5">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star 
                                key={star} 
                                className={`h-3 w-3 ${star <= Math.round(skill.proficiencyAvg) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm">{skill.proficiencyAvg.toFixed(1)}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="h-full m-0 flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search resources or skills..." 
                    className="pl-8" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="ml-4 flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                </div>
              </div>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredResources.map(resource => (
                  <Card key={resource.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-2">
                          <AvatarImage src="" alt={resource.name} />
                          <AvatarFallback>{resource.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{resource.name}</CardTitle>
                          <div className="text-sm text-muted-foreground">{resource.role}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h4 className="text-sm font-medium mb-2">Skills</h4>
                      <div className="space-y-2">
                        {resource.skills.map(skill => (
                          <div key={skill.id} className="flex items-center justify-between">
                            <span>{skill.name}</span>
                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-0.5">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <Star 
                                    key={star} 
                                    className={`h-3 w-3 ${star <= skill.proficiency ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                                  />
                                ))}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {getProficiencyLabel(skill.proficiency)}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button variant="ghost" size="sm" className="w-full mt-4">
                        <PlusCircle className="h-4 w-4 mr-1" />
                        Add Skill
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="gaps" className="h-full m-0 flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Skill Gap Analysis</h3>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export Report
                </Button>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-6">
                {skillGapData.map((dept, index) => (
                  <div key={index}>
                    <h3 className="font-bold mb-2">{dept.department}</h3>
                    <Card>
                      <CardContent className="pt-6">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Skill</TableHead>
                              <TableHead>Gap (FTE)</TableHead>
                              <TableHead>Priority</TableHead>
                              <TableHead>Action</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {dept.skills.map((skill, idx) => (
                              <TableRow key={idx}>
                                <TableCell className="font-medium">{skill.name}</TableCell>
                                <TableCell className="text-red-500">{skill.gap}</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className={
                                    skill.gap <= -3 ? "bg-red-100 text-red-800" :
                                    skill.gap <= -2 ? "bg-yellow-100 text-yellow-800" :
                                    "bg-blue-100 text-blue-800"
                                  }>
                                    {skill.gap <= -3 ? "High" : skill.gap <= -2 ? "Medium" : "Low"}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Button variant="outline" size="sm">Plan</Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                ))}
                
                <div className="mt-6">
                  <h3 className="font-bold mb-2">Recommendations</h3>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="bg-blue-100 text-blue-800 p-2 rounded">
                            <Lightbulb className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">Consider hiring 2 DevOps Engineers</h4>
                            <p className="text-sm text-muted-foreground">
                              This would address the Kubernetes and CI/CD skill gaps in Engineering
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="bg-blue-100 text-blue-800 p-2 rounded">
                            <Lightbulb className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">Training program for Data Analysis</h4>
                            <p className="text-sm text-muted-foreground">
                              Offer training to 3 current employees to address data analysis skill gaps
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="bg-blue-100 text-blue-800 p-2 rounded">
                            <Lightbulb className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">Contract 3D Design specialist</h4>
                            <p className="text-sm text-muted-foreground">
                              For upcoming projects requiring 3D design skills
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Skills;
