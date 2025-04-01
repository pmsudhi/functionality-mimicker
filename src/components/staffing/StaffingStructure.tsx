
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageLayout } from '@/components/ui/page-layout';
import { Users, UserPlus, Building2, Briefcase } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const StaffingStructure = () => {
  return (
    <PageLayout>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Staffing Structure</h1>
          <p className="text-muted-foreground">Configure and manage your staffing organization</p>
        </div>
        
        <Tabs defaultValue="organization">
          <TabsList className="bg-muted/40 mb-6">
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="positions">Positions</TabsTrigger>
            <TabsTrigger value="employees">Employees</TabsTrigger>
          </TabsList>
          
          <TabsContent value="organization" className="space-y-6">
            <Card className="border shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <CardTitle>Organizational Structure</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Departments</h3>
                    <p className="text-sm text-muted-foreground mb-4">Manage your organizational departments</p>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between p-2 border-b">
                        <span>Front of House</span>
                        <span className="text-sm text-muted-foreground">12 positions</span>
                      </li>
                      <li className="flex items-center justify-between p-2 border-b">
                        <span>Back of House</span>
                        <span className="text-sm text-muted-foreground">8 positions</span>
                      </li>
                      <li className="flex items-center justify-between p-2 border-b">
                        <span>Management</span>
                        <span className="text-sm text-muted-foreground">4 positions</span>
                      </li>
                      <li className="flex items-center justify-between p-2">
                        <span>Support</span>
                        <span className="text-sm text-muted-foreground">3 positions</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Locations</h3>
                    <p className="text-sm text-muted-foreground mb-4">Manage your physical business locations</p>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between p-2 border-b">
                        <span>Mall of Dhahran</span>
                        <span className="text-sm text-muted-foreground">15 staff</span>
                      </li>
                      <li className="flex items-center justify-between p-2 border-b">
                        <span>Al Khobar</span>
                        <span className="text-sm text-muted-foreground">12 staff</span>
                      </li>
                      <li className="flex items-center justify-between p-2">
                        <span>Riyadh</span>
                        <span className="text-sm text-muted-foreground">18 staff</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="positions" className="space-y-6">
            <Card className="border shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <CardTitle>Position Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Configure and manage position types and requirements</p>
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Position Types</h3>
                  <p className="text-sm text-muted-foreground mb-4">Manage your staff positions</p>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between p-2 border-b">
                      <span>Server</span>
                      <span className="text-sm text-muted-foreground">8 positions</span>
                    </li>
                    <li className="flex items-center justify-between p-2 border-b">
                      <span>Chef</span>
                      <span className="text-sm text-muted-foreground">5 positions</span>
                    </li>
                    <li className="flex items-center justify-between p-2 border-b">
                      <span>Manager</span>
                      <span className="text-sm text-muted-foreground">3 positions</span>
                    </li>
                    <li className="flex items-center justify-between p-2">
                      <span>Host/Hostess</span>
                      <span className="text-sm text-muted-foreground">4 positions</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="employees" className="space-y-6">
            <Card className="border shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-primary" />
                  <CardTitle>Employee Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Manage employee records and assignments</p>
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Staff Directory</h3>
                  <p className="text-sm text-muted-foreground mb-4">View and manage your employees</p>
                  <div className="text-center p-6 border border-dashed rounded-md">
                    <Users className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                    <p>Employee data will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default StaffingStructure;
