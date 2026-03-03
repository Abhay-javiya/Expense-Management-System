"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SubCategoryPage() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    const res = await axios.get("/api/sub-categories");
    setData(res.data.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const remove = async (id: number) => {
    if (!confirm("Delete sub-category?")) return;
    await axios.delete(`/api/sub-categories?id=${id}`);
    fetchData();
  };

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Sub Categories
          </h1>
          {/* <p className="text-sm text-slate-500">
            Manage detailed groupings for categories
          </p> */}
        </div>
        <button
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          onClick={() => router.push("/user/sub-categories/add")}
        >
          + Add Sub Category
        </button>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Sub Category List
          </h2>
          {/* <p className="text-sm text-slate-500">
            All sub-categories available in your account
          </p> */}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2 text-left text-sm">
            <thead>
              <tr className="text-slate-500">
                <th className="px-3 py-2 font-medium">Name</th>
                <th className="px-3 py-2 font-medium">Category</th>
                <th className="px-3 py-2 font-medium">Type</th>
                <th className="px-3 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((sc) => (
                <tr
                  key={sc.SubCategoryID}
                  className="rounded-xl bg-slate-50 text-slate-700 shadow-[0_1px_0_rgba(0,0,0,0.04)] ring-1 ring-slate-100 transition hover:bg-white"
                >
                  <td className="px-3 py-3 font-medium text-slate-900">
                    {sc.SubCategoryName}
                  </td>
                  <td className="px-3 py-3">
                    {sc.categories?.CategoryName}
                  </td>
                  <td className="px-3 py-3">
                    {sc.IsIncome ? (
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
                          router.push(
                            `/user/sub-categories/edit/${sc.SubCategoryID}`
                          )
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="font-medium text-rose-600 hover:text-rose-700"
                        onClick={() => remove(sc.SubCategoryID)}
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
