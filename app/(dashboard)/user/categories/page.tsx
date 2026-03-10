"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Plus, Search, Filter, Edit2, Trash2, Tag, Info, Layout, Layers } from "lucide-react";

export default function CategoryPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/categories");
      setCategories(res.data.data || []);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteCategory = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category? All related items might be affected.")) return;

    try {
      await axios.delete(`/api/categories?id=${id}`);
      fetchCategories();
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
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Categories</h1>
          <p className="text-sm text-slate-500 font-medium">Classify your transactions for better insights</p>
        </div>
        <button
          onClick={() => router.push("/user/categories/add")}
          className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-200 transition hover:bg-slate-800 active:scale-95 translate-y-0 hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          Add Category
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
              placeholder="Search categories..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px] sm:min-w-0">
            <thead>
              <tr className="border-b border-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest bg-slate-50/30">
                <th className="px-6 py-4">Title</th>
                <th className="px-4 py-4 text-center">Classification</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-20 text-center text-slate-300">
                    <div className="flex flex-col items-center gap-2 opacity-50">
                      <Layers className="w-12 h-12" />
                      <p className="font-bold">No categories found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                categories.map((c) => (
                  <tr key={c.CategoryID} className="group hover:bg-indigo-50/20 transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${c.IsIncome ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                          <Tag className="w-5 h-5" />
                        </div>
                        <p className="font-bold text-slate-800">{c.CategoryName}</p>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${c.IsIncome ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
                        {c.IsIncome ? "Income" : "Expense"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => router.push(`/user/categories/edit/${c.CategoryID}`)}
                          className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all font-medium"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteCategory(c.CategoryID)}
                          className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all font-medium"
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
          <p className="text-xs font-bold text-slate-400">Total {categories.length} categories active</p>
        </div>
      </div>
    </div>
  );
}
