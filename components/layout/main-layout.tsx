"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { AgenteChat } from "../agente/agente-chat";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarCollapseChange = (isCollapsed: boolean) => {
    setIsSidebarCollapsed(isCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar onCollapseChange={handleSidebarCollapseChange} />
      
      {/* Main content */}
      <main className={cn(
        "transition-all duration-300",
        isSidebarCollapsed ? "md:ml-16" : "md:ml-64",
        className
      )}>
        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>

      {/* Agente de IA - Panel lateral derecho */}
      <AgenteChat />
    </div>
  );
}; 