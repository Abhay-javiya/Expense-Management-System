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

  // Load existing income
  useEffect(() => {
    axios.get(`/api/incomes?id=${id}`).then(res => {
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

    axios.get("/api/categories").then(res => setCategories(res.data.data));
    axios.get("/api/projects").then(res => setProjects(res.data.data));
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

  return (
    <div className="p-4 max-w-xl">
      <h1 className="text-xl font-semibold mb-4">Edit Income</h1>

      <form onSubmit={submit} className="space-y-4">

        <input type="date"
          value={form.IncomeDate}
          onChange={e => setForm({ ...form, IncomeDate: e.target.value })}
        />

        <input type="number"
          value={form.Amount}
          onChange={e => setForm({ ...form, Amount: e.target.value })}
        />

        <select
          value={form.CategoryID}
          onChange={e => setForm({ ...form, CategoryID: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.filter(c => c.IsIncome).map(c => (
            <option key={c.CategoryID} value={c.CategoryID}>
              {c.CategoryName}
            </option>
          ))}
        </select>

        <select
          value={form.ProjectID}
          onChange={e => setForm({ ...form, ProjectID: e.target.value })}
        >
          <option value="">Select Project</option>
          {projects.map(p => (
            <option key={p.ProjectID} value={p.ProjectID}>
              {p.ProjectName}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Income Detail"
          value={form.IncomeDetail}
          onChange={e => setForm({ ...form, IncomeDetail: e.target.value })}
        />

        <textarea
          placeholder="Description"
          value={form.Description}
          onChange={e => setForm({ ...form, Description: e.target.value })}
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Update Income
        </button>
      </form>
    </div>
  );
}
