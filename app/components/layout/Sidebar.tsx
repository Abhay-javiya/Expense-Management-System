'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LayoutDashboard, TrendingUp, CreditCard, Briefcase, PieChart, Layers, Users, ChevronRight, ChevronLeft, Wallet } from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isMobileOpen?: boolean;
  closeMobileMenu?: () => void;
}

export default function Sidebar({ isCollapsed, toggleSidebar, isMobileOpen, closeMobileMenu }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/user/dashboard' },
    { name: 'Income', icon: TrendingUp, href: '/user/incomes' },
    { name: 'Expenses', icon: CreditCard, href: '/user/expenses' },
    { name: 'Projects', icon: Briefcase, href: '/user/projects' },
    { name: 'Categories', icon: PieChart, href: '/user/categories' },
    { name: 'Sub-Categories', icon: Layers, href: '/user/sub-categories' },
    { name: 'People', icon: Users, href: '/user/peoples' }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 320,
          x: isMobileOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 768 ? -320 : 0)
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed left-0 top-0 z-50 h-full bg-white border-r border-slate-100 flex flex-col shadow-2xl shadow-slate-200/50 md:shadow-none`}
      >
        {/* Mobile Close Button */}
        <button
          onClick={closeMobileMenu}
          className="md:hidden absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Desktop Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="hidden md:flex absolute -right-3 top-10 z-50 w-6 h-6 bg-white border border-slate-200 rounded-full items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 shadow-sm transition-all hover:scale-110 active:scale-90"
        >
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>

        {/* Header & Logo */}
        <div className={`pt-10 pb-8 flex items-center px-8 ${isCollapsed ? 'md:justify-center md:px-0' : 'gap-3'}`}>
          <div className="relative group shrink-0">
            <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 text-white shadow-lg">
              <Wallet className="w-5 h-5" />
            </div>
          </div>

          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="overflow-hidden"
            >
              <h1 className="text-xl font-black text-slate-900 tracking-tight whitespace-nowrap ml-1">
                FinTrack<span className="text-indigo-600">.</span>
              </h1>
            </motion.div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto pt-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                href={item.href}
                key={item.name}
                onClick={closeMobileMenu}
                className="block outline-none"
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center rounded-2xl transition-all duration-200 font-bold text-sm
                    ${isActive
                      ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }
                    ${isCollapsed ? 'md:justify-center md:p-3.5 px-4 py-3.5' : 'px-4 py-3.5 gap-3'}
                  `}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'}`} />

                  {!isCollapsed && (
                    <span className="whitespace-nowrap">{item.name}</span>
                  )}

                  {isActive && !isCollapsed && (
                    <motion.div
                      layoutId="active-pill"
                      className="ml-auto w-1 h-4 bg-indigo-400 rounded-full"
                    />
                  )}

                  {isCollapsed && (
                    <div className="absolute left-16 z-[100] px-3 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-2xl hidden md:block">
                      {item.name}
                    </div>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Profile Card */}
        <div className="p-4 mt-auto">
          <motion.div
            whileHover={{ y: -2 }}
            className={`rounded-2xl border border-slate-100 bg-slate-50/50 p-3 flex items-center ${isCollapsed ? 'md:justify-center' : 'gap-3'}`}
          >
            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden ring-2 ring-white">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 truncate">Abhay Javiya</p>
                <p className="text-[10px] font-medium text-slate-400 truncate">Premium Plan</p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}
