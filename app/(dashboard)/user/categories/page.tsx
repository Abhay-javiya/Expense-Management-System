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
    <div className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Categories</h1>
          {/* <p className="text-sm text-slate-500">
            Organize your income and expense groups
          </p> */}
        </div>
        <button
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          onClick={() => router.push("/user/categories/add")}
        >
          + Add Category
        </button>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Category List
          </h2>
          {/* <p className="text-sm text-slate-500">
            All categories in your account
          </p> */}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2 text-left text-sm">
            <thead>
              <tr className="text-slate-500">
                <th className="px-3 py-2 font-medium">Name</th>
                <th className="px-3 py-2 font-medium">Type</th>
                <th className="px-3 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr
                  key={c.CategoryID}
                  className="rounded-xl bg-slate-50 text-slate-700 shadow-[0_1px_0_rgba(0,0,0,0.04)] ring-1 ring-slate-100 transition hover:bg-white"
                >
                  <td className="px-3 py-3 font-medium text-slate-900">
                    {c.CategoryName}
                  </td>
                  <td className="px-3 py-3">
                    {c.IsIncome ? (
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        Income
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
                        Expense
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3 text-sm">
                      <button
                        className="font-medium text-blue-600 hover:text-blue-700"
                        onClick={() =>
                          router.push(`/user/categories/edit/${c.CategoryID}`)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="font-medium text-rose-600 hover:text-rose-700"
                        onClick={() => deleteCategory(c.CategoryID)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
