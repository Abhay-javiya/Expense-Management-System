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

  /* Load master data */
  useEffect(() => {
    axios.get("/api/categories").then(res =>
      setCategories(res.data.data.filter((c: any) => c.IsExpense))
    );

    axios.get("/api/projects").then(res =>
      setProjects(res.data.data)
    );
  }, []);

  /* Load existing expense */
  useEffect(() => {
    axios.get(`/api/expenses?id=${id}`).then(res => {
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

  /* Load subcategories when category changes */
  useEffect(() => {
    if (!form.CategoryID) {
      setSubCategories([]);
      return;
    }

    axios
      .get(`/api/sub-categories?categoryId=${form.CategoryID}`)
      .then(res => setSubCategories(res.data.data || []));
  }, [form.CategoryID]);

  /* Submit update */
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

  return (
    <div className="p-4 max-w-xl">
      <h1 className="text-xl font-semibold mb-4">Edit Expense</h1>

      <form onSubmit={submit} className="space-y-4">

        <input
          type="date"
          value={form.ExpenseDate}
          onChange={e => setForm(prev => ({ ...prev, ExpenseDate: e.target.value }))}
        />

        <input
          type="number"
          value={form.Amount}
          onChange={e => setForm(prev => ({ ...prev, Amount: e.target.value }))}
        />

        {/* Category */}
        <select
          value={form.CategoryID || ""}
          onChange={e =>
            setForm(prev => ({
              ...prev,
              CategoryID: Number(e.target.value),
              SubCategoryID: 0
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

        {/* SubCategory */}
        <select
          value={form.SubCategoryID || ""}
          onChange={e =>
            setForm(prev => ({
              ...prev,
              SubCategoryID: Number(e.target.value)
            }))
          }
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
          value={form.ProjectID || ""}
          onChange={e =>
            setForm(prev => ({
              ...prev,
              ProjectID: Number(e.target.value)
            }))
          }
        >
          <option value="">Select Project</option>
          {projects.map(p => (
            <option key={p.ProjectID} value={p.ProjectID}>
              {p.ProjectName}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Expense Detail"
          value={form.ExpenseDetail}
          onChange={e => setForm(prev => ({ ...prev, ExpenseDetail: e.target.value }))}
        />

        <textarea
          placeholder="Description"
          value={form.Description}
          onChange={e => setForm(prev => ({ ...prev, Description: e.target.value }))}
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Update Expense
        </button>
      </form>
    </div>
  );
}
