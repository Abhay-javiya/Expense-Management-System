"use client";

import { useRouter } from "next/navigation";

type HeaderProps = {
  toggleSidebar: () => void;
};

export default function Header({ toggleSidebar }: HeaderProps) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-xl border-b border-slate-100 transition-all">
      {/* LEFT */}
      <div className="flex items-start gap-4">
        {/* Sidebar toggle (mobile + desktop) */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition"
          aria-label="Toggle sidebar"
        >
          ☰
        </button>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Overview
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm font-medium text-slate-500">
              Welcome back, Alex.
            </p>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <p className="text-xs font-medium text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">
              {today}
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex group relative items-center gap-2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="material-symbols-rounded text-slate-400 group-focus-within:text-indigo-500 transition-colors text-xl">
              search
            </span>
          </div>
          <input
            type="text"
            placeholder="Search transactions..."
            className="block w-64 pl-10 pr-12 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-medium text-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white focus:w-72 transition-all duration-300 shadow-sm"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 border border-slate-200 rounded text-[10px] font-bold text-slate-400 bg-white shadow-sm">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-100">
          <button className="relative p-2.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition">
            <span className="material-symbols-rounded text-[22px]">
              notifications
            </span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
          </button>

          <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-200 hover:-translate-y-0.5 transition">
            <span className="material-symbols-rounded text-[20px]">add</span>
            <span className="text-sm">Add New</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose-50 text-rose-600 font-semibold hover:bg-rose-100 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
