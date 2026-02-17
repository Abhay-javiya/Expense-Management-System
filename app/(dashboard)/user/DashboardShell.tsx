'use client';

import { useState } from 'react';
import Sidebar from '@/app/components/layout/Sidebar';
import Header from '@/app/components/layout/Header';

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800">
      
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
      />

      {/* Main content */}
      <main
        className={`flex-1 h-full overflow-y-auto bg-slate-50/50 transition-all duration-300 ease-in-out
          ${isCollapsed ? 'md:ml-20' : 'md:ml-80'}
        `}
      >
        <Header toggleSidebar={toggleSidebar} />

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
