"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddCategory() {
  const router = useRouter();

  const [form, setForm] = useState({
    CategoryName: "",
    Type: "expense",
  });

  const submit = async (e: any) => {
    e.preventDefault();

    await axios.post("/api/categories", {
      CategoryName: form.CategoryName,
      IsExpense: form.Type === "expense",
      IsIncome: form.Type === "income",
    });

    router.push("/user/categories");
  };

  return (
    <div className="p-4 max-w-md">
      <h1 className="text-xl font-semibold mb-4">Add Category</h1>

      <form onSubmit={submit} className="space-y-4">

        <input
          type="text"
          placeholder="Category Name"
          required
          onChange={e => setForm({ ...form, CategoryName: e.target.value })}
        />

        <select
          onChange={e => setForm({ ...form, Type: e.target.value })}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
