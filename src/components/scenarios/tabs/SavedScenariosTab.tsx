
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const SavedScenariosTab = () => {
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <CardTitle>Saved Scenarios</CardTitle>
        </div>
        <CardDescription>
          View and manage your saved workforce scenarios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center p-8 border border-dashed rounded-md">
          <p>Your saved scenarios will be displayed here</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SavedScenariosTab;
