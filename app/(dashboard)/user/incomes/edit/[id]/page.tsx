"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function EditIncomePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [form, setForm] = useState({
    IncomeDate: "",
    Amount: "",
    CategoryID: "",
    ProjectID: "",
    IncomeDetail: "",
    Description: "",
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`/api/incomes?id=${id}`).then((res) => {
      const data = res.data.data;

      setForm({
        IncomeDate: data.IncomeDate?.split("T")[0],
        Amount: data.Amount,
        CategoryID: data.CategoryID || "",
        ProjectID: data.ProjectID || "",
        IncomeDetail: data.IncomeDetail || "",
        Description: data.Description || "",
      });
    });

    axios.get("/api/categories").then((res) => setCategories(res.data.data));
    axios.get("/api/projects").then((res) => setProjects(res.data.data));
  }, [id]);

  const submit = async (e: any) => {
    e.preventDefault();

    await axios.put(`/api/incomes?id=${id}`, {
      ...form,
      Amount: Number(form.Amount),
      CategoryID: form.CategoryID ? Number(form.CategoryID) : null,
      ProjectID: form.ProjectID ? Number(form.ProjectID) : null,
    });

    router.push("/user/incomes");
  };

  const inputBase =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition";
  const labelBase = "text-xs font-semibold text-slate-600";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Edit Income</h1>
        <p className="text-sm text-slate-500">
          Update income details with a clean layout.
        </p>
      </div>

      <form
        onSubmit={submit}
        className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className={labelBase}>Date</label>
            <input
              type="date"
              className={inputBase}
              value={form.IncomeDate}
              onChange={(e) =>
                setForm({ ...form, IncomeDate: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className={labelBase}>Amount</label>
            <input
              type="number"
              className={inputBase}
              value={form.Amount}
              onChange={(e) => setForm({ ...form, Amount: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className={labelBase}>Category</label>
            <select
              className={inputBase}
              value={form.CategoryID}
              onChange={(e) => setForm({ ...form, CategoryID: e.target.value })}
            >
              <option value="">Select Category</option>
              {categories
                .filter((c) => c.IsIncome)
                .map((c) => (
                  <option key={c.CategoryID} value={c.CategoryID}>
                    {c.CategoryName}
                  </option>
                ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className={labelBase}>Project</label>
            <select
              className={inputBase}
              value={form.ProjectID}
              onChange={(e) => setForm({ ...form, ProjectID: e.target.value })}
            >
              <option value="">Select Project</option>
              {projects.map((p) => (
                <option key={p.ProjectID} value={p.ProjectID}>
                  {p.ProjectName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className={labelBase}>Income Detail</label>
          <textarea
            className={`${inputBase} min-h-[90px] resize-none`}
            placeholder="Optional notes"
            value={form.IncomeDetail}
            onChange={(e) =>
              setForm({ ...form, IncomeDetail: e.target.value })
            }
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className={labelBase}>Description</label>
          <textarea
            className={`${inputBase} min-h-[90px] resize-none`}
            placeholder="Additional details"
            value={form.Description}
            onChange={(e) => setForm({ ...form, Description: e.target.value })}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
            onClick={() => router.push("/user/incomes")}
          >
            Cancel
          </button>
          <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:bg-emerald-700 transition">
            Update Income
          </button>
        </div>
      </form>
    </div>
  );
}
