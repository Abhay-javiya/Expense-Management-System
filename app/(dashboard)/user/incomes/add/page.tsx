"use client";

import { useEffect, useState } from "react";
import api from "axios";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, X, Calendar, DollarSign, User, Tag, Layout, Info, TrendingUp, Layers } from "lucide-react";

export default function AddIncomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    IncomeDate: new Date().toISOString().split('T')[0],
    Amount: "",
    PeopleID: "",
    CategoryID: "",
    SubCategoryID: "",
    IncomeDetail: "",
    Description: "",
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [peoples, setPeoples] = useState<any[]>([]);

  useEffect(() => {
    api.get("/api/categories").then((res) => {
      const data = res.data.data || [];
      setCategories(data.filter((c: any) => c.IsIncome));
    })
      .catch(() => setCategories([]));
    api.get("/api/peoples").then((res) => setPeoples(res.data.data || []));
  }, []);

  useEffect(() => {
    if (!form.CategoryID) {
      setSubCategories([]);
      return;
    }
    api.get(`/api/sub-categories?categoryId=${form.CategoryID}`)
      .then((res) => setSubCategories(res.data.data || []))
      .catch(() => setSubCategories([]));
  }, [form.CategoryID]);

  const submit = async (e: any) => {
    e.preventDefault();
    if (!form.PeopleID) { alert("Please select a source"); return; }
    setLoading(true);
    try {
      await api.post("/api/incomes", {
        ...form,
        PeopleID: Number(form.PeopleID),
        Amount: Number(form.Amount),
        CategoryID: form.CategoryID ? Number(form.CategoryID) : null,
        SubCategoryID: form.SubCategoryID ? Number(form.SubCategoryID) : null,
      });
      router.push("/user/incomes");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to save income");
    } finally {
      setLoading(false);
    }
  };

  const inputBase = "w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 outline-none transition-all duration-200";
  const labelBase = "text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1";

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-slate-900 hover:shadow-md transition-all active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Add Income</h1>
          <p className="text-sm text-slate-500 font-medium">Record a new incoming transaction</p>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-6">
        {/* Core Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <TrendingUp className="w-32 h-32 text-emerald-600" />
          </div>

          <div className="space-y-2 relative">
            <label className={labelBase}><Calendar className="w-3 h-3 inline mr-1" /> Date</label>
            <input
              type="date"
              required
              className={inputBase}
              value={form.IncomeDate}
              onChange={(e) => setForm(f => ({ ...f, IncomeDate: e.target.value }))}
            />
          </div>

          <div className="space-y-2 relative">
            <label className={labelBase}><DollarSign className="w-3 h-3 inline mr-1" /> Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
              <input
                type="number"
                placeholder="0.00"
                required
                className={`${inputBase} pl-8 text-emerald-600`}
                value={form.Amount}
                onChange={(e) => setForm(f => ({ ...f, Amount: e.target.value }))}
              />
            </div>
          </div>
        </div>

        {/* Source & Tags Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm">
          <div className="space-y-2">
            <label className={labelBase}><User className="w-3 h-3 inline mr-1" /> Source</label>
            <select required className={inputBase} value={form.PeopleID} onChange={(e) => setForm(f => ({ ...f, PeopleID: e.target.value }))}>
              <option value="">Select Payer/Source</option>
              {peoples.map(p => <option key={p.PeopleID} value={p.PeopleID}>{p.PeopleName}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className={labelBase}><Tag className="w-3 h-3 inline mr-1" /> Category</label>
            <select className={inputBase} value={form.CategoryID} onChange={(e) => setForm(f => ({ ...f, CategoryID: e.target.value, SubCategoryID: "" }))}>
              <option value="">Select Category</option>
              {categories.map(c => <option key={c.CategoryID} value={c.CategoryID}>{c.CategoryName}</option>)}
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className={labelBase}><Layers className="w-3 h-3 inline mr-1" /> Sub-Category</label>
            <select className={inputBase} value={form.SubCategoryID} onChange={(e) => setForm(f => ({ ...f, SubCategoryID: e.target.value }))}>
              <option value="">Select Sub Category</option>
              {subCategories.map(sc => <option key={sc.SubCategoryID} value={sc.SubCategoryID}>{sc.SubCategoryName}</option>)}
            </select>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6 sm:p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm space-y-6">
          <div className="space-y-2">
            <label className={labelBase}>Income Detail</label>
            <textarea
              className={`${inputBase} min-h-[100px] resize-none`}
              placeholder="What was this for?"
              value={form.IncomeDetail}
              onChange={(e) => setForm(f => ({ ...f, IncomeDetail: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <label className={labelBase}>Additional Description</label>
            <textarea
              className={`${inputBase} min-h-[100px] resize-none`}
              placeholder="..."
              value={form.Description}
              onChange={(e) => setForm(f => ({ ...f, Description: e.target.value }))}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 p-2">
          <button
            type="button"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition-all active:scale-95"
            onClick={() => router.push("/user/incomes")}
          >
            <X className="w-4 h-4" /> Cancel
          </button>
          <button
            disabled={loading}
            className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-sm font-black shadow-xl shadow-slate-200 hover:bg-slate-800 hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            <Save className="w-4 h-4" /> {loading ? "Saving..." : "Record Income"}
          </button>
        </div>
      </form>
    </div>
  );
}
