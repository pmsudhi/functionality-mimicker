
import { useState } from "react";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <header className="border-b border-border bg-background p-4">
        <h1 className="text-2xl font-bold">Manpower Planning</h1>
      </header>
      <Dashboard />
    </div>
  );
};

export default Index;
