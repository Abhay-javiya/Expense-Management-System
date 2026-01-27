export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
      {/* 1. TOTAL BALANCE (Gradient Theme) */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-3xl shadow-lg shadow-indigo-200/50 group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/30">
        
        {/* Background Icon & Glow */}
        <div className="absolute -right-4 -top-4 p-6 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 rotate-12">
          <span className="material-symbols-rounded text-9xl text-white">account_balance_wallet</span>
        </div>
        <div className="absolute left-0 bottom-0 w-32 h-32 bg-indigo-500/30 blur-3xl rounded-full"></div>

        {/* Content */}
        <div className="relative z-10">
          <p className="text-sm font-medium text-indigo-100 mb-1 opacity-90">Total Balance</p>
          <h3 className="text-3xl font-bold text-white tracking-tight">$12,450.00</h3>
          
          <div className="flex items-center gap-2 mt-4">
            <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-2.5 py-1 rounded-full group-hover:bg-white/30 transition-colors">
              <span className="material-symbols-rounded text-[14px]">trending_up</span>
              +2.5%
            </span>
            <span className="text-xs text-indigo-200 font-medium">vs last month</span>
          </div>
        </div>
      </div>

      {/* 2. INCOME (Emerald Theme) */}
      <div className="relative overflow-hidden bg-white p-6 rounded-3xl shadow-sm border border-slate-100 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100/50 hover:border-emerald-100">
        
        {/* Background Icon */}
        <div className="absolute -right-4 -top-4 p-6 opacity-[0.05] group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 rotate-12">
          <span className="material-symbols-rounded text-9xl text-emerald-600">savings</span>
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-1">
             <p className="text-sm font-medium text-slate-500">Total Income</p>
             <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                <span className="material-symbols-rounded text-slate-400 text-lg group-hover:text-emerald-600 transition-colors">more_horiz</span>
             </div>
          </div>
          
          <h3 className="text-3xl font-bold text-slate-800 tracking-tight">$8,500.00</h3>
          
          <div className="flex items-center gap-2 mt-4">
            <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full group-hover:bg-emerald-100 transition-colors">
              <span className="material-symbols-rounded text-[14px]">trending_up</span>
              +12%
            </span>
            <span className="text-xs text-slate-400">vs last month</span>
          </div>
        </div>
      </div>

      {/* 3. EXPENSES (Rose Theme) */}
      <div className="relative overflow-hidden bg-white p-6 rounded-3xl shadow-sm border border-slate-100 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-100/50 hover:border-rose-100">
        
        {/* Background Icon */}
        <div className="absolute -right-4 -top-4 p-6 opacity-[0.05] group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 rotate-12">
          <span className="material-symbols-rounded text-9xl text-rose-500">credit_card</span>
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-1">
             <p className="text-sm font-medium text-slate-500">Total Expenses</p>
             <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-rose-50 transition-colors">
                <span className="material-symbols-rounded text-slate-400 text-lg group-hover:text-rose-600 transition-colors">more_horiz</span>
             </div>
          </div>

          <h3 className="text-3xl font-bold text-slate-800 tracking-tight">$4,200.00</h3>
          
          <div className="flex items-center gap-2 mt-4">
            <span className="flex items-center gap-1 bg-rose-50 text-rose-600 text-xs font-bold px-2.5 py-1 rounded-full group-hover:bg-rose-100 transition-colors">
              <span className="material-symbols-rounded text-[14px]">trending_down</span>
              +5%
            </span>
            <span className="text-xs text-slate-400">vs last month</span>
          </div>
        </div>
      </div>

    </div>
  );
}