"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddSubCategory() {
  const router = useRouter();

  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({
    SubCategoryName: "",
    CategoryID: 0,
    Type: "expense"
  });

  useEffect(() => {
    axios.get("/api/categories").then(res =>
      setCategories(res.data.data)
    );
  }, []);

  const submit = async (e: any) => {
    e.preventDefault();

    await axios.post("/api/sub-categories", {
      SubCategoryName: form.SubCategoryName,
      CategoryID: Number(form.CategoryID),
      IsExpense: form.Type === "expense",
      IsIncome: form.Type === "income",
    });

    router.push("/user/sub-categories");
  };

  return (
    <div className="p-4 max-w-md">
      <h1 className="text-xl font-semibold mb-4">Add Sub Category</h1>

      <form onSubmit={submit} className="space-y-4">

        <input
          type="text"
          placeholder="Sub Category Name"
          required
          onChange={e => setForm({ ...form, SubCategoryName: e.target.value })}
        />

        <select
          onChange={e => setForm({ ...form, CategoryID: Number(e.target.value) })}
        >
          <option value="">Select Category</option>
          {categories.map(c => (
            <option key={c.CategoryID} value={c.CategoryID}>
              {c.CategoryName}
            </option>
          ))}
        </select>

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
