"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function EditSubCategory() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

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

    axios.get(`/api/sub-categories?id=${id}`).then(res => {
      const sc = res.data.data;

      setForm({
        SubCategoryName: sc.SubCategoryName,
        CategoryID: sc.CategoryID,
        Type: sc.IsIncome ? "income" : "expense",
      });
    });
  }, [id]);

  const submit = async (e: any) => {
    e.preventDefault();

    await axios.put(`/api/sub-categories?id=${id}`, {
      SubCategoryName: form.SubCategoryName,
      CategoryID: form.CategoryID,
      IsExpense: form.Type === "expense",
      IsIncome: form.Type === "income",
    });

    router.push("/user/sub-categories");
  };

  return (
    <div className="p-4 max-w-md">
      <h1 className="text-xl font-semibold mb-4">Edit Sub Category</h1>

      <form onSubmit={submit} className="space-y-4">

        <input
          type="text"
          value={form.SubCategoryName}
          onChange={e => setForm({ ...form, SubCategoryName: e.target.value })}
        />

        <select
          value={form.CategoryID}
          onChange={e => setForm({ ...form, CategoryID: Number(e.target.value) })}
        >
          {categories.map(c => (
            <option key={c.CategoryID} value={c.CategoryID}>
              {c.CategoryName}
            </option>
          ))}
        </select>

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
