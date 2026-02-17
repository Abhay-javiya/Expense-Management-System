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
  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  const remove = async (id: number) => {
    if (!confirm("Delete sub-category?")) return;
    await axios.delete(`/api/sub-categories?id=${id}`);
    fetchData();
  };
  

  return (
    <div className="p-4">

      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Sub Categories</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => router.push("/user/sub-categories/add")}
        >
          + Add
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Category</th>
            <th className="p-2">Type</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map(sc => (
            <tr key={sc.SubCategoryID} className="border-t">
              <td className="p-2">{sc.SubCategoryName}</td>
              <td className="p-2">{sc.categories?.CategoryName}</td>
              <td className="p-2">{sc.IsIncome ? "Income" : "Expense"}</td>
              <td className="p-2 space-x-2">
                <button
                  className="text-blue-600"
                  onClick={() => router.push(`/user/sub-categories/edit/${sc.SubCategoryID}`)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => remove(sc.SubCategoryID)}
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
