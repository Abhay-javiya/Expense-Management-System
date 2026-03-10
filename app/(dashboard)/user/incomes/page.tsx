"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Plus, Search, Filter, MoreHorizontal, Edit2, Trash2, Calendar, User, Tag, Layout, Info, TrendingUp } from "lucide-react";

export default function IncomePage() {
  const [incomes, setIncomes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  const fetchIncomes = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/incomes");
      setIncomes(res.data.data || []);
    } catch (err: any) {
      console.error("Failed to fetch incomes", err);
      setError(err.response?.data?.message || "Failed to load incomes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const deleteIncome = async (id: number) => {
    if (!confirm("Delete this income record?")) return;

    try {
      await axios.delete(`/api/incomes?id=${id}`);
      fetchIncomes();
    } catch (err: any) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return (
    <div className="p-4 sm:p-8 animate-pulse space-y-4">
      <div className="h-10 w-48 bg-slate-200 rounded-lg"></div>
      <div className="h-64 bg-slate-100 rounded-[32px]"></div>
    </div>
  );

  if (error) return (
    <div className="p-8 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-50 text-rose-600 mb-4">
        <Info className="w-8 h-8" />
      </div>
      <p className="text-rose-600 font-bold">{error}</p>
    </div>
  );

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Incomes</h1>
          <p className="text-sm text-slate-500 font-medium">Monitor your earnings and revenue streams</p>
        </div>
        <button
          onClick={() => router.push("/user/incomes/add")}
          className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-200 transition hover:bg-slate-800 active:scale-95 translate-y-0 hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          Add Income
        </button>
      </div>

      {/* Main Table Container */}
      <div className="rounded-[32px] bg-white shadow-sm border border-slate-100 overflow-hidden">
        {/* Table Header Controls */}
        <div className="p-4 sm:p-6 border-b border-slate-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search income..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Table/List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px] sm:min-w-0">
            <thead>
              <tr className="border-b border-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest bg-slate-50/30">
                <th className="px-6 py-4">Source</th>
                <th className="px-4 py-4 hidden md:table-cell">Details</th>
                <th className="px-4 py-4 text-center">Category</th>
                <th className="px-4 py-4 text-right">Amount</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {incomes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-2 opacity-30">
                      <Layout className="w-12 h-12" />
                      <p className="font-bold">No income records found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                incomes.map((income) => (
                  <tr key={income.IncomeID} className="group hover:bg-indigo-50/20 transition-colors cursor-pointer">
                    {/* Column 1: Source & Date */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 truncate">{income.peoples?.PeopleName || "Unknown Source"}</p>
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                            <Calendar className="w-3 h-3" />
                            {new Date(income.IncomeDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Secondary Info (Hidden on Small) */}
                    <td className="px-4 py-4 hidden md:table-cell">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                          <Tag className="w-3.5 h-3.5 text-slate-400" />
                          {income.sub_categories?.SubCategoryName ?? "-"}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium italic truncate">
                          {income.IncomeDetail || "No details provided"}
                        </div>
                      </div>
                    </td>

                    {/* Column 3: Category */}
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider border border-emerald-100">
                        {income.categories?.CategoryName ?? "Income"}
                      </span>
                    </td>

                    {/* Column 4: Amount */}
                    <td className="px-4 py-4 text-right">
                      <p className="text-base font-black text-emerald-600">₹ {Number(income.Amount).toLocaleString()}</p>
                    </td>

                    {/* Column 5: Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => router.push(`/user/incomes/edit/${income.IncomeID}`)}
                          className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteIncome(income.IncomeID)}
                          className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-slate-50/30 border-t border-slate-50 flex justify-center">
          <p className="text-xs font-bold text-slate-400">Total {incomes.length} records</p>
        </div>
      </div>
    </div>
  );
}
