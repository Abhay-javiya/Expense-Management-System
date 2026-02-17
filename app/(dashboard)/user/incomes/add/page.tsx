"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddIncomePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    IncomeDate: "",
    Amount: "",
    PeopleID: "",
    CategoryID: "",
    ProjectID: "",
    IncomeDetail: "",
  });

  const [people, setPeople] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/peoples").then(res => setPeople(res.data.data));
    axios.get("/api/categories").then(res => setCategories(res.data.data));
    axios.get("/api/projects").then(res => setProjects(res.data.data));
  }, []);

  const submit = async (e: any) => {
    e.preventDefault();

    await axios.post("/api/incomes", {
      ...form,
      Amount: Number(form.Amount),
      PeopleID: Number(form.PeopleID),
      CategoryID: form.CategoryID ? Number(form.CategoryID) : null,
      ProjectID: form.ProjectID ? Number(form.ProjectID) : null,
    });

    router.push("/user/incomes");
  };

  return (
    <div className="p-4 max-w-xl">
      <h1 className="text-xl font-semibold mb-4">Add Income</h1>

      <form onSubmit={submit} className="space-y-4">
        <input type="date" required
          onChange={e => setForm({ ...form, IncomeDate: e.target.value })}
        />

        <input type="number" placeholder="Amount" required
          onChange={e => setForm({ ...form, Amount: e.target.value })}
        />

        <select required onChange={e => setForm({ ...form, PeopleID: e.target.value })}>
          <option value="">Select People</option>
          {people.map(p => (
            <option key={p.PeopleID} value={p.PeopleID}>{p.PeopleName}</option>
          ))}
        </select>

        <select onChange={e => setForm({ ...form, CategoryID: e.target.value })}>
          <option value="">Select Category</option>
          {categories.filter(c => c.IsIncome).map(c => (
            <option key={c.CategoryID} value={c.CategoryID}>{c.CategoryName}</option>
          ))}
        </select>

        <select onChange={e => setForm({ ...form, ProjectID: e.target.value })}>
          <option value="">Select Project</option>
          {projects.map(p => (
            <option key={p.ProjectID} value={p.ProjectID}>{p.ProjectName}</option>
          ))}
        </select>

        <textarea placeholder="Income Detail"
          onChange={e => setForm({ ...form, IncomeDetail: e.target.value })}
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Save Income
        </button>
      </form>
    </div>
  );
}
