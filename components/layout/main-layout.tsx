"use client";

import { Sidebar } from "./sidebar";
import { AgenteChat } from "../agente/agente-chat";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Main content */}
      <main className={cn("md:ml-64 transition-all duration-300", className)}>
        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>

      {/* Agente de IA - Panel lateral derecho */}
      <AgenteChat />
    </div>
  );
}; 