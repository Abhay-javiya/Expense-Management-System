"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function IncomePage() {
  const [incomes, setIncomes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchIncomes = async () => {
    try {
      const res = await axios.get("/api/incomes");
      setIncomes(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch incomes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const deleteIncome = async (id: number) => {
    if (!confirm("Delete this income?")) return;

    await axios.delete(`/api/incomes?id=${id}`);
    fetchIncomes(); 
  };

  if (loading) return <p>Loading incomes...</p>;

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Incomes</h1>
          {/* <p className="text-sm text-slate-500">
            Track and manage your income records
          </p> */}
        </div>
        <a
          href="/user/incomes/add"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          + Add Income
        </a>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Income
          </h2>
          {/* <p className="text-sm text-slate-500">
            Latest entries added to your account
          </p> */}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2 text-left text-sm">
            <thead>
              <tr className="text-slate-500">
                <th className="px-3 py-2 font-medium">Date</th>
                <th className="px-3 py-2 font-medium">Source</th>
                <th className="px-3 py-2 font-medium">Category</th>
                <th className="px-3 py-2 font-medium">Amount</th>
                <th className="px-3 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {incomes.map((income) => (
                <tr
                  key={income.IncomeID}
                  className="rounded-xl bg-slate-50 text-slate-700 shadow-[0_1px_0_rgba(0,0,0,0.04)] ring-1 ring-slate-100 transition hover:bg-white"
                >
                  <td className="px-3 py-3">
                    {new Date(income.IncomeDate).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-3 font-medium text-slate-900">
                    {income.peoples?.PeopleName || "-"}
                  </td>
                  <td className="px-3 py-3">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {income.categories?.CategoryName || "-"}
                    </span>
                  </td>
                  <td className="px-3 py-3 font-semibold text-emerald-600">
                    ₹ {income.Amount}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3 text-sm">
                      <button
                        className="font-medium text-blue-600 hover:text-blue-700"
                        onClick={() =>
                          router.push(`/user/incomes/edit/${income.IncomeID}`)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="font-medium text-rose-600 hover:text-rose-700"
                        onClick={() => deleteIncome(income.IncomeID)}
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
