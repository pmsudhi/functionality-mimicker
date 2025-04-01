
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Plus, 
  Users, 
  BarChart3, 
  ArrowUpDown 
} from "lucide-react";

// Sample team data
const teamsData = [
  {
    id: 1,
    name: "Frontend Team",
    department: "Engineering",
    utilization: 85,
    headcount: 12,
    manager: "Alex Johnson",
    members: [
      { id: 101, name: "John Smith", role: "Senior Developer", avatar: "", utilization: 90 },
      { id: 102, name: "Emma Davis", role: "Frontend Developer", avatar: "", utilization: 85 },
      { id: 103, name: "Michael Brown", role: "UI Developer", avatar: "", utilization: 75 },
      { id: 104, name: "Sophia Wilson", role: "Junior Developer", avatar: "", utilization: 95 },
    ]
  },
  {
    id: 2,
    name: "Backend Team",
    department: "Engineering",
    utilization: 78,
    headcount: 8,
    manager: "David Wilson",
    members: [
      { id: 201, name: "Sara Miller", role: "Backend Lead", avatar: "", utilization: 80 },
      { id: 202, name: "James Taylor", role: "Backend Developer", avatar: "", utilization: 75 },
      { id: 203, name: "Jessica Lee", role: "Database Engineer", avatar: "", utilization: 85 },
    ]
  },
  {
    id: 3,
    name: "Design Team",
    department: "Design",
    utilization: 92,
    headcount: 6,
    manager: "Emily Roberts",
    members: [
      { id: 301, name: "Ryan Clark", role: "Lead Designer", avatar: "", utilization: 95 },
      { id: 302, name: "Olivia Martinez", role: "UX Designer", avatar: "", utilization: 90 },
      { id: 303, name: "Daniel White", role: "UI Designer", avatar: "", utilization: 85 },
    ]
  },
  {
    id: 4,
    name: "Product Team",
    department: "Product",
    utilization: 88,
    headcount: 5,
    manager: "Natalie Green",
    members: [
      { id: 401, name: "Chris Evans", role: "Product Manager", avatar: "", utilization: 95 },
      { id: 402, name: "Lisa Wang", role: "Product Owner", avatar: "", utilization: 85 },
      { id: 403, name: "Kevin Anderson", role: "Business Analyst", avatar: "", utilization: 80 },
    ]
  },
];

const TeamView = () => {
  const [teams, setTeams] = useState(teamsData);
  const [expandedTeam, setExpandedTeam] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleTeamExpansion = (teamId: number) => {
    if (expandedTeam === teamId) {
      setExpandedTeam(null);
    } else {
      setExpandedTeam(teamId);
    }
  };

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.members.some(member => member.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-80">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search teams or members..." 
              className="pl-8" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="h-4 w-4 mr-1" />
              Sort
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Team
            </Button>
          </div>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTeams.map(team => (
            <Card key={team.id} className={expandedTeam === team.id ? "col-span-full" : ""}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>{team.name}</CardTitle>
                  <Badge>{team.department}</Badge>
                </div>
                <CardDescription>Managed by {team.manager}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{team.headcount} members</span>
                  </div>
                  <div className="flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{team.utilization}% utilized</span>
                  </div>
                </div>
                
                <Progress value={team.utilization} className="h-2 mb-4" />
                
                {expandedTeam === team.id && (
                  <div className="mt-4 space-y-3">
                    <h4 className="font-medium">Team Members</h4>
                    {team.members.map(member => (
                      <div key={member.id} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-xs text-muted-foreground">{member.role}</div>
                          </div>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="w-16">
                                <Progress value={member.utilization} className="h-2" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{member.utilization}% Utilization</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full" 
                  onClick={() => toggleTeamExpansion(team.id)}
                >
                  {expandedTeam === team.id ? "Show Less" : "Show Team Members"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TeamView;
