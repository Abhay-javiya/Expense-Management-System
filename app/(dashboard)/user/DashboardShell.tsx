'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/app/components/layout/Sidebar';
import Header from '@/app/components/layout/Header';

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const openMobileMenu = () => {
    setIsMobileOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800">

      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        isMobileOpen={isMobileOpen}
        closeMobileMenu={closeMobileMenu}
      />

      {/* Main content */}
      <main
        className={`flex-1 h-full overflow-y-auto bg-slate-50/50 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isCollapsed ? 'md:ml-20' : 'md:ml-80'}
          ml-0
        `}
      >
        <Header
          toggleSidebar={toggleSidebar}
          openMobileMenu={openMobileMenu}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="p-4 sm:p-8 min-h-[calc(100vh-80px)]"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
