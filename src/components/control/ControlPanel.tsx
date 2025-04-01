
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageLayout } from '@/components/ui/page-layout';
import { Settings, Shield, Database, Users, Bell, Clock } from 'lucide-react';

const ControlPanel = () => {
  return (
    <PageLayout>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Control Panel</h1>
          <p className="text-muted-foreground">System configuration and settings</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                <CardTitle>System Configuration</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Manage core system settings and configurations.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-md hover:bg-accent/50 cursor-pointer">
                  <Database className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Database Settings</h3>
                    <p className="text-sm text-muted-foreground">Configure database connection parameters</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-md hover:bg-accent/50 cursor-pointer">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Security Settings</h3>
                    <p className="text-sm text-muted-foreground">Manage access controls and permissions</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle>User Management</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Manage system users and roles.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-md hover:bg-accent/50 cursor-pointer">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">User Accounts</h3>
                    <p className="text-sm text-muted-foreground">Manage user accounts and roles</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Notifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Configure system notifications and alerts.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-md hover:bg-accent/50 cursor-pointer">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Alert Settings</h3>
                    <p className="text-sm text-muted-foreground">Configure notification preferences</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <CardTitle>System Scheduling</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Manage scheduled tasks and automations.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-md hover:bg-accent/50 cursor-pointer">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Task Scheduler</h3>
                    <p className="text-sm text-muted-foreground">Configure automated system tasks</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default ControlPanel;
