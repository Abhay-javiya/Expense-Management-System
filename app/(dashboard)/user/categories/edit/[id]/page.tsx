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
    axios.get(`/api/categories?id=${id}`).then(res => {
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

  return (
    <div className="p-4 max-w-md">
      <h1 className="text-xl font-semibold mb-4">Edit Category</h1>

      <form onSubmit={submit} className="space-y-4">

        <input
          type="text"
          value={form.CategoryName}
          onChange={e => setForm({ ...form, CategoryName: e.target.value })}
        />

        <select
          value={form.Type}
          onChange={e => setForm({ ...form, Type: e.target.value })}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
