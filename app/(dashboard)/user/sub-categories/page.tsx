"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Plus, Search, Filter, Edit2, Trash2, Tag, Info, Layout, Layers, Hash } from "lucide-react";

export default function SubCategoryPage() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/sub-categories");
      setData(res.data.data || []);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch sub-categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const remove = async (id: number) => {
    if (!confirm("Delete this sub-category?")) return;
    try {
      await axios.delete(`/api/sub-categories?id=${id}`);
      fetchData();
    } catch (err: any) {
      alert("Delete failed.");
    }
  };

  if (loading) return (
    <div className="p-4 sm:p-8 animate-pulse space-y-4">
      <div className="h-10 w-48 bg-slate-200 rounded-lg"></div>
      <div className="h-64 bg-slate-100 rounded-[32px]"></div>
    </div>
  );

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Sub Categories</h1>
          <p className="text-sm text-slate-500 font-medium">Fine-tune your financial tracking</p>
        </div>
        <button
          onClick={() => router.push("/user/sub-categories/add")}
          className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-200 transition hover:bg-slate-800 active:scale-95 translate-y-0 hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          Add Sub Category
        </button>
      </div>

      {/* Main Container */}
      <div className="rounded-[32px] bg-white shadow-sm border border-slate-100 overflow-hidden">
        {/* Header Controls */}
        <div className="p-4 sm:p-6 border-b border-slate-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search sub-categories..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
            />
          </div>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px] sm:min-w-0">
            <thead>
              <tr className="border-b border-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest bg-slate-50/30">
                <th className="px-6 py-4">Title</th>
                <th className="px-4 py-4 hidden md:table-cell">Main Category</th>
                <th className="px-4 py-4 text-center">Type</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-20 text-center text-slate-300">
                    <div className="flex flex-col items-center gap-2 opacity-50">
                      <Hash className="w-12 h-12" />
                      <p className="font-bold">No sub-categories found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((sc) => (
                  <tr key={sc.SubCategoryID} className="group hover:bg-indigo-50/20 transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-indigo-600 transition-colors shadow-sm">
                          <Hash className="w-4 h-4" />
                        </div>
                        <p className="font-bold text-slate-800">{sc.SubCategoryName}</p>
                      </div>
                    </td>

                    <td className="px-4 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                        <span className="text-sm font-medium text-slate-600">
                          {sc.categories?.CategoryName || "General"}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${sc.IsIncome ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
                        {sc.IsIncome ? "Income" : "Expense"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => router.push(`/user/sub-categories/edit/${sc.SubCategoryID}`)}
                          className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => remove(sc.SubCategoryID)}
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

        <div className="p-4 sm:p-6 bg-slate-50/30 border-t border-slate-50 flex justify-center">
          <p className="text-xs font-bold text-slate-400">Showing {data.length} sub-divisions</p>
        </div>
      </div>
    </div>
  );
}
