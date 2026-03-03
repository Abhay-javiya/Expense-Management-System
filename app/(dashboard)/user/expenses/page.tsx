"use client";

import { useEffect, useState } from "react";
import api from "axios";
import { useRouter } from "next/navigation";

export default function ExpensePage() {
  const router = useRouter();

  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH ================= */
  const fetchExpenses = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/api/expenses");

      if (res.data?.success) {
        setExpenses(res.data.data || []);
      } else {
        setExpenses([]);
      }
    } catch (err: any) {
      console.error(err);

      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else {
        setError(err.response?.data?.message || "Failed to load expenses");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  /* ================= DELETE ================= */
  const deleteExpense = async (id: number) => {
    if (!confirm("Delete this expense?")) return;

    try {
      await api.delete(`/api/expenses?id=${id}`);
      fetchExpenses();
    } catch (err: any) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  /* ================= UI STATES ================= */

  if (loading) return <p className="p-4">Loading expenses...</p>;

  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Expenses</h1>
          {/* <p className="text-sm text-slate-500">
            Track and manage your expense records
          </p> */}
        </div>
        <button
          onClick={() => router.push("/user/expenses/add")}
          className="inline-flex items-center justify-center rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700"
        >
          + Add Expense
        </button>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Expenses
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
                <th className="px-3 py-2 font-medium">Amount</th>
                <th className="px-3 py-2 font-medium">Person</th>
                <th className="px-3 py-2 font-medium">Category</th>
                <th className="px-3 py-2 font-medium">Sub Category</th>
                <th className="px-3 py-2 font-medium">Project</th>
                <th className="px-3 py-2 font-medium">Detail</th>
                <th className="px-3 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-3 py-6 text-center text-slate-500"
                  >
                    No expenses found
                  </td>
                </tr>
              )}

              {expenses.map((expense) => (
                <tr
                  key={expense.ExpenseID}
                  className="rounded-xl bg-slate-50 text-slate-700 shadow-[0_1px_0_rgba(0,0,0,0.04)] ring-1 ring-slate-100 transition hover:bg-white"
                >
                  <td className="px-3 py-3">
                    {new Date(expense.ExpenseDate).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-3 font-semibold text-rose-600">
                    ₹ {expense.Amount}
                  </td>
                  <td className="px-3 py-3 font-medium text-slate-900">
                    {expense.peoples?.PeopleName ?? "-"}
                  </td>
                  <td className="px-3 py-3">
                    <span className="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
                      {expense.categories?.CategoryName ?? "-"}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {expense.sub_categories?.SubCategoryName ?? "-"}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    {expense.projects?.ProjectName ?? "-"}
                  </td>
                  <td className="px-3 py-3">
                    {expense.ExpenseDetail ?? "-"}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3 text-sm">
                      <button
                        className="font-medium text-blue-600 hover:text-blue-700"
                        onClick={() =>
                          router.push(`/user/expenses/edit/${expense.ExpenseID}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="font-medium text-rose-600 hover:text-rose-700"
                        onClick={() => deleteExpense(expense.ExpenseID)}
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
