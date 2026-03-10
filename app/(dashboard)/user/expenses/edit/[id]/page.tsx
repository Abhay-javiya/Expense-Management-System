"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function EditExpensePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [form, setForm] = useState({
    ExpenseDate: "",
    Amount: "",
    CategoryID: 0,
    SubCategoryID: 0,
    ProjectID: 0,
    ExpenseDetail: "",
    Description: "",
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/categories").then((res) =>
      setCategories(res.data.data.filter((c: any) => c.IsExpense))
    );

    axios.get("/api/projects").then((res) => setProjects(res.data.data));
  }, []);

  useEffect(() => {
    axios.get(`/api/expenses?id=${id}`).then((res) => {
      const e = res.data.data;

      setForm({
        ExpenseDate: e.ExpenseDate?.split("T")[0],
        Amount: e.Amount,
        CategoryID: e.CategoryID || 0,
        SubCategoryID: e.SubCategoryID || 0,
        ProjectID: e.ProjectID || 0,
        ExpenseDetail: e.ExpenseDetail || "",
        Description: e.Description || "",
      });
    });
  }, [id]);

  useEffect(() => {
    if (!form.CategoryID) {
      setSubCategories([]);
      return;
    }

    axios
      .get(`/api/sub-categories?categoryId=${form.CategoryID}`)
      .then((res) => setSubCategories(res.data.data || []));
  }, [form.CategoryID]);

  const submit = async (e: any) => {
    e.preventDefault();

    await axios.put(`/api/expenses?id=${id}`, {
      ExpenseDate: form.ExpenseDate,
      Amount: Number(form.Amount),
      CategoryID: form.CategoryID || null,
      SubCategoryID: form.SubCategoryID || null,
      ProjectID: form.ProjectID || null,
      ExpenseDetail: form.ExpenseDetail,
      Description: form.Description,
    });

    router.push("/user/expenses");
  };

  const inputBase =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition";
  const labelBase = "text-xs font-semibold text-slate-600";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Edit Expense</h1>
        <p className="text-sm text-slate-500">
          Update expense details with a clean layout.
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
              value={form.ExpenseDate}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, ExpenseDate: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className={labelBase}>Amount</label>
            <input
              type="number"
              className={inputBase}
              value={form.Amount}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, Amount: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className={labelBase}>Category</label>
            <select
              className={inputBase}
              value={form.CategoryID || ""}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  CategoryID: Number(e.target.value),
                  SubCategoryID: 0,
                }))
              }
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.CategoryID} value={c.CategoryID}>
                  {c.CategoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className={labelBase}>Sub-Category</label>
            <select
              className={inputBase}
              value={form.SubCategoryID || ""}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  SubCategoryID: Number(e.target.value),
                }))
              }
            >
              <option value="">Select Sub Category</option>
              {subCategories.map((sc) => (
                <option key={sc.SubCategoryID} value={sc.SubCategoryID}>
                  {sc.SubCategoryName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className={labelBase}>Project</label>
            <select
              className={inputBase}
              value={form.ProjectID || ""}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  ProjectID: Number(e.target.value),
                }))
              }
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
          <label className={labelBase}>Expense Detail</label>
          <textarea
            className={`${inputBase} min-h-[90px] resize-none`}
            placeholder="Optional notes"
            value={form.ExpenseDetail}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, ExpenseDetail: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className={labelBase}>Description</label>
          <textarea
            className={`${inputBase} min-h-[90px] resize-none`}
            placeholder="Additional details"
            value={form.Description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, Description: e.target.value }))
            }
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
            onClick={() => router.push("/user/expenses")}
          >
            Cancel
          </button>
          <button className="bg-rose-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:bg-rose-700 transition">
            Update Expense
          </button>
        </div>
      </form>
    </div>
  );
}
