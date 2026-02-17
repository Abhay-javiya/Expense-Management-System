"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CategoryPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/categories");
      setCategories(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteCategory = async (id: number) => {
    if (!confirm("Delete this category?")) return;

    await axios.delete(`/api/categories?id=${id}`);
    fetchCategories();
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">

      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Categories</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => router.push("/user/categories/add")}
        >
          + Add Category
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Type</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map(c => (
            <tr key={c.CategoryID} className="border-t">
              <td className="p-2">{c.CategoryName}</td>
              <td className="p-2">
                {c.IsIncome ? "Income" : "Expense"}
              </td>
              <td className="p-2 space-x-2">
                <button
                  className="text-blue-600"
                  onClick={() => router.push(`/user/categories/edit/${c.CategoryID}`)}
                >
                  Edit
                </button>

                <button
                  className="text-red-600"
                  onClick={() => deleteCategory(c.CategoryID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
