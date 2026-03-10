"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";

type SummaryCardsProps = {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  balanceDelta: number;
  incomeDelta: number;
  expenseDelta: number;
};

export default function SummaryCards({
  totalBalance,
  totalIncome,
  totalExpense,
  balanceDelta,
  incomeDelta,
  expenseDelta,
}: SummaryCardsProps) {
  const formatMoney = (value: number) =>
    `₹${value.toLocaleString("en-IN", {
      minimumFractionDigits: 0,
    })}`;

  const formatDelta = (value: number) => {
    if (!Number.isFinite(value) || value === 0) return "0%";
    const sign = value > 0 ? "+" : "";
    return `${sign}${value.toFixed(1)}%`;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 20 } }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
    >
      {/* 1. TOTAL BALANCE */}
      <motion.div
        variants={item}
        whileHover={{ y: -5 }}
        className="relative overflow-hidden bg-slate-900 p-8 rounded-[32px] shadow-2xl shadow-slate-200 group"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-500">
          <Wallet className="w-24 h-24 text-white" />
        </div>
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Net Worth</p>
          <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tighter mb-6">
            {formatMoney(totalBalance)}
          </h3>
          <div className="flex items-center gap-3">
            <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${balanceDelta >= 0 ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
              {balanceDelta >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {formatDelta(balanceDelta)}
            </span>
            <span className="text-[10px] font-bold text-slate-500">vs last month</span>
          </div>
        </div>
      </motion.div>

      {/* 2. TOTAL INCOME */}
      <motion.div
        variants={item}
        whileHover={{ y: -5 }}
        className="relative overflow-hidden bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm group"
      >
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-500 text-emerald-600">
          <ArrowUpRight className="w-24 h-24" />
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Monthly Earnings</p>
            <MoreHorizontal className="w-4 h-4 text-slate-300" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-6">
            {formatMoney(totalIncome)}
          </h3>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-wider border border-emerald-100">
              <TrendingUp className="w-3 h-3" />
              {formatDelta(incomeDelta)}
            </span>
            <span className="text-[10px] font-bold text-slate-400">Total revenue</span>
          </div>
        </div>
      </motion.div>

      {/* 3. TOTAL EXPENSES */}
      <motion.div
        variants={item}
        whileHover={{ y: -5 }}
        className="relative overflow-hidden bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm group"
      >
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-500 text-rose-600">
          <ArrowDownRight className="w-24 h-24" />
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Monthly Burn</p>
            <MoreHorizontal className="w-4 h-4 text-slate-300" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-6">
            {formatMoney(totalExpense)}
          </h3>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-wider border border-rose-100">
              <TrendingDown className="w-3 h-3" />
              {formatDelta(expenseDelta)}
            </span>
            <span className="text-[10px] font-bold text-slate-400">Cash outflow</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
