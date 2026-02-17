'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; 

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isCollapsed, toggleSidebar }: SidebarProps) {
  const pathname = usePathname(); 

  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', href: '/user/dashboard' },
    { name: 'Income', icon: 'account_balance', href: '/user/incomes' },
    { name: 'Expenses', icon: 'credit_card', href: '/user/expenses' },
    { name: 'Categories', icon: 'pie_chart', href: '/user/categories' },
    { name: 'Sub-Categories', icon: 'settings', href: '/user/sub-categories' },
  ];

  return (
    <aside 
      className={`hidden md:flex flex-col h-full fixed left-0 top-0 z-20 bg-white border-r border-slate-100 font-sans transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-80'} 
      `}
    >
      
      {/* --- TOGGLE BUTTON --- */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-10 z-50 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 shadow-sm transition-colors"
      >
        <span className="material-symbols-rounded text-sm">
          {isCollapsed ? 'chevron_right' : 'chevron_left'}
        </span>
      </button>

      {/* 1. HEADER & LOGO */}
      <div className={`pt-10 pb-8 flex items-center ${isCollapsed ? 'justify-center px-0' : 'px-8 gap-3'}`}>
        <div className="relative group shrink-0">
          <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200">
            <span className="material-symbols-rounded text-xl">wallet</span>
          </div>
        </div>
        
        <div className={`overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight whitespace-nowrap ml-3">
            FinTrack<span className="text-indigo-600">.</span>
          </h1>
        </div>
      </div>

      {/* 2. NAVIGATION */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto overflow-x-hidden">
        
        <div className={`transition-all duration-300 ${isCollapsed ? 'opacity-0 h-0' : 'opacity-100 h-auto'}`}>
           <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 whitespace-nowrap">
             Overview
           </p>
        </div>

        {navItems.map((item) => {
          // 4. Calculate if this item is active dynamically
          const isActive = pathname === item.href;

          return (
            <Link
              href={item.href} // 5. Use the real link
              key={item.name}
              className={`group relative flex items-center rounded-2xl transition-all duration-300 ease-out
                ${isActive 
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-200' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
                }
                ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3.5 gap-3'}
              `}
            >
              {/* Hover Slide Effect (Only visible on non-active items) */}
              {!isActive && !isCollapsed && (
                <div className="absolute left-0 w-1 h-0 bg-indigo-600 rounded-r-full transition-all duration-300 group-hover:h-1/2 opacity-0 group-hover:opacity-100"></div>
              )}

              <span className={`material-symbols-rounded text-[22px] transition-transform duration-300 group-hover:scale-110 shrink-0
                ${isActive ? 'text-indigo-100' : 'text-slate-400 group-hover:text-indigo-600'}`}>
                {item.icon}
              </span>
              
              {/* Text Label */}
              <span className={`font-medium tracking-wide whitespace-nowrap transition-all duration-300 overflow-hidden
                ${isCollapsed ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100 group-hover:translate-x-1'}
              `}>
                {item.name}
              </span>

              {/* Glowing Dot (Active State) */}
              {isActive && !isCollapsed && (
                 <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse shrink-0"></span>
              )}

              {/* Tooltip on Hover (When Collapsed) */}
              {isCollapsed && (
                <div className="absolute left-14 z-[100] px-3 py-2 bg-slate-800 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl">
                  {item.name}
                  <div className="absolute top-1/2 -left-1 -mt-1 border-4 border-transparent border-r-slate-800"></div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* 3. PROFILE CARD */}
      <div className="p-4 mt-auto">
        <div className={`relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-indigo-100 hover:shadow-lg transition-all duration-300 group cursor-pointer
           ${isCollapsed ? 'p-2 flex justify-center aspect-square items-center' : 'p-4'}
        `}>
          
          {!isCollapsed && (
             <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-50 rounded-full group-hover:bg-indigo-100 transition-colors duration-500"></div>
          )}

          <div className={`relative flex items-center ${isCollapsed ? 'justify-center w-full' : 'gap-3 w-full'}`}>
            <div className="relative shrink-0">
              <img 
                src="https://i.pravatar.cc/150?img=68" 
                alt="User" 
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm group-hover:scale-105 transition-transform duration-300" 
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            
            <div className={`flex-1 min-w-0 transition-all duration-300 overflow-hidden ${isCollapsed ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100'}`}>
              <h4 className="text-sm font-bold text-slate-800 truncate group-hover:text-indigo-700 transition-colors">
                Abhay Javiya
              </h4>
              <p className="text-xs text-slate-500 truncate">Pro Account</p>
            </div>
            
            {!isCollapsed && (
              <span className="material-symbols-rounded text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0">
                more_vert
              </span>
            )}
          </div>
        </div>
      </div>

    </aside>
  );
}
