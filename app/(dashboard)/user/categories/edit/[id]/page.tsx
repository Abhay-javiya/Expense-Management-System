"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function EditCategory() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [form, setForm] = useState({
    CategoryName: "",
    Type: "expense",
  });

  useEffect(() => {
    axios.get(`/api/categories?id=${id}`).then((res) => {
      const c = res.data.data;

      setForm({
        CategoryName: c.CategoryName,
        Type: c.IsIncome ? "income" : "expense",
      });
    });
  }, [id]);

  const submit = async (e: any) => {
    e.preventDefault();

    await axios.put(`/api/categories?id=${id}`, {
      CategoryName: form.CategoryName,
      IsExpense: form.Type === "expense",
      IsIncome: form.Type === "income",
    });

    router.push("/user/categories");
  };

  const inputBase =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition";
  const labelBase = "text-xs font-semibold text-slate-600";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Edit Category</h1>
        <p className="text-sm text-slate-500">
          Update the category name or type.
        </p>
      </div>

      <form
        onSubmit={submit}
        className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className={labelBase}>Category Name</label>
            <input
              type="text"
              required
              className={inputBase}
              value={form.CategoryName}
              onChange={(e) =>
                setForm({ ...form, CategoryName: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className={labelBase}>Type</label>
            <select
              className={inputBase}
              value={form.Type}
              onChange={(e) => setForm({ ...form, Type: e.target.value })}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
            onClick={() => router.push("/user/categories")}
          >
            Cancel
          </button>
          <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:bg-emerald-700 transition">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
