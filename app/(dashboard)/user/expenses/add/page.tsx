"use client";

import { useEffect, useState } from "react";
import api from "axios"; 
import { useRouter } from "next/navigation";

export default function AddExpensePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    ExpenseDate: "",
    Amount: "",
    PeopleID: "",
    CategoryID: "",
    SubCategoryID: "",
    ProjectID: "",
    ExpenseDetail: "",
    Description: "",
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [peoples, setPeoples] = useState<any[]>([]);

  /* ================= LOAD MASTER DATA ================= */
  useEffect(() => {
    api.get("/api/categories").then(res =>
      setCategories(res.data.data.filter((c: any) => c.IsExpense))
    );

    api.get("/api/projects").then(res =>
      setProjects(res.data.data)
    );

    api.get("/api/peoples").then(res =>
      setPeoples(res.data.data)
    );
  }, []);

  /* ================= AUTO LOAD SUBCATEGORIES ================= */
  useEffect(() => {
    if (!form.CategoryID) {
      setSubCategories([]);
      return;
    }

    api.get(`/api/sub-categories?categoryId=${form.CategoryID}`)
      .then(res => setSubCategories(res.data.data || []))
      .catch(() => setSubCategories([]));

  }, [form.CategoryID]);

  /* ================= SUBMIT ================= */
  const submit = async (e: any) => {
    e.preventDefault();

    if (!form.PeopleID) {
      alert("Please select a person");
      return;
    }

    setLoading(true);

    try {
      await api.post("/api/expenses", {
        ExpenseDate: form.ExpenseDate,
        PeopleID: Number(form.PeopleID),
        Amount: Number(form.Amount),
        CategoryID: form.CategoryID ? Number(form.CategoryID) : null,
        SubCategoryID: form.SubCategoryID ? Number(form.SubCategoryID) : null,
        ProjectID: form.ProjectID ? Number(form.ProjectID) : null,
        ExpenseDetail: form.ExpenseDetail || null,
        Description: form.Description || null,
      });

      router.push("/user/expenses");

    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl">
      <h1 className="text-xl font-semibold mb-4">Add Expense</h1>

      <form onSubmit={submit} className="space-y-4">

        {/* Date */}
        <input
          type="date"
          required
          value={form.ExpenseDate}
          onChange={e => setForm(prev => ({ ...prev, ExpenseDate: e.target.value }))}
        />

        {/* Amount */}
        <input
          type="number"
          placeholder="Amount"
          required
          value={form.Amount}
          onChange={e => setForm(prev => ({ ...prev, Amount: e.target.value }))}
        />

        {/* 🔥 People (NEW REQUIRED FIELD) */}
        <select
          required
          value={form.PeopleID}
          onChange={e => setForm(prev => ({ ...prev, PeopleID: e.target.value }))}
        >
          <option value="">Select Person</option>
          {peoples.map(p => (
            <option key={p.PeopleID} value={p.PeopleID}>
              {p.PeopleName}
            </option>
          ))}
        </select>

        {/* Category */}
        <select
          value={form.CategoryID}
          onChange={e =>
            setForm(prev => ({
              ...prev,
              CategoryID: e.target.value,
              SubCategoryID: ""
            }))
          }
        >
          <option value="">Select Category</option>
          {categories.map(c => (
            <option key={c.CategoryID} value={c.CategoryID}>
              {c.CategoryName}
            </option>
          ))}
        </select>

        {/* Sub Category */}
        <select
          value={form.SubCategoryID}
          onChange={e => setForm(prev => ({ ...prev, SubCategoryID: e.target.value }))}
        >
          <option value="">Select Sub Category</option>
          {subCategories.map(sc => (
            <option key={sc.SubCategoryID} value={sc.SubCategoryID}>
              {sc.SubCategoryName}
            </option>
          ))}
        </select>

        {/* Project */}
        <select
          value={form.ProjectID}
          onChange={e => setForm(prev => ({ ...prev, ProjectID: e.target.value }))}
        >
          <option value="">Select Project</option>
          {projects.map(p => (
            <option key={p.ProjectID} value={p.ProjectID}>
              {p.ProjectName}
            </option>
          ))}
        </select>

        {/* Detail */}
        <textarea
          placeholder="Expense Detail"
          value={form.ExpenseDetail}
          onChange={e => setForm(prev => ({ ...prev, ExpenseDetail: e.target.value }))}
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={form.Description}
          onChange={e => setForm(prev => ({ ...prev, Description: e.target.value }))}
        />

        <button disabled={loading} className="bg-red-600 text-white px-4 py-2 rounded">
          {loading ? "Saving..." : "Save Expense"}
        </button>

      </form>
    </div>
  );
}
