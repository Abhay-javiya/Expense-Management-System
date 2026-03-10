"use client";

import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, Search, Bell, Plus, LogOut, Calendar, UserCheck } from "lucide-react";

type HeaderProps = {
  toggleSidebar: () => void;
  openMobileMenu: () => void;
};

export default function Header({ toggleSidebar, openMobileMenu }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const getPageTitle = () => {
    const part = pathname.split("/").pop();
    if (!part || part === "dashboard") return "Overview";
    return part.charAt(0).toUpperCase() + part.slice(1);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-2xl border-b border-slate-100 px-4 sm:px-8 py-4">
      <div className="flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleSidebar}
            className="hidden md:flex p-2 rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-900 hover:text-white transition-colors shadow-sm"
          >
            <Menu className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={openMobileMenu}
            className="flex md:hidden p-2 rounded-xl bg-slate-50 text-slate-500 transition-colors shadow-sm"
          >
            <Menu className="w-5 h-5" />
          </motion.button>

          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
              {getPageTitle()}
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                <Calendar className="w-2.5 h-2.5" />
                {today}
              </span>
              <span className="md:hidden text-[10px] font-bold text-indigo-500">{today.split(',')[1]}</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-6">
          {/* Search bar */}
          <div className="hidden lg:flex relative items-center group">
            <Search className="absolute left-3 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="text"
              placeholder="Search reports..."
              className="pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-2xl text-xs font-bold text-slate-600 placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-100 focus:bg-white w-64 transition-all duration-300"
            />
          </div>

          <div className="flex items-center gap-1 sm:gap-3">
            {/* Desktop Quick Action */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/user/expenses/add")}
              className="hidden sm:flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-xs font-black shadow-xl shadow-slate-200 transition-all"
            >
              <Plus className="w-4 h-4" />
              RECORD
            </motion.button>

            {/* Notifications */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="relative p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:text-indigo-600 hover:bg-white shadow-sm transition-all"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white ring-1 ring-rose-200" />
            </motion.button>

            {/* Logout */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-rose-50 text-rose-600 font-bold hover:bg-rose-100 transition-all shadow-sm shadow-rose-100/50"
            >
              <LogOut className="w-5 h-5 sm:hidden" />
              <span className="hidden sm:inline text-xs">EXIT</span>
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
}
